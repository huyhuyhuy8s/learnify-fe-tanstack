import classnames from "classnames";
import "./style.scss";

import type { TTeacherStatus, TTeacherStatusIndicatorProps } from "./type.d";

const STATUS_ICONS: Record<TTeacherStatus, string> = {
  idle: "voice_over_off",
  thinking: "cognition",
  speaking: "record_voice_over",
  paused: "pause",
};

const STATUS_LABELS: Record<TTeacherStatus, string> = {
  idle: "Idle",
  thinking: "Thinking",
  speaking: "Speaking",
  paused: "Paused",
};

const TeacherStatusIndicator = (props: TTeacherStatusIndicatorProps) => {
  const { status, className } = props;

  return (
    <div className={classnames("teacher-status-indicator", className)}>
      <span className="material-symbols-rounded teacher-status-indicator_icon">
        {STATUS_ICONS[status]}
      </span>
      <span className="teacher-status-indicator_label">
        {STATUS_LABELS[status]}
      </span>
    </div>
  );
};

export default TeacherStatusIndicator;
