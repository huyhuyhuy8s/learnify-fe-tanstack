import { SplitPanel } from "@/components/SplitPanel";
import Icon from "@/components/Icon";
import { useAuthStore } from "@/store";
import { useGetCoursesByUserId, useGetCoursesById } from "@/hooks/useCourses";
import type { TBackendCourse } from "@/hooks/useCourses";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import classNames from "classnames";
import LessonDetail from "./-components/LessonDetail";
import "./style.scss";

export const Route = createFileRoute("/instructor/courses/")({
  head: () => ({
    meta: [{ title: "Manage Courses | Instructor | Learnify" }],
  }),
  component: ManageCoursesPage,
});

const COURSE_STATUSES = ["All", "Published", "Pending", "Rejected"] as const;
type TCourseStatus = (typeof COURSE_STATUSES)[number];

type TLesson = {
  id: string;
  lessonName: string;
  abstract: string;
  createdAt: string;
};

function ManageCoursesPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const { data: courses, isLoading } = useGetCoursesByUserId(user?.id ?? "");

  const [statusFilter, setStatusFilter] = useState<TCourseStatus>("All");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const { data: courseData, isLoading: isCourseLoading } = useGetCoursesById(
    selectedCourseId ?? ""
  );

  const filteredCourses: TBackendCourse[] = useMemo(() => {
    if (!courses) return [];
    if (statusFilter === "All") return courses;
    return courses.filter((c) => c.status === statusFilter);
  }, [courses, statusFilter]);

  const lessons: TLesson[] = useMemo(() => {
    if (!courseData?.getLessonsByCourseId?.lessons) return [];
    return courseData.getLessonsByCourseId.lessons;
  }, [courseData]);

  const selectedLesson = selectedLessonId
    ? (lessons.find((l) => l.id === selectedLessonId) ?? null)
    : null;

  return (
    <div className="manage-courses">
      <SplitPanel
        levels={3}
        tabs={COURSE_STATUSES.map((s) => ({
          value: s,
          label: s === "All" ? t("courses.all") : s,
        }))}
        activeTab={statusFilter}
        onTabChange={(tab) => {
          setStatusFilter(tab as TCourseStatus);
          setSelectedCourseId(null);
          setSelectedLessonId(null);
        }}
        items={filteredCourses}
        selectedId={selectedCourseId}
        isLoading={isLoading}
        renderItem={(course) => (
          <div
            className={classNames("manage-courses__item", {
              "manage-courses__item--active": selectedCourseId === course.id,
            })}
            onClick={() => {
              setSelectedCourseId(course.id);
              setSelectedLessonId(null);
            }}
          >
            <Icon name="folder" />
            <div className="manage-courses__item-info">
              <span className="manage-courses__item-name">
                {course.courseName}
              </span>
              <span
                className={`manage-courses__item-status manage-courses__item-status--${course.status.toLowerCase()}`}
              >
                {course.status}
              </span>
            </div>
          </div>
        )}
        renderDetail={(course) => (
          <div className="manage-courses__course-detail-body">
            <h4 className="semibold">{course.courseName}</h4>
            <p className="manage-courses__course-abstract">{course.abstract}</p>
            <div className="manage-courses__course-meta">
              <span>Status: {course.status}</span>
              <span>
                Created: {new Date(course.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
        subItems={lessons}
        selectedSubId={selectedLessonId}
        onSelectSub={setSelectedLessonId}
        isSubLoading={isCourseLoading}
        renderSubItem={(lesson) => (
          <div
            className={classNames("manage-courses__lesson-item", {
              "manage-courses__lesson-item--active":
                selectedLessonId === lesson.id,
            })}
          >
            <Icon name="play_circle" />
            <span>{lesson.lessonName}</span>
          </div>
        )}
        renderSubDetail={(lesson) => (
          <LessonDetail
            id={lesson.id}
            lessonName={lesson.lessonName}
            abstract={lesson.abstract}
            createdAt={lesson.createdAt}
          />
        )}
      />
    </div>
  );
}
