import "./style.scss";

type TLessonDetailProps = {
  id: string;
  lessonName: string;
  abstract: string;
  createdAt: string;
};

const LessonDetail = ({
  lessonName,
  abstract,
  createdAt,
}: TLessonDetailProps) => {
  return (
    <div className="lesson-detail">
      <h4 className="lesson-detail__title semibold">{lessonName}</h4>
      <p className="lesson-detail__abstract regular">{abstract}</p>
      <span className="lesson-detail__date">
        Created: {new Date(createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};

export default LessonDetail;
