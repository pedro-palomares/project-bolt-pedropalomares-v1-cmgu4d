import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { contactSchema } from '../lib/api/contact';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pedro.digitalcoach@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = contactSchema.parse(req.body);

    // Send email
    await transporter.sendMail({
      from: 'pedro.digitalcoach@gmail.com',
      to: 'pedro.digitalcoach@gmail.com',
      subject: `Nuevo mensaje de contacto de ${data.name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${data.message}</p>
      `
    });

    // Send auto-reply to user
    await transporter.sendMail({
      from: 'pedro.digitalcoach@gmail.com',
      to: data.email,
      subject: 'Gracias por tu mensaje',
      html: `
        <h2>¡Gracias por contactar conmigo!</h2>
        <p>He recibido tu mensaje y me pondré en contacto contigo lo antes posible.</p>
        <p>Mientras tanto, puedes agendar una reunión gratuita de 30 minutos en mi calendario:</p>
        <p><a href="https://calendly.com/pedro-digitalcoach/30min">Agendar reunión</a></p>
        <br>
        <p>Saludos,</p>
        <p>Pedro Palomares</p>
        <p>Digital Coach</p>
      `
    });

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(400).json({ error: 'Invalid request data' });
  }
}