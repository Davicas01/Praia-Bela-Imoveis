import React from 'react';
import Hero from '../components/Hero';
import FeaturedCarousel from '../components/FeaturedCarousel';
import FinancingCalculator from '../components/FinancingCalculator';
import Testimonials from '../components/Testimonials';
import RegionsMap from '../components/RegionsMap';

function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCarousel />
      <FinancingCalculator />
      <Testimonials />
      <RegionsMap />
    </div>
  );
}

export default Home;
