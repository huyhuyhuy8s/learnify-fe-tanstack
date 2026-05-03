import { useState } from "react";
import TextButton from "@/components/TextButton";
import { toast } from "sonner";
import "./style.scss";

type CommentFormProps = {
  onSubmit: (rating: number, content: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

const CommentForm = ({ onSubmit, onCancel, isLoading }: CommentFormProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

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
    <div className="comment-container">
      <div className="comment-container-head">
        <h4>Rate this course</h4>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="material-symbols-rounded icon"
              onClick={() => setRating(star)}
              style={{
                color: star <= rating ? "#FFC107" : "#E0E0E0",
                cursor: "pointer",
                fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              star
            </span>
          ))}
        </div>
      </div>
      <div className="comment-container-body">
        <textarea
          placeholder="Share your thoughts about this course..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          disabled={isLoading}
        />
      </div>
      <div className="comment-container-footer">
        <TextButton
          text="Cancel"
          type="outlined"
          onClick={onCancel}
          disabled={isLoading}
        />
        <TextButton
          text={isLoading ? "Submitting..." : "Submit Review"}
          type="primary"
          onClick={handleSubmit}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default CommentForm;
