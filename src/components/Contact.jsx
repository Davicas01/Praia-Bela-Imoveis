import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaInstagram, 
  FaFacebook,
  FaPaperPlane,
  FaSpinner
} from 'react-icons/fa';
import { useIntersectionObserver } from '../hooks';

function Contact() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Telefone inválido (xx) xxxxx-xxxx';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePhoneChange = (value) => {
    // Máscara para telefone
    const phone = value.replace(/\D/g, '');
    let formattedPhone = '';
    
    if (phone.length > 0) {
      formattedPhone = `(${phone.slice(0, 2)}`;
      if (phone.length > 2) {
        formattedPhone += `) ${phone.slice(2, 7)}`;
        if (phone.length > 7) {
          formattedPhone += `-${phone.slice(7, 11)}`;
        }
      }
    }
    
    handleInputChange('phone', formattedPhone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simular envio de formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirecionar para WhatsApp
      const message = `Olá! Meu nome é ${formData.name}. ${formData.message}`;
      window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank');
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        interest: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          hasIntersected ? 'animate-fadeIn' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Entre em <span className="text-primary-blue">Contato</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos prontos para ajudar você a encontrar o imóvel dos seus sonhos
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulário */}
            <div className={`transition-all duration-1000 delay-200 ${
              hasIntersected ? 'animate-slideInLeft' : 'opacity-0 translate-x-10'
            }`}>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Envie sua Mensagem
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors duration-300 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors duration-300 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="seu@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefone *
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors duration-300 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="(11) 99999-9999"
                        maxLength="15"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Interesse */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Interesse
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => handleInputChange('interest', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="comprar">Comprar Imóvel</option>
                      <option value="vender">Vender Imóvel</option>
                      <option value="alugar">Alugar Imóvel</option>
                      <option value="financiamento">Financiamento</option>
                      <option value="avaliacao">Avaliação</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows="4"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-none transition-colors duration-300 ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Conte-nos mais sobre o que você procura..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Status de Envio */}
                  {submitStatus === 'success' && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                      Mensagem enviada com sucesso! Redirecionando para WhatsApp...
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                      Erro ao enviar mensagem. Tente novamente.
                    </div>
                  )}

                  {/* Botão de Envio */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-blue to-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Enviar Mensagem</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Informações de Contato */}
            <div className={`transition-all duration-1000 delay-400 ${
              hasIntersected ? 'animate-slideInRight' : 'opacity-0 translate-x-10'
            }`}>
              <div className="space-y-8">
                {/* Contato Direto */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Contato Direto
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FaWhatsapp className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">WhatsApp</h4>
                        <p className="text-gray-600">(11) 99999-9999</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaPhone className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Telefone</h4>
                        <p className="text-gray-600">(11) 3333-4444</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <FaEnvelope className="text-yellow-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Email</h4>
                        <p className="text-gray-600">contato@praiabelaimoveis.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <FaMapMarkerAlt className="text-red-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Endereço</h4>
                        <p className="text-gray-600">
                          Av. Beira Mar, 123<br/>
                          Praia Bela - SP, 11000-000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horário de Atendimento */}
                <div className="bg-gradient-to-br from-primary-blue to-blue-600 rounded-2xl shadow-lg p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">
                    Horário de Atendimento
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Segunda a Sexta</span>
                      <span className="font-semibold">8h às 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado</span>
                      <span className="font-semibold">8h às 14h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo</span>
                      <span className="font-semibold">Fechado</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm opacity-90">
                      Atendimento via WhatsApp disponível 24h
                    </p>
                  </div>
                </div>

                {/* Redes Sociais */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Siga-nos
                  </h3>
                  
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white hover:from-purple-700 hover:to-pink-700 transition-colors duration-300"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-colors duration-300"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Contact.propTypes = {};

export default Contact;
