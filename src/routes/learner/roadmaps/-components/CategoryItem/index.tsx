import type { TCategoryItemProps } from "./type.d.ts";
import "./style.scss";

const CategoryItem = (props: TCategoryItemProps) => {
  const { icon, label, onClick } = props;

  return (
    <div className="category-item" onClick={onClick}>
      <span className="material-symbols-rounded icon">{icon}</span>
      <span className="label">{label}</span>
    </div>
  );
};

export default CategoryItem;
