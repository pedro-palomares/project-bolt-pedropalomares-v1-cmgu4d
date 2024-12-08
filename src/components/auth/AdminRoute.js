import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth/AuthContext';
import { hasPermission } from '../../lib/auth/roles';
const AdminRoute = ({ children, requiredRole = 'admin', requiredPermission }) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-dark flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" }) }));
    }
    if (!isAuthenticated || !user) {
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    const userRole = user.role;
    if (requiredPermission && !hasPermission(userRole, requiredPermission)) {
        return _jsx(Navigate, { to: "/admin", replace: true });
    }
    if (userRole !== requiredRole && userRole !== 'admin') {
        return _jsx(Navigate, { to: "/admin", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default AdminRoute;
