import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaWhatsapp, FaTimes, FaComment } from 'react-icons/fa';

function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  // Mostrar botão após scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simular notificações
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setMessageCount(prev => prev + 1);
        
        // Resetar contador após 5 segundos
        setTimeout(() => {
          setMessageCount(0);
        }, 5000);
      }
    }, 30000); // A cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const handleWhatsApp = (message = '') => {
    const defaultMessage = message || 'Olá! Vim do site e gostaria de mais informações sobre os imóveis.';
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(defaultMessage)}`, '_blank');
    setIsOpen(false);
    setMessageCount(0);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 8 && hours < 18;
  };

  const quickMessages = [
    'Quero agendar uma visita',
    'Tenho interesse em financiamento',
    'Gostaria de uma avaliação',
    'Quero vender meu imóvel',
    'Preciso de mais informações'
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Mensagens Rápidas */}
        {isOpen && (
          <div className="mb-4 w-80 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-scaleIn">
            {/* Header */}
            <div className="bg-green-600 px-4 py-3 flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <FaWhatsapp className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold">Praia Bela Imóveis</h3>
                  <p className="text-xs opacity-90">
                    {getCurrentTime() ? 'Online agora' : 'Resp. em até 1h'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors duration-300"
              >
                <FaTimes />
              </button>
            </div>

            {/* Mensagem de Boas-vindas */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaComment className="text-green-600 text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 mb-2">
                    Olá! 👋 Como podemos ajudar você hoje?
                  </p>
                  <p className="text-xs text-gray-500">
                    Escolha uma opção abaixo ou envie sua mensagem:
                  </p>
                </div>
              </div>
            </div>

            {/* Mensagens Rápidas */}
            <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
              {quickMessages.map((message, index) => (
                <button
                  key={index}
                  onClick={() => handleWhatsApp(message)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-green-50 hover:border-green-200 border border-gray-200 rounded-lg transition-all duration-300 text-sm"
                >
                  {message}
                </button>
              ))}
              
              {/* Mensagem Personalizada */}
              <button
                onClick={() => handleWhatsApp()}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm font-semibold flex items-center justify-center space-x-2"
              >
                <FaWhatsapp />
                <span>Enviar mensagem personalizada</span>
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Respondemos rapidamente no WhatsApp
              </p>
            </div>
          </div>
        )}

        {/* Botão Principal */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
            isOpen ? 'rotate-45' : ''
          }`}
          aria-label={isOpen ? 'Fechar chat' : 'Abrir WhatsApp'}
        >
          {/* Animação de pulso removida conforme solicitado */}
          <div className="w-6 h-6 flex items-center justify-center">
            {isOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaWhatsapp className="text-xl" />
            )}
          </div>

          {/* Contador de Mensagens */}
          {messageCount > 0 && !isOpen && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold animate-bounce">
              {messageCount > 9 ? '9+' : messageCount}
            </div>
          )}

          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {isOpen ? 'Fechar chat' : 'Fale conosco no WhatsApp'}
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </button>

        {/* Indicador de Status */}
        {!isOpen && (
          <div className="absolute -top-1 -left-1">
            <div className={`w-3 h-3 rounded-full ${
              getCurrentTime() ? 'bg-green-400' : 'bg-yellow-400'
            }`}>
              <div className={`w-3 h-3 rounded-full animate-ping ${
                getCurrentTime() ? 'bg-green-400' : 'bg-yellow-400'
              }`}></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

WhatsAppButton.propTypes = {};

export default WhatsAppButton;
