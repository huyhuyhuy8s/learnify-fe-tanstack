import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Icon from "@/components/Icon";
import { useCreateCourse } from "@/hooks/useCourses";

export const Route = createFileRoute("/instructor/courses/create/")({
  head: () => ({
    meta: [{ title: "Create Course | Instructor | Learnify" }],
  }),
  component: CreateCoursePage,
});

function CreateCoursePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const createCourse = useCreateCourse();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim() || !courseDescription.trim()) return;
    await createCourse.mutateAsync({ courseName, abstract: courseDescription });
    navigate({ to: "/instructor/courses" });
  };

  return (
    <div>
      <Icon name="add_circle" />
      <h3>{t("sidebar.create_courses")}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name</label>
          <input
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Course Description</label>
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={createCourse.isPending}>
          {createCourse.isPending ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
