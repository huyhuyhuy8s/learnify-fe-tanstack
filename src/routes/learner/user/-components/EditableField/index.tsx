import { useState, useRef, useEffect } from "react";
import "./style.scss";

export const EditableField = ({
  label,
  value,
  fieldName,
  onSave,
  isLoading,
}: {
  label: string;
  value: string;
  fieldName: string;
  onSave: (field: string, val: string) => void;
  isLoading: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    if (currentValue !== value && currentValue.trim() !== "") {
      onSave(fieldName, currentValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleToggleEdit = () => {
    if (!isEditing) {
      setCurrentValue(value);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="editable-field">
      <label className="editable-field-label">{label}</label>
      <div className="editable-field-wrapper">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="editable-field-input"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        ) : (
          <div className="editable-field-text">{value}</div>
        )}

        <button
          className="editable-field-btn"
          onClick={handleToggleEdit}
          disabled={isLoading}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
