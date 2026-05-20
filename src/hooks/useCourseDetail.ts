import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClientError } from "graphql-request";
import { toast } from "sonner";
import { graphqlClient } from "@/lib/graphql";
import {
  GET_COURSE_LESSONS_COMMENT_QUERY,
  ENROLL_COURSE_MUTATION,
  GET_USER_ENROLLMENTS_QUERY,
  GET_PROGRESS_QUERY,
} from "@/graphql/course";
import { CREATE_COMMENT_MUTATION } from "@/graphql/comment";
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

export type TEnrollment = {
  id: string;
  courseId: string;
  userId: string;
  enrolledAt: string;
};

export type TProgressItem = {
  id: string;
  userId: string;
  status: string;
  percentage: number;
  lastCompleteAt: string | null;
  lastCompletedLessonId: string | null;
  completedLessons: number;
  totalLessons: number;
  courseId: string;
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

export function useUserEnrollments(userId?: string) {
  return useQuery({
    queryKey: ["user-enrollments", userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await graphqlClient.request<{
        getUserEnrollments: TEnrollment[];
      }>(GET_USER_ENROLLMENTS_QUERY, { userId });
      return response.getUserEnrollments;
    },
    enabled: !!userId,
  });
}

export function useCourseProgress(userId?: string, courseId?: string) {
  return useQuery({
    queryKey: ["course-progress", userId, courseId],
    queryFn: async () => {
      if (!userId || !courseId) return null;
      const response = await graphqlClient.request<{
        getProgressByUserAndCourse: {
          isSuccess: boolean;
          progress: TProgressItem[];
        };
      }>(GET_PROGRESS_QUERY, { userId, courseId });

      return response.getProgressByUserAndCourse;
    },
    enabled: !!userId && !!courseId,
  });
}

export function useEnrollCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { courseId: string; userId: string }) => {
      try {
        const response = await graphqlClient.request<{
          enrollCourse: TEnrollment;
        }>(ENROLL_COURSE_MUTATION, { input });
        return response.enrollCourse;
      } catch (error: unknown) {
        if (error instanceof ClientError) {
          const gqlError = error.response.errors?.[0];
          throw new Error(gqlError?.message || "Failed to enroll course");
        }
        throw error;
      }
    },
    onSuccess: (_, variables) => {
      toast.success("Course enrolled successfully!");
      queryClient.invalidateQueries({
        queryKey: ["user-enrollments", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["course-progress", variables.userId, variables.courseId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
