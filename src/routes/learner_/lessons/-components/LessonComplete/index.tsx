import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import Icon from "@/components/Icon";
import "./style.scss";

const LessonComplete = () => {
  const { t } = useTranslation();
  return (
    <div className="lesson-complete">
      <Icon name="check_circle" className="lesson-complete__icon" />
      <h2 className="lesson-complete__title">{t("lesson_complete.title")}</h2>
      <p className="lesson-complete__text">
        {t("lesson_complete.description")}
      </p>
      <Link to="/learner/dashboard" className="lesson-complete__back">
        {t("lesson_complete.back_to_dashboard")}
      </Link>
    </div>
  );
};

export default LessonComplete;
