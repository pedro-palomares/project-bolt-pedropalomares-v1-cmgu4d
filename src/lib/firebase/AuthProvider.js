import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { logInfo, logError } from '../utils/logger';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                });
                logInfo('User authenticated', { userId: user.uid });
            }
            else {
                setUser(null);
            }
            setLoading(false);
        }, (error) => {
            logError(error, { context: 'Auth State Change' });
            setError(error.message);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);
    const logout = async () => {
        try {
            await signOut(auth);
            logInfo('User logged out');
        }
        catch (error) {
            logError(error, { context: 'Logout' });
            throw error;
        }
    };
    return (_jsx(AuthContext.Provider, { value: { user, loading, error, logout }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
