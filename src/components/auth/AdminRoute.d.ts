import React from 'react';
import type { UserRole } from '../../lib/auth/roles';
interface AdminRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
    requiredPermission?: string;
}
declare const AdminRoute: React.FC<AdminRouteProps>;
export default AdminRoute;
