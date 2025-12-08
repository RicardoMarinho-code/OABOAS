export type Module = {
  moduleNumber: number;
  title: string;
  backgroundColor: `bg-${string}`;
  textColor: `text-${string}`;
  borderColor: `border-${string}`;
  questionBlocks: QuestionBlock[];
};

export type QuestionBlock =
  | {
      type: "star" | "dumbbell" | "book" | "trophy" | "fast-forward";
      title: string;
    }
  | { type: "treasure" };

export type QuestionBlockType = QuestionBlock["type"];

export const modules: readonly Module[] = [
  {
    moduleNumber: 1,
    title: "Direito Constitucional",
    backgroundColor: "bg-[#58cc02]",
    textColor: "text-[#58cc02]",
    borderColor: "border-[#46a302]",
    questionBlocks: [
      { type: "star", title: "Questionário 1" },
      { type: "book", title: "Questionário 2" },
      { type: "star", title: "Questionário 3" },
      { type: "treasure" },
      { type: "book", title: "Questionário 1" },
      { type: "trophy", title: "Revisão do Módulo 1" },
    ],
  },
  {
    moduleNumber: 2,
    title: "Direito Penal",
    backgroundColor: "bg-[#ce82ff]",
    textColor: "text-[#ce82ff]",
    borderColor: "border-[#a568cc]",
    questionBlocks: [
      { type: "fast-forward", title: "Avanço Rápido" },
      { type: "dumbbell", title: "Prática personalizada" },
      { type: "book", title: "Questionário 1" },
      { type: "treasure" },
      { type: "star", title: "Questionário 2" },
      { type: "book", title: "Questionário 1" },
      { type: "star", title: "Questionário 2" },
      { type: "book", title: "Questionário 3" },
      { type: "treasure" },
      { type: "dumbbell", title: "Prática personalizada" },
      { type: "trophy", title: "Revisão do Módulo 2" },
    ],
  },
  {
    moduleNumber: 3,
    title: "Ética Profissional",
    backgroundColor: "bg-[#00cd9c]",
    textColor: "text-[#00cd9c]",
    borderColor: "border-[#00a47d]",
    questionBlocks: [
      { type: "fast-forward", title: "Avanço Rápido" },
      { type: "book", title: "Questionário 1" },
      { type: "star", title: "Questionário 2" },
      { type: "treasure" },
      { type: "book", title: "Questionário 1" },
      { type: "star", title: "Questionário 2" },
      { type: "treasure" },
      { type: "dumbbell", title: "Prática personalizada" },
      { type: "book", title: "Questionário 3" },
      { type: "trophy", title: "Revisão do Módulo 3" },
    ],
  },
];

export const units = modules;
