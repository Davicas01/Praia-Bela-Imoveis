import React from 'react';
import Hero from '../components/Hero';
import Properties from '../components/Properties';
import FinancingCalculator from '../components/FinancingCalculator';
import Testimonials from '../components/Testimonials';
import RegionsMap from '../components/RegionsMap';

function Home() {
  return (
    <div>
      <Hero />
      <Properties showFiltersBelow={true} maxProperties={8} />
      <FinancingCalculator />
      <Testimonials />
      <RegionsMap />
    </div>
  );
}

export default Home;
