import TextButton from "@/components/TextButton";

type TLessonWelcomeProps = {
  lessonName?: string;
  abstract?: string;
  sectionCount?: number;
  modelsReady: boolean;
  onStart: () => void;
};

const LessonWelcome = (props: TLessonWelcomeProps) => {
  const { lessonName, abstract, sectionCount, modelsReady, onStart } = props;

  return (
    <div className="lesson-detail-welcome">
      <h2 className="lesson-detail-welcome-title">{lessonName || "Lesson"}</h2>
      {abstract && <p className="lesson-detail-welcome-abstract">{abstract}</p>}
      <p className="lesson-detail-welcome-sections">
        {sectionCount || 0} sections to cover
      </p>
      <TextButton
        text="Start Lesson"
        onClick={onStart}
        disabled={!modelsReady}
        tooltip={!modelsReady ? "Enriching your 3D lessons" : ""}
        size="medium"
        icon="play"
      />
    </div>
  );
};

export default LessonWelcome;
