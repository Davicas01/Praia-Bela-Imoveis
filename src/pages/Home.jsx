import React from 'react';
import Hero from '../components/Hero';
import SearchSection from '../components/SearchSection';
import FeaturedCarousel from '../components/FeaturedCarousel';
import FinancingCalculator from '../components/FinancingCalculator';
import Testimonials from '../components/Testimonials';
import RegionsMap from '../components/RegionsMap';

function Home() {
  return (
    <div>
      <Hero />
      <SearchSection />
      <FeaturedCarousel />
      <FinancingCalculator />
      <Testimonials />
      <RegionsMap />
    </div>
  );
}

export default Home;
