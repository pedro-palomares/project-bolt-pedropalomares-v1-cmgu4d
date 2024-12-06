import React, { createContext, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { setAuthCookie, removeAuthCookie } from './session';
import { logInfo, logError } from '../utils/logger';
import { syncService } from './services/syncService';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout: auth0Logout, getAccessTokenSilently } = useAuth0();
  const { setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          await syncService.syncUser(user);
          
          setAuth(true, user, token);
          setAuthCookie(token);
          
          logInfo('Usuario autenticado correctamente', { userId: user.sub });
        } catch (error) {
          logError(error as Error, { context: 'Auth Initialization' });
          clearAuth();
          removeAuthCookie();
        }
      }
    };

    initializeAuth();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const login = async () => {
    try {
      await loginWithRedirect({
        appState: { returnTo: window.location.pathname }
      });
    } catch (error) {
      logError(error as Error, { context: 'Login' });
    }
  };

  const logout = () => {
    clearAuth();
    removeAuthCookie();
    auth0Logout({ 
      logoutParams: {
        returnTo: window.location.origin
      }
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout
      }}
    >
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