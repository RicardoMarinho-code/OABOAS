import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { TopBar } from "~/components/TopBar";
import { bancoDeQuestoes, type Questao } from "~/data/bancoDeQuestoes";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useMemo, useState } from "react";
import { toast } from 'react-hot-toast';

const BlocoPage: NextPage = () => {
  const router = useRouter();
  const { bloco } = router.query;
  const loggedIn = useBoundStore((s) => s.loggedIn);
  const userType = useBoundStore((s) => s.userType);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const [moduleNumberStr, blockNumberStr] =
    (bloco as string)?.split("-") ?? ["0", "0"];

  const moduleNumber = Number(moduleNumberStr);
  const blockNumber = Number(blockNumberStr);

  const handleAnswer = (questao: Questao, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questao.enunciado]: answer
    }));
  };

  const handleCheckAnswer = (questao: Questao) => {
    const userAnswer = selectedAnswers[questao.enunciado];
    if (!userAnswer) {
      toast.error('Selecione uma alternativa antes de verificar');
      return;
    }
    
    if (userAnswer === questao.respostaCorreta) {
      toast.success('Resposta correta! 🎉');
    } else {
      toast.error(`Resposta incorreta. A resposta correta é: ${questao.respostaCorreta}`);
    }
  };

  const todasQuestoesDoBloco: Questao[] = useMemo(
    () => bancoDeQuestoes[moduleNumber]?.[blockNumber] ?? [],
    [moduleNumber, blockNumber]
  );

  const questoesDoBloco = useMemo(() => {
    if (loggedIn && userType === 'comunidade') {
      return todasQuestoesDoBloco.slice(0, 11); // 5 + 6 questões
    }
    return todasQuestoesDoBloco.slice(0, 5); // Apenas 5 para não pagantes ou deslogados
  }, [todasQuestoesDoBloco, loggedIn, userType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <LeftBar selectedTab="Learn" />
      <main className="mx-auto flex max-w-6xl justify-center gap-6 px-4 pt-20 pb-32 sm:px-6 md:ml-24 md:flex-row md:gap-10 md:pt-24 lg:ml-64">
        <div className="flex w-full max-w-3xl flex-col gap-6">
          <header className="rounded-3xl border border-white/60 bg-white/90 p-5 shadow-sm backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-oab-blue">
              Bloco {blockNumber}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Módulo {moduleNumber}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              10 questões inspiradas no exame da OAB para praticar em qualquer lugar.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                className="flex min-h-[110px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white text-center font-bold uppercase text-gray-800 transition hover:bg-gray-50"
                onClick={() =>
                  router.push(`/simulados?pdf=${moduleNumber}-${blockNumber}`)
                }
              >
                Baixar Prova em PDF
              </button>
              <button
                onClick={() =>
                  router.push(`/gabarito/${moduleNumber}/${blockNumber}`)
                }
                className="flex min-h-[110px] flex-col items-center justify-center rounded-2xl border border-blue-400 bg-oab-blue text-center font-bold uppercase text-white transition hover:brightness-110"
              >
                Preencher Gabarito
              </button>
            </div>
          </header>

          <section className="rounded-3xl border border-white/70 bg-white/95 p-5 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Ranking do Bloco
              </h2>
              <span className="text-sm font-semibold text-blue-500">
                Atualizado em tempo real
              </span>
            </div>
            <div className="mt-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
              O ranking para este bloco será exibido aqui. Complete as lições para
              aparecer no topo!
            </div>
          </section>

          <section className="space-y-5 rounded-3xl border border-white/60 bg-white/95 p-5 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Questões
                </p>
                <h2 className="text-xl font-bold text-gray-900">
                  Questões do Bloco
                </h2>
              </div>
              <span className="text-sm text-gray-500">
                {questoesDoBloco.length} itens
              </span>
            </div>

            {questoesDoBloco.length > 0 ? (
              questoesDoBloco.map((questao, index) => (
                <article
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <p className="mb-4 text-base font-semibold leading-relaxed text-gray-800 text-pretty">
                    {index + 1}.{" "}
                    <span className="break-words">{questao.enunciado}</span>
                  </p>
                  <div className="space-y-3 mb-4">
                    {questao.alternativas.map((alt) => (
                      <div
                        key={alt.letra}
                        className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm text-gray-700 transition hover:border-blue-200 cursor-pointer"
                        onClick={() => handleAnswer(questao, alt.letra)}
                      >
                        <span className="font-bold text-oab-blue">
                          {alt.letra})
                        </span>
                        <span className="break-words text-pretty">
                          {alt.texto}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => handleCheckAnswer(questao)}
                      className="px-4 py-2 bg-oab-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Verificar Resposta
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
                Nenhuma questão encontrada para este bloco.
              </p>
            )}
          </section>
        </div>
        <RightBar />
      </main>
      <BottomBar selectedTab="Learn" />
    </div>
  );
};

export default BlocoPage;