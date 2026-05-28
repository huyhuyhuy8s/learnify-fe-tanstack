import {
  useQuery,
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import {
  GET_ALL_COURSES_QUERY,
  GET_COURSE_LESSONS_BY_ID_QUERY,
  GET_COURSE_BY_STATUS_QUERY,
  PUBLISH_COURSE_MUTATION,
  REJECT_COURSE_MUTATION,
} from "@/graphql/course";
import { toast } from "sonner";

export type TBackendCourse = {
  id: string;
  courseName: string;
  abstract: string;
  createdAt: string;
  keyLearnings: string[];
  status: string;
  updatedAt: string;
};

type GetCourseByIdResponse = {
  getCourseById: {
    isSuccess: boolean;
    message: string;
    course: TBackendCourse;
  };
};

type GetAllCoursesResponse = {
  getAllCourses: {
    count: number;
    courses: TBackendCourse[];
    isSuccess: boolean;
    message: string;
  };
};

type GetCoursesByStatusResponse = {
  getCoursesByStatus: {
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

export function useGetCoursesStatus(status: string, skip: number = 0) {
  return useQuery({
    queryKey: ["courses", "status", status, skip],
    queryFn: async () => {
      const response = await graphqlClient.request<GetCoursesByStatusResponse>(
        GET_COURSE_BY_STATUS_QUERY,
        { status, skip }
      );
      return response.getCoursesByStatus;
    },
  });
}

export function usePublishCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      return await graphqlClient.request(PUBLISH_COURSE_MUTATION, { courseId });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["courses", "all"],
      });
      toast.success("Course published successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to publish course: ${(error as Error).message}`);
    },
  });
}

export function useRejectCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      return await graphqlClient.request(REJECT_COURSE_MUTATION, { courseId });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["courses", "all"],
      });
      toast.success("Course rejected successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to reject course: ${(error as Error).message}`);
    },
  });
}

export function useGetCoursesById(courseId: string) {
  return useQuery({
    queryKey: ["courses", "id", courseId],
    queryFn: async () => {
      // Đảm bảo GetCourseByIdResponse có chứa cả 2 trường này nhé
      const response = await graphqlClient.request<any>( // Tạm dùng any để tránh lỗi type nếu bạn chưa update type response
        GET_COURSE_LESSONS_BY_ID_QUERY,
        { getCourseByIdId: courseId }
      );
      // TRẢ VỀ TOÀN BỘ RESPONSE thay vì chỉ response.getCourseById
      return response;
    },
    staleTime: 0,
  });
}
