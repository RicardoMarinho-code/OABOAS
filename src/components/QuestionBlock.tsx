// src/components/QuestionBlock.tsx
import { useState } from 'react';
import { Questao } from '~/data/bancoDeQuestoes';

interface QuestionBlockProps {
  question: Questao;
  onAnswer: (isCorrect: boolean) => void;
  showFeedback?: boolean;
}

export const QuestionBlock = ({ 
  question, 
  onAnswer,
  showFeedback: externalShowFeedback = false
}: QuestionBlockProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [confirmedAnswer, setConfirmedAnswer] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(false);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer) return;
    
    setConfirmedAnswer(selectedAnswer);
    const isCorrect = selectedAnswer === question.respostaCorreta;
    onAnswer(isCorrect);
    setShowFeedback(true);
  };

  const getOptionLetter = (index: number): string => {
    return String.fromCharCode(97 + index); // 97 = 'a' em ASCII
  };

  const options = question.alternativas.map((alternativa, index) => ({
    key: alternativa.letra,
    letter: alternativa.letra,
    text: alternativa.texto
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4">
        {question.subject && question.year && question.difficulty && (
          <span className="text-sm text-gray-500">
            {question.subject} • {question.year} • {question.difficulty}
          </span>
        )}
        <h3 className="text-xl font-semibold mt-1">{question.enunciado}</h3>
      </div>
      
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => handleAnswer(option.key)}
            disabled={showFeedback || externalShowFeedback}
            className={`
              w-full text-left p-4 rounded-lg border-2 transition-colors
              ${selectedAnswer === option.key && !showFeedback
                ? 'border-blue-500 bg-blue-50'
                : (showFeedback || externalShowFeedback) && option.key === question.respostaCorreta 
                ? 'border-green-500 bg-green-50' 
                : (showFeedback || externalShowFeedback) && option.key === confirmedAnswer
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-blue-500'
              }
              ${(showFeedback || externalShowFeedback) && 'cursor-default'}
            `}
          >
            <span className="font-medium">
              {option.letter.toUpperCase()}) 
            </span> {option.text}
          </button>
        ))}
      </div>

      {selectedAnswer && !showFeedback && (
        <div className="mt-4 flex justify-end">
          <button 
            onClick={handleConfirmAnswer}
            className="px-6 py-2 bg-oab-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Confirmar Resposta
          </button>
        </div>
      )}

      {(showFeedback || externalShowFeedback) && (
        <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="font-medium text-blue-800">
            {confirmedAnswer === question.respostaCorreta 
              ? ' Resposta Correta!' 
              : ' Resposta Incorreta'}
          </p>
          <p className="mt-2 text-gray-700">
            {question.explanation && (
              <>
                <strong>Explicação:</strong> {question.explanation}
              </>
            )}
          </p>
          {question.tags && question.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {confirmedAnswer && (
            <div className={`mt-4 p-4 rounded-lg ${
              confirmedAnswer === question.respostaCorreta
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`font-medium ${
                confirmedAnswer === question.respostaCorreta
                  ? 'text-green-800'
                  : 'text-red-800'
              }`}>
                {confirmedAnswer === question.respostaCorreta
                  ? 'Resposta correta!'
                  : 'Resposta incorreta'}
              </p>
              {confirmedAnswer !== question.respostaCorreta && (
                <p className="text-gray-700 mt-2">
                  Resposta correta: {question.respostaCorreta}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};