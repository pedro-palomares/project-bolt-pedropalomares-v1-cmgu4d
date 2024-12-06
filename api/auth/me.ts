import { auth } from '../../src/lib/auth/lucia';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sessionId = req.cookies.auth_session;
  if (!sessionId) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  try {
    const { user } = await auth.validateSession(sessionId);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ error: 'Sesión inválida' });
  }
}