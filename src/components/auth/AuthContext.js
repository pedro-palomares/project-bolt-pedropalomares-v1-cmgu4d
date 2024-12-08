import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../../services/api';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const { isLoading, isAuthenticated, user, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();
    useEffect(() => {
        const updateApiToken = async () => {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently();
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
                catch (error) {
                    console.error('Error getting access token:', error);
                }
            }
        };
        updateApiToken();
    }, [isAuthenticated, getAccessTokenSilently]);
    const getAccessToken = async () => {
        try {
            return isAuthenticated ? await getAccessTokenSilently() : null;
        }
        catch (error) {
            console.error('Error getting access token:', error);
            return null;
        }
    };
    return (_jsx(AuthContext.Provider, { value: {
            getAccessToken,
            isLoading,
            isAuthenticated,
            user,
            loginWithRedirect,
            logout
        }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
