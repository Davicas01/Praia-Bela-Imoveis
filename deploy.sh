#!/bin/bash

# SCRIPT DE DEPLOY AUTOMÁTICO PARA VERCEL
# Execute este arquivo para fazer deploy completo

echo "🚀 INICIANDO DEPLOY DA LANDING PAGE IMOBILIÁRIA"
echo "=============================================="

# 1. Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na pasta do projeto"
    exit 1
fi

# 2. Instalar dependências se necessário
echo "📦 Verificando dependências..."
npm install

# 3. Executar build de produção
echo "🔨 Executando build..."
npm run build

# 4. Verificar se build foi bem-sucedido
if [ $? -eq 0 ]; then
    echo "✅ Build executado com sucesso!"
    echo ""
    echo "📋 PRÓXIMOS PASSOS PARA DEPLOY:"
    echo "1. Acesse: https://vercel.com/new"
    echo "2. Conecte seu GitHub"
    echo "3. Selecione o repositório: Costa-Sul-Imobilira-DS-Agency-Dev-"
    echo "4. Configure:"
    echo "   - Framework Preset: React"
    echo "   - Build Command: npm run build"
    echo "   - Output Directory: dist"
    echo "5. Clique em 'Deploy'"
    echo ""
    echo "🌐 Seu site estará online em 2-3 minutos!"
    echo "📱 URL será algo como: https://costa-sul-imobilira-ds-agency-dev.vercel.app"
else
    echo "❌ Erro no build. Verifique os logs acima."
    exit 1
fi
