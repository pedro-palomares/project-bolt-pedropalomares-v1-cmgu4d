import axios from 'axios';
import { z } from 'zod';
import { logError, logInfo } from '../utils/logger';

export const leadSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono inválido').max(15, 'Teléfono demasiado largo')
});

export type LeadForm = z.infer<typeof leadSchema>;

interface LeadResponse {
  success: boolean;
  message: string;
  error?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const leadsApi = {
  submitLead: async (data: LeadForm): Promise<LeadResponse> => {
    try {
      logInfo('Submitting lead form', { email: data.email });
      
      // Validate data before sending
      const validatedData = leadSchema.parse(data);
      
      const response = await api.post<LeadResponse>('/api/leads', validatedData);
      
      logInfo('Lead form submitted successfully', { email: data.email });
      
      return response.data;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logError(error, { context: 'Lead Form Validation' });
        throw new Error('Por favor, verifica los datos ingresados');
      }
      
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Error al enviar el formulario';
        logError(error, { 
          context: 'Lead Form Submission',
          status: error.response?.status,
          data: error.response?.data
        });
        throw new Error(errorMessage);
      }
      
      logError(error as Error, { context: 'Lead Form Submission' });
      throw new Error('Error al procesar la solicitud. Por favor, inténtalo de nuevo.');
    }
  }
};