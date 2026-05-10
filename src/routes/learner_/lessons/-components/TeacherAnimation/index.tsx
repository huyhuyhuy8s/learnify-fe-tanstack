import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopRepeat, type Object3D } from "three";
import { forwardRef, useEffect } from "react";
import type { TActions, TTeacherAnimationProps } from "./type";

const TeacherAnimation = forwardRef<Object3D, TTeacherAnimationProps>(
  (props, ref) => {
    const {
      animation = "Idle",
      position = [0, 0, 0],
      rotation = [0, 0, 0],
    } = props;
    const { scene: animScene, animations: glTFAnimations } = useGLTF(
      "/models/teacher_animation.glb"
    );
    const teacher = useGLTF("/models/teacher.glb");
    const { actions } = useAnimations(glTFAnimations, teacher.scene);
    const typedActions = actions as TActions;

    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(teacher.scene);
        } else {
          ref.current = teacher.scene;
        }
      }
    }, [ref, teacher.scene]);

    useEffect(() => {
      const action = typedActions[animation];
      if (action) {
        action.reset().setLoop(LoopRepeat, Infinity).play();
      }
    }, [teacher.scene, animScene, glTFAnimations, typedActions, animation]);

    return (
      <primitive
        object={teacher.scene}
        position={position}
        rotation={rotation}
      />
    );
  }
);

TeacherAnimation.displayName = "TeacherAnimation";

export default TeacherAnimation;
