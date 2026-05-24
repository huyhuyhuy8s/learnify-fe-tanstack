import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import { GET_ALL_COURSES_QUERY } from "@/graphql/course";

export type TBackendCourse = {
  id: string;
  courseName: string;
  abstract: string;
  createdAt: string;
  keyLearnings: string[];
  status: string;
  updatedAt: string;
};

type GetAllCoursesResponse = {
  getAllCourses: {
    count: number;
    courses: TBackendCourse[];
    isSuccess: boolean;
    message: string;
  };
};

export function useGetAllCourses(skip: number = 0) {
  return useQuery({
    queryKey: ["courses", "all", skip],
    queryFn: async () => {
      const response = await graphqlClient.request<GetAllCoursesResponse>(
        GET_ALL_COURSES_QUERY,
        { skip }
      );
      return response.getAllCourses;
    },
  });
}

export function useSuspenseGetAllCourses(skip: number = 0) {
  return useSuspenseQuery({
    queryKey: ["courses", "all", skip],
    queryFn: async () => {
      const response = await graphqlClient.request<GetAllCoursesResponse>(
        GET_ALL_COURSES_QUERY,
        { skip }
      );
      return response.getAllCourses;
    },
  });
}
