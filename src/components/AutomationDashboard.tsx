import React, { useState, useEffect } from 'react';
import { Play, AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { automationService, Flow } from '../services/automationService';

const AutomationDashboard = () => {
  const [flows, setFlows] = useState<{ make: Flow[], n8n: Flow[] }>({ make: [], n8n: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [executing, setExecuting] = useState<string | null>(null);
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
    } catch (err) {
      console.error('Error checking auth:', err);
      setIsAuthenticated(false);
    }
  };

  const loadFlows = async () => {
    try {
      const data = await automationService.getFlows();
      setFlows(data);
      setError(null);
    } catch (err) {
      // Solo mostrar error si estamos autenticados
      if (isAuthenticated) {
        setError('No se pudieron cargar las automatizaciones. Por favor, inténtalo de nuevo más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteFlow = async (platform: string, flowId: string) => {
    if (!isAuthenticated) return;
    
    setExecuting(flowId);
    try {
      await automationService.executeFlow({ platform, flowId });
      // Mostrar notificación de éxito
    } catch (err) {
      setError('Error al ejecutar la automatización');
    } finally {
      setExecuting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-dark-lighter p-8 rounded-lg border border-gray-800 text-center">
        <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Acceso Restringido</h3>
        <p className="text-gray-400">
          Inicia sesión para acceder al panel de automatizaciones
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Make Flows */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            Make Automations
            <span className="ml-2 px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
              {flows.make.length}
            </span>
          </h3>
          <div className="space-y-4">
            {flows.make.length === 0 ? (
              <p className="text-gray-400 text-sm">No hay automatizaciones disponibles</p>
            ) : (
              flows.make.map((flow) => (
                <div
                  key={flow.id}
                  className="bg-dark-lighter p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{flow.name}</h4>
                      {flow.description && (
                        <p className="text-sm text-gray-400 mt-1">{flow.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleExecuteFlow('make', flow.id)}
                      disabled={executing === flow.id}
                      className="p-2 rounded-lg bg-dark hover:bg-primary/20 text-primary transition-colors disabled:opacity-50"
                    >
                      {executing === flow.id ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-primary"></div>
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <span className={`flex items-center ${
                      flow.status === 'active' ? 'text-green-500' : 'text-gray-500'
                    }`}>
                      {flow.status === 'active' ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <AlertCircle className="h-4 w-4 mr-1" />
                      )}
                      {flow.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* n8n Flows */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            n8n Workflows
            <span className="ml-2 px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
              {flows.n8n.length}
            </span>
          </h3>
          <div className="space-y-4">
            {flows.n8n.length === 0 ? (
              <p className="text-gray-400 text-sm">No hay workflows disponibles</p>
            ) : (
              flows.n8n.map((flow) => (
                <div
                  key={flow.id}
                  className="bg-dark-lighter p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{flow.name}</h4>
                      {flow.description && (
                        <p className="text-sm text-gray-400 mt-1">{flow.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleExecuteFlow('n8n', flow.id)}
                      disabled={executing === flow.id}
                      className="p-2 rounded-lg bg-dark hover:bg-primary/20 text-primary transition-colors disabled:opacity-50"
                    >
                      {executing === flow.id ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-primary"></div>
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <span className={`flex items-center ${
                      flow.status === 'active' ? 'text-green-500' : 'text-gray-500'
                    }`}>
                      {flow.status === 'active' ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <AlertCircle className="h-4 w-4 mr-1" />
                      )}
                      {flow.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationDashboard;