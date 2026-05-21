import classnames from "classnames";
import { useState } from "react";
import { toast } from "sonner";
import TextButton from "@/components/TextButton";
import Icon from "@/components/Icon";
import TetrisLoader from "@/components/TetrisLoader";
import "./style.scss";

type CommentFormProps = {
  className?: string;
  onSubmit: (rating: number, content: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

const CommentForm = ({
  className,
  onSubmit,
  onCancel,
  isLoading,
}: CommentFormProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const cls = classnames("comment-form", className);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating!");
      return;
    }
    if (!content.trim()) {
      toast.error("Please enter your review!");
      return;
    }
    onSubmit(rating, content);
  };

  return (
    <form className={cls} onSubmit={handleSubmit}>
      <div className="comment-form-head">
        <h4 id="comment-form-rating-label">Rate this course</h4>
        <div
          className="stars"
          role="radiogroup"
          aria-labelledby="comment-form-rating-label"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={star <= rating}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              onClick={() => setRating(star)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setRating(star);
                }
              }}
              disabled={isLoading}
            >
              <Icon
                name="star"
                className="icon"
                fill={star <= rating}
                style={{
                  color:
                    star <= rating
                      ? "var(--color-yellow-400)"
                      : "var(--color-neutral-200)",
                }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="comment-form-body">
        <label htmlFor="comment-form-textarea" className="sr-only">
          Your review
        </label>
        <textarea
          id="comment-form-textarea"
          placeholder="Share your thoughts about this course..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          disabled={isLoading}
        />
      </div>
      <div className="comment-form-footer">
        <TextButton
          text="Cancel"
          type="outlined"
          icon="close"
          size="small"
          onClick={onCancel}
          disabled={isLoading}
          buttonType="button"
        />
        <div className="submit-btn-wrapper">
          {isLoading && <TetrisLoader size="sm" />}
          <TextButton
            text="Submit Review"
            type="primary"
            icon="send"
            size="small"
            onClick={() => {}}
            disabled={isLoading}
          />
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
