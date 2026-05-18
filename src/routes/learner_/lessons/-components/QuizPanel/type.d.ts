export type TQuizQuestion = {
  id: string;
  type: "multiple-choice" | "multiple-answer" | "true-false" | "matching";
  question: string;
  options: string[];
  correctAnswer: number[];
  matchPairs?: { left: string; right: string }[];
  explanation: string;
};

export type TQuizAnswer = {
  questionId: string;
  selected: number[];
  matchOrder?: number[];
  isCorrect: boolean;
  submitted: boolean;
};
