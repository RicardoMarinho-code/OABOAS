export type QuestionBlockType =
  | "star"
  | "book"
  | "trophy"
  | "fast-forward"
  | "treasure"
  | "dumbbell";

export type QuestionBlock = {
  type: QuestionBlockType;
  title: string;
};

export type Module = {
  moduleNumber: number;
  title: string;
  backgroundColor: `bg-${string}`;
  borderColor: `border-${string}`;
  questionBlocks: readonly QuestionBlock[];
};

export const modules: readonly Module[] = [
  {
    moduleNumber: 1,
    title: "Módulo 1: Questões OAB",
    backgroundColor: "bg-oab-blue",
    borderColor: "border-blue-800",
    questionBlocks: [
      { type: "book", title: "Questões de Prática" },
    ],
  },
];