import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import BlogAdmin from './pages/admin/blog';
import Profile from './components/Profile';
const App = () => {
    return (_jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/blog", element: _jsx(Blog, {}) }), _jsx(Route, { path: "/blog/:slug", element: _jsx(BlogPost, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) })] }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { requiredRole: "admin", children: _jsx(AdminLayout, { children: _jsx(AdminDashboard, {}) }) }) }), _jsx(Route, { path: "/admin/blog", element: _jsx(ProtectedRoute, { requiredRole: "admin", children: _jsx(AdminLayout, { children: _jsx(BlogAdmin, {}) }) }) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Profile, {}) }) })] }));
};
export default App;
