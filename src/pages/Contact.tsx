import React from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'react-hot-toast';
import { contactSchema, type ContactForm } from '../lib/api/contact';
import { contactApi } from '../lib/api/contact';
import { trackEvent } from '../lib/analytics';
import SEO from '../components/SEO';
import CalendlyButton from '../components/CalendlyButton';

const ContactInfo = ({ icon: Icon, title, content }: { icon: any, title: string, content: string }) => (
  <div className="flex items-start space-x-4">
    <div className="flex items-center justify-center w-12 h-12 bg-dark rounded-lg flex-shrink-0">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <h3 className="font-semibold text-lg mb-1 text-white">{title}</h3>
      <p className="text-gray-400">{content}</p>
    </div>
  </div>
);

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      await contactApi.sendMessage(data);
      
      // Track successful form submission
      trackEvent('Contact', 'Form Submit', 'Success');
      
      toast.success('Mensaje enviado correctamente');
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      trackEvent('Contact', 'Form Submit', 'Error');
      toast.error('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <>
      <SEO 
        title="Contacto - Pedro Palomares Digital Coach"
        description="¿Listo para transformar tu negocio? Contáctame para una consulta gratuita."
      />
      
      <Toaster position="top-right" />
      
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contacto</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              ¿Listo para transformar tu negocio? Agenda una consulta gratuita
            </p>
            <div className="mt-8">
              <CalendlyButton />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-dark-lighter p-8 rounded-xl shadow-lg border border-gray-800">
                <h3 className="text-2xl font-bold mb-6 text-white">Información de Contacto</h3>
                <div className="space-y-6">
                  <ContactInfo
                    icon={Mail}
                    title="Email"
                    content="pedro.digitalcoach@gmail.com"
                  />
                  <ContactInfo
                    icon={Phone}
                    title="Teléfono"
                    content="+34 619 410 431"
                  />
                  <ContactInfo
                    icon={MapPin}
                    title="Ubicación"
                    content="Barcelona, España"
                  />
                </div>
              </div>
            </div>

            <div className="bg-dark-lighter p-8 rounded-xl shadow-lg border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-white">Envíame un Mensaje</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
                    placeholder="Tu nombre"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message')}
                    className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
                    placeholder="¿En qué puedo ayudarte?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <Send className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;