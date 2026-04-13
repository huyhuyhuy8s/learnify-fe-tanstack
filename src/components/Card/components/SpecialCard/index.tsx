import classnames from 'classnames';
import './style.scss';
import { CourseCardProps } from '@/components/Card/type';
import TextButton from '@/components/TextButton';
import { useSpecialCardFooter } from '../../hooks/useSpecialCardFooter';

const SpecialCard = (props: CourseCardProps) => {
  const {
    className,
    onClick,
    title,
    description,
    duration,
    typeSpecial,
    status = 'default',
    percentage = 0,
  } = props;

  const footerContent = useSpecialCardFooter({
    status,
    percentage,
    duration,
    onClick,
  });

  return (
    <button
      className={classnames('course-card', className)}
      onClick={onClick}
      tabIndex={0}
    >
      <div className="badge">
        <TextButton
          text="text"
          size="tiny"
          type="special"
          typeSpecial={typeSpecial}
        />
      </div>
      <h3 className="title">{title}</h3>
      <div className="description">{description}</div>
      {footerContent}
    </button>
  );
};
export default SpecialCard;
