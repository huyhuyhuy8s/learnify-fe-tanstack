import { Environment, Preload, useGLTF } from "@react-three/drei";
import "./style.scss";
import { Suspense, useRef, type ReactNode } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import TeacherAnimation from "../TeacherAnimation";
import { Vector3, type Group } from "three";
import TetrisLoader from "@/components/TetrisLoader";
import type { TTeacherAnimation } from "../TeacherAnimation/type";

type TTeacherContainerProps = {
  animation?: TTeacherAnimation;
  children?: ReactNode;
};

const Classroom = () => {
  const { scene } = useGLTF("/models/classroom_default.glb");
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

const TeacherContainer = (props: TTeacherContainerProps) => {
  const { animation, children } = props;
  const teacherRef = useRef<Group>(null);

  return (
    <div className="tutor-container">
      {children}
      <Suspense fallback={<TetrisLoader size="sm" speed="fast" />}>
        <Canvas
          camera={{ position: [1, 1.425, 1], fov: 15 }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          style={{ background: "#1a1a1a" }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Environment preset="city" background={false} />
          <Classroom />
          <TeacherAnimation
            animation={animation}
            rotation={[0, Math.PI, 0]}
            position={[1, 0.25, -2]}
            ref={teacherRef}
          />
          <axesHelper args={[]} />
          <gridHelper args={[10, 10]} />
          <CameraController target={[1, 1.425, 1]} />
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default TeacherContainer;
