import classnames from "classnames";
import { useState } from "react";
import { toast } from "sonner";
import TextButton from "@/components/TextButton";
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

  const handleSubmit = () => {
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
    <div className={cls}>
      <div className="comment-form-head">
        <h4>Rate this course</h4>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="material-symbols-rounded icon"
              onClick={() => setRating(star)}
              style={{
                color:
                  star <= rating
                    ? "var(--color-yellow-400)"
                    : "var(--color-neutral-200)",
                cursor: "pointer",
                fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              star
            </span>
          ))}
        </div>
      </div>
      <div className="comment-form-body">
        <textarea
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
          onClick={onCancel}
          disabled={isLoading}
        />
        <div className="submit-btn-wrapper">
          {isLoading && <TetrisLoader size="sm" />}
          <TextButton
            text="Submit Review"
            type="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
