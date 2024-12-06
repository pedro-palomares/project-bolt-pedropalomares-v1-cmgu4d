import React from 'react';
import { Target, TrendingUp, Zap } from 'lucide-react';
import CalendlyButton from './CalendlyButton';
import { trackEvent } from '../lib/analytics';

const Hero = () => {
  const handleServicesClick = () => {
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
      trackEvent('Navigation', 'Click', 'Services Section');
    }
  };

  return (
    <div id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-dark-lighter opacity-95"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Impulsa tu Negocio con{' '}
              <span className="text-primary bg-primary/10 px-2 rounded">
                Estrategias Digitales
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Combino más de 20 años de experiencia en ventas con las últimas tecnologías 
              para ayudarte a captar más clientes y escalar tu negocio de manera eficiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CalendlyButton />
              <button
                onClick={handleServicesClick}
                className="btn-secondary hover:bg-white/5"
              >
                Conoce Mis Servicios
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl"></div>
            <div className="relative grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="card p-6 backdrop-blur-sm bg-dark-lighter/90">
                  <Target className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Captación de Clientes</h3>
                  <p className="text-gray-300">Estrategias efectivas de ventas</p>
                </div>
                <div className="card p-6 backdrop-blur-sm bg-dark-lighter/90 translate-x-4">
                  <Zap className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Automatización</h3>
                  <p className="text-gray-300">Optimiza tus procesos de venta</p>
                </div>
              </div>
              <div className="space-y-6 translate-y-12">
                <div className="card p-6 backdrop-blur-sm bg-dark-lighter/90">
                  <TrendingUp className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Escalabilidad</h3>
                  <p className="text-gray-300">Crece tu negocio con IA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent"></div>
    </div>
  );
};

export default Hero;