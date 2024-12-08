import React from 'react';
interface AuthContextType {
    getAccessToken: () => Promise<string | null>;
    isLoading: boolean;
    isAuthenticated: boolean;
    user: any;
    loginWithRedirect: () => Promise<void>;
    logout: () => void;
}
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useAuth: () => AuthContextType;
export {};
