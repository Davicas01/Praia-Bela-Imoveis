import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  FaTimes, 
  FaBed, 
  FaBath, 
  FaCar, 
  FaRuler, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaHeart, 
  FaRegHeart, 
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSwimmingPool,
  FaWifi,
  FaSnowflake,
  FaShieldAlt,
  FaTree,
  FaDumbbell
} from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

function PropertyDetailsModal({ isOpen, onClose, property }) {
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const isFavorite = favorites?.includes(property?.id);

  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };

  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse no imóvel "${property.title}" no valor de ${property.priceFormatted}. Poderia me dar mais informações?`;
    const phone = "5511999999999"; // Substitua pelo número real
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const getFeatureIcon = (feature) => {
    const iconMap = {
      piscina: FaSwimmingPool,
      wifi: FaWifi,
      'ar-condicionado': FaSnowflake,
      seguranca: FaShieldAlt,
      jardim: FaTree,
      academia: FaDumbbell,
    };
    
    const IconComponent = iconMap[feature.toLowerCase()] || FaShieldAlt;
    return <IconComponent className="text-primary-blue" />;
  };

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-6 flex items-center justify-between z-10">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h2>
              <div className="flex items-center space-x-4">
                <p className="text-2xl font-bold text-primary-blue">
                  {property.priceFormatted}
                </p>
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{property.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleToggleFavorite}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isFavorite 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white'
                }`}
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
              
              <button
                onClick={onClose}
                className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
            <div className="grid lg:grid-cols-2 gap-8 p-6">
              
              {/* Galeria de Imagens */}
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={`${property.images[currentImageIndex]}?w=600&h=400&fit=crop`}
                    alt={`${property.title} - Imagem ${currentImageIndex + 1}`}
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                      >
                        <FaChevronLeft />
                      </button>
                      
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                      >
                        <FaChevronRight />
                      </button>
                      
                      {/* Indicadores */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {property.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              index === currentImageIndex 
                                ? 'bg-white' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Thumbnails */}
                {property.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {property.images.slice(0, 4).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative h-20 rounded-xl overflow-hidden ${
                          index === currentImageIndex 
                            ? 'ring-2 ring-primary-blue' 
                            : 'hover:opacity-75'
                        }`}
                      >
                        <img
                          src={`${image}?w=150&h=100&fit=crop`}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Informações */}
              <div className="space-y-6">
                
                {/* Características Principais */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Características</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-primary-blue/10 rounded-xl">
                        <FaBed className="text-primary-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Quartos</p>
                        <p className="font-semibold">{property.bedrooms}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-primary-blue/10 rounded-xl">
                        <FaBath className="text-primary-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Banheiros</p>
                        <p className="font-semibold">{property.bathrooms}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-primary-blue/10 rounded-xl">
                        <FaRuler className="text-primary-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Área</p>
                        <p className="font-semibold">{property.area}m²</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-primary-blue/10 rounded-xl">
                        <FaCar className="text-primary-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Garagem</p>
                        <p className="font-semibold">{property.garage || 0} vagas</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comodidades */}
                {property.features && property.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Comodidades</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                          {getFeatureIcon(feature)}
                          <span className="text-gray-700 capitalize">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Descrição */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Descrição</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description || 
                     `Excelente ${property.type} localizado em ${property.location}, oferecendo ${property.bedrooms} quartos e ${property.bathrooms} banheiros em ${property.area}m² de área construída. Imóvel em ótimo estado de conservação com acabamentos de qualidade.`
                    }
                  </p>
                </div>

                {/* Ações */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <FaWhatsapp className="text-xl" />
                    <span>Conversar no WhatsApp</span>
                  </button>
                  
                  <button className="flex items-center justify-center space-x-3 bg-primary-blue hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                    <FaCalendarAlt />
                    <span>Agendar Visita</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PropertyDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  property: PropTypes.object
};

export default PropertyDetailsModal;
