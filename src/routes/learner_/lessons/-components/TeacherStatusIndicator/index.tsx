import classnames from "classnames";
import "./style.scss";
import Icon, { type TIconName } from "@/components/Icon";
import type { TTeacherStatus, TTeacherStatusIndicatorProps } from "./type.d";

const STATUS_ICONS: Record<TTeacherStatus, TIconName> = {
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
      <Icon
        name={STATUS_ICONS[status]}
        className="teacher-status-indicator_icon"
      />
      <span className="teacher-status-indicator_label">
        {STATUS_LABELS[status]}
      </span>
    </div>
  );
};

export default TeacherStatusIndicator;
