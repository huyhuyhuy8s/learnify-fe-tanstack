import type { TReviewerCourse } from "@/mock/reviewer-courses";
import ReviewerHeader from "../CourseListHeader";
import CourseReviewRow from "../CourseReviewRow";
import "./style.scss";

type TReviewerTableProps = {
  title: string;
  courses: TReviewerCourse[];
};

const TABLE_COLUMNS = [
  "Course Info",
  "Instructor",
  "Date Submitted",
  "Status",
  "Action",
];

const ReviewerTable = ({ title, courses }: TReviewerTableProps) => {
  return (
    <div className="reviewer-pending">
      <ReviewerHeader title={title} />

      <div className="reviewer-pending__table-wrapper">
        <table className="reviewer-pending__table">
          <thead className="reviewer-pending__thead">
            <tr>
              {TABLE_COLUMNS.map((col) => (
                <th key={col} className="reviewer-pending__th">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <CourseReviewRow key={course.id} course={course} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewerTable;
