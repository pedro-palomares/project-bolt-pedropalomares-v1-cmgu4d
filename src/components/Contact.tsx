import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
  return (
    <section id="contact" className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Contacto</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            ¿Listo para transformar tu negocio? Agenda una consulta gratuita
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-dark-lighter p-8 rounded-xl shadow-lg border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-white">Información de Contacto</h3>
              <div className="space-y-6">
                <ContactInfo
                  icon={Mail}
                  title="Email"
                  content="contacto@pedropalomares.com"
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
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
                  placeholder="¿En qué puedo ayudarte?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Enviar Mensaje
                <Send className="h-4 w-4 ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;