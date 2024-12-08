import React from 'react';
interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'register';
}
declare const AuthModal: React.FC<AuthModalProps>;
export default AuthModal;
