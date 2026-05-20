export type TChatHeaderProps = {
  className?: string;
  initialValue?: string;
  onUpdate?: (value: string) => void;
  onSkipLesson?: () => void;
  onSkipQA?: () => void;
  onSkipQuiz?: () => void;
  onFlag?: () => void;
  state?: "initial" | "lesson" | "qa" | "quiz" | "complete";
};
