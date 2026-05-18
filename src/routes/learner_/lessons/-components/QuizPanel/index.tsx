import { useState, useCallback, useMemo } from "react";
import classnames from "classnames";
import type { TQuizQuestion, TQuizAnswer } from "./type";
import "./style.scss";

type TQuizPanelProps = {
  questions: TQuizQuestion[];
  onComplete: () => void;
  className?: string;
};

const QuizPanel = ({ questions, onComplete, className }: TQuizPanelProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<TQuizAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const currentAnswer = useMemo(
    () => answers.find((a) => a.questionId === currentQuestion?.id),
    [answers, currentQuestion?.id]
  );

  const updateAnswer = useCallback(
    (partial: Partial<TQuizAnswer>) => {
      const q = currentQuestion!;
      setAnswers((prev) => {
        const existing = prev.findIndex((a) => a.questionId === q.id);
        const base: TQuizAnswer = {
          questionId: q.id,
          selected: [],
          isCorrect: false,
          submitted: false,
        };
        const merged = {
          ...base,
          ...(existing >= 0 ? prev[existing] : {}),
          ...partial,
        };
        if (existing >= 0) {
          const copy = [...prev];
          copy[existing] = merged;
          return copy;
        }
        return [...prev, merged];
      });
    },
    [currentQuestion]
  );

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      const q = currentQuestion!;
      if (currentAnswer?.submitted) return;
      if (q.type === "multiple-choice" || q.type === "true-false") {
        updateAnswer({ selected: [optionIndex] });
      } else if (q.type === "multiple-answer") {
        const prev = currentAnswer?.selected || [];
        const next = prev.includes(optionIndex)
          ? prev.filter((i) => i !== optionIndex)
          : [...prev, optionIndex];
        updateAnswer({ selected: next });
      }
    },
    [currentAnswer, currentQuestion, updateAnswer]
  );

  const handleMatchChange = useCallback(
    (pairIndex: number, optionIndex: number) => {
      if (currentAnswer?.submitted) return;
      const prev = currentAnswer?.matchOrder || [];
      const next = [...prev];
      next[pairIndex] = optionIndex;
      updateAnswer({ matchOrder: next });
    },
    [currentAnswer, updateAnswer]
  );

  const evaluate = useCallback(
    (answer: TQuizAnswer): boolean => {
      const q = currentQuestion!;
      if (q.type === "matching" && answer.matchOrder && q.matchPairs) {
        const correct = q.correctAnswer;
        return (
          answer.matchOrder.length === correct.length &&
          answer.matchOrder.every((v, i) => v === correct[i])
        );
      }
      const sortedSelected = [...answer.selected].sort();
      const sortedCorrect = [...q.correctAnswer].sort();
      return (
        sortedSelected.length === sortedCorrect.length &&
        sortedSelected.every((v, i) => v === sortedCorrect[i])
      );
    },
    [currentQuestion]
  );

  const handleSubmit = useCallback(() => {
    if (!currentAnswer || currentAnswer.submitted) return;
    const isCorrect = evaluate(currentAnswer);
    updateAnswer({ submitted: true, isCorrect });
  }, [currentAnswer, evaluate, updateAnswer]);

  const handleNext = useCallback(() => {
    if (isLast) {
      setShowResults(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [isLast]);

  const score = useMemo(() => {
    const correct = answers.filter((a) => a.submitted && a.isCorrect).length;
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  }, [answers, questions.length]);

  if (showResults) {
    return (
      <div className={classnames("quiz-panel", className)}>
        <div className="quiz-panel-results">
          <div className="quiz-panel-results-header">Quiz Results</div>
          <div className="quiz-panel-results-score">
            <span className="quiz-panel-results-fraction">
              {score.correct}/{score.total}
            </span>
            <span className="quiz-panel-results-percent">
              {score.percentage}%
            </span>
          </div>
          <div className="quiz-panel-results-bar-track">
            <div
              className="quiz-panel-results-bar-fill"
              style={{ width: `${score.percentage}%` }}
            />
          </div>
          <div className="quiz-panel-results-list">
            {questions.map((q, i) => {
              const a = answers.find((x) => x.questionId === q.id);
              const correct = a?.submitted && a.isCorrect;
              return (
                <div
                  key={q.id}
                  className={classnames("quiz-panel-results-item", {
                    correct,
                    wrong: a?.submitted && !correct,
                  })}
                >
                  <span className="quiz-panel-results-item-icon material-symbols-rounded">
                    {correct ? "check_circle" : "cancel"}
                  </span>
                  <span className="quiz-panel-results-item-label">
                    Q{i + 1}. {q.question}
                  </span>
                  {a?.submitted && !correct && (
                    <span className="quiz-panel-results-item-hint">
                      Correct answer:{" "}
                      {q.correctAnswer.map((idx) => q.options[idx]).join(", ")}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <button className="quiz-panel-results-complete" onClick={onComplete}>
            Complete
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className={classnames("quiz-panel", className)}>
      <div className="quiz-panel-progress">
        Question {currentIndex + 1} of {questions.length}
      </div>
      <div className="quiz-panel-question">
        <div className="quiz-panel-question-type">
          {currentQuestion.type === "multiple-choice"
            ? "Multiple Choice"
            : currentQuestion.type === "multiple-answer"
              ? "Multiple Answer"
              : currentQuestion.type === "true-false"
                ? "True or False"
                : "Matching"}
        </div>
        <p className="quiz-panel-question-text">{currentQuestion.question}</p>

        {currentQuestion.type !== "matching" ? (
          <div className="quiz-panel-options">
            {currentQuestion.options.map((option, i) => {
              const isSelected = currentAnswer?.selected.includes(i);
              let optionMod = "";
              if (currentAnswer?.submitted) {
                if (currentQuestion.correctAnswer.includes(i)) {
                  optionMod = "correct";
                } else if (isSelected) {
                  optionMod = "wrong";
                }
              } else if (isSelected) {
                optionMod = "selected";
              }
              return (
                <button
                  key={i}
                  className={classnames("quiz-panel-option", optionMod)}
                  onClick={() => handleSelectOption(i)}
                  disabled={currentAnswer?.submitted}
                >
                  <span className="quiz-panel-option-indicator material-symbols-rounded">
                    {isSelected ? "check_circle" : "radio_button_unchecked"}
                  </span>
                  <span className="quiz-panel-option-label">{option}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="quiz-panel-matching">
            {currentQuestion.matchPairs?.map((pair, i) => {
              const selected = currentAnswer?.matchOrder?.[i] ?? -1;
              return (
                <div key={i} className="quiz-panel-matching-row">
                  <span className="quiz-panel-matching-left">{pair.left}</span>
                  <select
                    className="quiz-panel-matching-select"
                    value={selected}
                    onChange={(e) =>
                      handleMatchChange(i, Number(e.target.value))
                    }
                    disabled={currentAnswer?.submitted}
                  >
                    <option value={-1} disabled>
                      Select a description
                    </option>
                    {currentQuestion.options.map((opt, oi) => (
                      <option key={oi} value={oi}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {currentAnswer?.submitted && (
                    <span
                      className={classnames(
                        "quiz-panel-matching-status",
                        selected === currentQuestion.correctAnswer[i]
                          ? "correct"
                          : "wrong"
                      )}
                    >
                      {selected === currentQuestion!.correctAnswer[i]
                        ? "✓"
                        : `✗ (${currentQuestion!.options[currentQuestion!.correctAnswer[i]!]!})`}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {currentAnswer?.submitted && (
          <div className="quiz-panel-explanation">
            <span className="quiz-panel-explanation-label">Explanation:</span>
            <p className="quiz-panel-explanation-text">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        <div className="quiz-panel-actions">
          {!currentAnswer?.submitted ? (
            <button
              className="quiz-panel-submit"
              onClick={handleSubmit}
              disabled={
                !currentAnswer ||
                (currentQuestion.type === "matching"
                  ? (currentAnswer.matchOrder?.length ?? 0) <
                    (currentQuestion.matchPairs?.length ?? 0)
                  : currentAnswer.selected.length === 0)
              }
            >
              Submit Answer
            </button>
          ) : (
            <button className="quiz-panel-next" onClick={handleNext}>
              {isLast ? "See Results" : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPanel;
