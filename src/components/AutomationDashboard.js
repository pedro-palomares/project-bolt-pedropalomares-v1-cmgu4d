import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Play, AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { automationService } from '../services/automationService';
const AutomationDashboard = () => {
    const [flows, setFlows] = useState({ make: [], n8n: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [executing, setExecuting] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        checkAuthAndLoadFlows();
    }, []);
    const checkAuthAndLoadFlows = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            setIsAuthenticated(true);
            await loadFlows();
        }
        catch (err) {
            console.error('Error checking auth:', err);
            setIsAuthenticated(false);
        }
    };
    const loadFlows = async () => {
        try {
            const data = await automationService.getFlows();
            setFlows(data);
            setError(null);
        }
        catch (err) {
            // Solo mostrar error si estamos autenticados
            if (isAuthenticated) {
                setError('No se pudieron cargar las automatizaciones. Por favor, inténtalo de nuevo más tarde.');
            }
        }
        finally {
            setLoading(false);
        }
    };
    const handleExecuteFlow = async (platform, flowId) => {
        if (!isAuthenticated)
            return;
        setExecuting(flowId);
        try {
            await automationService.executeFlow({ platform, flowId });
            // Mostrar notificación de éxito
        }
        catch (err) {
            setError('Error al ejecutar la automatización');
        }
        finally {
            setExecuting(null);
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" }) }));
    }
    if (!isAuthenticated) {
        return (_jsxs("div", { className: "bg-dark-lighter p-8 rounded-lg border border-gray-800 text-center", children: [_jsx(Lock, { className: "h-12 w-12 text-primary mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: "Acceso Restringido" }), _jsx("p", { className: "text-gray-400", children: "Inicia sesi\u00F3n para acceder al panel de automatizaciones" })] }));
    }
    return (_jsxs("div", { className: "space-y-8", children: [error && (_jsxs("div", { className: "bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg flex items-center", children: [_jsx(AlertCircle, { className: "h-5 w-5 mr-2 flex-shrink-0" }), _jsx("span", { children: error })] })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-xl font-semibold text-white flex items-center", children: ["Make Automations", _jsx("span", { className: "ml-2 px-2 py-1 text-xs bg-primary/20 text-primary rounded-full", children: flows.make.length })] }), _jsx("div", { className: "space-y-4", children: flows.make.length === 0 ? (_jsx("p", { className: "text-gray-400 text-sm", children: "No hay automatizaciones disponibles" })) : (flows.make.map((flow) => (_jsxs("div", { className: "bg-dark-lighter p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-white", children: flow.name }), flow.description && (_jsx("p", { className: "text-sm text-gray-400 mt-1", children: flow.description }))] }), _jsx("button", { onClick: () => handleExecuteFlow('make', flow.id), disabled: executing === flow.id, className: "p-2 rounded-lg bg-dark hover:bg-primary/20 text-primary transition-colors disabled:opacity-50", children: executing === flow.id ? (_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-t-2 border-primary" })) : (_jsx(Play, { className: "h-5 w-5" })) })] }), _jsx("div", { className: "flex items-center mt-2 text-sm", children: _jsxs("span", { className: `flex items-center ${flow.status === 'active' ? 'text-green-500' : 'text-gray-500'}`, children: [flow.status === 'active' ? (_jsx(CheckCircle, { className: "h-4 w-4 mr-1" })) : (_jsx(AlertCircle, { className: "h-4 w-4 mr-1" })), flow.status] }) })] }, flow.id)))) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-xl font-semibold text-white flex items-center", children: ["n8n Workflows", _jsx("span", { className: "ml-2 px-2 py-1 text-xs bg-primary/20 text-primary rounded-full", children: flows.n8n.length })] }), _jsx("div", { className: "space-y-4", children: flows.n8n.length === 0 ? (_jsx("p", { className: "text-gray-400 text-sm", children: "No hay workflows disponibles" })) : (flows.n8n.map((flow) => (_jsxs("div", { className: "bg-dark-lighter p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-white", children: flow.name }), flow.description && (_jsx("p", { className: "text-sm text-gray-400 mt-1", children: flow.description }))] }), _jsx("button", { onClick: () => handleExecuteFlow('n8n', flow.id), disabled: executing === flow.id, className: "p-2 rounded-lg bg-dark hover:bg-primary/20 text-primary transition-colors disabled:opacity-50", children: executing === flow.id ? (_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-t-2 border-primary" })) : (_jsx(Play, { className: "h-5 w-5" })) })] }), _jsx("div", { className: "flex items-center mt-2 text-sm", children: _jsxs("span", { className: `flex items-center ${flow.status === 'active' ? 'text-green-500' : 'text-gray-500'}`, children: [flow.status === 'active' ? (_jsx(CheckCircle, { className: "h-4 w-4 mr-1" })) : (_jsx(AlertCircle, { className: "h-4 w-4 mr-1" })), flow.status] }) })] }, flow.id)))) })] })] })] }));
};
export default AutomationDashboard;
