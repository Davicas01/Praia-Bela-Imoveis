import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaHome, 
  FaDollarSign,
  FaBed,
  FaCar,
  FaSwimmingPool
} from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

function SearchSection() {
  const { setFilters, setUIState } = useAppContext();
  
  // Estados do formulário de busca
  const [searchForm, setSearchForm] = useState({
    location: '',
    type: '',
    priceRange: '',
    bedrooms: '',
    features: {
      garage: false,
      pool: false,
      furnished: false
    }
  });

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleSearchChange = (field, value) => {
    if (field.includes('features.')) {
      const featureKey = field.split('.')[1];
      setSearchForm(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [featureKey]: value
        }
      }));
    } else {
      setSearchForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Combinar filtros básicos com features
    const combinedFilters = {
      ...searchForm,
      ...searchForm.features
    };
    
    // Remover o objeto features para não duplicar
    delete combinedFilters.features;
    
    setFilters(combinedFilters);
    setUIState({ loading: true });
    
    // Scroll para seção de propriedades
    setTimeout(() => {
      document.getElementById('properties')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setUIState({ loading: false });
    }, 500);
  };

  const clearFilters = () => {
    setSearchForm({
      location: '',
      type: '',
      priceRange: '',
      bedrooms: '',
      features: {
        garage: false,
        pool: false,
        furnished: false
      }
    });
    setFilters({});
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-blue/5 via-white to-primary-gold/5 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-gold/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho aprimorado */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-primary-blue/10 text-primary-blue px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <FaSearch className="mr-2" />
              Busca Inteligente
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Encontre seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-blue-600">Lar Perfeito</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Utilize nossa ferramenta de busca avançada com filtros inteligentes para descobrir o imóvel dos seus sonhos
            </p>
          </div>

          {/* Formulário de Busca Redesenhado */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
            <form onSubmit={handleSearchSubmit} className="space-y-8">
              {/* Filtros Principais */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Localização */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <FaMapMarkerAlt className="text-primary-blue mr-2" />
                    Localização
                  </label>
                  <select
                    value={searchForm.location}
                    onChange={(e) => handleSearchChange('location', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  >
                    <option value="">Todas as regiões</option>
                    <option value="centro">Centro</option>
                    <option value="zona-sul">Zona Sul</option>
                    <option value="zona-norte">Zona Norte</option>
                    <option value="zona-oeste">Zona Oeste</option>
                    <option value="zona-leste">Zona Leste</option>
                  </select>
                </div>

                {/* Tipo de Imóvel */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <FaHome className="text-primary-blue mr-2" />
                    Tipo de Imóvel
                  </label>
                  <select
                    value={searchForm.type}
                    onChange={(e) => handleSearchChange('type', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  >
                    <option value="">Todos os tipos</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="casa">Casa</option>
                    <option value="cobertura">Cobertura</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>

                {/* Faixa de Preço */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <FaDollarSign className="text-primary-blue mr-2" />
                    Faixa de Preço
                  </label>
                  <select
                    value={searchForm.priceRange}
                    onChange={(e) => handleSearchChange('priceRange', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  >
                    <option value="">Qualquer preço</option>
                    <option value="0-500000">Até R$ 500.000</option>
                    <option value="500000-1000000">R$ 500.000 - R$ 1.000.000</option>
                    <option value="1000000-2000000">R$ 1.000.000 - R$ 2.000.000</option>
                    <option value="2000000+">Acima de R$ 2.000.000</option>
                  </select>
                </div>

                {/* Quartos */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <FaBed className="text-primary-blue mr-2" />
                    Quartos
                  </label>
                  <select
                    value={searchForm.bedrooms}
                    onChange={(e) => handleSearchChange('bedrooms', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  >
                    <option value="">Qualquer quantidade</option>
                    <option value="1">1 quarto</option>
                    <option value="2">2 quartos</option>
                    <option value="3">3 quartos</option>
                    <option value="4+">4+ quartos</option>
                  </select>
                </div>
              </div>

              {/* Filtros Avançados */}
              <div className="border-t border-gray-100 pt-8">
                <button
                  type="button"
                  onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                  className="flex items-center justify-center w-full text-primary-blue font-semibold hover:text-blue-700 transition-colors duration-300 mb-6"
                >
                  Filtros Avançados
                  <span className={`transform transition-transform duration-300 ml-2 ${isAdvancedOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {isAdvancedOpen && (
                  <div className="grid md:grid-cols-3 gap-6 animate-fadeIn">
                    {/* Garagem */}
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="garage"
                          checked={searchForm.features.garage}
                          onChange={(e) => handleSearchChange('features.garage', e.target.checked)}
                          className="w-5 h-5 text-primary-blue border-gray-300 rounded focus:ring-primary-blue"
                        />
                      </div>
                      <label htmlFor="garage" className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                        <FaCar className="text-primary-blue" />
                        <span>Com Garagem</span>
                      </label>
                    </div>

                    {/* Piscina */}
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="pool"
                          checked={searchForm.features.pool}
                          onChange={(e) => handleSearchChange('features.pool', e.target.checked)}
                          className="w-5 h-5 text-primary-blue border-gray-300 rounded focus:ring-primary-blue"
                        />
                      </div>
                      <label htmlFor="pool" className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                        <FaSwimmingPool className="text-primary-blue" />
                        <span>Com Piscina</span>
                      </label>
                    </div>

                    {/* Mobiliado */}
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="furnished"
                          checked={searchForm.features.furnished}
                          onChange={(e) => handleSearchChange('features.furnished', e.target.checked)}
                          className="w-5 h-5 text-primary-blue border-gray-300 rounded focus:ring-primary-blue"
                        />
                      </div>
                      <label htmlFor="furnished" className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                        <FaHome className="text-primary-blue" />
                        <span>Mobiliado</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary-blue to-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3"
                >
                  <FaSearch />
                  <span>Buscar Imóveis</span>
                </button>
                
                <button
                  type="button"
                  onClick={clearFilters}
                  className="sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-primary-blue hover:text-primary-blue transition-all duration-300 transform hover:scale-105"
                >
                  Limpar Filtros
                </button>
              </div>
            </form>
          </div>

          {/* Dicas de Busca */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-primary-gold/10 text-primary-gold px-6 py-3 rounded-full text-sm font-medium">
              💡 <span className="ml-2"><strong>Dica:</strong> Deixe os campos em branco para ver todos os imóveis disponíveis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

SearchSection.propTypes = {};

export default SearchSection;
