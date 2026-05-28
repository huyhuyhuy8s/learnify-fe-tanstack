import { Link } from "@tanstack/react-router";
import type { TReviewerCourse, TReviewStatus } from "@/mock/reviewer-courses";
import "./style.scss";

type TCourseReviewRowProps = {
  course: TReviewerCourse;
};

const ACTION_LABEL: Record<TReviewStatus, string> = {
  Pending: "Review Course",
  Rejected: "View Details",
  Published: "View Details",
};

const CourseReviewRow = ({ course }: TCourseReviewRowProps) => {
  const { id, title, instructorName, dateSubmitted, status, thumbnail } =
    course;

  return (
    <tr className="course-review-row">
      <td className="course-review-row__cell course-review-row__cell--info">
        <div className="course-review-row__course-info">
          <img
            src={thumbnail}
            alt={title}
            width={40}
            height={40}
            className="course-review-row__thumbnail"
          />
          <span className="course-review-row__title">{title}</span>
        </div>
      </td>

      <td className="course-review-row__cell">{instructorName}</td>

      <td className="course-review-row__cell">{dateSubmitted}</td>

      <td className="course-review-row__cell">
        <span
          className={`course-review-row__badge course-review-row__badge--${status.toLowerCase()}`}
        >
          {status}
        </span>
      </td>

      <td className="course-review-row__cell course-review-row__cell--action">
        <Link
          to="/reviewer/$courseId"
          params={{ courseId: String(id) }}
          className="course-review-row__action-btn"
        >
          {ACTION_LABEL[status]}
        </Link>
      </td>
    </tr>
  );
};

export default CourseReviewRow;
