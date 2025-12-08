export type Questao = {
  enunciado: string;
  alternativas: { letra: "A" | "B" | "C" | "D"; texto: string }[];
  respostaCorreta: "A" | "B" | "C" | "D";
  subject?: string;
  year?: number;
  difficulty?: 'Fácil' | 'Médio' | 'Difícil';
  explanation?: string;
  tags?: string[];
};

// Estrutura: bancoDeQuestoes[modulo][bloco] => Questao[]
export const bancoDeQuestoes: Record<number, Record<number, Questao[]>> = {
  1: {
    0: [
      {
        enunciado:
          "À luz da Lei 12.016/2009, assinale a alternativa correta sobre a concessão do mandado de segurança.",
        alternativas: [
          { letra: "A", texto: "Cabe contra ato de particular no exercício de função delegada." },
          { letra: "B", texto: "Não se admite pedido liminar contra autoridade federal." },
          { letra: "C", texto: "Exige prova pré-constituída dos fatos." },
          { letra: "D", texto: "Não cabe quando há recurso administrativo com efeito suspensivo." },
        ],
        respostaCorreta: "D",
      },
    ],
    1: [
      {
        enunciado:
          "No âmbito da responsabilidade civil, segundo o Código Civil, é correto afirmar que:",
        alternativas: [
          { letra: "A", texto: "Culpa exclusiva da vítima não exclui o dever de indenizar." },
          { letra: "B", texto: "Responsabilidade objetiva independe de nexo causal." },
          { letra: "C", texto: "Atividade de risco gera responsabilidade objetiva." },
          { letra: "D", texto: "Cláusula de não indenizar é sempre válida." },
        ],
        respostaCorreta: "C",
      },
    ],
  },
  2: {
    0: [
      {
        enunciado: "Processo penal: flagrante delito. Assinale a opção correta.",
        alternativas: [
          { letra: "A", texto: "Qualquer pessoa prende e apresenta imediatamente ao juiz." },
          { letra: "B", texto: "Autoridade policial relaxa flagrante ilegal sem MP." },
          { letra: "C", texto: "Flagrante próprio é prisão logo após o crime, em perseguição." },
          { letra: "D", texto: "Audiência de custódia em até 24h da apresentação ao juiz." },
        ],
        respostaCorreta: "D",
      },
    ],
  },
  3: {
    0: [
      {
        enunciado:
          "Estatuto da Advocacia: assinale a alternativa permitida ao advogado.",
        alternativas: [
          { letra: "A", texto: "Publicidade com valores promocionais nas redes sociais." },
          { letra: "B", texto: "Sociedade com sócios não inscritos na OAB." },
          { letra: "C", texto: "Captação de clientela por intermediários credenciados." },
          { letra: "D", texto: "Indicar áreas de atuação sem promessa de resultados." },
        ],
        respostaCorreta: "D",
      },
    ],
  },
};
