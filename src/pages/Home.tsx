import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import LeadPopup from '../components/LeadPopup';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <LeadPopup />
    </>
  );
};

export default Home;