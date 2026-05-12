import { useAnimations, useGLTF } from "@react-three/drei";
import {
  type Group,
  LoopRepeat,
  type Object3DEventMap,
  type AnimationClip,
} from "three";
import { forwardRef, useEffect, useMemo, useRef } from "react";
import type {
  TActions,
  TTeacherAnimation,
  TTeacherAnimationDeg,
  TTeacherAnimationProps,
} from "./type";

const DEG_ANIMATIONS: TTeacherAnimationDeg[] = [
  "metarig.001|mixamo.com|Layer0",
  "metarig.001|mixamo.com|Layer0.001",
  "Talking_4",
  "Talking_4.001",
  "Talking_5",
  "Talking_7",
];

const TeacherAnimation = forwardRef<
  Group<Object3DEventMap>,
  TTeacherAnimationProps
>((props, ref) => {
  const {
    animation = "Idle",
    position = [0, 0, 0],
    rotation = [0, 0, 0],
  } = props;

  const computedRotation = useMemo(() => {
    const isDegAnimation = DEG_ANIMATIONS.includes(
      animation as TTeacherAnimationDeg
    );
    const extraRotation = isDegAnimation ? Math.PI : 0;
    return [rotation[0], rotation[1] + extraRotation, rotation[2]] as [
      number,
      number,
      number,
    ];
  }, [animation, rotation]);
  const { scene: animScene, animations: rawAnimations } = useGLTF(
    "/models/teacher_animation.glb"
  );
  const teacher = useGLTF("/models/teacher.glb");
  const glTFAnimations = useMemo(
    () =>
      rawAnimations?.map((clip: AnimationClip) => {
        const c = clip.clone();
        c.tracks = c.tracks.filter((t) => !t.name.includes("_end."));
        return c;
      }),
    [rawAnimations]
  );
  const { actions } = useAnimations(glTFAnimations, teacher.scene);
  const typedActions = actions as TActions;

  const prevAnimationRef = useRef<TTeacherAnimation | null>(null);

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
    const currentAction = typedActions[animation];
    const prevAction = prevAnimationRef.current
      ? typedActions[prevAnimationRef.current]
      : null;

    if (currentAction) {
      if (prevAction && prevAction !== currentAction) {
        prevAction.fadeOut(0.3);
        currentAction.reset().fadeIn(0.3).setLoop(LoopRepeat, Infinity).play();
      } else {
        currentAction.reset().setLoop(LoopRepeat, Infinity).play();
      }
    }

    prevAnimationRef.current = animation;
  }, [teacher.scene, animScene, glTFAnimations, typedActions, animation]);

  return (
    <primitive
      object={teacher.scene}
      position={position}
      rotation={computedRotation}
    />
  );
});

TeacherAnimation.displayName = "TeacherAnimation";

export default TeacherAnimation;
