import { GET_COURSE_LESSONS_COMMENT_QUERY } from "@/graphql/course";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import { CREATE_COMMENT_MUTATION } from "@/graphql/comment";
import { ClientError } from "graphql-request";
import { toast } from "sonner";

export type TBackendCourseDetail = {
  id: string;
  courseName: string;
  abstract: string;
  createdAt: string;
  keyLearnings: string[];
  status: string;
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
type TBackendReview = {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  user: TBackendUserReview;
};
type TBackendUserReview = {
  id: string;
  email: string;
  diamond: number;
  currentSteak: number;
  role: string;
  username: string;
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
        const response = await graphqlClient.request<{ createReview: any }>(
          CREATE_COMMENT_MUTATION,
          { data }
        );
        if (response.createReview && !response.createReview.isSuccess) {
          toast.error("Đăng đánh giá thất bại:");
          return;
        }

        return response.createReview;
      } catch (error: any) {
        if (error instanceof ClientError) {
          const gqlError = error.response?.errors?.[0];
          if (gqlError) {
            toast.error(`Đăng đánh giá thất bại: ${gqlError.message}`);
            return;
          }
        }
        toast.error(`Đăng đánh giá thất bại: ${error.message}`);
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
