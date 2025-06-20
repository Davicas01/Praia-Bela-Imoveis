import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

// Estado inicial
const initialState = {
  // Filtros globais
  filters: {
    location: '',
    type: '',
    priceRange: '',
    bedrooms: '',
    area: { min: 50, max: 500 },
    garage: false,
    pool: false,
    furnished: false,
    balcony: false
  },
  
  // Propriedades
  properties: [
    {
      id: 1,
      title: "Casa de Praia Moderna",
      price: 850000,
      priceFormatted: "R$ 850.000",
      location: "Praia Bela, SP",
      locationKey: "praia-bela",
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      garage: true,
      pool: false,
      furnished: true,
      balcony: true,
      type: "casa",
      featured: true,
      description: "Casa moderna com acabamento de luxo e vista para o mar.",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour1",
      rating: 4.8,
      views: 145,
      createdAt: "2025-06-15"
    },
    {
      id: 2,
      title: "Apartamento Vista Mar",
      price: 650000,
      priceFormatted: "R$ 650.000",
      location: "Centro, SP",
      locationKey: "centro",
      bedrooms: 2,
      bathrooms: 2,
      area: 95,
      garage: true,
      pool: true,
      furnished: false,
      balcony: true,
      type: "apartamento",
      featured: false,
      description: "Apartamento com vista panorâmica do mar e varanda ampla.",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour2",
      rating: 4.5,
      views: 89,
      createdAt: "2025-06-10"
    },
    {
      id: 3,
      title: "Cobertura Duplex Premium",
      price: 1200000,
      priceFormatted: "R$ 1.200.000",
      location: "Beira Mar, SP",
      locationKey: "beira-mar",
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      garage: true,
      pool: true,
      furnished: true,
      balcony: true,
      type: "cobertura",
      featured: true,
      description: "Cobertura duplex com terraço privativo e piscina.",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour3",
      rating: 4.9,
      views: 203,
      createdAt: "2025-06-12"
    }
  ],
  
  // Sistema de favoritos
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  
  // Sistema de comparação
  comparison: JSON.parse(localStorage.getItem('comparison') || '[]'),
  
  // Configurações do usuário
  userPreferences: {
    theme: localStorage.getItem('theme') || 'light',
    cookiesAccepted: localStorage.getItem('cookiesAccepted') === 'true',
    notifications: localStorage.getItem('notifications') === 'true'
  },
  
  // Estado da UI
  ui: {
    isMenuOpen: false,
    isSearchOpen: false,
    isFilterOpen: false,
    isChatOpen: false,
    isComparisonOpen: false,
    loading: false,
    currentSection: 'home'
  }
};

// Actions
const actions = {
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  ADD_TO_COMPARISON: 'ADD_TO_COMPARISON',
  REMOVE_FROM_COMPARISON: 'REMOVE_FROM_COMPARISON',
  CLEAR_COMPARISON: 'CLEAR_COMPARISON',
  SET_USER_PREFERENCES: 'SET_USER_PREFERENCES',
  SET_UI_STATE: 'SET_UI_STATE',
  SET_LOADING: 'SET_LOADING',
  SET_CURRENT_SECTION: 'SET_CURRENT_SECTION'
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case actions.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
      
    case actions.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters
      };
      
    case actions.ADD_TO_FAVORITES:
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return {
        ...state,
        favorites: newFavorites
      };
      
    case actions.REMOVE_FROM_FAVORITES:
      const filteredFavorites = state.favorites.filter(id => id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
      return {
        ...state,
        favorites: filteredFavorites
      };
      
    case actions.ADD_TO_COMPARISON:
      if (state.comparison.length >= 3) return state;
      const newComparison = [...state.comparison, action.payload];
      localStorage.setItem('comparison', JSON.stringify(newComparison));
      return {
        ...state,
        comparison: newComparison
      };
      
    case actions.REMOVE_FROM_COMPARISON:
      const filteredComparison = state.comparison.filter(id => id !== action.payload);
      localStorage.setItem('comparison', JSON.stringify(filteredComparison));
      return {
        ...state,
        comparison: filteredComparison
      };
      
    case actions.CLEAR_COMPARISON:
      localStorage.removeItem('comparison');
      return {
        ...state,
        comparison: []
      };
      
    case actions.SET_USER_PREFERENCES:
      const newPreferences = { ...state.userPreferences, ...action.payload };
      Object.keys(action.payload).forEach(key => {
        localStorage.setItem(key, action.payload[key]);
      });
      return {
        ...state,
        userPreferences: newPreferences
      };
      
    case actions.SET_UI_STATE:
      return {
        ...state,
        ui: { ...state.ui, ...action.payload }
      };
      
    case actions.SET_LOADING:
      return {
        ...state,
        ui: { ...state.ui, loading: action.payload }
      };
      
    case actions.SET_CURRENT_SECTION:
      return {
        ...state,
        ui: { ...state.ui, currentSection: action.payload }
      };
      
    default:
      return state;
  }
}

// Context
const AppContext = createContext();

// Provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Actions creators
  const setFilters = (filters) => {
    dispatch({ type: actions.SET_FILTERS, payload: filters });
  };
  
  const resetFilters = () => {
    dispatch({ type: actions.RESET_FILTERS });
  };
  
  const addToFavorites = (propertyId) => {
    dispatch({ type: actions.ADD_TO_FAVORITES, payload: propertyId });
  };
  
  const removeFromFavorites = (propertyId) => {
    dispatch({ type: actions.REMOVE_FROM_FAVORITES, payload: propertyId });
  };
  
  const addToComparison = (propertyId) => {
    dispatch({ type: actions.ADD_TO_COMPARISON, payload: propertyId });
  };
  
  const removeFromComparison = (propertyId) => {
    dispatch({ type: actions.REMOVE_FROM_COMPARISON, payload: propertyId });
  };
  
  const clearComparison = () => {
    dispatch({ type: actions.CLEAR_COMPARISON });
  };
  
  const setUserPreferences = (preferences) => {
    dispatch({ type: actions.SET_USER_PREFERENCES, payload: preferences });
  };
  
  const setUIState = (uiState) => {
    dispatch({ type: actions.SET_UI_STATE, payload: uiState });
  };
  
  const setLoading = (loading) => {
    dispatch({ type: actions.SET_LOADING, payload: loading });
  };
  
  const setCurrentSection = (section) => {
    dispatch({ type: actions.SET_CURRENT_SECTION, payload: section });
  };
  
  // Filtrar propriedades
  const getFilteredProperties = () => {
    let filtered = state.properties;
    
    if (state.filters.location) {
      filtered = filtered.filter(p => p.locationKey === state.filters.location);
    }
    
    if (state.filters.type) {
      filtered = filtered.filter(p => p.type === state.filters.type);
    }
    
    if (state.filters.priceRange) {
      filtered = filtered.filter(p => {
        switch (state.filters.priceRange) {
          case 'ate-500k': return p.price <= 500000;
          case '500k-1m': return p.price > 500000 && p.price <= 1000000;
          case 'acima-1m': return p.price > 1000000;
          default: return true;
        }
      });
    }
    
    if (state.filters.bedrooms) {
      const bedrooms = parseInt(state.filters.bedrooms);
      if (bedrooms === 4) {
        filtered = filtered.filter(p => p.bedrooms >= 4);
      } else {
        filtered = filtered.filter(p => p.bedrooms === bedrooms);
      }
    }
    
    if (state.filters.area.min || state.filters.area.max) {
      filtered = filtered.filter(p => 
        p.area >= state.filters.area.min && p.area <= state.filters.area.max
      );
    }
    
    if (state.filters.garage) {
      filtered = filtered.filter(p => p.garage);
    }
    
    if (state.filters.pool) {
      filtered = filtered.filter(p => p.pool);
    }
    
    if (state.filters.furnished) {
      filtered = filtered.filter(p => p.furnished);
    }
    
    if (state.filters.balcony) {
      filtered = filtered.filter(p => p.balcony);
    }
    
    return filtered;
  };
  
  const value = {
    ...state,
    setFilters,
    resetFilters,
    addToFavorites,
    removeFromFavorites,
    addToComparison,
    removeFromComparison,
    clearComparison,
    setUserPreferences,
    setUIState,
    setLoading,
    setCurrentSection,
    getFilteredProperties
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Hook para usar o contexto
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  return context;
}

export default AppContext;
