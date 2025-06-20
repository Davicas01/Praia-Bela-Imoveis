import React, { useState, useEffect, useRef } from 'react'

// Utilitário para Intersection Observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true)
      }
    }, options)

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options, hasIntersected])

  return { ref, isIntersecting, hasIntersected }
}

// Loading Skeleton Component
const LoadingSkeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
)

// Image with Lazy Loading Component - OTIMIZADO PARA PRODUÇÃO
const LazyImage = ({ src, alt, className, ...props }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  })

  // Otimizar URL do Unsplash para diferentes resoluções
  const optimizedSrc = src.includes('unsplash') 
    ? `${src}&auto=format&fit=crop&w=800&q=80`
    : src

  const webpSrc = src.includes('unsplash')
    ? `${src}&auto=format&fit=crop&w=800&q=80&fm=webp`
    : src

  return (
    <div ref={ref} className={`relative ${className}`}>
      {isLoading && <LoadingSkeleton className="absolute inset-0" />}
      {hasIntersected && (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={optimizedSrc}
            alt={alt}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
            className={`transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            } ${hasError ? 'hidden' : ''} ${className}`}
            loading="lazy"
            decoding="async"
            {...props}
          />
        </picture>
      )}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">Erro ao carregar</span>
        </div>
      )}
    </div>
  )
}

// 1. COMPONENTE HEADER MELHORADO
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState('home')
  const searchRef = useRef()

  // Detectar seção atual para breadcrumbs
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'properties', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })
      if (current) setCurrentSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar busca ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Simular busca
      alert(`Buscando por: ${searchTerm}`)
      setSearchTerm('')
      setIsSearchOpen(false)
    }
  }

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Animado */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-blue to-blue-600 rounded-lg animate-pulse"></div>
          <h1 className="text-2xl font-bold text-primary-blue hover:scale-105 transition-transform cursor-pointer">
            Praia Bela Imóveis
          </h1>
        </div>

        {/* Breadcrumbs */}
        <div className="hidden lg:flex items-center space-x-2 text-sm text-primary-gray">
          <span>Você está em:</span>
          <span className="capitalize font-medium text-primary-blue">
            {currentSection === 'home' ? 'Início' : 
             currentSection === 'properties' ? 'Imóveis' : 'Contato'}
          </span>
        </div>

        {/* Busca Inteligente e Menu Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <div ref={searchRef} className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-primary-gray hover:text-primary-blue transition-colors"
              aria-label="Abrir busca"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {isSearchOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 animate-fadeIn">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="Buscar imóveis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    autoFocus
                  />
                </form>
              </div>
            )}
          </div>

          <nav className="flex space-x-6">
            <a href="#home" className="text-primary-gray hover:text-primary-blue transition-all duration-200 hover:scale-105 relative group">
              Início
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#properties" className="text-primary-gray hover:text-primary-blue transition-all duration-200 hover:scale-105 relative group">
              Imóveis
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-primary-gray hover:text-primary-blue transition-all duration-200 hover:scale-105 relative group">
              Contato
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-200 group-hover:w-full"></span>
            </a>
          </nav>
        </div>

        {/* Menu Mobile Hamburger Fluido */}
        <button 
          className="md:hidden text-primary-gray p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue rounded"
          onClick={handleMenuClick}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
        >
          <div className="relative w-6 h-6">
            <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 top-3' : 'top-1'
            }`}></span>
            <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 top-3 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 top-3' : 'top-5'
            }`}></span>
          </div>
        </button>

        {/* Menu Mobile Dropdown Melhorado */}
        <div className={`absolute top-full left-0 w-full bg-white shadow-lg md:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}>
          <nav className="flex flex-col p-4 space-y-2">
            <a 
              href="#home" 
              className="text-primary-gray hover:text-primary-blue py-3 px-2 rounded transition-colors hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </a>
            <a 
              href="#properties" 
              className="text-primary-gray hover:text-primary-blue py-3 px-2 rounded transition-colors hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Imóveis
            </a>
            <a 
              href="#contact" 
              className="text-primary-gray hover:text-primary-blue py-3 px-2 rounded transition-colors hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

// 2. COMPONENTE HERO MELHORADO
function Hero({ onSearch }) {
  const [searchData, setSearchData] = useState({
    location: '',
    type: '',
    priceRange: ''
  })
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 })

  const handleQuickSearch = (e) => {
    e.preventDefault()
    
    // Enviar filtros para o componente pai
    if (onSearch) {
      onSearch(searchData)
    }
    
    // Scroll para a seção de propriedades
    document.getElementById('properties').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      id="home" 
      ref={ref}
      className="relative bg-gradient-to-r from-primary-blue via-blue-600 to-blue-800 text-white py-20 mt-16 overflow-hidden"
    >
      {/* Background com Parallax Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&w=1200&h=800&fit=crop)',
          transform: hasIntersected ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 2s ease-out'
        }}
      ></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Título com Animação */}
        <div className={`transition-all duration-1000 ${
          hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Encontre o Imóvel dos Seus
            <span className="block text-primary-gold animate-pulse">Sonhos</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Os melhores imóveis à beira-mar com vista paradisíaca. Sua nova vida começa aqui.
          </p>
        </div>

        {/* Call-to-Action Duplo */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-300 ${
          hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button 
            onClick={() => document.getElementById('properties').scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary text-lg px-8 py-4 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Ver Imóveis Disponíveis
          </button>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition-all duration-200 hover:scale-105 transform"
          >
            Agendar Visita
          </button>
        </div>

        {/* Formulário de Busca Rápida */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
          hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
            <h3 className="text-gray-800 text-lg font-semibold mb-4">Busca Rápida</h3>
            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Localização
                </label>
                <select
                  id="location"
                  value={searchData.location}
                  onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue text-gray-700"
                >
                  <option value="">Todas as regiões</option>
                  <option value="praia-bela">Praia Bela</option>
                  <option value="centro">Centro</option>
                  <option value="beira-mar">Beira Mar</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Imóvel
                </label>
                <select
                  id="type"
                  value={searchData.type}
                  onChange={(e) => setSearchData({...searchData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue text-gray-700"
                >
                  <option value="">Todos os tipos</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="cobertura">Cobertura</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Faixa de Preço
                </label>
                <select
                  id="price"
                  value={searchData.priceRange}
                  onChange={(e) => setSearchData({...searchData, priceRange: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue text-gray-700"
                >
                  <option value="">Qualquer valor</option>
                  <option value="ate-500k">Até R$ 500.000</option>
                  <option value="500k-1m">R$ 500.000 - R$ 1.000.000</option>
                  <option value="acima-1m">Acima de R$ 1.000.000</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button 
                  type="submit"
                  className="w-full btn-primary py-2 px-4 hover:scale-105 transform transition-all duration-200"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Modal para Lightbox de Imagens
const ImageModal = ({ isOpen, onClose, imageUrl, title }) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-full">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
          aria-label="Fechar modal"
        >
          ✕
        </button>
        <img 
          src={imageUrl} 
          alt={title}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
        <p className="text-white text-center mt-4 text-lg">{title}</p>
      </div>
    </div>
  )
}

// 3. COMPONENTE PROPERTIES MELHORADO
function Properties({ filters, searchResults, onClearSearch }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState('all')
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 })

  const properties = [
    {
      id: 1,
      title: "Casa de Praia Moderna",
      price: "R$ 850.000",
      priceValue: 850000,
      location: "Praia Bela, SP",
      locationKey: "praia-bela",
      bedrooms: 3,
      bathrooms: 2,
      area: "120m²",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&w=400&h=300&fit=crop",
      type: "casa",
      featured: true,
      description: "Casa moderna com acabamento de luxo e vista para o mar."
    },
    {
      id: 2,
      title: "Apartamento Vista Mar",
      price: "R$ 650.000",
      priceValue: 650000,
      location: "Centro, SP",
      locationKey: "centro",
      bedrooms: 2,
      bathrooms: 2,
      area: "95m²",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&w=400&h=300&fit=crop",
      type: "apartamento",
      featured: false,
      description: "Apartamento com vista panorâmica do mar e varanda ampla."
    },
    {
      id: 3,
      title: "Cobertura Duplex Premium",
      price: "R$ 1.200.000",
      priceValue: 1200000,
      location: "Beira Mar, SP",
      locationKey: "beira-mar",
      bedrooms: 4,
      bathrooms: 3,
      area: "180m²",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&w=400&h=300&fit=crop",
      type: "cobertura",
      featured: true,
      description: "Cobertura duplex com terraço privativo e piscina."
    }
  ]

  // Função de filtro inteligente
  const filterProperties = (searchFilters) => {
    let filtered = [...properties]

    // Filtrar por localização
    if (searchFilters.location && searchFilters.location !== '') {
      filtered = filtered.filter(property => 
        property.locationKey === searchFilters.location
      )
    }

    // Filtrar por tipo
    if (searchFilters.type && searchFilters.type !== '') {
      filtered = filtered.filter(property => 
        property.type === searchFilters.type
      )
    }

    // Filtrar por faixa de preço
    if (searchFilters.priceRange && searchFilters.priceRange !== '') {
      filtered = filtered.filter(property => {
        const price = property.priceValue
        
        switch (searchFilters.priceRange) {
          case 'ate-500k':
            return price <= 500000
          case '500k-1m':
            return price > 500000 && price <= 1000000
          case 'acima-1m':
            return price > 1000000
          default:
            return true
        }
      })
    }

    return filtered
  }

  // Aplicar filtros se houver busca ativa
  const filteredProperties = searchResults 
    ? filterProperties(filters)
    : filter === 'all' 
      ? properties 
      : properties.filter(property => property.type === filter)

  const openImageModal = (imageUrl, title) => {
    setSelectedImage({ url: imageUrl, title })
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  const sendWhatsApp = (property) => {
    const message = `Olá! Tenho interesse no imóvel: ${property.title} - ${property.price}. Gostaria de mais informações.`
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }
  return (
    <section id="properties" ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${
          hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Nossos Imóveis em Destaque
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Selecionamos os melhores imóveis da região para você. Cada propriedade é cuidadosamente verificada.
          </p>
        </div>

        {/* Resultado da Busca */}
        {searchResults && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-blue-800">
                <strong>{filteredProperties.length}</strong> imóvel(is) encontrado(s)
                {filters.location && ` em ${filters.location.replace('-', ' ')}`}
                {filters.type && ` do tipo ${filters.type}`}
                {filters.priceRange && ` na faixa ${filters.priceRange}`}
              </p>
              <button
                onClick={onClearSearch}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Limpar busca ✕
              </button>
            </div>
          </div>
        )}

        {/* Filtros */}
        {!searchResults && (
          <div className={`flex justify-center mb-8 transition-all duration-1000 delay-200 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl shadow-md">
              {[
                { key: 'all', label: 'Todos' },
                { key: 'casa', label: 'Casas' },
                { key: 'apartamento', label: 'Apartamentos' },
                { key: 'cobertura', label: 'Coberturas' }
              ].map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filter === filterOption.key
                      ? 'bg-primary-blue text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grid de Propriedades */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
            <div 
              key={property.id} 
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group ${
                hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Badge de Destaque */}
              {property.featured && (
                <div className="absolute top-4 left-4 z-10 bg-primary-gold text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                  ⭐ Destaque
                </div>
              )}

              {/* Imagem com Hover Effect */}
              <div className="relative overflow-hidden">
                <LazyImage 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                  onClick={() => openImageModal(property.image, property.title)}
                />
                
                {/* Overlay com botões */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => openImageModal(property.image, property.title)}
                      className="bg-white text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-100 transition-colors"
                      aria-label="Ver imagem em tamanho maior"
                    >
                      🔍 Ampliar
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-blue transition-colors">
                  {property.title}
                </h3>
                <p className="text-primary-gray mb-2">{property.location}</p>
                <p className="text-gray-600 text-sm mb-3">{property.description}</p>
                <p className="text-2xl font-bold text-primary-blue mb-4">{property.price}</p>
                
                <div className="flex justify-between text-sm text-primary-gray mb-4 bg-gray-50 p-3 rounded-lg">
                  <span className="flex items-center">
                    🛏️ {property.bedrooms} quartos
                  </span>
                  <span className="flex items-center">
                    🚿 {property.bathrooms} banheiros
                  </span>
                  <span className="flex items-center">
                    📐 {property.area}
                  </span>
                </div>
                
                {/* Botões de Ação */}
                <div className="flex gap-2">
                  <button className="btn-primary flex-1 hover:scale-105 transform transition-all duration-200">
                    Ver Detalhes
                  </button>
                  <button 
                    onClick={() => sendWhatsApp(property)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center"
                    aria-label="Falar no WhatsApp sobre este imóvel"
                  >
                    📱
                  </button>
                </div>
              </div>
            </div>          ))}
        </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum imóvel encontrado com os filtros selecionados.
            </p>
            {searchResults && (
              <button
                onClick={onClearSearch}
                className="mt-4 btn-primary"
              >
                Ver todos os imóveis
              </button>
            )}
          </div>
        )}

        {/* Modal de Imagem */}
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeImageModal}
          imageUrl={selectedImage?.url}
          title={selectedImage?.title}
        />
      </div>
    </section>
  )
}

// Componente de Validação de Campo
const InputField = ({ label, type, name, value, onChange, required, placeholder, error, mask }) => {
  const [isFocused, setIsFocused] = useState(false)

  const applyMask = (value, maskType) => {
    if (!maskType) return value
    
    const numbers = value.replace(/\D/g, '')
    
    switch (maskType) {
      case 'phone':
        return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      case 'cpf':
        return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      default:
        return value
    }
  }

  const handleChange = (e) => {
    const maskedValue = applyMask(e.target.value, mask)
    onChange({ target: { name, value: maskedValue } })
  }

  return (
    <div className="relative">
      <label 
        htmlFor={name} 
        className={`block text-sm font-medium transition-colors duration-200 mb-2 ${
          error ? 'text-red-600' : isFocused ? 'text-primary-blue' : 'text-gray-700'
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
          error 
            ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
            : 'border-gray-300 focus:ring-2 focus:ring-primary-blue focus:border-transparent'
        } ${isFocused ? 'shadow-md' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600 animate-fadeIn">
          {error}
        </p>
      )}
      {/* Indicador de validação visual */}
      {value && !error && (
        <div className="absolute right-3 top-11 text-green-500">
          ✓
        </div>
      )}
    </div>
  )
}

// 4. COMPONENTE CONTACT MELHORADO
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 })

  // Validação em tempo real
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Nome deve ter pelo menos 2 caracteres' : ''
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? 'Email inválido' : ''
      case 'phone':
        const phoneNumbers = value.replace(/\D/g, '')
        return phoneNumbers.length !== 11 ? 'Telefone deve ter 11 dígitos' : ''
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Validação em tempo real
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validação completa
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'message') { // message é opcional
        const error = validateField(key, formData[key])
        if (error || !formData[key].trim()) {
          newErrors[key] = error || 'Campo obrigatório'
        }
      }
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        // Simular envio
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        
        // Limpar status após 5 segundos
        setTimeout(() => setSubmitStatus(null), 5000)
      } catch (error) {
        setSubmitStatus('error')
      }
    }

    setIsSubmitting(false)
  }

  return (
    <section id="contact" ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${
          hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Entre em Contato
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudar você a encontrar o imóvel perfeito. 
            Preencha o formulário e entraremos em contato rapidamente.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* Status de Envio */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fadeIn">
              ✅ Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fadeIn">
              ❌ Erro ao enviar mensagem. Tente novamente.
            </div>
          )}

          <form 
            onSubmit={handleSubmit} 
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Nome Completo"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Seu nome completo"
                error={errors.name}
              />
              
              <InputField
                label="E-mail"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
                error={errors.email}
              />
            </div>
            
            <InputField
              label="Telefone/WhatsApp"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="(11) 99999-9999"
              error={errors.phone}
              mask="phone"
            />
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem (Opcional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Conte-nos mais sobre o imóvel que você procura..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-none"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full text-lg py-4 rounded-lg font-semibold transition-all duration-200 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'btn-primary hover:scale-105 transform'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Solicitar Contato'
              )}
            </button>
          </form>

          {/* Informações de Contato */}
          <div className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📞</div>
              <h3 className="font-semibold text-gray-900 mb-1">Telefone</h3>
              <p className="text-gray-600">(11) 99999-9999</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📧</div>
              <h3 className="font-semibold text-gray-900 mb-1">E-mail</h3>
              <p className="text-gray-600">contato@praiabela.com</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-semibold text-gray-900 mb-1">Endereço</h3>
              <p className="text-gray-600">Praia Bela, SP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 5. COMPONENTE WHATSAPP BUTTON MELHORADO
function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  const whatsappNumber = "5511999999999"
  const message = "Olá! Vim do site da Praia Bela Imóveis e gostaria de mais informações."
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  // Horário de atendimento
  const isBusinessHours = () => {
    const now = new Date()
    const hour = now.getHours()
    const day = now.getDay() // 0 = domingo, 6 = sábado
    
    // Segunda a sexta: 8h às 18h, Sábado: 9h às 13h
    if (day >= 1 && day <= 5) {
      return hour >= 8 && hour < 18
    } else if (day === 6) {
      return hour >= 9 && hour < 13
    }
    return false
  }

  const [businessHours, setBusinessHours] = useState(isBusinessHours())

  useEffect(() => {
    // Mostrar botão após 3 segundos
    const timer = setTimeout(() => setIsVisible(true), 3000)
    
    // Simular contador de mensagens
    const messageTimer = setInterval(() => {
      setMessageCount(prev => (prev + 1) % 4) // 0 a 3
    }, 10000)

    // Verificar horário a cada minuto
    const hourTimer = setInterval(() => {
      setBusinessHours(isBusinessHours())
    }, 60000)

    return () => {
      clearTimeout(timer)
      clearInterval(messageTimer)
      clearInterval(hourTimer)
    }
  }, [])

  const handleClick = () => {
    // Analytics tracking aqui
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip de Horário */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg animate-fadeIn">
          <div className="mb-2">
            <strong>Horário de Atendimento:</strong>
          </div>
          <div>Segunda a Sexta: 8h às 18h</div>
          <div>Sábado: 9h às 13h</div>
          <div className="mt-2 text-xs text-gray-300">
            {businessHours ? '🟢 Online agora' : '🔴 Fora do horário'}
          </div>
          {/* Seta do tooltip */}
          <div className="absolute bottom-0 right-4 transform translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      )}

      {/* Botão Principal */}
      <div className="relative">        <button
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Falar no WhatsApp"
        >
          {/* Indicador de Status */}
          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            businessHours ? 'bg-green-400' : 'bg-red-400'
          }`}></div>          {/* Contador de Mensagens */}
          {messageCount > 0 && (
            <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {messageCount}
            </div>
          )}

          {/* Ícone do WhatsApp */}
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
          </svg>
        </button>

        {/* Texto Chamativo - sem animação */}
        <div className="absolute bottom-full right-0 mb-2 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-md text-sm whitespace-nowrap">
          💬 Fale conosco!
        </div>
      </div>
    </div>
  )
}

// APP PRINCIPAL
function App() {
  // Estado global para filtros
  const [globalFilters, setGlobalFilters] = useState({
    location: '',
    type: '',
    priceRange: ''
  })
  const [searchResults, setSearchResults] = useState(null)

  return (
    <div className="min-h-screen">
      <Header />
      <Hero 
        onSearch={(filters) => {
          setGlobalFilters(filters)
          setSearchResults(filters)
        }} 
      />
      <Properties 
        filters={globalFilters}
        searchResults={searchResults}
        onClearSearch={() => setSearchResults(null)}
      />
      <Contact />
      <WhatsAppButton />
    </div>
  )
}

export default App
