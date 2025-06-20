import React from 'react';
import PropTypes from 'prop-types';
import { 
  FaBars, 
  FaTimes, 
  FaSearch, 
  FaHome, 
  FaBuilding, 
  FaInfoCircle, 
  FaPhone 
} from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import { useActiveSection, useScrollTo } from '../hooks';

function Header() {
  const { 
    ui: { isMenuOpen, currentSection },
    setUIState
  } = useAppContext();

  const scrollTo = useScrollTo();
  const activeSection = useActiveSection(['home', 'properties', 'financing', 'testimonials', 'regions', 'blog', 'contact']);

  const menuItems = [
    { id: 'home', label: 'Início', icon: FaHome },
    { id: 'properties', label: 'Imóveis', icon: FaBuilding },
    { id: 'financing', label: 'Financiamento', icon: FaInfoCircle },
    { id: 'contact', label: 'Contato', icon: FaPhone }
  ];

  const handleMenuClick = (sectionId) => {
    scrollTo(sectionId, 80);
    setUIState({ isMenuOpen: false });
  };

  const toggleMenu = () => {
    setUIState({ isMenuOpen: !isMenuOpen });
  };

  const handleSearchToggle = () => {
    setUIState({ isSearchOpen: true });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => handleMenuClick('home')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <FaBuilding className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 group-hover:text-primary-blue transition-colors duration-300">
                  Praia Bela
                </h1>
                <p className="text-xs text-gray-500 leading-tight">Imóveis</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-primary-blue/10 ${
                    activeSection === item.id
                      ? 'text-primary-blue bg-primary-blue/10 font-semibold'
                      : 'text-gray-600 hover:text-primary-blue'
                  }`}
                >
                  <item.icon className="text-sm" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Search & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={handleSearchToggle}
                className="p-2 rounded-lg bg-gray-100 hover:bg-primary-blue hover:text-white transition-all duration-300"
                aria-label="Buscar"
              >
                <FaSearch className="text-lg" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-primary-blue hover:text-white transition-all duration-300"
                aria-label="Menu"
              >
                {isMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-primary-blue text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="text-lg" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Breadcrumb */}
        {activeSection && activeSection !== 'home' && (
          <div className="border-t border-gray-200 bg-gray-50/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <button
                  onClick={() => handleMenuClick('home')}
                  className="hover:text-primary-blue transition-colors duration-300"
                >
                  Início
                </button>
                <span>/</span>
                <span className="text-primary-blue font-medium">
                  {menuItems.find(item => item.id === activeSection)?.label}
                </span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer para compensar header fixo */}
      <div className="h-20"></div>
    </>
  );
}

Header.propTypes = {};

export default Header;
