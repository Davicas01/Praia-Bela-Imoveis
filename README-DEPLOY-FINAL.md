# 🏠 Deploy - Praia Bela Imóveis

## ✅ Configuração do Deploy GitHub Pages

### Passos para ativar o deploy automático:

1. **Vá para o repositório no GitHub**
   - Acesse: `https://github.com/davicas01/Praia-Bela-Imoveis`

2. **Configure o GitHub Pages**
   - Vá em `Settings` > `Pages` (no menu lateral esquerdo)
   - Em "Source", selecione **"GitHub Actions"**
   - ⚠️ **NÃO selecione "Deploy from a branch"**

3. **Faça o primeiro deploy**
   ```bash
   git add .
   git commit -m "feat: configuração deploy GitHub Actions"
   git push origin main
   ```

4. **Verifique o deploy**
   - Vá na aba `Actions` do GitHub
   - Aguarde o workflow "Deploy to GitHub Pages" finalizar
   - Site ficará disponível em: `https://davicas01.github.io/Praia-Bela-Imoveis/`

---

## 🔧 Arquivos de Configuração

### ✅ Já configurados:
- ✅ `vite.config.js` - Base path correto
- ✅ `src/App.jsx` - BrowserRouter com basename
- ✅ `.github/workflows/deploy.yml` - Workflow de deploy
- ✅ `public/404.html` - Redirecionamento para SPA
- ✅ `package.json` - Scripts de build

---

## 🚀 Como funciona o deploy:

1. **Trigger**: Push na branch `main`
2. **Build**: GitHub Actions executa `npm ci` e `npm run build`
3. **Deploy**: Arquivos da pasta `dist/` são publicados no GitHub Pages
4. **URL**: `https://davicas01.github.io/Praia-Bela-Imoveis/`

---

## 🐛 Troubleshooting

### Se o site não carregar:
1. Verifique se GitHub Pages está configurado para "GitHub Actions"
2. Verifique se o workflow rodou sem erros na aba Actions
3. Aguarde alguns minutos após o deploy (pode levar até 10 min)

### Se as rotas não funcionarem:
- O arquivo `public/404.html` cuida dos redirecionamentos
- O `basename="/Praia-Bela-Imoveis"` no BrowserRouter é essencial

### Para testar localmente:
```bash
npm run build
npm run preview
```

---

## 📱 Recursos da Landing Page

- ✅ Modal de detalhes dos imóveis
- ✅ Seção de busca removida da Home  
- ✅ Header padronizado na Galeria
- ✅ Design responsivo
- ✅ Otimização SEO
- ✅ Deploy automatizado

---

**🎉 Pronto! Sua landing page estará no ar assim que fizer o push!**
