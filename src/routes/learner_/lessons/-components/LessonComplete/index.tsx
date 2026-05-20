import { Link } from "@tanstack/react-router";
import Icon from "@/components/Icon";

const LessonComplete = () => {
  return (
    <div className="lesson-detail-complete">
      <Icon name="check_circle" className="lesson-detail-complete-icon" />
      <h2 className="lesson-detail-complete-title">Lesson Complete!</h2>
      <p className="lesson-detail-complete-text">
        You have finished this lesson. Great work!
      </p>
      <Link to="/learner/dashboard" className="lesson-detail-complete-back">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default LessonComplete;
