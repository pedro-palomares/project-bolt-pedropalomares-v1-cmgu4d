import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { usePageTracking } from '../../lib/analytics/hooks';
import Navbar from '../Navbar';
import Footer from '../Footer';
const Layout = () => {
    usePageTracking();
    return (_jsxs("div", { className: "min-h-screen bg-dark text-white flex flex-col", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-grow", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
};
export default Layout;
