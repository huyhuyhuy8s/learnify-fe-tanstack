import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import {
  GET_LESSON_BY_ID,
  GET_SECTIONS_BY_LESSON,
  GET_COURSE_BY_ID,
} from "@/graphql/course";
import { useAuthStore } from "@/store";

type LessonItem = {
  id: string;
  lessonName: string;
  abstract?: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
};
type SectionItem = {
  id: string;
  urlPdf: string;
  content?: string;
  order: number;
};
type CourseItem = {
  id: string;
  courseName: string;
  abstract?: string;
  keyLearnings?: string[];
  status?: string;
};

type LessonResponse = {
  getLessonById: { isSuccess: boolean; lessons: LessonItem[] };
};
type SectionsResponse = { getSectionByLesson: SectionItem[] };
type CourseResponse = { getCourseById: CourseItem | null };

export function useLesson(lessonId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ["lesson", lessonId, isAuthenticated],
    queryFn: async () => {
      if (!isAuthenticated) return { lesson: null, sections: [], course: null };
      try {
        const [lessonRes, sectionsRes] = await Promise.all([
          graphqlClient.request<LessonResponse>(GET_LESSON_BY_ID, {
            id: lessonId,
          }),
          graphqlClient.request<SectionsResponse>(GET_SECTIONS_BY_LESSON, {
            lessonId,
          }),
        ]);
        const lesson = lessonRes.getLessonById.lessons[0];
        let course: CourseItem | null = null;
        if (lesson?.courseId) {
          const courseRes = await graphqlClient.request<CourseResponse>(
            GET_COURSE_BY_ID,
            { id: lesson.courseId }
          );
          course = courseRes.getCourseById;
        }
        return { lesson, sections: sectionsRes.getSectionByLesson, course };
      } catch {
        return { lesson: null, sections: [], course: null };
      }
    },
    enabled: !!lessonId,
  });
}
