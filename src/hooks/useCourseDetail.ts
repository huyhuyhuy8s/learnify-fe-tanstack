import { GET_COURSE_LESSONS_COMMENT_QUERY } from "@/graphql/course";
import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";

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
