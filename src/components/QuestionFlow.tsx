// src/components/QuestionFlow.tsx
import { useState } from 'react';
import { Questao } from '~/data/bancoDeQuestoes';
import { QuestionBlock } from './QuestionBlock';

interface QuestionFlowProps {
  questions: Questao[];
  onComplete?: (results: { correct: number; total: number }) => void;
}

export const QuestionFlow = ({ questions, onComplete }: QuestionFlowProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (isCorrect: boolean) => {
    const newResults = [...results, isCorrect];
    setResults(newResults);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 1500);
    } else {
      setTimeout(() => {
        setShowResults(true);
        onComplete?.({
          correct: newResults.filter(Boolean).length,
          total: newResults.length
        });
      }, 1500);
    }
  };

  if (showResults) {
    const correctCount = results.filter(Boolean).length;
    const percentage = Math.round((correctCount / results.length) * 100);

    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Resultado do Simulado</h2>
        <div className="text-4xl font-bold mb-2">{percentage}%</div>
        <div className="text-gray-600 mb-6">
          {correctCount} de {results.length} questões corretas
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      {currentQuestion ? (
        <>
          <div className="mb-4 text-right text-gray-600">
            Questão {currentQuestionIndex + 1} de {questions.length}
          </div>
          <QuestionBlock 
            question={currentQuestion} 
            onAnswer={handleAnswer} 
          />
        </>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
};