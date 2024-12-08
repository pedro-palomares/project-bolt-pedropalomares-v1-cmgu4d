import React from 'react';
interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string;
}
declare const ProtectedRoute: React.FC<ProtectedRouteProps>;
export default ProtectedRoute;
