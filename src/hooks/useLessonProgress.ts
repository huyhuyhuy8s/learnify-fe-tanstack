import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import {
  MARK_COMPLETE_LESSON_MUTATION,
  UPDATE_PROGRESS_MUTATION,
} from "@/graphql/mutations";
import { useCourseProgress } from "@/hooks/useCourseDetail";
import { useAuthStore } from "@/store";
import type { TLessonState } from "@/hooks/useLessonFlow";

export const STATE_TO_PERCENTAGE: Record<TLessonState, number> = {
  initial: 0,
  lesson: 10,
  qa: 33,
  quiz: 66,
  complete: 100,
};

export function useLessonProgress(
  state: TLessonState,
  lessonId: string,
  courseId?: string
) {
  const userId = useAuthStore((s) => s.user?.id);
  const { data: progressData } = useCourseProgress(userId, courseId);
  const queryClient = useQueryClient();

  const progressPercentage = STATE_TO_PERCENTAGE[state];

  const progressId = progressData?.progress?.[0]?.id;
  const completedLessons = progressData?.progress?.[0]?.completedLessons ?? 0;
  const totalLessons = progressData?.progress?.[0]?.totalLessons ?? 0;

  const markCompleteMutation = useMutation({
    mutationFn: async () => {
      if (!userId || !lessonId) return;
      return graphqlClient.request(MARK_COMPLETE_LESSON_MUTATION, {
        input: { userId, lessonId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-progress", userId, courseId],
      });
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (newCompleted: number) => {
      if (!userId || !courseId || !progressId) return;
      return graphqlClient.request(UPDATE_PROGRESS_MUTATION, {
        input: {
          userId,
          progressId,
          completedLessons: Math.min(newCompleted, totalLessons),
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-progress", userId, courseId],
      });
    },
  });

  const handleComplete = () => {
    if (!userId || !lessonId) return;
    markCompleteMutation.mutate();
    if (courseId && progressId) {
      updateProgressMutation.mutate(completedLessons + 1);
    }
  };

  return {
    progressPercentage,
    handleComplete,
  };
}
