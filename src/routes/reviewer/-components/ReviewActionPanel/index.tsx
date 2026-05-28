import { Link } from "@tanstack/react-router";
import type { TReviewStatus } from "@/mock/reviewer-courses";
import "./style.scss";

type TReviewActionPanelProps = {
  courseId: string;
  status: TReviewStatus;
  onApprove: () => void;
  onReject: () => void;
};

const ReviewActionPanel = ({
  status,
  onApprove,
  onReject,
}: TReviewActionPanelProps) => {
  const isPending = status === "Pending";

  return (
    <div className="review-action-panel">
      <Link
        to="/reviewer"
        className="review-action-panel__back"
        aria-label="Back to reviewer list"
      >
        ← Back to List
      </Link>

      {!isPending && (
        <p className="review-action-panel__decided">
          This course has already been{" "}
          <strong
            className={`review-action-panel__decided-status review-action-panel__decided-status--${status.toLowerCase()}`}
          >
            {status}
          </strong>
          .
        </p>
      )}

      <div className="review-action-panel__actions">
        <button
          type="button"
          id="btn-approve-course"
          className="review-action-panel__btn review-action-panel__btn--approve"
          onClick={onApprove}
          disabled={!isPending}
          aria-label="Approve this course"
        >
          <span className="review-action-panel__btn-icon" aria-hidden>
            ✓
          </span>
          Approve Course
        </button>

        <button
          type="button"
          id="btn-reject-course"
          className="review-action-panel__btn review-action-panel__btn--reject"
          onClick={onReject}
          disabled={!isPending}
          aria-label="Reject this course"
        >
          <span className="review-action-panel__btn-icon" aria-hidden>
            ✕
          </span>
          Reject Course
        </button>
      </div>
    </div>
  );
};

export default ReviewActionPanel;
