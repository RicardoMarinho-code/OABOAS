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
    title: "Módulo 1: Ética e Estatuto",
    backgroundColor: "bg-oab-blue",
    borderColor: "border-blue-800",
    questionBlocks: [
      { type: "book", title: "Direitos Humanos" },
      { type: "star", title: "Filosofia do Direito" },
      { type: "book", title: "Direito Internacional" },
      { type: "star", title: "Direito Constitucional" },
      { type: "trophy", title: "Revisão do Módulo 1" },
    ],
  },
  {
    moduleNumber: 2,
    title: "Módulo 2: Direito Civil",
    backgroundColor: "bg-red-500",
    borderColor: "border-red-600",
    questionBlocks: [
      { type: "book", title: "Processo Penal" },
      { type: "star", title: "Direito do Consumidor" },
    ],
  },
];