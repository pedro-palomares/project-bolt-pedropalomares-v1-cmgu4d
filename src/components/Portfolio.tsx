import React from 'react';
import { ExternalLink, Brain, Target, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import CalendlyButton from './CalendlyButton';
import { trackEvent } from '../lib/analytics';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  icon: any;
  results: string[];
  demoUrl?: string;
}

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="bg-dark-lighter rounded-xl shadow-lg overflow-hidden group border border-gray-800">
    <div className="relative overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        {project.demoUrl && (
          <div className="p-4">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white hover:text-primary"
            >
              <ExternalLink className="h-5 w-5 mr-1" />
              Ver Caso de Estudio
            </a>
          </div>
        )}
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-dark rounded-lg">
          <project.icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
      </div>
      <p className="text-gray-400 mb-4">{project.description}</p>
      <div className="space-y-2 mb-4">
        {project.results.map((result, index) => (
          <div key={index} className="flex items-center text-gray-300">
            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
            {result}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-dark text-primary rounded-full text-sm border border-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Portfolio = () => {
  const projects: Project[] = [
    {
      title: "IA en Atención al Cliente",
      description: "Implementación de un sistema de IA para automatizar y mejorar la atención al cliente en una empresa de retail.",
      image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80&w=800",
      tags: ["Inteligencia Artificial", "NLP", "Automatización"],
      icon: Brain,
      results: [
        "Reducción del 30% en el tiempo promedio de respuesta",
        "Mejora del 20% en la satisfacción del cliente según encuestas internas",
        "Optimización de 80 horas mensuales en tareas repetitivas"
      ]
    },
    {
      title: "Estrategia de Ventas B2B",
      description: "Desarrollo e implementación de una estrategia digital de ventas para una empresa de software.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
      tags: ["Ventas B2B", "CRM", "Lead Generation"],
      icon: Target,
      results: [
        "Incremento del 25% en la conversión de leads en clientes",
        "Aumento del 50% en consultas calificadas",
        "ROI positivo en menos de 4 meses tras la implementación"
      ]
    },
    {
      title: "Chatbot Personalizado",
      description: "Desarrollo de un chatbot inteligente para gestionar consultas frecuentes y optimizar la atención al cliente.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
      tags: ["ChatBot", "IA", "Atención al Cliente"],
      icon: MessageSquare,
      results: [
        "Reducción del 40% en la carga de trabajo del equipo de soporte",
        "Automatización de más del 50% de las preguntas frecuentes",
        "Mejora del 15% en la retención de clientes"
      ]
    }
  ];

  const handleCtaClick = () => {
    trackEvent('CTA', 'Click', 'Portfolio Success Stories');
  };

  return (
    <section id="casos-exito" className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Casos de Éxito</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Descubre cómo hemos ayudado a empresas a transformar sus operaciones
            con soluciones tecnológicas innovadoras
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/contact" 
            onClick={handleCtaClick}
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
          >
            ¿Quieres resultados como estos? Agenda una consulta ahora
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;