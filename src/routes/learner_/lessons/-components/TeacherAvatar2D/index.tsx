import classnames from "classnames";
import type { TTeacherAnimation } from "../TeacherAnimation/type";
import "./style.scss";

type TTeacherAvatar2DProps = {
  animation?: TTeacherAnimation;
  className?: string;
};

const IMAGE_MAP: Record<TTeacherAnimation, string> = {
  Idle: "/images/teacher/idle.png",
  Thinking: "/images/teacher/thinking.png",
  Talking_1: "/images/teacher/talking_1.png",
  Talking_2: "/images/teacher/talking_2.png",
  Talking_3: "/images/teacher/talking_3.png",
  Talking_4: "/images/teacher/talking_4.png",
  "Talking_4.001": "/images/teacher/talking_4.png",
  Talking_5: "/images/teacher/talking_5.png",
  Talking_7: "/images/teacher/talking_7.png",
  "metarig.001|mixamo.com|Layer0": "/images/teacher/metarig_0.png",
  "metarig.001|mixamo.com|Layer0.001": "/images/teacher/metarig_1.png",
};

const TeacherAvatar2D = (props: TTeacherAvatar2DProps) => {
  const { animation = "Idle", className } = props;

  const imageSrc = IMAGE_MAP[animation] ?? IMAGE_MAP.Idle;

  return (
    <div className={classnames("teacher-avatar-2d", className)}>
      <img
        src={imageSrc}
        alt={`Teacher avatar - ${animation}`}
        className="teacher-avatar-2d_image"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
          const placeholder = target.nextElementSibling as HTMLElement;
          if (placeholder) placeholder.style.display = "flex";
        }}
      />
      <div
        className="teacher-avatar-2d_placeholder"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default TeacherAvatar2D;
