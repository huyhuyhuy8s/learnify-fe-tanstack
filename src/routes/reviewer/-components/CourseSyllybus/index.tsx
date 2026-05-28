import { useState } from "react";
import type { MockLesson } from "@/mock/reviewer-courses";
import "./style.scss";

type TLessonSyllabusProps = {
  lessons: MockLesson[];
};

const LessonSyllabus = ({ lessons }: TLessonSyllabusProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const sorted = [...lessons].sort((a, b) => a.order - b.order);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="lesson-syllabus">
      <h2 className="lesson-syllabus__title">
        Course Syllabus
        <span className="lesson-syllabus__count">{sorted.length} lessons</span>
      </h2>

      <ol className="lesson-syllabus__list">
        {sorted.map((lesson) => {
          const isOpen = openId === lesson.id;

          return (
            <li key={lesson.id} className="lesson-syllabus__item">
              <button
                type="button"
                className={`lesson-syllabus__trigger${isOpen ? " lesson-syllabus__trigger--open" : ""}`}
                onClick={() => toggle(lesson.id)}
                aria-expanded={isOpen}
                aria-controls={`lesson-body-${lesson.id}`}
                id={`lesson-trigger-${lesson.id}`}
              >
                <span className="lesson-syllabus__order">
                  {String(lesson.order).padStart(2, "0")}
                </span>
                <span className="lesson-syllabus__name">
                  {lesson.lessonName}
                </span>
                <span className="lesson-syllabus__chevron" aria-hidden>
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>

              <div
                id={`lesson-body-${lesson.id}`}
                role="region"
                aria-labelledby={`lesson-trigger-${lesson.id}`}
                className={`lesson-syllabus__body${isOpen ? " lesson-syllabus__body--open" : ""}`}
              >
                <p className="lesson-syllabus__abstract">{lesson.abstract}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default LessonSyllabus;
