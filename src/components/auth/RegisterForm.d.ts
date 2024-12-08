import React from 'react';
import { type RegisterForm } from '../../lib/auth/validation';
interface RegisterFormProps {
    onSuccess?: () => void;
}
declare const RegisterForm: React.FC<RegisterFormProps>;
export default RegisterForm;
