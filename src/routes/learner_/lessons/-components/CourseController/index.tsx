import { useState } from "react";
import classnames from "classnames";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import IconButton from "@/components/IconButton";
import { COLORS } from "@/styles/colors";
import { graphqlClient } from "@/lib/graphql";
import {
  GET_LESSON_BY_ID,
  GET_LESSONS_BY_COURSE_ID_QUERY,
  GET_COURSE_BY_ID,
} from "@/graphql/course";
import type { TCourseControllerProps } from "./type";
import "./style.scss";

type LessonMeta = { id: string; lessonName: string; courseId: string };
type LessonList = { id: string; lessonName: string }[];

const CourseController = ({ className }: TCourseControllerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lessonId = useRouterState({
    select: (s) => {
      const m = s.matches.find(
        (m) => m.routeId === "/learner_/lessons/$lessonId"
      );
      return (m?.params as { lessonId?: string })?.lessonId;
    },
  });
  const navigate = useNavigate();

  const { data: lessonData, isLoading: loadingLesson } = useQuery({
    queryKey: ["lesson-meta", lessonId],
    queryFn: async () => {
      if (!lessonId) return null;
      const res = await graphqlClient.request<{
        getLessonById: { lessons: LessonMeta[] };
      }>(GET_LESSON_BY_ID, { id: lessonId });
      return res.getLessonById.lessons[0] || null;
    },
    enabled: !!lessonId,
  });

  const courseId = lessonData?.courseId;

  const { data: courseData } = useQuery({
    queryKey: ["course-meta", courseId],
    queryFn: async () => {
      if (!courseId) return null;
      const res = await graphqlClient.request<{
        getCourseById: { courseName: string } | null;
      }>(GET_COURSE_BY_ID, { id: courseId });
      return res.getCourseById;
    },
    enabled: !!courseId,
  });

  const { data: courseLessons, isLoading: loadingLessons } = useQuery({
    queryKey: ["course-lessons-list", courseId],
    queryFn: async () => {
      if (!courseId) return [];
      const res = await graphqlClient.request<{
        getLessonsByCourseId: { lessons: LessonList };
      }>(GET_LESSONS_BY_COURSE_ID_QUERY, { id: courseId });
      return res.getLessonsByCourseId.lessons;
    },
    enabled: !!courseId,
  });

  const courseName =
    courseData?.courseName || lessonData?.lessonName || "Course";
  const loading =
    isExpanded && (loadingLesson || (!!courseId && loadingLessons));

  return (
    <nav
      className={classnames(
        "course-controller",
        { expanded: isExpanded },
        className
      )}
    >
      {isExpanded ? (
        <div className="course-controller_expanded">
          <div className="course-controller_header">
            <h5 className="course-controller_title bold" title={courseName}>
              {courseName}
            </h5>
            <IconButton
              icon="close"
              onClick={() => setIsExpanded(false)}
              size="tiny"
              shape="circle"
              type="custom"
              color={COLORS.neutral900}
              tooltip="Close"
            />
          </div>
          <div className="course-controller_lessons">
            {loading ? (
              <div className="course-controller_loading">
                Loading lessons...
              </div>
            ) : (
              courseLessons?.map((lesson) => {
                const isActive = lesson.id === lessonId;
                return (
                  <button
                    key={lesson.id}
                    className={classnames("course-controller_lesson", {
                      active: isActive,
                    })}
                    onClick={() =>
                      navigate({
                        to: "/learner/lessons/$lessonId",
                        params: { lessonId: lesson.id },
                      })
                    }
                  >
                    <span className="course-controller_lesson-icon material-symbols-rounded">
                      {isActive ? "play_circle" : "radio_button_unchecked"}
                    </span>
                    <span
                      className="course-controller_lesson-name"
                      title={lesson.lessonName}
                    >
                      {lesson.lessonName}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <div className="course-controller_compact">
          <IconButton
            icon="menu"
            onClick={() => setIsExpanded(true)}
            size="tiny"
            shape="circle"
            type="custom"
            color={COLORS.neutral900}
            tooltip="Open course menu"
          />
        </div>
      )}
    </nav>
  );
};

export default CourseController;
