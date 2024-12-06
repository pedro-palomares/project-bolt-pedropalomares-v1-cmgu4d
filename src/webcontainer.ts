import { auth } from '@webcontainer/api';

// Inicializar la autenticación de WebContainer
export const initializeWebContainer = async () => {
  try {
    await auth.init({
      clientId: 'wc_api_pedro_palomares_7cfb2f1d23ed12ff4d363822127209a0', // Reemplaza con tu Client ID
      scope: '', // Configura los permisos necesarios
    });
    console.log('WebContainer API initialized successfully');
  } catch (error) {
    console.error('Error initializing WebContainer API:', error);
  }
};
