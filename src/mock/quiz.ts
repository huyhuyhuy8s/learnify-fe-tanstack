import type { TQuizQuestion } from "@/routes/learner_/lessons/-components/QuizPanel/type";

export const mockQuizQuestions: TQuizQuestion[] = [
  {
    id: "q1",
    type: "multiple-choice",
    question: "What is the main function of the mitochondria?",
    options: [
      "Protein synthesis",
      "Energy production",
      "DNA replication",
      "Cell division",
    ],
    correctAnswer: [1],
    explanation:
      "Mitochondria are known as the powerhouse of the cell, responsible for producing energy through cellular respiration.",
  },
  {
    id: "q2",
    type: "true-false",
    question: "Photosynthesis occurs in the mitochondria.",
    options: ["True", "False"],
    correctAnswer: [1],
    explanation:
      "Photosynthesis occurs in the chloroplasts, not the mitochondria. Chloroplasts contain chlorophyll which captures light energy.",
  },
  {
    id: "q3",
    type: "multiple-answer",
    question: "Which of the following are types of RNA?",
    options: ["mRNA", "tRNA", "rRNA", "dRNA"],
    correctAnswer: [0, 1, 2],
    explanation:
      "The three main types of RNA are messenger RNA (mRNA), transfer RNA (tRNA), and ribosomal RNA (rRNA). 'dRNA' is not a real type.",
  },
  {
    id: "q4",
    type: "matching",
    question: "Match each organelle to its primary function:",
    options: [
      "Protein synthesis",
      "Cellular respiration",
      "Digestion & waste removal",
      "Storage of genetic material",
      "Lipid synthesis",
    ],
    correctAnswer: [0, 1, 2, 3, 4],
    matchPairs: [
      { left: "Ribosome", right: "Protein synthesis" },
      { left: "Mitochondria", right: "Cellular respiration" },
      { left: "Lysosome", right: "Digestion & waste removal" },
      { left: "Nucleus", right: "Storage of genetic material" },
      { left: "Smooth ER", right: "Lipid synthesis" },
    ],
    explanation:
      "Each organelle has a specialized function: ribosomes synthesize proteins, mitochondria produce energy, lysosomes digest waste, the nucleus stores DNA, and the smooth ER produces lipids.",
  },
];
