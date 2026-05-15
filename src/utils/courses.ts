import { ClientError } from "graphql-request";
import type { CourseDto, LessonReturn, ReviewResponse } from "@/gql/graphql";
import { GET_COURSE_LESSONS_COMMENT_QUERY } from "@/graphql/course";
import { graphqlClient } from "@/lib/graphql";
import { queryOptions } from "@tanstack/react-query";

export type GetCourseLessonsComment = {
  getCourseById?: CourseDto;
  getLessonsByCourseId?: LessonReturn;
  getReviewsByCourse?: ReviewResponse;
};

export const courseQueryOptions = (courseId: string) =>
  queryOptions({
    queryKey: ["course-detail", courseId],
    queryFn: async () => {
      try {
        const response = await graphqlClient.request(
          GET_COURSE_LESSONS_COMMENT_QUERY,
          {
            courseId,
            lessonCourseId: courseId,
          }
        );
        return response as GetCourseLessonsComment;
      } catch (error) {
        if (error instanceof ClientError && error.response?.data) {
          return error.response.data as GetCourseLessonsComment;
        }
        throw error;
      }
    },
    enabled: !!courseId,
  });
