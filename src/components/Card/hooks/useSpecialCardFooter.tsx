import { useMemo } from 'react';
import { UseSpecialCardFooterProps } from '../type';
export const useSpecialCardFooter = ({
  status,
  percentage,
  duration,
  onClick,
}: UseSpecialCardFooterProps) => {
  return useMemo(() => {
    switch (status) {
      case 'inProgress':
        return (
          <div className="continued flex">
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="percentage">{percentage}%</div>
          </div>
        );
      case 'completed':
        return (
          <div className="completed flex">
            {duration && (
              <div className="duration flex">
                <span className="material-symbols-rounded">schedule</span>
                <p className="time">{duration}</p>
              </div>
            )}
            <span className="material-symbols-rounded complete-btn">check</span>
          </div>
        );
      case 'locked':
        return (
          <div className="locked flex">
            <div className="duration flex">
              <span className="material-symbols-rounded">schedule</span>
              <p className="time">{duration}</p>
            </div>
            <span className="material-symbols-rounded lock-btn">lock</span>
          </div>
        );
      case 'default':
        return (
          <div className="flex">
            {duration ? (
              <div className="duration flex">
                <span className="material-symbols-rounded">schedule</span>
                <p className="time">{duration}</p>
              </div>
            ) : (
              <div></div>
            )}
            <button className="enter-course" onClick={onClick}>
              <span className="material-symbols-rounded">arrow_forward</span>
            </button>
          </div>
        );
      default:
        return (
          <div className="flex">
            <div className="duration flex">
              <span className="material-symbols-rounded">schedule</span>
              <p className="time">{duration}</p>
            </div>
            <button className="enter-course" onClick={onClick}>
              <span className="material-symbols-rounded">arrow_forward</span>
            </button>
          </div>
        );
    }
  }, [status, percentage, duration, onClick]);
};
