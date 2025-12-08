import type { NextPage } from "next";
import Link from "next/link";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { BigCloseSvg, CloseSvg, DoneSvg, LessonFastForwardEndFailSvg, LessonFastForwardEndPassSvg, LessonFastForwardStartSvg, LessonTopBarEmptyHeart, LessonTopBarHeart } from "~/components/Svgs";

interface FeedbackMessage {
  title: string;
  description: string;
  emoji?: string;
}
import { useBoundStore } from "~/hooks/useBoundStore";
import { useRouter } from "next/router";

type OabAnswer = {
  readonly label: "A" | "B" | "C" | "D";
  readonly text: string;
};

type MultipleChoiceProblem = {
  readonly type: "MULTIPLE_CHOICE";
  readonly id: string;
  readonly exam: string;
  readonly year: number;
  readonly examNumber: number;
  readonly subject: string;
  readonly subjectSlug: string;
  readonly question: string;
  readonly answers: readonly OabAnswer[];
  readonly correctAnswer: number;
  readonly explanation: string;
  readonly difficulty: 'Fácil' | 'Médio' | 'Difícil';
  readonly tags: string[];
};

const mockQuestions: MultipleChoiceProblem[] = [
  {
    id: "oab-2023-1",
    type: "MULTIPLE_CHOICE",
    exam: "OAB",
    year: 2023,
    examNumber: 1,
    subject: "Direito Constitucional",
    subjectSlug: "direito-constitucional",
    question: "À luz da Lei 12.016/2009, assinale a alternativa correta sobre a concessão do mandado de segurança individual.",
    answers: [
      {
        label: "A",
        text: "Cabe contra ato de particular no exercício de função delegada, desde que inexistente recurso administrativo.",
      },
      {
        label: "B",
        text: "A tutela cautelar não pode ser requerida em caráter antecedente.",
      },
      {
        label: "C",
        text: "A tutela provisória de urgência tem natureza sempre satisfativa.",
      },
      {
        label: "D",
        text: "A estabilização da tutela só ocorre em decisões de mérito transitadas em julgado.",
      },
    ],
    correctAnswer: 0,
    explanation: "O mandado de segurança é cabível contra ato de autoridade, seja ela pública ou privada no exercício de função delegada, desde que não haja recurso administrativo com efeito suspensivo.",
    difficulty: "Médio",
    tags: ["Direito Constitucional", "Mandado de Segurança"],
  },
  {
    id: "oab-2023-2",
    type: "MULTIPLE_CHOICE",
    exam: "OAB",
    year: 2023,
    examNumber: 1,
    subject: "Direito Civil",
    subjectSlug: "direito-civil",
    question: "No âmbito da responsabilidade civil, segundo o Código Civil, é correto afirmar que:",
    answers: [
      {
        label: "A",
        text: "A culpa exclusiva da vítima não exclui o dever de indenizar, mas apenas o reduz.",
      },
      {
        label: "B",
        text: "A responsabilidade objetiva independe de nexo causal, bastando dano e conduta do agente.",
      },
      {
        label: "C",
        text: "A teoria do risco integral é adotada para a responsabilidade civil do Estado.",
      },
      {
        label: "D",
        text: "O dever de indenizar pode ser afastado por cláusula de não indenizar em contrato de adesão.",
      },
    ],
    correctAnswer: 0,
    explanation: "A culpa exclusiva da vítima é causa excludente da responsabilidade civil, conforme o art. 1.058 do Código Civil.",
    difficulty: "Médio",
    tags: ["Direito Civil", "Responsabilidade Civil"],
  },
  {
    id: "oab-2023-3",
    type: "MULTIPLE_CHOICE",
    exam: "OAB",
    year: 2023,
    examNumber: 1,
    subject: "Direito de Família",
    subjectSlug: "direito-familia",
    question: "Sobre o direito de família, assinale a alternativa correta:",
    answers: [
      {
        label: "A",
        text: "A união estável pode ser reconhecida mesmo sem coabitação, desde que haja intenção de constituir família.",
      },
      {
        label: "B",
        text: "A guarda compartilhada é obrigatória mesmo quando há desacordo entre os pais.",
      },
      {
        label: "C",
        text: "O regime de bens do casamento pode ser alterado a qualquer tempo por acordo entre os cônjuges.",
      },
      {
        label: "D",
        text: "A adoção internacional é vedada pelo ordenamento jurídico brasileiro.",
      },
    ],
    correctAnswer: 0,
    explanation: "A união estável pode ser reconhecida mesmo sem coabitação, desde que presentes os demais requisitos, como intenção de constituir família e durabilidade da relação.",
    difficulty: "Fácil",
    tags: ["Direito de Família", "União Estável"],
  },
  {
    id: "oab-2023-4",
    type: "MULTIPLE_CHOICE",
    exam: "OAB",
    year: 2023,
    examNumber: 1,
    subject: "Direito Penal",
    subjectSlug: "direito-penal",
    question: "No âmbito do direito penal, assinale a alternativa correta sobre o crime de furto qualificado:",
    answers: [
      {
        label: "A",
        text: "A violência moral é causa de aumento de pena no crime de furto.",
      },
      {
        label: "B",
        text: "O emprego de abuso de confiança não qualifica o crime de furto.",
      },
      {
        label: "C",
        text: "A fraude é elemento qualificador do crime de furto.",
      },
      {
        label: "D",
        text: "A subtração de coisa comum não configura crime de furto.",
      },
    ],
    correctAnswer: 2,
    explanation: "A fraude é elemento qualificador do crime de furto, conforme previsto no art. 155, §4º, do Código Penal.",
    difficulty: "Difícil",
    tags: ["Direito Penal", "Crimes contra o Patrimônio"],
  },
  {
    id: "oab-2023-5",
    type: "MULTIPLE_CHOICE",
    exam: "OAB",
    year: 2023,
    examNumber: 1,
    subject: "Direito Tributário",
    subjectSlug: "direito-tributario",
    question: "No âmbito do direito tributário, assinale a alternativa correta:",
    answers: [
      {
        label: "A",
        text: "A lei pode estabelecer limitações ao tráfego de pessoas ou bens por meio de tributos interestaduais.",
      },
      {
        label: "B",
        text: "É vedado à União instituir isenção de tributos da competência dos Municípios.",
      },
      {
        label: "C",
        text: "A isenção pode ser concedida por convênio entre entes federados.",
      },
      {
        label: "D",
        text: "A lei pode conceder isenção de tributos estaduais a pessoas físicas e jurídicas.",
      },
    ],
    correctAnswer: 3,
    explanation: "A Constituição Federal permite que a lei conceda isenção de tributos estaduais a pessoas físicas e jurídicas, desde que observados os princípios constitucionais.",
    difficulty: "Médio",
    tags: ["Direito Tributário", "Isenção Tributária"],
  },
  {
    id: "oab-2023-6",
    type: "MULTIPLE_CHOICE",
    exam: "OAB",
    year: 2023,
    examNumber: 1,
    subject: "Direito Empresarial",
    subjectSlug: "direito-empresarial",
    question: "No âmbito do direito empresarial, assinale a alternativa correta sobre a sociedade limitada:",
    answers: [
      {
        label: "A",
        text: "A responsabilidade dos sócios é limitada ao valor de suas quotas.",
      },
      {
        label: "B",
        text: "A administração da sociedade é exercida apenas pelo administrador nomeado no contrato social.",
      },
      {
        label: "C",
        text: "A cessão de quotas depende de autorização dos demais sócios, ainda que o contrato social seja omisso.",
      },
      {
        label: "D",
        text: "A dissolução da sociedade depende de aprovação da maioria absoluta dos sócios.",
      },
    ],
    correctAnswer: 0,
    explanation: "Na sociedade limitada, a responsabilidade dos sócios é limitada ao valor de suas quotas, conforme previsto no art. 1.052 do Código Civil.",
    difficulty: "Fácil",
    tags: ["Direito Empresarial", "Sociedade Limitada"],
  },
  {
    id: "oab-2023-7",
    type: "MULTIPLE_CHOICE",
    exam: "OAB",
    year: 2023,
    examNumber: 1,
    subject: "Direito Processual Civil",
    subjectSlug: "processo-civil",
    question: "No âmbito do direito processual civil, assinale a alternativa correta sobre a competência da justiça estadual:",
    answers: [
      {
        label: "A",
        text: "A competência da justiça estadual é absoluta nas causas de interesse da União.",
      },
      {
        label: "B",
        text: "A competência da justiça estadual é relativa, podendo ser modificada por acordo das partes.",
      },
      {
        label: "C",
        text: "A competência da justiça estadual é absoluta nas causas entre Estado estrangeiro e município.",
      },
      {
        label: "D",
        text: "A competência da justiça estadual é relativa, podendo ser modificada por lei federal.",
      },
    ],
    correctAnswer: 2,
    explanation: "A competência da justiça estadual é absoluta nas causas entre Estado estrangeiro e município, conforme previsão constitucional.",
    difficulty: "Médio",
    tags: ["Processo Civil", "Competência"],
  },
  {
    id: "oab-2023-8",
    type: "MULTIPLE_CHOICE",
    exam: "OAB",
    year: 2023,
    examNumber: 1,
    subject: "Direito do Trabalho",
    subjectSlug: "direito-trabalho",
    question: "No âmbito do direito do trabalho, assinale a alternativa correta sobre a jornada de trabalho:",
    answers: [
      {
        label: "A",
        text: "A duração normal do trabalho não excederá de 8 horas diárias e 44 horas semanais.",
      },
      {
        label: "B",
        text: "A duração normal do trabalho não excederá de 10 horas diárias e 48 horas semanais.",
      },
      {
        label: "C",
        text: "A duração normal do trabalho não excederá de 6 horas diárias e 36 horas semanais.",
      },
      {
        label: "D",
        text: "A duração normal do trabalho não excederá de 9 horas diárias e 45 horas semanais.",
      },
    ],
    correctAnswer: 0,
    explanation: "Conforme o art. 7º, XIII, da Constituição Federal, a duração normal do trabalho não excederá de 8 horas diárias e 44 horas semanais.",
    difficulty: "Fácil",
    tags: ["Direito do Trabalho", "Jornada de Trabalho"],
  },
  {
    id: "oab-2023-9",
    type: "MULTIPLE_CHOICE",
    exam: "OAB",
    year: 2023,
    examNumber: 1,
    subject: "Direito Administrativo",
    subjectSlug: "direito-administrativo",
    question: "No âmbito do direito administrativo, assinale a alternativa correta sobre os atos administrativos:",
    answers: [
      {
        label: "A",
        text: "O ato administrativo nulo pode ser convalidado pelo decurso do tempo.",
      },
      {
        label: "B",
        text: "O ato administrativo inexistente pode ser convalidado pela administração.",
      },
      {
        label: "C",
        text: "O ato administrativo nulo de pleno direito não pode ser convalidado.",
      },
      {
        label: "D",
        text: "O ato administrativo anulável pode ser convalidado pelo decurso do prazo prescricional.",
      },
    ],
    correctAnswer: 2,
    explanation: "O ato administrativo nulo de pleno direito não pode ser convalidado, pois é considerado inválido desde sua origem.",
    difficulty: "Difícil",
    tags: ["Direito Administrativo", "Atos Administrativos"],
  },
  {
    id: "oab-2023-10",
    type: "MULTIPLE_CHOICE",
    exam: "OAB",
    year: 2023,
    examNumber: 1,
    subject: "Direito Ambiental",
    subjectSlug: "direito-ambiental",
    question: "No âmbito do direito ambiental, assinale a alternativa correta sobre a responsabilidade por dano ambiental:",
    answers: [
      {
        label: "A",
        text: "A responsabilidade por dano ambiental é subjetiva, dependendo de dolo ou culpa do agente.",
      },
      {
        label: "B",
        text: "A responsabilidade por dano ambiental é objetiva, independentemente de culpa.",
      },
      {
        label: "C",
        text: "A responsabilidade por dano ambiental é subjetiva, mas se inverte o ônus da prova.",
      },
      {
        label: "D",
        text: "A responsabilidade por dano ambiental é objetiva, mas pode ser afastada por caso fortuito ou força maior.",
      },
    ],
    correctAnswer: 1,
    explanation: "A responsabilidade por dano ambiental é objetiva, nos termos do art. 14, §1º, da Lei 6.938/1981, independentemente de culpa.",
    difficulty: "Médio",
    tags: ["Direito Ambiental", "Responsabilidade Civil"],
  },
];

const numbersEqual = (a: readonly number[], b: readonly number[]): boolean => {
  return a.length === b.length && a.every((_, i) => a[i] === b[i]);
};

const formatTime = (timeMs: number): string => {
  const seconds = Math.floor(timeMs / 1000) % 60;
  const minutes = Math.floor(timeMs / 1000 / 60) % 60;
  const hours = Math.floor(timeMs / 1000 / 60 / 60);
  if (hours === 0)
    return [minutes, seconds]
      .map((x) => x.toString().padStart(2, "0"))
      .join(":");
  return [hours, minutes, seconds]
    .map((x) => x.toString().padStart(2, "0"))
    .join(":");
};

const Lesson: NextPage = () => {
  const router = useRouter();

  const [lessonProblem, setLessonProblem] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<null | number>(null);
  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);
  const [quitMessageShown, setQuitMessageShown] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const startTime = useRef(Date.now());
  const endTime = useRef(startTime.current + 1000 * 60 * 3 + 1000 * 33);

  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [reviewLessonShown, setReviewLessonShown] = useState(false);

  const problem = mockQuestions[lessonProblem] ?? mockQuestions[0];

  const totalCorrectAnswersNeeded = 2;

  const [isStartingLesson, setIsStartingLesson] = useState(true);
  const hearts =
    "fast-forward" in router.query &&
    !isNaN(Number(router.query["fast-forward"]))
      ? 3 - incorrectAnswerCount
      : null;

if (!problem) {
  return <div>Carregando...</div>;
}

const { correctAnswer } = problem;
  const isAnswerCorrect = Array.isArray(correctAnswer)
    ? numbersEqual(selectedAnswers, correctAnswer)
    : selectedAnswer === correctAnswer;

  const onCheckAnswer = () => {
    setCorrectAnswerShown(true);
    if (isAnswerCorrect) {
      setCorrectAnswerCount((x) => x + 1);
    } else {
      setIncorrectAnswerCount((x) => x + 1);
    }
    setQuestionResults((questionResults) => [
      ...questionResults,
      {
        question: problem.question,
        yourResponse: problem.answers[selectedAnswer ?? 0]?.text ?? "",
        correctResponse:
          problem.type === "MULTIPLE_CHOICE"
            ? problem.answers[problem.correctAnswer]?.text ?? ""
            : "",
      },
    ]);
  };

  const onFinish = () => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setCorrectAnswerShown(false);
    setLessonProblem((x) => (x + 1) % mockQuestions.length);
    endTime.current = Date.now();
  };

  const onSkip = () => {
    setSelectedAnswer(null);
    setCorrectAnswerShown(true);
  };

  const unitNumber = Number(router.query["fast-forward"]);

  if (hearts !== null && hearts < 0 && !correctAnswerShown) {
    return (
      <LessonFastForwardEndFail
        unitNumber={unitNumber}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  if (
    hearts !== null &&
    hearts >= 0 &&
    !correctAnswerShown &&
    correctAnswerCount >= totalCorrectAnswersNeeded
  ) {
    return (
      <LessonFastForwardEndPass
        unitNumber={unitNumber}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  if (hearts !== null && isStartingLesson) {
    return (
      <LessonFastForwardStart
        unitNumber={unitNumber}
        setIsStartingLesson={setIsStartingLesson}
      />
    );
  }

  if (correctAnswerCount >= totalCorrectAnswersNeeded && !correctAnswerShown) {
    return (
      <LessonComplete
        correctAnswerCount={correctAnswerCount}
        incorrectAnswerCount={incorrectAnswerCount}
        startTime={startTime}
        endTime={endTime}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  switch (problem.type) {
    case "MULTIPLE_CHOICE": {
      return (
        <ProblemMultipleChoice
          problem={problem}
          correctAnswerCount={correctAnswerCount}
          totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          quitMessageShown={quitMessageShown}
          correctAnswerShown={correctAnswerShown}
          setQuitMessageShown={setQuitMessageShown}
          isAnswerCorrect={isAnswerCorrect}
          onCheckAnswer={onCheckAnswer}
          onFinish={onFinish}
          onSkip={onSkip}
          hearts={hearts}
        />
      );
    }
  }
};

export default Lesson;

const ProgressBar = ({
  correctAnswerCount,
  totalCorrectAnswersNeeded,
  setQuitMessageShown,
  hearts,
}: {
  correctAnswerCount: number;
  totalCorrectAnswersNeeded: number;
  setQuitMessageShown: (isShown: boolean) => void;
  hearts: null | number;
}) => {
  return (
    <header className="flex items-center gap-4">
      {correctAnswerCount === 0 ? (
        <Link href="/learn" className="text-gray-400">
          <CloseSvg />
          <span className="sr-only">Exit lesson</span>
        </Link>
      ) : (
        <button
          className="text-gray-400"
          onClick={() => setQuitMessageShown(true)}
        >
          <CloseSvg />
          <span className="sr-only">Exit lesson</span>
        </button>
      )}
      <div
        className="h-4 grow rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={correctAnswerCount / totalCorrectAnswersNeeded}
      >
        <div
          className={
            "h-full rounded-full bg-correct transition-all duration-700 " +
            (correctAnswerCount > 0 ? "px-2 pt-1 " : "")
          }
          style={{
            width: `${(correctAnswerCount / totalCorrectAnswersNeeded) * 100}%`,
          }}
        >
          <div className="h-[5px] w-full rounded-full bg-blue-400"></div>
        </div>
      </div>
      {hearts !== null &&
        [1, 2, 3].map((heart) => {
          if (heart <= hearts) {
            return <LessonTopBarHeart key={heart} />;
          }
          return <LessonTopBarEmptyHeart key={heart} />;
        })}
    </header>
  );
};

const QuitMessage = ({
  quitMessageShown,
  setQuitMessageShown,
}: {
  quitMessageShown: boolean;
  setQuitMessageShown: (isShown: boolean) => void;
}) => {
  return (
    <>
      <div
        className={
          quitMessageShown
            ? "fixed bottom-0 left-0 right-0 top-0 z-30 bg-black bg-opacity-60 transition-all duration-300"
            : "pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-30 bg-black bg-opacity-0 transition-all duration-300"
        }
        onClick={() => setQuitMessageShown(false)}
        aria-label="Close quit message"
        role="button"
      ></div>

      <article
        className={
          quitMessageShown
            ? "fixed bottom-0 left-0 right-0 z-40 flex flex-col gap-4 bg-white px-5 py-12 text-center transition-all duration-300 sm:flex-row"
            : "fixed -bottom-96 left-0 right-0 z-40 flex flex-col bg-white px-5 py-12 text-center transition-all duration-300 sm:flex-row"
        }
        aria-hidden={!quitMessageShown}
      >
        <div className="flex grow flex-col gap-4">
          <h2 className="text-lg font-bold sm:text-2xl">
            Are you sure you want to quit?
          </h2>
          <p className="text-gray-500 sm:text-lg">
            All progress for this lesson will be lost.
          </p>
        </div>
        <div className="flex grow flex-col items-center justify-center gap-4 sm:flex-row-reverse">
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-blue-500 bg-blue-400 py-3 font-bold uppercase text-white transition hover:brightness-105 sm:w-48"
            href="/learn"
          >
            Quit
          </Link>
          <button
            className="w-full rounded-2xl py-3 font-bold uppercase text-blue-400 transition hover:brightness-90 sm:w-48 sm:border-2 sm:border-b-4 sm:border-gray-300 sm:text-gray-400 sm:hover:bg-gray-100"
            onClick={() => setQuitMessageShown(false)}
          >
            Stay
          </button>
        </div>
      </article>
    </>
  );
};

// Success messages by difficulty level
const successMessages = {
  'Fácil': [
    {
      title: "Mandou muito bem!",
      description: "Você está dominando os conceitos básicos. Continue assim!",
      emoji: "🎯"
    },
    {
      title: "Acertou em cheio!",
      description: "Sua base está sólida. Vamos para o próximo desafio!",
      emoji: "✨"
    },
    {
      title: "Perfeito!",
      description: "Você está no caminho certo para a aprovação na OAB!",
      emoji: "🏆"
    }
  ],
  'Médio': [
    {
      title: "Excelente raciocínio!",
      description: "Você está desenvolvendo uma ótima interpretação das questões.",
      emoji: "🧠"
    },
    {
      title: "Muito bem!",
      description: "Sua dedicação está fazendo toda a diferença. Continue assim!",
      emoji: "🚀"
    },
    {
      title: "Acertou na mosca!",
      description: "Você está evoluindo a cada questão. Parabéns!",
      emoji: "🎯"
    }
  ],
  'Difícil': [
    {
      title: "Incrível!",
      description: "Você dominou um dos tópicos mais desafiadores. Parabéns!",
      emoji: "🎖️"
    },
    {
      title: "Impressionante!",
      description: "Sua dedicação está te levando longe. Continue assim!",
      emoji: "💎"
    },
    {
      title: "Mestre da lei!",
      description: "Você está pronto para os desafios da OAB. Continue focado!",
      emoji: "⚖️"
    }
  ]
};

// Error messages by difficulty level
const errorMessages = {
  'Fácil': [
    {
      title: "Quase lá!",
      description: "Continue estudando que você chega lá. Você consegue!",
      emoji: "💪"
    },
    {
      title: "Não desanime!",
      description: "Cada erro é uma oportunidade de aprendizado.",
      emoji: "📚"
    },
    {
      title: "Tudo bem errar!",
      description: "O importante é aprender com os erros e seguir em frente.",
      emoji: "🌟"
    }
  ],
  'Médio': [
    {
      title: "Foi por pouco!",
      description: "Analise o erro e continue praticando. Você está no caminho certo!",
      emoji: "🔍"
    },
    {
      title: "Não desista!",
      description: "A persistência é a chave para o sucesso na OAB.",
      emoji: "💡"
    },
    {
      title: "Aprendizado em andamento!",
      description: "Cada questão é uma nova chance de aprender.",
      emoji: "📖"
    }
  ],
  'Difícil': [
    {
      title: "Desafio complexo!",
      description: "Estes são os tópicos que mais caem na OAB. Continue praticando!",
      emoji: "🎯"
    },
    {
      title: "Não desista!",
      description: "Os maiores desafios trazem os maiores aprendizados.",
      emoji: "💪"
    },
    {
      title: "Continue tentando!",
      description: "A prática leva à perfeição. Você está mais perto do que imagina!",
      emoji: "🚀"
    }
  ]
};

// Motivational quotes to show after correct answers
const motivationalQuotes = [
  "A persistência é o caminho do êxito. - Charles Chaplin",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia. - Robert Collier",
  "Acredite em si mesmo e chegará um dia em que os outros não terão outra escolha senão acreditar com você. - Cynthia Kersey",
  "O único lugar onde o sucesso vem antes do trabalho é no dicionário. - Albert Einstein",
  "Tudo o que um sonho precisa para ser realizado é alguém que acredite que ele seja possível. - Walt Disney"
];

const CheckAnswer = ({
  isAnswerSelected,
  isAnswerCorrect,
  correctAnswerShown,
  correctAnswer,
  onCheckAnswer,
  onFinish,
  onSkip,
  explanation = '',
  problem
}: {
  isAnswerSelected: boolean;
  isAnswerCorrect: boolean;
  correctAnswerShown: boolean;
  correctAnswer: string;
  onCheckAnswer: () => void;
  onFinish: () => void;
  onSkip: () => void;
  explanation?: string;
  problem?: MultipleChoiceProblem;
}): JSX.Element => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  const feedbackCopy: FeedbackMessage = useMemo(() => {
    if (!correctAnswerShown) {
      return { title: "", description: "", emoji: "" };
    }
    
    // Determine difficulty for appropriate feedback
    const difficulty: 'Fácil' | 'Médio' | 'Difícil' = problem?.difficulty || 'Médio';
    const pool = isAnswerCorrect 
      ? successMessages[difficulty] 
      : errorMessages[difficulty];
      
    const selectedFeedback = pool[Math.floor(Math.random() * pool.length)];
    
    if (!selectedFeedback) {
      return { title: "", description: "", emoji: "" };
    }
    
    // Add a random motivational quote for correct answers
    if (isAnswerCorrect) {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      return {
        ...selectedFeedback,
        description: `${selectedFeedback.description} ${randomQuote}`
      };
    }
    
    return selectedFeedback;
  }, [correctAnswerShown, isAnswerCorrect, problem?.difficulty]);
  
  // Show confetti for correct answers
  useEffect(() => {
    if (isAnswerCorrect && correctAnswerShown) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAnswerCorrect, correctAnswerShown]);

  // Enhanced feedback classes with better visual feedback
  const feedbackClasses = isAnswerCorrect
    ? "bg-gradient-to-r from-[#4ade80] via-[#22c55e] to-[#0ea5e9] text-white shadow-lg shadow-green-100"
    : "bg-gradient-to-r from-[#f97316] via-[#ef4444] to-[#b91c1c] text-white shadow-lg shadow-red-100";
    
  // Progress indicator based on correct/incorrect
  const progressIndicator = useMemo(() => {
    const totalQuestions = mockQuestions.length;
    const correctAnswers = Math.floor(Math.random() * totalQuestions); // Replace with actual progress
    const progress = (correctAnswers / totalQuestions) * 100;
    
    return (
      <div className="w-full mt-4 bg-white/20 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${isAnswerCorrect ? 'bg-green-300' : 'bg-yellow-300'}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  }, [isAnswerCorrect]);

  return (
    <>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={onSkip}
          >
            Skip
          </button>
          {!isAnswerSelected ? (
            <button
              className="grow rounded-2xl bg-gray-200 p-3 font-bold uppercase text-gray-400 sm:min-w-[150px] sm:max-w-fit sm:grow-0"
              disabled
            >
              Check
            </button>
          ) : (
            <button
              onClick={onCheckAnswer}
              className="grow rounded-2xl border-b-4 border-correct-dark bg-correct p-3 font-bold uppercase text-white sm:min-w-[150px] sm:max-w-fit sm:grow-0"
            >
              Check
            </button>
          )}
        </div>
      </section>

      {correctAnswerShown && (
        <div
          className={[
            "fixed left-0 right-0 transition-all duration-700 ease-out transform",
            correctAnswerShown ? "bottom-0 translate-y-0" : "-bottom-96 translate-y-full",
          ].join(" ")}
        >
        <div className={`flex max-w-5xl flex-col gap-6 px-5 py-6 text-white sm:mx-auto sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10 ${feedbackClasses}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="hidden rounded-3xl bg-white/20 p-4 sm:flex items-center justify-center">
              {isAnswerCorrect ? (
                <div className="relative">
                  <LessonFastForwardEndPassSvg className="h-16 w-16 text-white" />
                  {showConfetti && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-yellow-400 opacity-75"></span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <BigCloseSvg className="h-12 w-12 text-red-400" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-red-400 opacity-20"></span>
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{feedbackCopy.emoji}</span>
                <p className="text-sm uppercase tracking-[0.3em] flex-1">
                  {isAnswerCorrect ? "✅ Acertou!" : "📚 Aprendizado"}
                </p>
              </div>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                {feedbackCopy.title}
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                {feedbackCopy.description}
              </p>
              {isAnswerCorrect && (
                <div className="mt-2 text-xs text-white/80">
                  <p>Continue assim! Você está evoluindo a cada questão.</p>
                </div>
              )}
              {progressIndicator}
              <div className="space-y-2">
                {!isAnswerCorrect && (
                  <p className="text-sm font-semibold">
                    Resposta correta:{" "}
                    <span className="font-normal opacity-95">{correctAnswer}</span>
                  </p>
                )}
                {explanation && (
                  <div className="rounded-lg bg-white/10 p-3 text-sm">
                    <p className="font-semibold">Explicação:</p>
                    <p className="opacity-90">{explanation}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onFinish}
            className="w-full rounded-2xl border border-white bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/20 sm:w-auto"
          >
            Continuar
          </button>
        </div>
      </div>
      )}
    </>
  );
};

const ProblemMultipleChoice = ({
  problem,
  correctAnswerCount,
  totalCorrectAnswersNeeded,
  selectedAnswer,
  setSelectedAnswer,
  quitMessageShown,
  correctAnswerShown,
  setQuitMessageShown,
  isAnswerCorrect,
  onCheckAnswer,
  onFinish,
  onSkip,
  hearts,
}: {
  problem: MultipleChoiceProblem;
  correctAnswerCount: number;
  totalCorrectAnswersNeeded: number;
  selectedAnswer: number | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  correctAnswerShown: boolean;
  quitMessageShown: boolean;
  setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
  isAnswerCorrect: boolean;
  onCheckAnswer: () => void;
  onFinish: () => void;
  onSkip: () => void;
  hearts: number | null;
}) => {
  const { 
    id,
    exam,
    year,
    examNumber,
    subject,
    question, 
    answers, 
    correctAnswer,
    difficulty,
    tags 
  } = problem;

  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center gap-5">
        <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
          <ProgressBar
            correctAnswerCount={correctAnswerCount}
            totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
            setQuitMessageShown={setQuitMessageShown}
            hearts={hearts}
          />
        </div>
        <section className="flex max-w-3xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-8 sm:px-5">
          <div className="w-full space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800">
                {subject}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1">
                {exam} {year} - {examNumber}ª Prova
              </span>
              <span className={`rounded-full px-3 py-1 font-medium ${
                difficulty === 'Fácil' ? 'bg-green-100 text-green-800' :
                difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {difficulty}
              </span>
            </div>
            <h1 className="text-2xl font-bold leading-relaxed text-gray-800 sm:text-2xl">
              {question}
            </h1>
          </div>
          
          <div className="w-full space-y-3" role="radiogroup">
            {answers.map((answer, i) => (
              <button
                type="button"
                key={answer.label}
                className={`flex w-full items-start gap-4 rounded-xl border-2 border-b-4 p-4 text-left transition-all ${
                  i === selectedAnswer
                    ? 'border-blue-300 bg-blue-50 text-blue-900 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-blue-100 hover:bg-blue-50/30'
                }`}
                role="radio"
                aria-checked={i === selectedAnswer}
                onClick={() => setSelectedAnswer(i)}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 text-base font-bold ${
                    i === selectedAnswer
                      ? 'border-transparent bg-blue-500 text-white'
                      : 'border-gray-200 text-gray-600 bg-gray-50'
                  }`}
                >
                  {answer.label}
                </span>
                <span className="text-pretty text-base leading-relaxed text-gray-700">
                  {answer.text}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <CheckAnswer
        correctAnswer={answers[correctAnswer]?.text ?? ""}
        correctAnswerShown={correctAnswerShown}
        isAnswerCorrect={isAnswerCorrect}
        isAnswerSelected={selectedAnswer !== null}
        onCheckAnswer={onCheckAnswer}
        onFinish={onFinish}
        onSkip={onSkip}
        explanation={correctAnswerShown ? problem.explanation : ''}
        problem={problem}
      />

      <QuitMessage
        quitMessageShown={quitMessageShown}
        setQuitMessageShown={setQuitMessageShown}
      />
    </div>
  );
};

const LessonComplete = ({
  correctAnswerCount,
  incorrectAnswerCount,
  startTime,
  endTime,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  startTime: React.MutableRefObject<number>;
  endTime: React.MutableRefObject<number>;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  const router = useRouter();
  const isPractice = "practice" in router.query;

  const increaseXp = useBoundStore((x) => x.increaseXp);
  const addToday = useBoundStore((x) => x.addToday);
  const increaseLingots = useBoundStore((x) => x.increaseLingots);
  const addLessonsCompleted = useBoundStore(
    (x) => x.addLessonsCompleted,
  );
  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center justify-center gap-8 font-bold">
        <h1 className="text-center text-3xl text-oab-blue">
          Lesson Complete!
        </h1>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="min-w-[110px] rounded-xl border-2 border-yellow-400 bg-white">
            <h2 className="py-1 text-center text-white">Total XP</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-yellow-400">
              {correctAnswerCount}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-blue-400 bg-white">
            <h2 className="py-1 text-center text-white">Committed</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-blue-400">
              {formatTime(endTime.current - startTime.current)}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-oab-blue bg-white">
            <h2 className="py-1 text-center text-white">Amazing</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-oab-blue">
              {Math.round(
                (correctAnswerCount /
                  (correctAnswerCount + incorrectAnswerCount)) *
                  100,
              )}
              %
            </div>
          </div>
        </div>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <Link
            className={
              "flex w-full items-center justify-center rounded-2xl border-b-4 border-correct-dark bg-correct p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            }
            href="/learn"
            onClick={() => {
              increaseXp(correctAnswerCount);
              addToday();
              increaseLingots(isPractice ? 0 : 1);
              if (!isPractice) {
                addLessonsCompleted(1);
              }
            }}
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};

type QuestionResult = {
  question: string;
  yourResponse: string;
  correctResponse: string;
};

const ReviewLesson = ({
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  const [selectedQuestionResult, setSelectedQuestionResult] =
    useState<null | QuestionResult>(null);
  return (
    <div
      className={[
        "fixed inset-0 flex items-center justify-center p-5 transition duration-300",
        reviewLessonShown ? "" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 bg-black",
          reviewLessonShown ? "opacity-75" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setReviewLessonShown(false)}
      ></div>
      <div className="relative flex w-full max-w-4xl flex-col gap-5 rounded-2xl border-2 border-gray-200 bg-white p-8">
        <button
          className="absolute -right-5 -top-5 rounded-full border-2 border-gray-200 bg-gray-100 p-1 text-gray-400 hover:brightness-90"
          onClick={() => setReviewLessonShown(false)}
        >
          <BigCloseSvg className="h-8 w-8" />
          <span className="sr-only">Close</span>
        </button>
        <h2 className="text-center text-3xl">Check out your scorecard!</h2>
        <p className="text-center text-xl text-gray-400">
          Click the tiles below to reveal the solutions
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {questionResults.map((questionResult, i) => {
            return (
              <button
                key={i}
                className={[
                  "relative flex flex-col items-stretch gap-3 rounded-xl p-5 text-left",
                  questionResult.yourResponse === questionResult.correctResponse
                    ? "bg-correct-light text-correct-dark"
                    : "bg-incorrect-light text-incorrect-dark",
                ].join(" ")}
                onClick={() =>
                  setSelectedQuestionResult((selectedQuestionResult) =>
                    selectedQuestionResult === questionResult
                      ? null
                      : questionResult,
                  )
                }
              >
                <div className="flex justify-between gap-2">
                  <h3 className="font-bold">{questionResult.question}</h3>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                    {questionResult.yourResponse ===
                    questionResult.correctResponse ? (
                      <DoneSvg className="h-5 w-5" />
                    ) : (
                      <BigCloseSvg className="h-5 w-5" />
                    )}
                  </div>
                </div>
                <div>{questionResult.yourResponse}</div>
                {selectedQuestionResult === questionResult && (
                  <div className="absolute left-1 right-1 top-20 z-10 rounded-2xl border-2 border-gray-200 bg-white p-3 text-sm tracking-tighter">
                    <div
                      className="absolute -top-2 h-3 w-3 rotate-45 border-l-2 border-t-2 border-gray-200 bg-white"
                      style={{ left: "calc(50% - 6px)" }}
                    ></div>
                    <div className="font-bold uppercase text-gray-400">
                      Your response:
                    </div>
                    <div className="mb-3 text-gray-700">
                      {questionResult.yourResponse}
                    </div>
                    <div className="font-bold uppercase text-gray-400">
                      Correct response:
                    </div>
                    <div className="text-gray-700">
                      {questionResult.correctResponse}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const LessonFastForwardStart = ({
  unitNumber,
  setIsStartingLesson,
}: {
  unitNumber: number;
  setIsStartingLesson: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardStartSvg />
        <h1 className="text-lg font-bold">
          Want to jump to Unit {unitNumber}?
        </h1>
        <p className="text-sm text-gray-400">
          {`Pass the test to jump ahead. We won't make it easy for you though.`}
        </p>
      </div>
      <div className="flex flex-col gap-5"></div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between">
          <Link
            href="/learn"
            className="font-bold uppercase text-blue-400 transition hover:brightness-110"
          >
            Maybe later
          </Link>
          <button
            className="w-full rounded-2xl border-b-4 border-blue-500 bg-blue-400 p-3 font-bold uppercase text-white transition hover:brightness-110 sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setIsStartingLesson(false)}
          >
            {`Let's go`}
          </button>
        </div>
      </section>
    </div>
  );
};

const LessonFastForwardEndFail = ({
  unitNumber,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  unitNumber: number;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardEndFailSvg />
        <h1 className="text-2xl font-bold">
          {`You didn't unlock Unit ${unitNumber}`}
        </h1>
        <p className="text-lg text-gray-500">
          {`Don't worry! Practice makes perfect.`}
        </p>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-correct-dark bg-correct p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            href="/learn"
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};

const LessonFastForwardEndPass = ({
  unitNumber,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  unitNumber: number;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  const jumpToUnit = useBoundStore((x) => x.jumpToUnit);
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardEndPassSvg />
        <h1 className="text-2xl font-bold">You unlocked Unit {unitNumber}!</h1>
        <p className="text-lg text-gray-500">
          Way to go! You’re making great strides!
        </p>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-correct-dark bg-correct p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            href="/learn"
            onClick={() => jumpToUnit(unitNumber)}
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};
