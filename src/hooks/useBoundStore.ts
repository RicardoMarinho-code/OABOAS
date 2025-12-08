import { create } from 'zustand';
import dayjs from 'dayjs';

export type UserType = 'comunidade' | 'grupo-de-estudos';

export type BoundStateCreator<T> = (
  set: (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean | undefined
  ) => void,
  get: () => T,
  api?: any
) => T;

interface UserState {
  loggedIn: boolean;
  userType: UserType | null;
  name: string;
  username: string;
  streak: number;
  lingots: number;
  lessonsCompleted: number;
  goalXp: number;
  joinedAt: dayjs.Dayjs;
  addLessonsCompleted: (count: number) => void;
  xpToday: () => number;
  xpThisWeek: () => number;
  lastActivity: dayjs.Dayjs | null;
  isActiveDay: (date: dayjs.Dayjs) => boolean;
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  logIn: (email: string, password: string) => boolean;
  logOut: () => void;
  xp: number;
  increaseXp: (amount: number) => void;
  addToday: () => void;
  increaseLingots: (amount: number) => void;
  jumpToUnit: (unitNumber: number) => void;
  setLanguage: (language: string) => void;
  language: string;
  xpByDate: Record<string, number>;
  setGoalXp: (goalXp: number) => void;
  soundEffects: boolean;
  setSoundEffects: (enabled: boolean) => void;
  speakingExercises: boolean;
  setSpeakingExercises: (enabled: boolean) => void;
  listeningExercises: boolean;
  setListeningExercises: (enabled: boolean) => void;
}

export const useBoundStore = create<UserState>((set, get) => ({
  loggedIn: false,
  userType: null,
  name: "Usuário",
  username: "usuario",
  streak: 0,
  lingots: 0,
  lessonsCompleted: 0,
  goalXp: 11,
  joinedAt: dayjs(),
  lastActivity: null,
  xp: 0,
  language: "pt-BR",
  xpByDate: {},
  soundEffects: true,
  speakingExercises: true,
  listeningExercises: true,
  addLessonsCompleted: (count) =>
    set({ lessonsCompleted: get().lessonsCompleted + count }),
  // Funções mockadas para evitar erros
  xpToday: () => 0,
  xpThisWeek: () => 0,
  isActiveDay: () => false,
  setName: (name) => set({ name }),
  setUsername: (username) => set({ username }),
  // Novas funções
  increaseXp: (amount) => set((state) => ({ xp: state.xp + amount })),
  addToday: () => set({ lastActivity: dayjs() }),
  increaseLingots: (amount) => set((state) => ({ lingots: state.lingots + amount })),
  jumpToUnit: (unitNumber) => {
    console.log(`Pulando para a unidade ${unitNumber}`);
    // Implementação futura para navegação
  },
  setLanguage: (language) => set({ language }),
  setGoalXp: (goalXp) => set({ goalXp }),
  setSoundEffects: (enabled) => set({ soundEffects: enabled }),
  setSpeakingExercises: (enabled) => set({ speakingExercises: enabled }),
  setListeningExercises: (enabled) => set({ listeningExercises: enabled }),
  logIn: (email, password) => {
    if (password !== 'senha123') {
      return false;
    }

    if (email === 'comunidade@duoab.com') {
      set({ loggedIn: true, userType: 'comunidade' });
      return true;
    } else if (email === 'gpestudos@duoab.com') {
      set({ loggedIn: true, userType: 'grupo-de-estudos' });
      return true;
    }
    return false;
  },
  logOut: () => set({ 
    loggedIn: false, 
    userType: null, 
    lessonsCompleted: 0,
    streak: 0,
    lingots: 0,
    name: "Usuário",
    username: "usuario",
  }),
}));