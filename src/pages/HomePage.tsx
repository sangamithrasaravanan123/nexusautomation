import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Solutions from '../components/Solutions';
import Services from '../components/Services';
import Suppliers from '../components/Suppliers';
import ContactForm from '../components/ContactForm';
import Location from '../components/Location';
//import ECommerce from '../components/ECommerce';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Solutions />
      <Services />
      <Suppliers />
      <ContactForm />
      <Location />
      {/* <ECommerce /> */}
    </>
  );
};

export default HomePage;
