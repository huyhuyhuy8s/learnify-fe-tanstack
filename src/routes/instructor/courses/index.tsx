import { SplitPanel } from "@/components/SplitPanel";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { useAuthStore } from "@/store";
import {
  useGetCoursesByUserId,
  useGetCoursesById,
  useCreateCourse,
  useDeleteCourse,
  useCreateLessonFromAi,
  useUploadDocument,
  useDeleteLesson,
} from "@/hooks/useCourses";
import type { TBackendCourse } from "@/hooks/useCourses";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMemo, useState, useRef } from "react";
import classNames from "classnames";
import { z } from "zod";
import LessonDetail from "./-components/LessonDetail";
import "./style.scss";

export const Route = createFileRoute("/instructor/courses/")({
  head: () => ({
    meta: [{ title: "Manage Courses | Instructor | Learnify" }],
  }),
  component: ManageCoursesPage,
});

const COURSE_STATUSES = ["All", "Published", "Pending", "Rejected"] as const;
const COURSE_STATUS_TRANSLATION_KEYS: Record<string, string> = {
  All: "courses.status_all",
  Published: "courses.status_published",
  Pending: "courses.status_pending",
  Rejected: "courses.status_rejected",
};
const tStatus = (t: (key: string) => string, status: string) =>
  t(COURSE_STATUS_TRANSLATION_KEYS[status] ?? status);
type TCourseStatus = (typeof COURSE_STATUSES)[number];

type TLesson = {
  id: string;
  lessonName: string;
  abstract: string;
  createdAt: string;
};

const courseSchema = z.object({
  courseName: z.string().min(1, "courses.name_required"),
  abstract: z.string().min(1, "courses.description_required"),
});

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const MAX_FILES = 10;

function ManageCoursesPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const { data: courses, isLoading } = useGetCoursesByUserId(user?.id ?? "");
  const createCourse = useCreateCourse();
  const deleteCourse = useDeleteCourse();

  const [statusFilter, setStatusFilter] = useState<TCourseStatus>("All");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const [showAddLesson, setShowAddLesson] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonFiles, setLessonFiles] = useState<File[]>([]);
  const [lessonErrors, setLessonErrors] = useState<Record<string, string>>({});
  const [lessonToDelete, setLessonToDelete] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createLesson = useCreateLessonFromAi();
  const deleteLesson = useDeleteLesson();
  const uploadDoc = useUploadDocument();

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

  const handleAddCourse = () => {
    const result = courseSchema.safeParse({
      courseName: courseName.trim(),
      abstract: courseDescription.trim(),
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        fieldErrors[field] = t(issue.message);
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    createCourse.mutate(
      {
        courseName: result.data.courseName,
        abstract: result.data.abstract,
        isFree: coursePrice === 0,
        originalPrice: coursePrice,
      },
      {
        onSuccess: () => {
          setShowAddCourse(false);
          setCourseName("");
          setCourseDescription("");
          setCoursePrice(0);
          setErrors({});
        },
      }
    );
  };

  const validateFiles = (files: File[]): string | null => {
    if (files.length > MAX_FILES) {
      return t("courses.files_max_count", { count: MAX_FILES });
    }
    for (const file of files) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return t("courses.files_type_error");
      }
      if (file.size > MAX_FILE_SIZE) {
        return t("courses.files_size_error", {
          name: file.name,
          size: "50MB",
        });
      }
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setLessonFiles((prev) => {
      const combined = [...prev, ...files];
      const err = validateFiles(combined);
      if (err) {
        setLessonErrors((p) => ({ ...p, files: err }));
        return prev;
      }
      setLessonErrors((p) => {
        const next = { ...p };
        delete next.files;
        return next;
      });
      return combined;
    });
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setLessonFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddLesson = () => {
    if (!selectedCourseId) return;
    const errs: Record<string, string> = {};
    if (!lessonTitle.trim())
      errs.lessonTitle = t("courses.lesson_title_required");
    if (!lessonDescription.trim())
      errs.lessonDescription = t("courses.lesson_desc_required");
    if (lessonFiles.length === 0) errs.files = t("courses.files_required");
    if (Object.keys(errs).length > 0) {
      setLessonErrors(errs);
      return;
    }
    setLessonErrors({});

    const firstPdf =
      lessonFiles.find((f) => f.type === "application/pdf") ?? lessonFiles[0]!;

    createLesson.mutate(
      {
        data: {
          course_id: selectedCourseId,
          lessonName: lessonTitle.trim(),
          abstract: lessonDescription.trim(),
        },
        pdfFile: firstPdf,
      },
      {
        onSuccess: () => {
          const remaining = lessonFiles.filter((f) => f !== firstPdf);
          if (remaining.length > 0 && user?.id) {
            remaining.forEach((f) =>
              uploadDoc.mutate({ file: f, uploadedBy: user.id })
            );
          }
          setShowAddLesson(false);
          setLessonTitle("");
          setLessonDescription("");
          setLessonFiles([]);
          setLessonErrors({});
        },
      }
    );
  };

  return (
    <div className="manage-courses">
      <Modal
        open={showAddCourse}
        onClose={() => {
          setShowAddCourse(false);
          setCourseName("");
          setCourseDescription("");
          setCoursePrice(0);
          setErrors({});
        }}
        title={t("sidebar.add_course")}
      >
        <div className="manage-courses__form">
          <label className="manage-courses__form-label">
            {t("courses.name")}
            <input
              className={classNames("manage-courses__form-input", {
                "manage-courses__form-input--error": errors.courseName,
              })}
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
                if (errors.courseName)
                  setErrors((p) => ({ ...p, courseName: "" }));
              }}
              placeholder={t("courses.name_placeholder")}
            />
            {errors.courseName && (
              <span className="manage-courses__form-error">
                {errors.courseName}
              </span>
            )}
          </label>
          <label className="manage-courses__form-label">
            {t("courses.description")}
            <textarea
              className={classNames("manage-courses__form-textarea", {
                "manage-courses__form-textarea--error": errors.abstract,
              })}
              value={courseDescription}
              onChange={(e) => {
                setCourseDescription(e.target.value);
                if (errors.abstract) setErrors((p) => ({ ...p, abstract: "" }));
              }}
              placeholder={t("courses.description_placeholder")}
            />
            {errors.abstract && (
              <span className="manage-courses__form-error">
                {errors.abstract}
              </span>
            )}
          </label>
          <label className="manage-courses__form-label">
            {t("courses.price")}
            <div className="manage-courses__price-wrapper">
              <span className="manage-courses__price-currency">₫</span>
              <input
                type="number"
                min={0}
                className="manage-courses__form-input"
                value={coursePrice}
                onChange={(e) =>
                  setCoursePrice(Math.max(0, Number(e.target.value)))
                }
              />
            </div>
            {coursePrice === 0 && (
              <span className="manage-courses__form-hint">
                {t("courses.free_hint")}
              </span>
            )}
          </label>
          <div className="manage-courses__form-actions">
            <button
              className="manage-courses__form-cancel"
              onClick={() => {
                setShowAddCourse(false);
                setCourseName("");
                setCourseDescription("");
                setCoursePrice(0);
                setErrors({});
              }}
            >
              {t("common.cancel")}
            </button>
            <button
              className="manage-courses__form-submit"
              onClick={handleAddCourse}
              disabled={createCourse.isPending}
            >
              {createCourse.isPending ? "..." : t("common.create")}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!courseToDelete}
        onClose={() => setCourseToDelete(null)}
        title={t("courses.delete_title")}
      >
        <div className="manage-courses__confirm">
          <p>{t("courses.delete_confirm")}</p>
          <div className="manage-courses__form-actions">
            <button
              className="manage-courses__form-cancel"
              onClick={() => setCourseToDelete(null)}
            >
              {t("common.cancel")}
            </button>
            <button
              className="manage-courses__form-submit manage-courses__form-submit--danger"
              onClick={() => {
                if (courseToDelete) {
                  deleteCourse.mutate(courseToDelete, {
                    onSuccess: () => setCourseToDelete(null),
                  });
                }
              }}
              disabled={deleteCourse.isPending}
            >
              {deleteCourse.isPending ? "..." : t("common.delete")}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={showAddLesson}
        onClose={() => {
          setShowAddLesson(false);
          setLessonTitle("");
          setLessonDescription("");
          setLessonFiles([]);
          setLessonErrors({});
        }}
        title={t("sidebar.add_lesson")}
      >
        <div className="manage-courses__form">
          <label className="manage-courses__form-label">
            {t("courses.lesson_title")}
            <input
              className={classNames("manage-courses__form-input", {
                "manage-courses__form-input--error": lessonErrors.lessonTitle,
              })}
              value={lessonTitle}
              onChange={(e) => {
                setLessonTitle(e.target.value);
                if (lessonErrors.lessonTitle)
                  setLessonErrors((p) => ({ ...p, lessonTitle: "" }));
              }}
              placeholder={t("courses.lesson_title_placeholder")}
            />
            {lessonErrors.lessonTitle && (
              <span className="manage-courses__form-error">
                {lessonErrors.lessonTitle}
              </span>
            )}
          </label>
          <label className="manage-courses__form-label">
            {t("courses.lesson_description")}
            <textarea
              className={classNames("manage-courses__form-textarea", {
                "manage-courses__form-textarea--error":
                  lessonErrors.lessonDescription,
              })}
              value={lessonDescription}
              onChange={(e) => {
                setLessonDescription(e.target.value);
                if (lessonErrors.lessonDescription)
                  setLessonErrors((p) => ({ ...p, lessonDescription: "" }));
              }}
              placeholder={t("courses.lesson_desc_placeholder")}
            />
            {lessonErrors.lessonDescription && (
              <span className="manage-courses__form-error">
                {lessonErrors.lessonDescription}
              </span>
            )}
          </label>

          <div className="manage-courses__form-label">
            <span>{t("courses.files")}</span>
            <div
              className={classNames("manage-courses__file-zone", {
                "manage-courses__file-zone--error": lessonErrors.files,
              })}
              onClick={() => fileInputRef.current?.click()}
            >
              <Icon name="attach_file" size={24} />
              <span>{t("courses.files_click")}</span>
              <span className="manage-courses__file-hint">
                {t("courses.files_hint", {
                  maxFiles: MAX_FILES,
                  maxSize: "50MB",
                })}
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.ppt,.pptx"
              multiple
              className="manage-courses__file-hidden"
              onChange={handleFileChange}
            />
            {lessonErrors.files && (
              <span className="manage-courses__form-error">
                {lessonErrors.files}
              </span>
            )}
            {lessonFiles.length > 0 && (
              <div className="manage-courses__file-list">
                {lessonFiles.map((file, i) => (
                  <div
                    key={`${file.name}-${i}`}
                    className="manage-courses__file-item"
                  >
                    <Icon name="description" size={16} />
                    <span className="manage-courses__file-name">
                      {file.name}
                    </span>
                    <span className="manage-courses__file-size">
                      {(file.size / 1024 / 1024).toFixed(1)}MB
                    </span>
                    <button
                      className="manage-courses__file-remove"
                      onClick={() => removeFile(i)}
                    >
                      <Icon name="close" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="manage-courses__form-actions">
            <button
              className="manage-courses__form-cancel"
              onClick={() => {
                setShowAddLesson(false);
                setLessonTitle("");
                setLessonDescription("");
                setLessonFiles([]);
                setLessonErrors({});
              }}
            >
              {t("common.cancel")}
            </button>
            <button
              className="manage-courses__form-submit"
              onClick={handleAddLesson}
              disabled={createLesson.isPending}
            >
              {createLesson.isPending ? "..." : t("common.create")}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!lessonToDelete}
        onClose={() => setLessonToDelete(null)}
        title={t("courses.delete_lesson_title")}
      >
        <div className="manage-courses__confirm">
          <p>{t("courses.delete_lesson_confirm")}</p>
          <div className="manage-courses__form-actions">
            <button
              className="manage-courses__form-cancel"
              onClick={() => setLessonToDelete(null)}
            >
              {t("common.cancel")}
            </button>
            <button
              className="manage-courses__form-submit manage-courses__form-submit--danger"
              onClick={() => {
                if (lessonToDelete) {
                  deleteLesson.mutate(lessonToDelete, {
                    onSuccess: () => setLessonToDelete(null),
                  });
                }
              }}
              disabled={deleteLesson.isPending}
            >
              {deleteLesson.isPending ? "..." : t("common.delete")}
            </button>
          </div>
        </div>
      </Modal>

      <SplitPanel
        levels={3}
        tabs={COURSE_STATUSES.map((s) => ({
          value: s,
          label: tStatus(t, s),
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
        renderListHeader={() => (
          <button
            className="manage-courses__add-btn"
            onClick={() => setShowAddCourse(true)}
          >
            <Icon name="add" /> {t("sidebar.add_course")}
          </button>
        )}
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
            <Icon
              name="menu_book"
              className="manage-courses__item-icon"
              size={20}
            />
            <div className="manage-courses__item-info">
              <span className="manage-courses__item-name">
                {course.courseName}
              </span>
              <span
                className={`manage-courses__item-status manage-courses__item-status--${course.status.toLowerCase()}`}
              >
                {tStatus(t, course.status)}
              </span>
            </div>
            <button
              className="manage-courses__item-delete"
              onClick={(e) => {
                e.stopPropagation();
                setCourseToDelete(course.id);
              }}
            >
              <Icon name="delete" size={18} />
            </button>
          </div>
        )}
        renderDetail={(course) => (
          <div className="manage-courses__course-detail-body">
            <h4 className="semibold">{course.courseName}</h4>
            <p className="manage-courses__course-abstract">{course.abstract}</p>
            <div className="manage-courses__course-meta">
              <span>
                {t("courses.status")}: {tStatus(t, course.status)}
              </span>
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
            <Icon
              name="play_circle"
              className="manage-courses__lesson-item__icon"
            />
            <div className="manage-courses__lesson-item__info">
              <span className="manage-courses__lesson-item__name medium">
                {lesson.lessonName}
              </span>
              <small className="manage-courses__lesson-item__date">
                {new Date(lesson.createdAt as string).toLocaleDateString()}
              </small>{" "}
            </div>
            <button
              className="manage-courses__item-delete"
              onClick={(e) => {
                e.stopPropagation();
                setLessonToDelete(lesson.id);
              }}
            >
              <Icon name="delete" size={18} />
            </button>
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
        renderSubListHeader={() => (
          <button
            className="manage-courses__add-btn"
            onClick={() => {
              if (!selectedCourseId) return;
              setShowAddLesson(true);
            }}
          >
            <Icon name="add" /> {t("sidebar.add_lesson")}
          </button>
        )}
      />
    </div>
  );
}
