import { UserType } from '~/hooks/useBoundStore';

export interface QuestionFlowConfig {
  modulos: number;
  blocosPorModulo: number;
  questoesPorBloco: number;
  tipoQuestoes: 'basicas' | 'completas' | 'premium';
}

export const questionFlowConfigs: Record<UserType, QuestionFlowConfig> = {
  // Configuração para Comunidade (11 questões)
  comunidade: {
    modulos: 1,
    blocosPorModulo: 1,
    questoesPorBloco: 11,
    tipoQuestoes: 'premium'
  },
  // Configuração para Grupo de Estudos (6 questões)
  'grupo-de-estudos': {
    modulos: 1,
    blocosPorModulo: 1,
    questoesPorBloco: 6,
    tipoQuestoes: 'completas'
  }
};

export const getQuestionFlowConfig = (userType: UserType | null, loggedIn: boolean): QuestionFlowConfig => {
  if (!loggedIn || !userType) {
    // Se não estiver logado, usar configuração do Grupo de Estudos como padrão
    return questionFlowConfigs['grupo-de-estudos'];
  }
  return questionFlowConfigs[userType];
};
