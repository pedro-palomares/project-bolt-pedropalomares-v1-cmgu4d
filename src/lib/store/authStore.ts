import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserRole } from '../auth/roles';

interface User {
  email: string;
  name: string;
  picture?: string;
  role: UserRole;
  sub?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  setAuth: (isAuthenticated: boolean, user: User | null, accessToken?: string) => void;
  clearAuth: () => void;
}

const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (isAuthenticated, user, accessToken = null) => 
        set({ isAuthenticated, user, accessToken }),
      clearAuth: () => set(initialState),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);