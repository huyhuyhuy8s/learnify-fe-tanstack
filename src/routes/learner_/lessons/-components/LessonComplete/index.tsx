import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import Icon from "@/components/Icon";

const LessonComplete = () => {
  const { t } = useTranslation();
  return (
    <div className="lesson-detail-complete">
      <Icon name="check_circle" className="lesson-detail-complete-icon" />
      <h2 className="lesson-detail-complete-title">
        {t("lesson_complete.title")}
      </h2>
      <p className="lesson-detail-complete-text">
        {t("lesson_complete.description")}
      </p>
      <Link to="/learner/dashboard" className="lesson-detail-complete-back">
        {t("lesson_complete.back_to_dashboard")}
      </Link>
    </div>
  );
};

export default LessonComplete;
