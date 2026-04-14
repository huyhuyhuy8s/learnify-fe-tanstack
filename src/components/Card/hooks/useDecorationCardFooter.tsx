import { UseDecorationCardFooterProps } from '../type';
import { useMemo } from 'react';
export const useDecorationCardFooter = ({
  status,
  percentage,
  star,
  onClick,
}: UseDecorationCardFooterProps) => {
  return useMemo(() => {
    switch (status) {
      case 'completed':
        return (
          <div className="completed flex">
            <p>Completed</p>
            <span className="material-symbols-rounded complete-btn">check</span>
          </div>
        );
      case 'locked':
        return (
          <div className="locked flex">
            <p>Locked</p>
            <span className="material-symbols-rounded lock-btn">lock</span>
          </div>
        );
      case 'inProgress':
      case 'default':
        return (
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
              {star}
            </div>
          </div>
        );
      default:
        return (
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
          </div>
        );
    }
  }, [status, percentage, star, onClick]);
};
