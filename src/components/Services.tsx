import React from 'react';
import { Brain, Target, MessageSquare, Zap, Users, TrendingUp } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-dark-lighter p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800 group">
    <div className="flex items-center justify-center w-12 h-12 bg-dark-light rounded-lg mb-6 group-hover:bg-primary/10 transition-colors">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: "Soluciones con IA",
      description: "Implementación de herramientas de IA para automatizar y optimizar procesos de venta y atención al cliente."
    },
    {
      icon: Target,
      title: "Estrategias de Ventas",
      description: "Desarrollo de estrategias efectivas para captar y retener clientes, basadas en más de 20 años de experiencia."
    },
    {
      icon: MessageSquare,
      title: "ChatBots Personalizados",
      description: "Automatización inteligente de la atención al cliente mediante chatbots personalizados."
    },
    {
      icon: Zap,
      title: "Automatización",
      description: "Optimización de procesos comerciales mediante la automatización inteligente de tareas repetitivas."
    },
    {
      icon: Users,
      title: "Captación de Clientes",
      description: "Estrategias efectivas para atraer y convertir leads en clientes satisfechos."
    },
    {
      icon: TrendingUp,
      title: "Escalabilidad",
      description: "Soluciones para hacer crecer tu negocio de manera sostenible y eficiente."
    }
  ];

  return (
    <section id="services" className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Mis Servicios</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Combino experiencia en ventas con tecnología avanzada para ayudarte a alcanzar 
            tus objetivos comerciales
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;