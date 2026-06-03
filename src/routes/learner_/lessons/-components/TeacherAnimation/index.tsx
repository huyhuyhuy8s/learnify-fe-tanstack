import { useAnimations } from "@react-three/drei";
import { type Group, LoopRepeat, type AnimationClip } from "three";
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useImperativeHandle,
} from "react";
import type { TActions, TTeacherAnimation, TTeacherAnimationDeg } from "./type";

const DEG_ANIMATIONS: TTeacherAnimationDeg[] = [
  "metarig.001|mixamo.com|Layer0",
  "metarig.001|mixamo.com|Layer0.001",
  "Talking_4",
  "Talking_4.001",
  "Talking_5",
  "Talking_7",
];

type TTeacherAnimationProps = {
  animation?: TTeacherAnimation;
  position?: [number, number, number];
  rotation?: [number, number, number];
  animationModel: { animations: AnimationClip[]; scene: Group };
  teacherModel: { scene: Group };
};

export type TTeacherAnimationRef = {
  playAnimation: (name: TTeacherAnimation) => void;
  stopAnimation: (name: TTeacherAnimation) => void;
};

const TeacherAnimation = forwardRef<
  TTeacherAnimationRef,
  TTeacherAnimationProps
>((props, ref) => {
  const {
    animation = "Idle",
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    animationModel,
    teacherModel,
  } = props;

  const computedRotation = useMemo(() => {
    const isDegAnimation = DEG_ANIMATIONS.includes(
      animation as TTeacherAnimationDeg
    );
    return [
      rotation[0],
      isDegAnimation ? rotation[1] : rotation[1],
      rotation[2],
    ] as [number, number, number];
  }, [animation, rotation]);

  const glTFAnimations = useMemo(
    () =>
      animationModel?.animations?.map((clip: AnimationClip) => {
        const c = clip.clone();
        c.tracks = c.tracks.filter((t) => !t.name.includes("_end."));
        return c;
      }) ?? [],
    [animationModel?.animations]
  );

  const { actions } = useAnimations(glTFAnimations, teacherModel.scene);
  const typedActions = useMemo(() => actions as TActions, [actions]);

  const currentActionRef = useRef<TActions[keyof TActions] | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      playAnimation: (name: TTeacherAnimation) => {
        const action = typedActions[name];
        if (action) {
          if (currentActionRef.current && currentActionRef.current !== action) {
            currentActionRef.current.fadeOut(0.3);
          }
          action.reset().fadeIn(0.3).setLoop(LoopRepeat, Infinity).play();
          currentActionRef.current = action;
        }
      },
      stopAnimation: (name: TTeacherAnimation) => {
        const action = typedActions[name];
        if (action) {
          action.stop();
          action.reset();
        }
      },
    }),
    [typedActions]
  );

  useEffect(() => {
    if (!typedActions || Object.keys(typedActions).length === 0) return;

    const currentAction = typedActions[animation];
    const prevAction = currentActionRef.current;

    if (currentAction) {
      if (prevAction && prevAction !== currentAction) {
        prevAction.fadeOut(0.3);
      }
      currentAction.reset().fadeIn(0.3).setLoop(LoopRepeat, Infinity).play();
      currentActionRef.current = currentAction;
    }
  }, [animation, typedActions]);

  return (
    <primitive
      object={teacherModel.scene}
      position={position}
      rotation={computedRotation}
    />
  );
});

TeacherAnimation.displayName = "TeacherAnimation";

export default TeacherAnimation;
