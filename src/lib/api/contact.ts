import axios from 'axios';
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres')
});

export type ContactForm = z.infer<typeof contactSchema>;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || ''
});

export const contactApi = {
  sendMessage: async (data: ContactForm) => {
    try {
      const response = await api.post('/api/contact', {
        ...data,
        to: 'pedro.digitalcoach@gmail.com'
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Error al enviar el mensaje');
    }
  }
};