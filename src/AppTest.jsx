import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';

function TestHome() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏠 Costa Sul Imóveis
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Header funcionando!
          </p>
          <div className="space-y-2">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ React funcionando
            </div>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Router funcionando
            </div>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Context funcionando
            </div>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Header funcionando
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<TestHome />} />
            <Route path="*" element={<TestHome />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
