import { useTranslation } from "react-i18next";
import Icon from "@/components/Icon";
import "./style.scss";
import type { TCategoryItemProps } from "./type.d.ts";

const CategoryItem = (props: TCategoryItemProps) => {
  const { t } = useTranslation();
  const { icon, labelKey, onClick } = props;

  return (
    <div className="category-item" onClick={onClick}>
      <Icon name={icon} className="icon" />
      <span className="label">{t(labelKey)}</span>
    </div>
  );
};

export default CategoryItem;
