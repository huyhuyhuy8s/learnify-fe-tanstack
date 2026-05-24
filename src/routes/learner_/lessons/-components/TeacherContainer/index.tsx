import { Environment, Preload, useGLTF } from "@react-three/drei";
import "./style.scss";
import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import TeacherAnimation from "../TeacherAnimation";
import type { TTeacherAnimationRef } from "../TeacherAnimation";
import { Vector3, type Group } from "three";
import CubeLoader from "@/components/CubeLoader";
import type { TTeacherAnimation } from "../TeacherAnimation/type";

type TTeacherContainerProps = {
  animation?: TTeacherAnimation;
  children?: React.ReactNode;
  onModelReady?: () => void;
  onModelsReady?: () => void;
  isLoading?: boolean;
  loadingMessage?: string;
};

const Classroom = ({ scene }: { scene: Group }) => {
  return <primitive object={scene} />;
};

const CameraController = (props: { target: [number, number, number] }) => {
  const { target } = props;
  const targetVec = useRef(new Vector3(...target));

  useFrame((state) => {
    state.camera.lookAt(targetVec.current);
  });

  return null;
};

const useModelPreloader = (onReady: () => void) => {
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  const animationModel = useGLTF("/models/teacher_animation.glb");
  const teacherModel = useGLTF("/models/teacher.glb");
  const classroomModel = useGLTF("/models/classroom_default.glb");

  const isLoaded = !!(animationModel && teacherModel && classroomModel);

  useEffect(() => {
    if (isLoaded) {
      onReadyRef.current();
    }
  }, [isLoaded]);

  return { isLoaded, animationModel, teacherModel, classroomModel };
};

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

  const { isLoaded, animationModel, teacherModel, classroomModel } =
    useModelPreloader(() => {
      if (!hasCalledReadyRef.current) {
        hasCalledReadyRef.current = true;
        onModelReady?.();
        onModelsReady?.();
      }
    });

  const teacherScene = useMemo(
    () => teacherModel?.scene,
    [teacherModel?.scene]
  );

  const classroomScene = useMemo(
    () => classroomModel?.scene,
    [classroomModel?.scene]
  );

  const showOverlay = isLoading || !isLoaded;

  useEffect(() => {
    return () => {
      useGLTF.clear("/models/teacher_animation.glb");
      useGLTF.clear("/models/teacher.glb");
      useGLTF.clear("/models/classroom_default.glb");
    };
  }, []);

  return (
    <div className="teacher-container">
      {showOverlay && (
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

      <Canvas
        camera={{ position: [1, 1.425, 1], fov: 15 }}
        gl={{
          antialias: true,
          premultipliedAlpha: false,
        }}
        style={{
          background: "#1a1a1a",
          opacity: showOverlay ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {teacherScene && (
          <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Environment preset="city" background={false} />
            <Classroom scene={classroomScene} />
            <TeacherAnimation
              ref={teacherAnimationRef}
              animation={animation}
              animationModel={animationModel}
              teacherModel={{ scene: teacherScene }}
              rotation={[0, Math.PI, 0]}
              position={[1, 0.25, -2]}
            />
            <CameraController target={[1, 1.425, 1]} />
          </>
        )}
        <Preload all />
      </Canvas>
    </div>
  );
}

export default TeacherContainer;
