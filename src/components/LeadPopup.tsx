import React, { useState, useEffect } from 'react';
import { X, Download, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { trackEvent } from '../lib/analytics';
import { logError, logInfo } from '../lib/utils/logger';
import { leadSchema, type LeadForm, leadsApi } from '../lib/api/leads';

const LeadPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema)
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('hasSeenPopup');
      if (!hasSeenPopup) {
        setIsVisible(true);
        trackEvent('Popup', 'Show', 'Lead Generation');
        logInfo('Lead popup shown to user');
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: LeadForm) => {
    setIsSubmitting(true);
    
    try {
      logInfo('Processing lead form submission', { email: data.email });
      
      const response = await leadsApi.submitLead(data);

      localStorage.setItem('hasSeenPopup', 'true');
      setIsVisible(false);
      reset();
      
      toast.success(response.message, {
        duration: 5000,
        position: 'top-center'
      });
      
      trackEvent('Popup', 'Submit', 'Lead Generation Success');
      logInfo('Lead form submitted successfully', { email: data.email });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al enviar el formulario';
      
      logError(error as Error, {
        context: 'Lead Form Submission',
        formData: { email: data.email }
      });
      
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-center'
      });
      
      trackEvent('Popup', 'Error', 'Lead Generation Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    trackEvent('Popup', 'Close', 'Lead Generation');
    logInfo('Lead popup closed by user');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-lighter rounded-lg p-6 w-full max-w-md relative animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <Download className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Descubre cómo la IA puede transformar tu negocio
          </h2>
          <p className="text-gray-400">
            Descarga nuestra guía gratuita ahora
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('name')}
              placeholder="Nombre"
              className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white placeholder-gray-500"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white placeholder-gray-500"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register('phone')}
              type="tel"
              placeholder="Teléfono"
              className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white placeholder-gray-500"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Enviando...
              </>
            ) : (
              'Descargar Guía Gratuita'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadPopup;