import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBuilding, FaImages, FaPhone, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

function Header() {
  const location = useLocation();
  const { state, setUIState } = useAppContext() || {}; // Adicionar fallback para caso o contexto não esteja disponível
  const headerRef = useRef(null);
  
  // Estado local para menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Detectar scroll para adicionar sombra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setSearchOpen(false);
      }
    };

    if (isMenuOpen || searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, searchOpen]);

  // Fechar menu ao redimensionar tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { path: '/', label: 'Início', icon: FaHome },
    { path: '/imoveis', label: 'Imóveis', icon: FaBuilding },
    { path: '/galeria', label: 'Galeria', icon: FaImages },
    { path: '/contato', label: 'Contato', icon: FaPhone }
  ];  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const getBreadcrumbs = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : 'Início';
  };
  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-xl' 
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      ><div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo elaborado mais moderno */}
            <Link 
              to="/" 
              className="flex items-center space-x-4 group flex-shrink-0"
              onClick={closeMenu}
            >
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-blue via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <FaBuilding className="text-white text-2xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary-gold to-yellow-500 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>              <div className="hidden sm:block">
                <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-primary-blue via-blue-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                  Costa Sul
                </h1>
                <p className="text-xs lg:text-sm font-medium text-primary-gold -mt-1 tracking-wide">
                  IMÓVEIS PREMIUM
                </p>
              </div>
            </Link>            {/* Menu Desktop centralizado */}
            <nav className="hidden lg:flex flex-1 justify-center">
              <div className="flex items-center space-x-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMenu}
                      className={`group relative px-6 lg:px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                        isActivePath(item.path)
                          ? 'bg-gradient-to-r from-primary-blue to-blue-600 text-white shadow-xl'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-primary-blue/10 hover:to-blue-600/10 hover:text-primary-blue'
                      }`}
                    >
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <Icon className={`text-base lg:text-lg transition-all duration-300 ${
                          isActivePath(item.path) ? 'text-white' : 'text-primary-blue group-hover:scale-110'
                        }`} />
                        <span className="text-sm lg:text-base">{item.label}</span>
                      </div>
                      
                      {/* Indicator animado melhorado */}
                      {isActivePath(item.path) && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-primary-gold rounded-full"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Breadcrumbs e Ações à direita */}
            <div className="flex items-center space-x-4">
              {/* Breadcrumbs para desktop */}
              <div className="hidden lg:flex items-center text-sm text-gray-600">
                <Link to="/" className="hover:text-primary-blue transition-colors">
                  Início
                </Link>
                {location.pathname !== '/' && (
                  <>
                    <span className="mx-2">/</span>
                    <span className="text-primary-blue font-medium">
                      {getBreadcrumbs()}
                    </span>
                  </>
                )}
              </div>

              {/* Busca rápida */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-primary-blue hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                <FaSearch />
              </button>              {/* Menu Hambúrguer */}
              <button
                onClick={toggleMenu}
                className={`lg:hidden p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isMenuOpen 
                    ? 'bg-primary-blue text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-primary-blue'
                }`}
                aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <div className={`absolute transition-all duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}>
                    {isMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
                  </div>
                </div>
              </button>
            </div>
          </div>          {/* Busca expandida mobile */}
          {searchOpen && (
            <div className="lg:hidden pb-4 animate-fadeIn">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar imóveis..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>        {/* Menu Mobile Dropdown */}
        <div className={`lg:hidden bg-white border-t border-gray-100 shadow-lg transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="container mx-auto px-4 py-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                      isActivePath(item.path)
                        ? 'bg-gradient-to-r from-primary-blue to-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-blue'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    <Icon className={`text-lg transition-all duration-300 ${
                      isActivePath(item.path) ? 'text-white' : 'text-primary-blue'
                    }`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Informações de contato no menu mobile */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">Entre em contato</p>
                <a 
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-green-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={closeMenu}
                >
                  <span>WhatsApp: (11) 99999-9999</span>
                </a>
              </div>
            </div>
          </nav>        </div>
      </header>

      {/* Overlay para menu mobile */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Espacamento para header fixo */}
      <div className="h-20"></div>
    </>
  );
}

Header.propTypes = {};

export default Header;
