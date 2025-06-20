import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  FaDollarSign, 
  FaCalendarAlt, 
  FaPercentage, 
  FaFileInvoiceDollar,
  FaChartBar 
} from 'react-icons/fa';
import { useIntersectionObserver } from '../hooks';

function FinancingCalculator() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });
  
  const [formData, setFormData] = useState({
    propertyValue: 500000,
    downPayment: 100000,
    termYears: 30,
    interestRate: 8.5
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPaid: 0,
    totalInterest: 0,
    financeAmount: 0
  });

  const [isCalculating, setIsCalculating] = useState(false);

  // Calcular financiamento
  useEffect(() => {
    setIsCalculating(true);
    
    const timer = setTimeout(() => {
      const { propertyValue, downPayment, termYears, interestRate } = formData;
      
      const financeAmount = propertyValue - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      const numPayments = termYears * 12;
      
      let monthlyPayment = 0;
      if (monthlyRate > 0) {
        monthlyPayment = financeAmount * 
          (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
          (Math.pow(1 + monthlyRate, numPayments) - 1);
      } else {
        monthlyPayment = financeAmount / numPayments;
      }
      
      const totalPaid = monthlyPayment * numPayments + downPayment;
      const totalInterest = totalPaid - propertyValue;
      
      setResults({
        monthlyPayment,
        totalPaid,
        totalInterest,
        financeAmount
      });
      
      setIsCalculating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getProgressBarWidth = (value, max) => {
    return Math.min((value / max) * 100, 100);
  };

  return (
    <section 
      id="financing" 
      ref={ref}
      className="py-16 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          hasIntersected ? 'animate-fadeIn' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Simulador de <span className="text-primary-blue">Financiamento</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calcule sua parcela e descubra como realizar o sonho da casa própria
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulário de Cálculo */}
            <div className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-1000 delay-200 ${
              hasIntersected ? 'animate-slideInLeft' : 'opacity-0 translate-x-10'
            }`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaFileInvoiceDollar className="text-primary-blue mr-3" />
                Dados do Financiamento
              </h3>

              <div className="space-y-6">
                {/* Valor do Imóvel */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Valor do Imóvel
                  </label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={formData.propertyValue}
                      onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      placeholder="500000"
                    />
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {formatCurrency(formData.propertyValue)}
                  </div>
                </div>

                {/* Entrada */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Entrada ({((formData.downPayment / formData.propertyValue) * 100).toFixed(1)}%)
                  </label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="range"
                      min={formData.propertyValue * 0.1}
                      max={formData.propertyValue * 0.8}
                      value={formData.downPayment}
                      onChange={(e) => handleInputChange('downPayment', e.target.value)}
                      className="w-full mb-2"
                    />
                    <input
                      type="number"
                      value={formData.downPayment}
                      onChange={(e) => handleInputChange('downPayment', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    />
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {formatCurrency(formData.downPayment)}
                  </div>
                </div>

                {/* Prazo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prazo (anos)
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="range"
                      min="10"
                      max="35"
                      value={formData.termYears}
                      onChange={(e) => handleInputChange('termYears', e.target.value)}
                      className="w-full mb-2"
                    />
                    <input
                      type="number"
                      value={formData.termYears}
                      onChange={(e) => handleInputChange('termYears', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      min="10"
                      max="35"
                    />
                  </div>
                </div>

                {/* Taxa de Juros */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Taxa de Juros (% ao ano)
                  </label>
                  <div className="relative">
                    <FaPercentage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      step="0.1"
                      value={formData.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-1000 delay-400 ${
              hasIntersected ? 'animate-slideInRight' : 'opacity-0 translate-x-10'
            }`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaChartBar className="text-primary-gold mr-3" />
                Resultado da Simulação
              </h3>

              {isCalculating ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Parcela Mensal */}
                  <div className="bg-gradient-to-r from-primary-blue to-blue-600 rounded-xl p-6 text-white">
                    <div className="text-sm opacity-90 mb-1">Parcela Mensal</div>
                    <div className="text-3xl font-bold">
                      {formatCurrency(results.monthlyPayment)}
                    </div>
                  </div>

                  {/* Detalhes */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Valor Financiado</span>
                      <span className="font-semibold text-gray-800">
                        {formatCurrency(results.financeAmount)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Total a Pagar</span>
                      <span className="font-semibold text-gray-800">
                        {formatCurrency(results.totalPaid)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Total de Juros</span>
                      <span className="font-semibold text-red-600">
                        {formatCurrency(results.totalInterest)}
                      </span>
                    </div>
                  </div>

                  {/* Gráfico de Barras */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Composição do Pagamento</h4>
                    
                    <div className="space-y-3">
                      {/* Entrada */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Entrada</span>
                          <span>{formatCurrency(formData.downPayment)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${getProgressBarWidth(formData.downPayment, results.totalPaid)}%` 
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Principal */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Principal Financiado</span>
                          <span>{formatCurrency(results.financeAmount)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-primary-blue h-3 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${getProgressBarWidth(results.financeAmount, results.totalPaid)}%` 
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Juros */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Juros</span>
                          <span>{formatCurrency(results.totalInterest)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-red-500 h-3 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${getProgressBarWidth(results.totalInterest, results.totalPaid)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botão de Ação */}
                  <button className="w-full bg-gradient-to-r from-primary-gold to-yellow-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Solicitar Pré-Aprovação
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Dicas */}
          <div className={`mt-12 bg-white rounded-2xl shadow-xl p-8 transition-all duration-1000 delay-600 ${
            hasIntersected ? 'animate-fadeIn' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Dicas para um Bom Financiamento
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaDollarSign className="text-2xl text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Entrada Maior</h4>
                <p className="text-gray-600 text-sm">
                  Quanto maior a entrada, menor será sua parcela mensal e o total de juros pagos.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCalendarAlt className="text-2xl text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Prazo Adequado</h4>
                <p className="text-gray-600 text-sm">
                  Escolha um prazo que caiba no seu orçamento sem comprometer sua qualidade de vida.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPercentage className="text-2xl text-yellow-600" />
                </div>
                <h4 className="font-semibold mb-2">Compare Taxas</h4>
                <p className="text-gray-600 text-sm">
                  Pesquise diferentes bancos e negocie as melhores condições para seu perfil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

FinancingCalculator.propTypes = {};

export default FinancingCalculator;
