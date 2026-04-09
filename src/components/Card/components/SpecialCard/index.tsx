import classnames from 'classnames';
import './style.scss';
import { CourseCardProps } from '@/components/Card/type';
import TextButton from '@/components/TextButton/index';

const SpecialCard = (props: CourseCardProps) => {
  const {
    className,
    onClick,
    title,
    description,
    duration,
    titleIcon,
    typeSpecial,
    status = 'default',
    percentage = 0,
  } = props;

  return (
    <div
      className={classnames('course-card', className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="badge">
        <TextButton text={titleIcon} type="special" typeSpecial={typeSpecial} />
      </div>
      <h3 className="title">{title}</h3>
      <div className="description">{description}</div>
      {status === 'inProgress' ? (
        <div className="continued flex">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${percentage}%` }}></div>
          </div>
          <div className="percentage">{percentage}%</div>
        </div>
      ) : status === 'completed' ? (
        <div className="completed flex">
          <div className="duration flex">
            <span className="material-symbols-rounded">schedule</span>
            <p className="time">{duration}</p>
          </div>
          <span className="material-symbols-rounded complete-btn">check</span>
        </div>
      ) : status === 'locked' ? (
        <div className="locked flex">
          <div className="duration flex">
            <span className="material-symbols-rounded">schedule</span>
            <p className="time">{duration}</p>
          </div>
          <span className="material-symbols-rounded lock-btn">lock</span>
        </div>
      ) : (
        <div className="flex">
          <div className="duration flex">
            <span className="material-symbols-rounded">schedule</span>
            <p className="time">{duration}</p>
          </div>
          <button className="enter-course" onClick={onClick}>
            <span className="material-symbols-rounded">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
};
export default SpecialCard;
