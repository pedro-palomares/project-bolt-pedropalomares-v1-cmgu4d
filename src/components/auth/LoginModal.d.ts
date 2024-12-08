import React from 'react';
interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}
declare const LoginModal: React.FC<LoginModalProps>;
export default LoginModal;
