import classnames from 'classnames';
import './style.scss';
import { DecorationCardProps } from '@/components/Card/type';
import TextButton from '@/components/TextButton';
import { features } from 'node:process';

const DecorationCard = (props: DecorationCardProps) => {
  const {
    className,
    title,
    titleIcon,
    typeSpecial,
    listFeature = [],
    status = 'default',
    percentage = 0,
  } = props;

  return (
    <div className="decoration-card">
      <div className="badge">
        <TextButton text={titleIcon} type="special" typeSpecial={typeSpecial} />
      </div>
      <h3 className="title">{title}</h3>
      <div className="list-feature flex">
        {listFeature.map((features, idx) => (
          <p key={idx} className="feature-name">
            {features}
          </p>
        ))}
      </div>
      <div className="status flex">
        {status === 'completed' ? (
          <div className="completed flex">
            <p>Completed</p>
            <span className="material-symbols-rounded complete-btn">check</span>
          </div>
        ) : status === 'locked' ? (
          <div className="locked flex">
            <p>Locked</p>
            <span className="material-symbols-rounded lock-btn">lock</span>
          </div>
        ) : (
          <div className="continued flex">
            <button>
              <span
                className="material-symbols-rounded"
                style={{ fontSize: '18px' }}
              >
                arrow_forward
              </span>
              Start
            </button>

            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>

            <div className="percentage flex">
              <span
                className="material-symbols-rounded"
                style={{ fontSize: '14px' }}
              >
                star
              </span>
              {percentage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DecorationCard;
