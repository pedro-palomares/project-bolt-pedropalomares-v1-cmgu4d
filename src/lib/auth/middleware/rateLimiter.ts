import { rateLimit } from 'express-rate-limit';
import { logWarning } from '../../utils/logger';

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: 'Demasiados intentos de inicio de sesión. Por favor, intente más tarde.',
  handler: (req, res) => {
    logWarning('Rate limit excedido', {
      ip: req.ip,
      path: req.path
    });
    res.status(429).json({
      error: 'Demasiados intentos de inicio de sesión. Por favor, intente más tarde.'
    });
  }
});