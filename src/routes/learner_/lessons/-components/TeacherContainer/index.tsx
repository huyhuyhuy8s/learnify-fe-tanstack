import { Environment, useGLTF, useProgress } from "@react-three/drei";
import "./style.scss";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import TeacherAnimation from "../TeacherAnimation";
import type { TTeacherAnimationRef } from "../TeacherAnimation";
import { Vector3 } from "three";
import CubeLoader from "@/components/CubeLoader";
import type { TTeacherAnimation } from "../TeacherAnimation/type";

useGLTF.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
);

const getModelUrl = (filename: string) =>
  `${import.meta.env.VITE_MODEL_CDN_URL || ""}/models/${filename}`;

useGLTF.preload(getModelUrl("teacher.glb"));
useGLTF.preload(getModelUrl("teacher_animation.glb"));
useGLTF.preload(getModelUrl("classroom_default.glb"));

type TTeacherContainerProps = {
  animation?: TTeacherAnimation;
  children?: React.ReactNode;
  onModelReady?: () => void;
  onModelsReady?: () => void;
  isLoading?: boolean;
  loadingMessage?: string;
};

const CameraController = (props: { target: [number, number, number] }) => {
  const { target } = props;
  const targetVec = useRef(new Vector3(...target));

  useFrame((state) => {
    state.camera.lookAt(targetVec.current);
  });

  return null;
};

function ClassroomModel() {
  const { scene } = useGLTF(getModelUrl("classroom_default.glb"));
  return <primitive object={scene} />;
}

function ProgressBar() {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <div className="teacher-container__progress-bar">
      <div
        className="teacher-container__progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function TeacherContainer(props: TTeacherContainerProps) {
  const {
    animation,
    children,
    onModelReady,
    onModelsReady,
    isLoading = false,
    loadingMessage = "",
  } = props;
  const teacherAnimationRef = useRef<TTeacherAnimationRef>(null);
  const hasCalledReadyRef = useRef(false);

  const { progress } = useProgress();
  const teacherReady = progress >= 30 && !isLoading;

  useEffect(() => {
    if (teacherReady && !hasCalledReadyRef.current) {
      hasCalledReadyRef.current = true;
      onModelReady?.();
      onModelsReady?.();
    }
  }, [teacherReady, onModelReady, onModelsReady]);

  return (
    <div className="teacher-container">
      {isLoading && (
        <div className="teacher-container__loader-overlay">
          <CubeLoader />
          {loadingMessage && (
            <span className="teacher-container__loading-text">
              {loadingMessage}
            </span>
          )}
        </div>
      )}

      {children}

      <ProgressBar />

      <Canvas
        camera={{ position: [1, 1.425, 1], fov: 15 }}
        gl={{
          antialias: false,
          premultipliedAlpha: false,
        }}
        style={{
          background: "#1a1a1a",
        }}
      >
        <AmbientScene />

        <Suspense fallback={null}>
          <TeacherScene
            animation={animation}
            teacherAnimationRef={teacherAnimationRef}
          />
        </Suspense>

        <Suspense fallback={null}>
          <ClassroomModel />
        </Suspense>

        <CameraController target={[1, 1.425, 1]} />
      </Canvas>
    </div>
  );
}

function AmbientScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="city" background={false} resolution={64} />
    </>
  );
}

function TeacherScene({
  animation,
  teacherAnimationRef,
}: {
  animation?: TTeacherAnimation;
  teacherAnimationRef: React.RefObject<TTeacherAnimationRef | null>;
}) {
  const teacherModel = useGLTF(getModelUrl("teacher.glb"));
  const animationModel = useGLTF(getModelUrl("teacher_animation.glb"));

  const teacherScene = useMemo(
    () => teacherModel?.scene,
    [teacherModel?.scene]
  );

  if (!teacherScene) return null;

  return (
    <TeacherAnimation
      ref={teacherAnimationRef}
      animation={animation}
      animationModel={animationModel}
      teacherModel={{ scene: teacherScene }}
      rotation={[0, Math.PI, 0]}
      position={[1, 0.25, -2]}
    />
  );
}

export default TeacherContainer;
