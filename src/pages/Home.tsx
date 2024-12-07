import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import LeadPopup from '../components/LeadPopup';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <>
      <SEO 
        title="Pedro Palomares - Digital Coach"
        description="Experto en automatización, IA y desarrollo web. Ayudo a empresas a escalar sus negocios mediante estrategias digitales."
      />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <LeadPopup />
    </>
  );
};

export default Home;