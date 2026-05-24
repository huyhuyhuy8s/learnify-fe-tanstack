import { useMemo, useEffect } from "react";
import { useLesson } from "@/hooks/useLesson";
import useLessonFlow from "@/hooks/useLessonFlow";
import { useLayout } from "@/contexts/LayoutContext";

export type TLessonDetail = {
  data: ReturnType<typeof useLesson>["data"];
  isLoading: boolean;
  state: ReturnType<typeof useLessonFlow>["state"];
  sections:
    | {
        references: { value: string; label: string }[];
        documents: { value: string; label: string }[];
      }
    | undefined;
  startLesson: () => void;
  skipToQA: () => void;
  skipToQuiz: () => void;
  completeLesson: () => void;
  reset: () => void;
};

const useLessonDetail = (lessonId: string): TLessonDetail => {
  const { data, isLoading } = useLesson(lessonId);
  const { state, startLesson, skipToQA, skipToQuiz, completeLesson, reset } =
    useLessonFlow();
  const { setLayoutConfigState } = useLayout();

  const title = data?.course?.courseName || data?.lesson?.lessonName;

  useEffect(() => {
    if (title) {
      setLayoutConfigState((prev) => ({ ...prev, customTitle: title }));
    }
  }, [title, setLayoutConfigState]);

  const sections = useMemo(() => {
    if (!data?.sections) return undefined;
    const refs = data.sections
      .filter((s) => s.content)
      .map((s) => ({ value: s.id, label: s.content! }));
    const docs = data.sections
      .filter((s) => s.urlPdf)
      .map((s) => ({
        value: s.id,
        label: s.urlPdf.split("/").pop() || "Document",
      }));
    return { references: refs, documents: docs };
  }, [data]);

  return {
    data,
    isLoading,
    state,
    sections,
    startLesson,
    skipToQA,
    skipToQuiz,
    completeLesson,
    reset,
  };
};

export default useLessonDetail;
