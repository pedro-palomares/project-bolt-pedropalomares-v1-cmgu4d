import { auth } from '../../src/lib/auth/lucia';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sessionId = req.cookies.auth_session;
  if (!sessionId) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  try {
    await auth.invalidateSession(sessionId);
    res.setHeader('Set-Cookie', [
      'auth_session=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax'
    ]);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Error al cerrar sesión' });
  }
}