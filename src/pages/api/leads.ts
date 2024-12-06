import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { leadSchema } from '../../lib/api/leads';
import { logError, logInfo } from '../../lib/utils/logger';
import { generateGuide } from '../../lib/utils/pdf';

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

    // Generate guide PDF
    const doc = generateGuide();
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    // Send email with guide
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: 'Tu guía: Descubre cómo la IA puede transformar tu negocio',
      html: `
        <h2>¡Hola ${data.name}!</h2>
        <p>Gracias por tu interés en nuestra guía. Adjunto encontrarás el documento PDF con toda la información.</p>
        <p>¿Te gustaría saber más sobre cómo implementar estas soluciones en tu negocio?</p>
        <p><a href="https://calendly.com/pedro-digitalcoach/30min">Agenda una consulta gratuita conmigo</a></p>
        <br>
        <p>Saludos,</p>
        <p>Pedro Palomares</p>
        <p>Digital Coach</p>
      `,
      attachments: [{
        filename: 'guia-ia-negocios.pdf',
        content: pdfBuffer
      }]
    });

    logInfo('Guide sent successfully', { email: data.email });

    // Store lead data (implement your storage solution here)
    // For example, using a database or CRM

    return res.status(200).json({ 
      success: true, 
      message: '¡Gracias! Te hemos enviado la guía a tu email.' 
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