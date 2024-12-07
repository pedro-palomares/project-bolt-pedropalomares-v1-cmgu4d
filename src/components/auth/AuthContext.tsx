import React, { createContext, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../../services/api';

interface AuthContextType {
  getAccessToken: () => Promise<string | null>;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  loginWithRedirect: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    isLoading,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout
  } = useAuth0();

  useEffect(() => {
    const updateApiToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
          console.error('Error getting access token:', error);
        }
      }
    };

    updateApiToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const getAccessToken = async () => {
    try {
      return isAuthenticated ? await getAccessTokenSilently() : null;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        getAccessToken,
        isLoading,
        isAuthenticated,
        user,
        loginWithRedirect,
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