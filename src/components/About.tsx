import React from 'react';
import { CheckCircle, Award, Users } from 'lucide-react';

const About = () => {
  const expertise = [
    'Más de 20 años de experiencia en ventas',
    'Estrategias de captación de clientes',
    'Optimización de procesos de venta',
    'Marketing digital y automatización',
    'Implementación de soluciones de IA',
    'Transformación digital de negocios'
  ];

  return (
    <section id="about" className="section-padding bg-dark-lighter">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Transformando Negocios con Experiencia y Tecnología
            </h2>
            <div className="space-y-4 text-lg text-gray-400">
              <p>
                Con más de 20 años de experiencia en el mundo de las ventas, he trabajado en múltiples sectores, 
                lo que me ha permitido conocer a fondo las dinámicas y desafíos de negocios en diversos ámbitos.
              </p>
              <p>
                Este recorrido me ha dado una perspectiva clara de lo que necesitan las empresas para crecer y prosperar: 
                captar más clientes, incrementar la facturación, mejorar la productividad y optimizar la atención al cliente.
              </p>
              <p>
                En los últimos años, he complementado esta sólida base en ventas con una formación intensiva en marketing 
                digital e inteligencia artificial, convirtiéndome en un recurso clave para quienes desean escalar sus 
                negocios de manera innovadora y eficiente.
              </p>
            </div>
            <div className="space-y-4 mt-6">
              {expertise.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500"
                  alt="Consultoría de negocios"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-lg shadow-lg">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <div className="relative mt-12">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=500"
                  alt="Transformación digital"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -top-4 -left-4 bg-dark p-4 rounded-lg shadow-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;