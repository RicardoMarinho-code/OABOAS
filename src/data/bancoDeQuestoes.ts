export type Questao = {
  enunciado: string;
  alternativas: { letra: "A" | "B" | "C" | "D"; texto: string }[];
  respostaCorreta: "A" | "B" | "C" | "D";
  subject?: string;
  year?: number;
  difficulty?: 'Fácil' | 'Médio' | 'Difícil';
  explanation?: string;
  tags?: string[];
  tipo?: 'basicas' | 'completas' | 'premium';
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
        tipo: "basicas",
        difficulty: "Médio",
        explanation: "O mandado de segurança não cabe quando há recurso administrativo com efeito suspensivo, conforme art. 5º, Lei 12.016/2009."
      },
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
        tipo: "basicas",
        difficulty: "Fácil",
        explanation: "A responsabilidade objetiva por atividade de risco independe de culpa, conforme art. 927, parágrafo único do Código Civil."
      },
      {
        enunciado: "Processo penal: flagrante delito. Assinale a opção correta.",
        alternativas: [
          { letra: "A", texto: "Qualquer pessoa prende e apresenta imediatamente ao juiz." },
          { letra: "B", texto: "Autoridade policial relaxa flagrante ilegal sem MP." },
          { letra: "C", texto: "Flagrante próprio é prisão logo após o crime, em perseguição." },
          { letra: "D", texto: "Audiência de custódia em até 24h da apresentação ao juiz." },
        ],
        respostaCorreta: "D",
        tipo: "premium",
        difficulty: "Médio",
        explanation: "A audiência de custódia deve ser realizada em até 24 horas após a apresentação do preso, conforme CPP art. 289."
      },
      {
        enunciado: "Estatuto da Advocacia: assinale a alternativa permitida ao advogado.",
        alternativas: [
          { letra: "A", texto: "Publicidade com valores promocionais nas redes sociais." },
          { letra: "B", texto: "Sociedade com sócios não inscritos na OAB." },
          { letra: "C", texto: "Captação de clientela por intermediários credenciados." },
          { letra: "D", texto: "Indicar áreas de atuação sem promessa de resultados." },
        ],
        respostaCorreta: "D",
        tipo: "premium",
        difficulty: "Fácil",
        explanation: "O advogado pode indicar suas áreas de atuação, mas não pode prometer resultados, conforme Código de Ética da OAB."
      },
      {
        enunciado: "Sobre o direito de família, assinale a alternativa correta:",
        alternativas: [
          { letra: "A", texto: "A união estável pode ser reconhecida mesmo sem coabitação." },
          { letra: "B", texto: "A guarda compartilhada é obrigatória mesmo quando há desacordo." },
          { letra: "C", texto: "O regime de bens pode ser alterado a qualquer tempo por acordo." },
          { letra: "D", texto: "A adoção internacional é vedada pelo ordenamento brasileiro." },
        ],
        respostaCorreta: "A",
        tipo: "premium",
        difficulty: "Médio",
        explanation: "A união estável prescinde da coabitação quando presentes os demais requisitos, conforme STJ."
      },
      {
        enunciado: "No âmbito do direito tributário, assinale a alternativa correta:",
        alternativas: [
          { letra: "A", texto: "A lei pode estabelecer limitações ao tráfego por tributos interestaduais." },
          { letra: "B", texto: "É vedado à União instituir isenção de tributos da competência dos Municípios." },
          { letra: "C", texto: "A isenção pode ser concedida por convênio entre entes federados." },
          { letra: "D", texto: "A lei pode conceder isenção de tributos estaduais a pessoas físicas." },
        ],
        respostaCorreta: "D",
        tipo: "premium",
        difficulty: "Difícil",
        explanation: "A Constituição permite que a lei conceda isenção de tributos estaduais, observados os princípios constitucionais."
      },
      {
        enunciado: "No âmbito do direito empresarial, assinale a alternativa correta:",
        alternativas: [
          { letra: "A", texto: "A responsabilidade dos sócios é limitada ao valor de suas quotas." },
          { letra: "B", texto: "A administração é exercida apenas pelo administrador nomeado no contrato." },
          { letra: "C", texto: "A cessão de quotas depende de autorização dos demais sócios." },
          { letra: "D", texto: "A dissolução depende de aprovação da maioria absoluta dos sócios." },
        ],
        respostaCorreta: "A",
        tipo: "premium",
        difficulty: "Fácil",
        explanation: "Na sociedade limitada, a responsabilidade dos sócios é limitada ao valor de suas quotas, art. 1.052 do Código Civil."
      },
      {
        enunciado: "Direito Processual Civil: assinale a alternativa correta sobre competência:",
        alternativas: [
          { letra: "A", texto: "A competência da justiça estadual é absoluta nas causas da União." },
          { letra: "B", texto: "A competência estadual é relativa, podendo ser modificada por acordo." },
          { letra: "C", texto: "A competência estadual é absoluta nas causas entre Estado estrangeiro." },
          { letra: "D", texto: "A competência estadual é relativa, podendo ser modificada por lei federal." },
        ],
        respostaCorreta: "C",
        tipo: "premium",
        difficulty: "Difícil",
        explanation: "A competência da justiça estadual é absoluta nas causas entre Estado estrangeiro e município."
      },
      {
        enunciado: "Direito do Trabalho: jornada de trabalho. Assinale a alternativa correta:",
        alternativas: [
          { letra: "A", texto: "A duração normal não excede 8 horas diárias e 44 semanais." },
          { letra: "B", texto: "A duração normal não excede 10 horas diárias e 48 semanais." },
          { letra: "C", texto: "A duração normal não excede 6 horas diárias e 36 semanais." },
          { letra: "D", texto: "A duração normal não excede 9 horas diárias e 45 semanais." },
        ],
        respostaCorreta: "A",
        tipo: 'premium',
        difficulty: "Fácil",
        explanation: "Conforme art. 7º, XIII, da Constituição Federal: 8 horas diárias e 44 semanais."
      },
      {
        enunciado: "Direito Administrativo: atos administrativos. Assinale a alternativa correta:",
        alternativas: [
          { letra: "A", texto: "O ato nulo pode ser convalidado pelo decurso do tempo." },
          { letra: "B", texto: "O ato inexistente pode ser convalidado pela administração." },
          { letra: "C", texto: "O ato nulo de pleno direito não pode ser convalidado." },
          { letra: "D", texto: "O ato anulável pode ser convalidado pelo decurso do prazo." },
        ],
        respostaCorreta: "C",
        tipo: 'premium',
        difficulty: "Difícil",
        explanation: "O ato administrativo nulo de pleno direito não pode ser convalidado, pois é inválido desde sua origem."
      },
      {
        enunciado: "Direito Ambiental: responsabilidade por dano ambiental. Assinale a correta:",
        alternativas: [
          { letra: "A", texto: "A responsabilidade é subjetiva, dependendo de dolo ou culpa." },
          { letra: "B", texto: "A responsabilidade é objetiva, independentemente de culpa." },
          { letra: "C", texto: "A responsabilidade é subjetiva, mas se inverte o ônus da prova." },
          { letra: "D", texto: "A responsabilidade é objetiva, mas pode ser afastada por caso fortuito." },
        ],
        respostaCorreta: "B",
        tipo: 'premium',
        difficulty: "Médio",
        explanation: "A responsabilidade por dano ambiental é objetiva, nos termos do art. 14, §1º, da Lei 6.938/1981."
      },
      {
        enunciado: "Direito Civil: prescrição e decadência. Assinale a alternativa correta:",
        alternativas: [
          { letra: "A", texto: "A prescrição pode ser alegada em qualquer grau de jurisdição." },
          { letra: "B", texto: "O prazo prescricional corre contra os absolutamente incapazes." },
          { letra: "C", texto: "A decadência não se suspende nem se interrompe." },
          { letra: "D", texto: "A prescrição atinge apenas a pretensão, não o direito." },
        ],
        respostaCorreta: "D",
        tipo: 'completas',
        difficulty: "Médio",
        explanation: "A prescrição atinge apenas a pretensão, não o direito material, conforme art. 189 do Código Civil."
      },
      {
        enunciado: "Direito Penal: concurso de crimes. Assinale a alternativa correta:",
        alternativas: [
          { letra: "A", texto: "No concurso material, as penas são somadas." },
          { letra: "B", texto: "No concurso formal, sempre se aplica a soma das penas." },
          { letra: "C", texto: "Na continuidade delitiva, não há aumento de pena." },
          { letra: "D", texto: "No crime continuado, a pena é a do crime mais grave." },
        ],
        respostaCorreta: "A",
        tipo: 'completas',
        difficulty: "Difícil",
        explanation: "No concurso material, as penas de multa são somadas, conforme art. 70 do Código Penal."
      },
      {
        enunciado: "Direito Tributário: lançamento tributário. Assinale a alternativa correta:",
        alternativas: [
          { letra: "A", texto: "O lançamento é ato privativo da autoridade administrativa." },
          { letra: "B", texto: "O lançamento constitui crédito tributário definitivo." },
          { letra: "C", texto: "O lançamento pode ser feito por homologação em todos os casos." },
          { letra: "D", texto: "O lançamento é dispensado nos tributos fixos." },
        ],
        respostaCorreta: "A",
        tipo: 'completas',
        difficulty: "Médio",
        explanation: "O lançamento é ato privativo da autoridade administrativa, conforme art. 142 do CTN."
      },
      {
        enunciado: "Direito Empresarial: recuperação judicial. Assinale a alternativa correta:",
        alternativas: [
          { letra: "A", texto: "A recuperação judicial é cabível para qualquer empresário." },
          { letra: "B", texto: "O devedor permanece na posse de seus bens na recuperação." },
          { letra: "C", texto: "A recuperação extingue todas as dívidas do devedor." },
          { letra: "D", texto: "O prazo máximo da recuperação é de 2 anos." },
        ],
        respostaCorreta: "B",
        tipo: 'completas',
        difficulty: "Fácil",
        explanation: "Na recuperação judicial, o devedor permanece na posse e administração de seus bens."
      },
      {
        enunciado: "Direito do Trabalho: rescisão contratual. Assinale a alternativa correta:",
        alternativas: [
          { letra: "A", texto: "A justa causa dispensa aviso prévio." },
          { letra: "B", texto: "O aviso prévio é sempre de 30 dias." },
          { letra: "C", texto: "A multa rescisória é sempre de 40%." },
          { letra: "D", texto: "O FGTS é sacado integralmente na demissão." },
        ],
        respostaCorreta: "A",
        tipo: 'completas',
        difficulty: "Fácil",
        explanation: "Na demissão por justa causa, não há aviso prévio nem multa rescisória."
      },
      {
        enunciado: "Direito Administrativo: controle da administração. Assinale a alternativa correta:",
        alternativas: [
          { letra: "A", texto: "O controle é exercido apenas pelo Poder Judiciário." },
          { letra: "B", texto: "O controle externo é feito pelo Tribunal de Contas." },
          { letra: "C", texto: "O controle interno é dispensável na administração." },
          { letra: "D", texto: "O controle popular não tem eficácia jurídica." },
        ],
        respostaCorreta: "B",
        tipo: 'completas',
        difficulty: "Médio",
        explanation: "O controle externo da administração é exercido pelo Tribunal de Contas, conforme Constituição."
      }
    ],
  },
};
