import type { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";

import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { TopBar } from "~/components/TopBar";

type Simulado = {
  id: string;
  titulo: string;
  descricao: string;
  ano: number;
  organizadora: string;
  questoes: number;
  duracao: string;
  linkPdf: string;
};

const simulados: Simulado[] = [
  {
    id: "fase1-2024-1",
    titulo: "1ª Fase - XXIX Exame",
    descricao: "Questões oficiais comentadas + gabarito preliminar.",
    ano: 2024,
    organizadora: "FGV",
    questoes: 80,
    duracao: "5h",
    linkPdf: "/pdfs/simulados/fase1-xxix.pdf",
  },
  {
    id: "fase1-2023-2",
    titulo: "1ª Fase - XXVIII Exame",
    descricao: "Simulado completo com cronograma sugerido.",
    ano: 2023,
    organizadora: "FGV",
    questoes: 80,
    duracao: "5h",
    linkPdf: "/pdfs/simulados/fase1-xxviii.pdf",
  },
  {
    id: "etica-essencial",
    titulo: "Combo Ética Essencial",
    descricao: "Coleção com 40 questões de ética em formato OAB.",
    ano: 2023,
    organizadora: "Banca interna",
    questoes: 40,
    duracao: "2h",
    linkPdf: "/pdfs/simulados/etica-essencial.pdf",
  },
  {
    id: "revisao-relampago",
    titulo: "Revisão Relâmpago",
    descricao: "Simulado temático para treinar véspera de prova.",
    ano: 2022,
    organizadora: "Projeto OABemPauta",
    questoes: 30,
    duracao: "90min",
    linkPdf: "/pdfs/simulados/revisao-relampago.pdf",
  },
];

const Simulados: NextPage = () => {
  const [selectedSimulado, setSelectedSimulado] = useState<Simulado | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [answers, setAnswers] = useState<string[]>(Array(80).fill(''));

  const handleSubmitGabarito = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSimulado) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const hasEmptyAnswers = answers.some(answer => !answer.trim());
      
      if (hasEmptyAnswers) {
        setSubmitStatus({
          type: 'error',
          message: 'Por favor, preencha todas as respostas antes de enviar.'
        });
      } else {
        // In a real app, you would send the answers to your backend here
        console.log('Submitted answers:', { 
          simuladoId: selectedSimulado.id, 
          answers 
        });
        
        setSubmitStatus({
          type: 'success',
          message: 'Gabarito enviado com sucesso! Em breve você receberá seu resultado por e-mail.'
        });
        
        // Reset form after successful submission
        setTimeout(() => {
          setSelectedSimulado(null);
          setAnswers(Array(80).fill(''));
          setSubmitStatus({ type: null, message: '' });
        }, 3000);
      }
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.toUpperCase();
    setAnswers(newAnswers);
  };
  
  const handleOpenGabarito = (simulado: Simulado) => {
    setSelectedSimulado(simulado);
    setSubmitStatus({ type: null, message: '' });
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <LeftBar selectedTab="Simulados" />
      <main className="mx-auto flex max-w-6xl justify-center gap-6 px-4 pt-20 pb-32 sm:px-6 md:ml-24 md:gap-10 md:pt-24 lg:ml-64">
        <div className="flex w-full max-w-3xl flex-col gap-6">
          <header className="rounded-3xl border border-white/60 bg-white/95 p-6 shadow-sm backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-500">
              Treine como no dia da prova
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Simulados OAB
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Escolha um caderno, faça o download do PDF e, ao terminar, envie o
              gabarito pela própria plataforma para acompanhar seu desempenho.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
              <span className="rounded-full border border-gray-200 px-3 py-1">
                Tempo cronometrado
              </span>
              <span className="rounded-full border border-gray-200 px-3 py-1">
                Correção visual
              </span>
              <span className="rounded-full border border-gray-200 px-3 py-1">
                Conteúdo atualizado
              </span>
            </div>
          </header>

          <section className="space-y-4">
            {simulados.map((simulado) => (
              <article
                key={simulado.id}
                className="rounded-3xl border border-white/70 bg-white/95 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                      {simulado.organizadora} • {simulado.ano}
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {simulado.titulo}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {simulado.descricao}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="rounded-2xl border border-gray-200 px-3 py-1 font-semibold text-gray-700">
                      {simulado.questoes} questões
                    </span>
                    <span className="rounded-2xl border border-gray-200 px-3 py-1 font-semibold text-gray-700">
                      {simulado.duracao}
                    </span>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Link
                    href={simulado.linkPdf}
                    className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-3 font-bold uppercase text-gray-800 transition hover:bg-gray-50"
                  >
                    Baixar PDF
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpenGabarito(simulado)}
                    className="flex items-center justify-center rounded-2xl border border-blue-400 bg-oab-blue px-4 py-3 font-bold uppercase text-white transition hover:brightness-110"
                  >
                    Enviar Gabarito
                  </button>
                </div>
              </article>
            ))}
          </section>

          <section className="rounded-3xl border border-dashed border-blue-200 bg-blue-50/60 p-6 text-blue-900">
            <h3 className="text-lg font-bold">Mais simulados em breve</h3>
            <p className="mt-1 text-sm">
              Estamos adicionando novos cadernos temáticos e simulados da 2ª fase
              para você treinar com diferentes áreas do Direito.
            </p>
          </section>
        </div>

        <RightBar />
      </main>
      <BottomBar selectedTab="Simulados" />
      
      {/* Gabarito Modal */}
      {selectedSimulado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Enviar Gabarito - {selectedSimulado.titulo}
              </h2>
              <button
                onClick={() => setSelectedSimulado(null)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {submitStatus.type ? (
              <div className={`p-4 rounded-2xl ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-800' 
                  : 'bg-red-50 text-red-800'
              }`}>
                {submitStatus.message}
              </div>
            ) : (
              <form onSubmit={handleSubmitGabarito}>
                <div className="mb-6">
                  <p className="mb-4 text-gray-600">
                    Preencha as respostas de 1 a {selectedSimulado.questoes} com as letras A, B, C, D ou E.
                    Deixe em branco as questões anuladas.
                  </p>
                  
                  <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                    {Array.from({ length: selectedSimulado.questoes }).map((_, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <label className="mb-1 text-xs text-gray-500">{index + 1}</label>
                        <input
                          type="text"
                          maxLength={1}
                          value={answers[index] || ''}
                          onChange={(e) => {
                            const value = e.target.value.toUpperCase();
                            if (!value || /^[A-E]$/.test(value)) {
                              handleAnswerChange(index, value);
                            }
                          }}
                          className="h-10 w-10 rounded-lg border border-gray-300 text-center font-mono text-sm focus:border-oab-blue focus:ring-2 focus:ring-oab-blue/20"
                          placeholder="_"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedSimulado(null)}
                    className="rounded-2xl border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center rounded-2xl bg-oab-blue px-6 py-2 font-medium text-white hover:brightness-110 disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      'Enviar Gabarito'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulados;