import classnames from "classnames";
import "./style.scss";
import type { TCourseCardProps } from "./type";
import TextButton from "@/components/TextButton";
import CardFooter from "./components/CardFooter";

const Card = (props: TCourseCardProps) => {
  const {
    className,
    onClick,
    title,
    description,
    duration,
    typeSpecial,
    status = "default",
    percentage = 0,
  } = props;

  return (
    <button
      className={classnames("card", className)}
      onClick={onClick}
      tabIndex={0}
    >
      <div className="card-content">
        <div className="badge">
          <TextButton
            onClick={() => {}}
            text="text"
            size="tiny"
            type="special"
            typeSpecial={typeSpecial}
          />
        </div>
        <h5 className="medium" title={title}>
          {title}
        </h5>
        {description && (
          <p className="description" title={description}>
            {description}
          </p>
        )}
      </div>
      <CardFooter status={status} percentage={percentage} duration={duration} />
    </button>
  );
};
export default Card;
