import { useState } from "react";
import TextButton from "@/components/TextButton";
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
      alert("Vui lòng chọn số sao đánh giá!");
      return;
    }
    if (!content.trim()) {
      alert("Vui lòng nhập nội dung đánh giá!");
      return;
    }
    onSubmit(rating, content);
  };

  return (
    <div className="comment-container">
      <div className="comment-container-head">
        <h4>Đánh giá khóa học</h4>
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
          placeholder="Chia sẻ cảm nghĩ của bạn về khóa học..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          disabled={isLoading}
        />
      </div>
      <div className="comment-container-footer">
        <TextButton
          text="Hủy"
          type="outlined"
          onClick={onCancel}
          disabled={isLoading}
        />
        <TextButton
          text={isLoading ? "Đang gửi..." : "Gửi đánh giá"}
          type="primary"
          onClick={handleSubmit}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default CommentForm;
