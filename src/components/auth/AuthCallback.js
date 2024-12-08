import { jsx as _jsx } from "react/jsx-runtime";
import { useRedirectAfterAuth } from '../../lib/auth/hooks/useRedirectAfterAuth';
const AuthCallback = () => {
    const { isLoading } = useRedirectAfterAuth();
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-dark flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" }) }));
    }
    return null;
};
export default AuthCallback;
