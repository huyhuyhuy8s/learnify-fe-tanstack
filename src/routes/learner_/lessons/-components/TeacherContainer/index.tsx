import {
  Environment,
  OrbitControls,
  Preload,
  useGLTF,
} from "@react-three/drei";
import "./style.scss";
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import TeacherAnimation from "../TeacherAnimation";
import type { TTeacherAnimation } from "../TeacherAnimation/type";
import { type Group } from "three";
import TetrisLoader from "@/components/TetrisLoader";

const Classroom = () => {
  const { scene } = useGLTF("/models/classroom_default.glb");
  return <primitive object={scene} />;
};

const TeacherContainer = () => {
  const [animations, setAnimations] = useState<TTeacherAnimation>("Idle");
  const teacherRef = useRef<Group>(null);

  return (
    <div className="tutor-container">
      <Suspense fallback={<TetrisLoader size="sm" speed="fast" />}>
        <Canvas
          camera={{ position: [1, 1.125, 1], fov: 15 }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          style={{ background: "#1a1a1a" }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Environment preset="city" background={false} />
          <Classroom />
          <TeacherAnimation
            animation={animations}
            rotation={[0, Math.PI, 0]}
            position={[1, 0.25, -2]}
            ref={teacherRef}
          />
          <axesHelper args={[]} />
          <gridHelper args={[10, 10]} />
          <OrbitControls
            enablePan={false}
            target={[1, 1.375, -2]}
            makeDefault
            minDistance={1}
            maxDistance={10}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default TeacherContainer;
