import Icon from "@/components/Icon";
import "./style.scss";
import type { TCategoryItemProps } from "./type.d.ts";

const CategoryItem = (props: TCategoryItemProps) => {
  const { icon, label, onClick } = props;

  return (
    <div className="category-item" onClick={onClick}>
      <Icon name={icon} className="icon" />
      <span className="label">{label}</span>
    </div>
  );
};

export default CategoryItem;
