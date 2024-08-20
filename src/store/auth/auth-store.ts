import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  isAuthenticated: boolean;

  singInClient: () => void;
  signOutClient: () => void;
}

export const useAuthStore = create<State>()(

  // ! THIS IS DANGEROUS DO NOT USE IN PRODUCTION
  // ? you most to check is there session 
  persist(
    (set) => ({
      isAuthenticated: false,

      singInClient: () => set({ isAuthenticated: true }),
      signOutClient: () => set({ isAuthenticated: false }),
    }),
    { name: 'auth-verify' }
  )
);
