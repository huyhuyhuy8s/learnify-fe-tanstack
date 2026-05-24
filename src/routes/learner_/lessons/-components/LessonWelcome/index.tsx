import { useTranslation } from "react-i18next";
import TextButton from "@/components/TextButton";
import "./style.scss";

type TLessonWelcomeProps = {
  lessonName?: string;
  abstract?: string;
  sectionCount?: number;
  modelsReady: boolean;
  onStart: () => void;
};

const LessonWelcome = (props: TLessonWelcomeProps) => {
  const { t } = useTranslation();
  const { lessonName, abstract, sectionCount, modelsReady, onStart } = props;

  return (
    <div className="lesson-welcome">
      <h2 className="lesson-welcome__title">
        {lessonName || t("lesson_welcome.lesson_fallback")}
      </h2>
      {abstract && <p className="lesson-welcome__abstract">{abstract}</p>}
      <p className="lesson-welcome__sections">
        {t("lesson_welcome.sections_to_cover", { count: sectionCount || 0 })}
      </p>
      <TextButton
        text={t("lesson_welcome.start_lesson")}
        onClick={onStart}
        disabled={!modelsReady}
        tooltip={!modelsReady ? t("lesson_welcome.tooltip_disabled") : ""}
        size="medium"
        icon="play"
      />
    </div>
  );
};

export default LessonWelcome;
