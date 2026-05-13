import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import { GET_COURSE_LESSONS_COMMENT_QUERY } from "@/graphql/course";
import { CREATE_COMMENT_MUTATION } from "@/graphql/comment";
import { ClientError } from "graphql-request";
import { toast } from "sonner";
import type { TStatusCard } from "@/types/global";

export type TBackendCourseDetail = {
  id: string;
  courseName: string;
  abstract: string;
  createdAt: string;
  keyLearnings: string[];
  status: TStatusCard;
  updatedAt: string;
};

export type TBackendLesson = {
  id: string;
  courseId: string;
  abstract: string;
  createdAt: string;
  lessonName: string;
  updatedAt: string;
};

export type TBackendUserReview = {
  id: string;
  email: string;
  diamond: number;
  currentSteak: number;
  role: string;
  username: string;
};

export type TBackendReview = {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  user: TBackendUserReview;
};

type CourseDetailResponse = {
  getCourseById: TBackendCourseDetail | null;
  getLessonsByCourseId: {
    isSuccess: boolean;
    count: number;
    message: string;
    lessons: TBackendLesson[];
  };
  getReviewsByCourse: {
    isSuccess: boolean;
    message: string;
    reviews: TBackendReview[];
  };
};

export type CreateReviewInput = {
  courseId: string;
  rating: number;
  content: string;
};

export function useCourseDetail(courseId: string) {
  return useQuery({
    queryKey: ["course-detail", courseId],
    queryFn: async () => {
      const response = await graphqlClient.request<CourseDetailResponse>(
        GET_COURSE_LESSONS_COMMENT_QUERY,
        {
          courseId: courseId,
          lessonCourseId: courseId,
        }
      );
      return response;
    },
    enabled: !!courseId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateReviewInput) => {
      try {
        const response = await graphqlClient.request<{ createReview: unknown }>(
          CREATE_COMMENT_MUTATION,
          { data }
        );
        if (
          response.createReview &&
          !(response.createReview as { isSuccess: boolean }).isSuccess
        ) {
          toast.error("Failed to submit review:");
          return;
        }

        return response.createReview;
      } catch (error: unknown) {
        if (error instanceof ClientError) {
          const gqlError = error.response.errors?.[0];
          if (gqlError) {
            toast.error(`Failed to submit review: ${gqlError.message}`);
            return;
          }
        }
        toast.error(`Failed to submit review: ${(error as Error).message}`);
        return;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["course-detail", variables.courseId],
      });
    },
  });
}
