// src/types/question.ts
export interface Question {
  id: string;
  exam: 'OAB';
  year: number;
  examNumber: number;
  subject: string;
  subjectSlug: string;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
    e?: string; // Opcional para questões que podem ter 5 alternativas
  };
  correctAnswer: 'a' | 'b' | 'c' | 'd' | 'e';
  explanation: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
}

export const mockQuestions: Question[] = [
  {
    id: 'oab-2023-1',
    exam: 'OAB',
    year: 2023,
    examNumber: 1,
    subject: 'Direito Constitucional',
    subjectSlug: 'direito-constitucional',
    question: 'De acordo com a Constituição Federal de 1988, é competência privativa da União legislar sobre:',
    options: {
      a: 'Direito tributário, financeiro, penitenciário, econômico e urbanístico.',
      b: 'Direito civil, comercial, penal, processual, eleitoral, agrário, marítimo, aeronáutico, espacial e do trabalho.',
      c: 'Direito tributário, financeiro, penitenciário, eleitoral, agrário, marítimo, aeronáutico, espacial e do trabalho.',
      d: 'Direito civil, comercial, penal, processual, eleitoral, agrário, marítimo, aeronáutico, espacial, do trabalho e tributário.'
    },
    correctAnswer: 'b',
    explanation: 'Conforme o art. 22, I, da CF/88, compete privativamente à União legislar sobre direito civil, comercial, penal, processual, eleitoral, agrário, marítimo, aeronáutico, espacial e do trabalho.',
    difficulty: 'Médio',
    tags: ['Direito Constitucional', 'Competência Legislativa', 'União'],
    author: 'Sistema OAB',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z'
  },
  {
    id: 'oab-2023-2',
    exam: 'OAB',
    year: 2023,
    examNumber: 1,
    subject: 'Direito Administrativo',
    subjectSlug: 'direito-administrativo',
    question: 'Sobre os princípios da Administração Pública, assinale a alternativa correta:',
    options: {
      a: 'A moralidade administrativa está expressamente prevista no artigo 37 da Constituição Federal.',
      b: 'O princípio da eficiência foi inserido no texto constitucional pela Emenda Constitucional nº 19/1998.', 
      c: 'O princípio da publicidade não admite exceções, devendo todos os atos administrativos serem publicados.',
      d: 'A legalidade administrativa permite que a Administração Pública faça tudo o que a lei não proíbe.'
    },
    correctAnswer: 'b',
    explanation: 'O princípio da eficiência foi inserido no caput do art. 37 da CF/88 pela EC 19/1998, representando um avanço na busca por uma administração mais ágil e com melhores resultados.',
    difficulty: 'Fácil',
    tags: ['Direito Administrativo', 'Princípios'],
    author: 'Sistema OAB',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z'
  },
  {
    id: 'oab-2023-3',
    exam: 'OAB',
    year: 2023,
    examNumber: 1,
    subject: 'Direito do Trabalho',
    subjectSlug: 'direito-trabalho',
    question: 'Sobre o contrato de trabalho intermitente, é correto afirmar que:',
    options: {
      a: 'O empregado tem direito ao pagamento de férias proporcionais, mesmo sem ter trabalhado o período aquisitivo completo.',
      b: 'O intervalo intrajornada de 15 minutos para jornadas superiores a 4 horas é obrigatório e remunerado.',
      c: 'O aviso prévio, quando devido, será concedido com antecedência mínima de 30 dias, reduzido em 3 dias por ano de serviço prestado.',
      d: 'O empregador pode contratar o empregado por até 3 anos, prorrogável por igual período.'
    },
    correctAnswer: 'b',
    explanation: 'Conforme o art. 452-A, §2º, da CLT, o intervalo para repouso ou alimentação, nos termos do art. 71 da CLT, será de, no mínimo, 30 minutos e, nos casos em que o período de tempo ininterrupto de trabalho for superior a 4 horas, será de 15 minutos para jornadas de até 6 horas, e de 1 a 2 horas para jornadas superiores a 6 horas, nos termos do regulamento, sendo o intervalo intrajornada obrigatório e remunerado.',
    difficulty: 'Difícil',
    tags: ['Direito do Trabalho', 'Contrato de Trabalho', 'Trabalho Intermitente'],
    author: 'Sistema OAB',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z'
  },
  {
    id: 'oab-2023-4',
    exam: 'OAB',
    year: 2023,
    examNumber: 1,
    subject: 'Direito Civil',
    subjectSlug: 'direito-civil',
    question: 'Sobre a capacidade civil, assinale a alternativa correta:',
    options: {
      a: 'O menor de 16 anos é absolutamente incapaz para os atos da vida civil.',
      b: 'O maior de 16 e menor de 18 anos é relativamente incapaz para certos atos da vida civil.',
      c: 'A incapacidade do pródigo é absoluta, devendo ser representado em todos os atos da vida civil.',
      d: 'O menor de 18 anos é plenamente capaz para os atos da vida civil, desde que autorizado por seus pais ou responsáveis.'
    },
    correctAnswer: 'b',
    explanation: 'Conforme o art. 4º, I, do Código Civil, são relativamente incapazes os maiores de 16 e menores de 18 anos, que devem ser assistidos por seus representantes legais para a prática de certos atos da vida civil.',
    difficulty: 'Médio',
    tags: ['Direito Civil', 'Capacidade Civil', 'Incapacidade'],
    author: 'Sistema OAB',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z'
  },
  {
    id: 'oab-2023-5',
    exam: 'OAB',
    year: 2023,
    examNumber: 1,
    subject: 'Direito Processual Civil',
    subjectSlug: 'processo-civil',
    question: 'Sobre os recursos no processo civil, é correto afirmar:',
    options: {
      a: 'O agravo de instrumento é cabível contra decisão interlocutória que causar à parte lesão grave e de difícil reparação.',
      b: 'O recurso de apelação tem efeito meramente devolutivo, não podendo o tribunal reformar a decisão recorrida para beneficiar o recorrente.',
      c: 'O recurso especial é cabível quando a decisão recorrida contrariar súmula do Supremo Tribunal Federal.',
      d: 'O recurso extraordinário é cabível quando a decisão recorrida julgar válido ato de governo contestado em face de lei federal.'
    },
    correctAnswer: 'a',
    explanation: 'Conforme o art. 1.015 do CPC, o agravo de instrumento é cabível contra decisão interlocutória que causar à parte lesão grave e de difícil reparação, devendo ser interposto no prazo de 10 (dez) dias, contado da ciência da decisão.',
    difficulty: 'Difícil',
    tags: ['Processo Civil', 'Recursos', 'Agravo de Instrumento'],
    author: 'Sistema OAB',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z'
  }
];

// Função para buscar questões por matéria
export const getQuestionsBySubject = (subjectSlug: string): Question[] => {
  return mockQuestions.filter(question => question.subjectSlug === subjectSlug);
};

// Função para buscar questões por dificuldade
export const getQuestionsByDifficulty = (difficulty: 'Fácil' | 'Médio' | 'Difícil'): Question[] => {
  return mockQuestions.filter(question => question.difficulty === difficulty);
};

// Função para buscar questão por ID
export const getQuestionById = (id: string): Question | undefined => {
  return mockQuestions.find(question => question.id === id);
};
