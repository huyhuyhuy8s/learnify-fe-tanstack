import { createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useReviewerManageCourses } from "./-hooks/useReviewerManageCourses";
import SplitPanel from "@/components/SplitPanel";
import CourseItem from "./-components/CourseItem";
import CourseItemSkeleton from "./-components/CourseItemSkeleton";
import CourseDetailView from "./-components/CourseDetailView";
import CourseEmptyState from "./-components/CourseEmptyState";
import TetrisLoader from "@/components/TetrisLoader";

const STATUS_LABELS: Record<string, string> = {
  Pending: "courses.status_pending",
  Published: "courses.status_published",
  Rejected: "courses.status_rejected",
  All: "courses.status_all",
};

export const Route = createLazyFileRoute("/reviewer/courses/")({
  component: ReviewerManageCoursesPage,
});

function ReviewerManageCoursesPage() {
  const { t } = useTranslation();
  const { courseId, tab } = Route.useSearch();
  const {
    courses,
    selectedCourse,
    selectedCourseId,
    statusFilter,
    isLoading,
    isCourseLoading,
    handleSelectCourse,
    handleTabChange,
    handleApprove,
    handleReject,
  } = useReviewerManageCourses({
    selectedCourseId: courseId,
    statusFilter: tab ?? "Pending",
  });

  return (
    <div className="reviewer-manage-courses">
      <SplitPanel>
        <SplitPanel.Tabs>
          {Object.keys(STATUS_LABELS).map((value) => (
            <SplitPanel.Tab
              key={value}
              active={statusFilter === value}
              onClick={() => handleTabChange(value)}
            >
              {t(STATUS_LABELS[value]!)}
            </SplitPanel.Tab>
          ))}
        </SplitPanel.Tabs>

        <SplitPanel.Content>
          <SplitPanel.List>
            {isLoading ? (
              <>
                <CourseItemSkeleton />
                <CourseItemSkeleton />
                <CourseItemSkeleton />
              </>
            ) : (
              courses?.map((course) => (
                <CourseItem
                  key={course.id}
                  course={course}
                  isActive={selectedCourseId === course.id}
                  statusLabel={t(STATUS_LABELS[course.status] ?? course.status)}
                  onClick={() => handleSelectCourse(course.id)}
                />
              ))
            )}
          </SplitPanel.List>

          <SplitPanel.Detail>
            {isCourseLoading ? (
              <TetrisLoader />
            ) : selectedCourse ? (
              <CourseDetailView
                course={selectedCourse}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ) : (
              <CourseEmptyState />
            )}
          </SplitPanel.Detail>
        </SplitPanel.Content>
      </SplitPanel>
    </div>
  );
}
