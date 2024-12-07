import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { leadSchema } from '../../lib/api/leads';
import { logError, logInfo } from '../../lib/utils/logger';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  }

  try {
    const data = leadSchema.parse(req.body);
    
    logInfo('Processing new lead', { email: data.email });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: 'Gracias por tu interés',
      html: `
        <h2>¡Hola ${data.name}!</h2>
        <p>Gracias por tu interés. Me pondré en contacto contigo lo antes posible.</p>
        <p>Mientras tanto, ¿te gustaría agendar una consulta gratuita?</p>
        <p><a href="https://calendly.com/pedro-digitalcoach/30min">Agenda una consulta gratuita</a></p>
        <br>
        <p>Saludos,</p>
        <p>Pedro Palomares</p>
        <p>Digital Coach</p>
      `
    });

    logInfo('Email sent successfully', { email: data.email });

    return res.status(200).json({ 
      success: true, 
      message: '¡Gracias! Me pondré en contacto contigo pronto.' 
    });

  } catch (error) {
    if (error instanceof Error) {
      logError(error, { 
        context: 'Lead Form Processing',
        error: error.message
      });

      return res.status(500).json({ 
        success: false,
        error: 'Error al procesar la solicitud. Por favor, inténtalo de nuevo.' 
      });
    }

    return res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
}