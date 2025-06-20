import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { useIntersectionObserver, useCarousel, useTypingEffect } from '../hooks';

function Testimonials() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });
  
  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Excelente atendimento! Encontrei minha casa dos sonhos com a ajuda da equipe. Muito profissionais e atenciosos em todo o processo.",
      property: "Casa em Praia Bela",
      date: "Março 2025"
    },
    {
      id: 2,
      name: "João Santos",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Processo de financiamento foi muito tranquilo. A equipe me ajudou com toda a documentação e consegui condições excelentes.",
      property: "Apartamento Vista Mar",
      date: "Fevereiro 2025"
    },
    {
      id: 3,
      name: "Ana Costa",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Vendemos nosso imóvel rapidamente e por um preço justo. O marketing foi excelente e tivemos várias visitas na primeira semana.",
      property: "Cobertura Centro",
      date: "Janeiro 2025"
    },
    {
      id: 4,
      name: "Pedro Lima",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Atendimento personalizado e suporte completo. Desde a primeira visita até a entrega das chaves, tudo perfeito!",
      property: "Casa de Praia",
      date: "Dezembro 2024"
    },
    {
      id: 5,
      name: "Carla Oliveira",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Recomendo para todos! Equipe super preparada, imóveis de qualidade e preços justos. Voltarei a fazer negócios com certeza.",
      property: "Duplex Beira Mar",
      date: "Novembro 2024"
    },
    {
      id: 6,
      name: "Roberto Ferreira",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Investimento que valeu a pena! A localização é perfeita e a valorização já é visível. Equipe de vendas muito competente.",
      property: "Loft Moderno",
      date: "Outubro 2024"
    }
  ];

  const { 
    currentIndex, 
    next, 
    prev, 
    goTo,
    pause,
    play
  } = useCarousel(testimonials, {
    autoPlay: true,
    interval: 4000,
    loop: true
  });

  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);
  const { displayText, isComplete } = useTypingEffect(activeTestimonial.text, 30);

  useEffect(() => {
    setActiveTestimonial(testimonials[currentIndex]);
  }, [currentIndex]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`transition-colors duration-300 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section 
      id="testimonials" 
      ref={ref}
      className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={play}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          hasIntersected ? 'animate-fadeIn' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Clientes <span className="text-primary-gold">Satisfeitos</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Veja o que nossos clientes falam sobre nossa experiência e atendimento
          </p>
        </div>

        {/* Carrossel Principal */}
        <div className="max-w-4xl mx-auto">
          <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 transition-all duration-1000 ${
            hasIntersected ? 'animate-scaleIn' : 'opacity-0 scale-95'
          }`}>
            {/* Aspas */}
            <div className="text-center mb-6">
              <FaQuoteLeft className="text-4xl text-primary-gold mx-auto" />
            </div>

            {/* Depoimento Principal */}
            <div className="text-center mb-8">
              <p className="text-xl md:text-2xl text-white leading-relaxed min-h-[3em] mb-6">
                "{displayText}"
                {isComplete && <span className="animate-pulse">|</span>}
              </p>

              {/* Avaliação */}
              <div className="flex justify-center space-x-1 mb-6">
                {renderStars(activeTestimonial.rating)}
              </div>

              {/* Informações do Cliente */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  className="w-16 h-16 rounded-full border-4 border-white/20 object-cover"
                />
                <div>
                  <h4 className="text-xl font-bold text-white">
                    {activeTestimonial.name}
                  </h4>
                  <p className="text-blue-200">
                    {activeTestimonial.property}
                  </p>
                  <p className="text-sm text-blue-300">
                    {activeTestimonial.date}
                  </p>
                </div>
              </div>
            </div>

            {/* Navegação */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={prev}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="Depoimento anterior"
              >
                <FaChevronLeft className="text-white" />
              </button>

              {/* Indicadores */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-primary-gold scale-125'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="Próximo depoimento"
              >
                <FaChevronRight className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Galeria de Clientes */}
        <div className={`mt-12 transition-all duration-1000 delay-500 ${
          hasIntersected ? 'animate-fadeIn' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goTo(index)}
                className={`group transition-all duration-300 ${
                  index === currentIndex
                    ? 'transform scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className={`w-full aspect-square rounded-full object-cover border-4 transition-all duration-300 ${
                      index === currentIndex
                        ? 'border-primary-gold'
                        : 'border-white/20 group-hover:border-white/40'
                    }`}
                  />
                  {index === currentIndex && (
                    <div className="absolute inset-0 rounded-full bg-primary-gold/20 animate-pulse" />
                  )}
                </div>
                <p className="text-sm text-center mt-2 text-blue-200 group-hover:text-white transition-colors duration-300">
                  {testimonial.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className={`mt-16 transition-all duration-1000 delay-700 ${
          hasIntersected ? 'animate-fadeIn' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-gold mb-2">
                500+
              </div>
              <div className="text-blue-200">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-gold mb-2">
                98%
              </div>
              <div className="text-blue-200">Taxa de Satisfação</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-gold mb-2">
                4.9
              </div>
              <div className="text-blue-200">Avaliação Média</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-gold mb-2">
                15+
              </div>
              <div className="text-blue-200">Anos de Experiência</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Testimonials.propTypes = {};

export default Testimonials;
