import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { authService } from './service';
import { logInfo, logError } from '../utils/logger';
import type { AuthUser, AuthState } from './types';

const AuthContext = createContext<AuthState & {
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  loading: true,
  error: null,
  loginWithEmail: async () => {},
  loginWithGoogle: async () => {},
  register: async () => {},
  logout: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          
          setState({
            user: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              role: userData?.role || 'user'
            },
            loading: false,
            error: null
          });
          
          logInfo('User authenticated', { userId: user.uid });
        } catch (error) {
          logError(error as Error, { context: 'Auth State Change' });
          setState({ user: null, loading: false, error: 'Error loading user data' });
        }
      } else {
        setState({ user: null, loading: false, error: null });
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    ...state,
    loginWithEmail: async (email: string, password: string) => {
      try {
        const user = await authService.loginWithEmail({ email, password });
        setState(prev => ({ ...prev, user, error: null }));
      } catch (error) {
        setState(prev => ({ ...prev, error: 'Invalid credentials' }));
        throw error;
      }
    },
    loginWithGoogle: async () => {
      try {
        const user = await authService.loginWithGoogle();
        setState(prev => ({ ...prev, user, error: null }));
      } catch (error) {
        setState(prev => ({ ...prev, error: 'Error signing in with Google' }));
        throw error;
      }
    },
    register: async (email: string, password: string, name: string) => {
      try {
        const user = await authService.register({ email, password, name });
        setState(prev => ({ ...prev, user, error: null }));
      } catch (error) {
        setState(prev => ({ ...prev, error: 'Error creating account' }));
        throw error;
      }
    },
    logout: async () => {
      try {
        await authService.logout();
        setState({ user: null, loading: false, error: null });
      } catch (error) {
        setState(prev => ({ ...prev, error: 'Error signing out' }));
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};