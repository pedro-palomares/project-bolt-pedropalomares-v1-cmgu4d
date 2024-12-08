import React from 'react';
interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
}
interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    logout: () => Promise<void>;
}
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useAuth: () => AuthContextType;
export {};
