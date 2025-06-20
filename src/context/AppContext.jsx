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
    },    {
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
    },
    {
      id: 4,
      title: "Casa Colonial Reformada",
      price: 720000,
      priceFormatted: "R$ 720.000",
      location: "Centro Histórico, SP",
      locationKey: "centro-historico",
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      garage: true,
      pool: false,
      furnished: false,
      balcony: false,
      type: "casa",
      featured: false,
      description: "Casa colonial totalmente reformada no coração da cidade.",
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour4",
      rating: 4.3,
      views: 67,
      createdAt: "2025-06-08"
    },
    {
      id: 5,
      title: "Apartamento Studio Moderno",
      price: 380000,
      priceFormatted: "R$ 380.000",
      location: "Jardins, SP",
      locationKey: "jardins",
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      garage: false,
      pool: true,
      furnished: true,
      balcony: true,
      type: "apartamento",
      featured: false,
      description: "Studio moderno e funcional em condomínio completo.",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour5",
      rating: 4.1,
      views: 95,
      createdAt: "2025-06-14"
    },
    {
      id: 6,
      title: "Villa Luxuosa com Piscina",
      price: 2500000,
      priceFormatted: "R$ 2.500.000",
      location: "Alto Padrão, SP",
      locationKey: "alto-padrao",
      bedrooms: 5,
      bathrooms: 4,
      area: 350,
      garage: true,
      pool: true,
      furnished: false,
      balcony: true,
      type: "casa",
      featured: true,
      description: "Villa de alto padrão com arquitetura contemporânea.",
      images: [
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour6",
      rating: 5.0,
      views: 312,
      createdAt: "2025-06-16"
    },
    {
      id: 7,
      title: "Loft Industrial Convertido",
      price: 550000,
      priceFormatted: "R$ 550.000",
      location: "Zona Industrial, SP",
      locationKey: "zona-industrial",
      bedrooms: 1,
      bathrooms: 1,
      area: 80,
      garage: true,
      pool: false,
      furnished: true,
      balcony: false,
      type: "apartamento",
      featured: false,
      description: "Loft único em antigo galpão industrial reformado.",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour7",
      rating: 4.6,
      views: 143,
      createdAt: "2025-06-11"
    },
    {
      id: 8,
      title: "Cobertura com Roof Garden",
      price: 1800000,
      priceFormatted: "R$ 1.800.000",
      location: "Vila Nova, SP",
      locationKey: "vila-nova",
      bedrooms: 3,
      bathrooms: 3,
      area: 200,
      garage: true,
      pool: true,
      furnished: false,
      balcony: true,
      type: "cobertura",
      featured: true,
      description: "Cobertura exclusiva com jardim suspenso e área gourmet.",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour8",
      rating: 4.8,
      views: 289,
      createdAt: "2025-06-13"
    },
    {
      id: 9,
      title: "Apartamento Família Completo",
      price: 480000,
      priceFormatted: "R$ 480.000",
      location: "Residencial, SP",
      locationKey: "residencial",
      bedrooms: 3,
      bathrooms: 2,
      area: 85,
      garage: true,
      pool: true,
      furnished: false,
      balcony: true,
      type: "apartamento",
      featured: false,
      description: "Apartamento ideal para famílias em condomínio clube.",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour9",
      rating: 4.4,
      views: 178,
      createdAt: "2025-06-09"
    },
    {
      id: 10,
      title: "Casa de Campo Rústica",
      price: 650000,
      priceFormatted: "R$ 650.000",
      location: "Interior, SP",
      locationKey: "interior",
      bedrooms: 4,
      bathrooms: 2,
      area: 200,
      garage: true,
      pool: false,
      furnished: false,
      balcony: true,
      type: "casa",
      featured: false,
      description: "Casa de campo com muito verde e tranquilidade.",
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour10",
      rating: 4.2,
      views: 76,
      createdAt: "2025-06-07"
    },
    {
      id: 11,
      title: "Penthouse Urbano Premium",
      price: 3200000,
      priceFormatted: "R$ 3.200.000",
      location: "Centro Financeiro, SP",
      locationKey: "centro-financeiro",
      bedrooms: 4,
      bathrooms: 4,
      area: 280,
      garage: true,
      pool: true,
      furnished: true,
      balcony: true,
      type: "cobertura",
      featured: true,
      description: "Penthouse de luxo no coração financeiro da cidade.",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour11",
      rating: 5.0,
      views: 445,
      createdAt: "2025-06-18"
    },
    {
      id: 12,
      title: "Sobrado Moderno Familiar",
      price: 890000,
      priceFormatted: "R$ 890.000",
      location: "Condomínio Fechado, SP",
      locationKey: "condominio-fechado",
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      garage: true,
      pool: true,
      furnished: false,
      balcony: true,
      type: "casa",
      featured: false,
      description: "Sobrado moderno em condomínio fechado com segurança 24h.",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour12",
      rating: 4.7,
      views: 234,
      createdAt: "2025-06-15"
    },
    {
      id: 13,
      title: "Apartamento Compacto Smart",
      price: 320000,
      priceFormatted: "R$ 320.000",
      location: "Nova Cidade, SP",
      locationKey: "nova-cidade",
      bedrooms: 2,
      bathrooms: 1,
      area: 55,
      garage: false,
      pool: true,
      furnished: true,
      balcony: false,
      type: "apartamento",
      featured: false,
      description: "Apartamento compacto com tecnologia smart home.",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour13",
      rating: 4.0,
      views: 89,
      createdAt: "2025-06-06"
    },
    {
      id: 14,
      title: "Casa de Praia Exclusiva",
      price: 1950000,
      priceFormatted: "R$ 1.950.000",
      location: "Praia Exclusiva, SP",
      locationKey: "praia-exclusiva",
      bedrooms: 5,
      bathrooms: 4,
      area: 300,
      garage: true,
      pool: true,
      furnished: true,
      balcony: true,
      type: "casa",
      featured: true,
      description: "Casa de praia com acesso privativo à areia e deck completo.",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour14",
      rating: 4.9,
      views: 367,
      createdAt: "2025-06-17"
    },    {
      id: 15,
      title: "Duplex Contemporâneo",
      price: 780000,
      priceFormatted: "R$ 780.000",
      location: "Área Nobre, SP",
      locationKey: "area-nobre",
      bedrooms: 3,
      bathrooms: 2,
      area: 140,
      garage: true,
      pool: false,
      furnished: false,
      balcony: true,
      type: "apartamento",
      featured: false,
      description: "Duplex contemporâneo com design arrojado e acabamentos premium.",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour15",
      rating: 4.5,
      views: 156,
      createdAt: "2025-06-05"
    },
    {
      id: 16,
      title: "Casa Minimalista Zen",
      price: 920000,
      priceFormatted: "R$ 920.000",
      location: "Bosque Verde, SP",
      locationKey: "bosque-verde",
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
      garage: true,
      pool: true,
      furnished: false,
      balcony: true,
      type: "casa",
      featured: false,
      description: "Casa com design minimalista, jardim zen e muito contato com a natureza.",
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour16",
      rating: 4.6,
      views: 201,
      createdAt: "2025-06-04"
    },
    {
      id: 17,
      title: "Apartamento Executivo Central",
      price: 450000,
      priceFormatted: "R$ 450.000",
      location: "Centro Executivo, SP",
      locationKey: "centro-executivo",
      bedrooms: 2,
      bathrooms: 2,
      area: 75,
      garage: true,
      pool: true,
      furnished: true,
      balcony: true,
      type: "apartamento",
      featured: false,
      description: "Apartamento executivo mobiliado no centro financeiro da cidade.",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour17",
      rating: 4.3,
      views: 134,
      createdAt: "2025-06-03"
    },
    {
      id: 18,
      title: "Mansão Colonial Premium",
      price: 4500000,
      priceFormatted: "R$ 4.500.000",
      location: "Alto Luxo, SP",
      locationKey: "alto-luxo",
      bedrooms: 6,
      bathrooms: 5,
      area: 500,
      garage: true,
      pool: true,
      furnished: false,
      balcony: true,
      type: "casa",
      featured: true,
      description: "Mansão colonial de luxo com arquitetura clássica e jardins paisagísticos.",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour18",
      rating: 5.0,
      views: 678,
      createdAt: "2025-06-19"
    },
    {
      id: 19,
      title: "Cobertura Vista Panorâmica",
      price: 2200000,
      priceFormatted: "R$ 2.200.000",
      location: "Mirante Alto, SP",
      locationKey: "mirante-alto",
      bedrooms: 4,
      bathrooms: 4,
      area: 250,
      garage: true,
      pool: true,
      furnished: true,
      balcony: true,
      type: "cobertura",
      featured: true,
      description: "Cobertura com vista panorâmica 360° da cidade e terraço gourmet completo.",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour19",
      rating: 4.9,
      views: 456,
      createdAt: "2025-06-16"
    },
    {
      id: 20,
      title: "Casa Sustentável Eco",
      price: 680000,
      priceFormatted: "R$ 680.000",
      location: "Eco Village, SP",
      locationKey: "eco-village",
      bedrooms: 3,
      bathrooms: 2,
      area: 160,
      garage: true,
      pool: false,
      furnished: false,
      balcony: true,
      type: "casa",
      featured: false,
      description: "Casa sustentável com energia solar, cisterna e materiais ecológicos.",
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3"
      ],
      virtualTour: "https://example.com/tour20",
      rating: 4.4,
      views: 178,
      createdAt: "2025-06-02"
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
    console.warn('useAppContext foi chamado fora do AppContextProvider');
    // Retornar um objeto vazio em vez de lançar erro
    return { 
      state: { 
        ui: { isMenuOpen: false },
        filters: {},
        properties: [],
        favorites: [],
        comparison: []
      }, 
      setUIState: () => {},
      setFilters: () => {},
      toggleFavorite: () => {},
      toggleComparison: () => {}
    };
  }
  return context;
}

export default AppContext;
