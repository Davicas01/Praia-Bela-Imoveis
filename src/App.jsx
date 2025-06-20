import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Properties from './components/Properties';
import FinancingCalculator from './components/FinancingCalculator';
import Testimonials from './components/Testimonials';
import RegionsMap from './components/RegionsMap';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <Properties />
          <FinancingCalculator />
          <Testimonials />
          <RegionsMap />
          <Contact />
        </main>
        <WhatsAppButton />
      </div>
    </AppProvider>
  );
}

export default App;
