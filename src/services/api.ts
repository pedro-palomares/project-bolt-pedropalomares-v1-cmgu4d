import axios from 'axios';
import { getAuthCookie } from '../lib/auth/session';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir el token de autenticación
api.interceptors.request.use((config) => {
  const token = getAuthCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirigir al login si el token ha expirado
      window.location.href = `/login?returnTo=${encodeURIComponent(window.location.pathname)}`;
    }
    return Promise.reject(error);
  }
);

export default api;