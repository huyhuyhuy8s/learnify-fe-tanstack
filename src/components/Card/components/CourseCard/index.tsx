import classnames from 'classnames';
import './style.scss';
import { CourseCardProps } from '../../type';
import TextButton from './../../../TextButton/index';

const CourseCard = (props: CourseCardProps) => {
  const {
    className,
    onClick,
    title,
    description,
    duration,
    titleIcon,
    type,
    typeSpecial,
  } = props;

  return (
    <div
      className={classnames('course-card', className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="badge">
        <TextButton text={titleIcon} type={type} typeSpecial={typeSpecial} />
      </div>
      <h3 className="title">{title}</h3>
      <div className="description">{description}</div>
      <div className="flex">
        <div className="duration">{duration}</div>
        <button className="enter-course" onClick={onClick}>
          <span className="material-symbols-rounded">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
export default CourseCard;
