import React from 'react';
import { type LoginForm } from '../../lib/auth/validation';
interface LoginFormProps {
    onSuccess?: () => void;
}
declare const LoginForm: React.FC<LoginFormProps>;
export default LoginForm;
