import { createContext } from 'react';
import type { AuthState } from './types';

export const initialAuthState: AuthState = {
  user: null,
  loading: true,
  error: null
};

export const AuthContext = createContext<AuthState>(initialAuthState);