import Cookies from 'js-cookie';
import { logInfo, logWarning } from '../utils/logger';

const AUTH_COOKIE_NAME = 'auth_session';
const AUTH_COOKIE_OPTIONS = {
  expires: 7,
  secure: true,
  sameSite: 'lax' as const,
  path: '/'
};

export const setAuthCookie = (token: string) => {
  try {
    Cookies.set(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
    logInfo('Token de autenticación guardado en cookie');
  } catch (error) {
    logWarning('Error al guardar token en cookie', { error });
  }
};

export const getAuthCookie = () => {
  try {
    return Cookies.get(AUTH_COOKIE_NAME);
  } catch (error) {
    logWarning('Error al obtener token de cookie', { error });
    return null;
  }
};

export const removeAuthCookie = () => {
  try {
    Cookies.remove(AUTH_COOKIE_NAME, { path: '/' });
    logInfo('Token de autenticación eliminado de cookie');
  } catch (error) {
    logWarning('Error al eliminar token de cookie', { error });
  }
};

export const isAuthenticated = () => {
  return !!getAuthCookie();
};