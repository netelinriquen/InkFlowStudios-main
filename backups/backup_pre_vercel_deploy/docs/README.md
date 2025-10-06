# Ink Flow - Estúdio de Tatuagem

Um site moderno e responsivo para o estúdio de tatuagem fictício "Ink Flow" localizado em São Paulo, SP.

## 🎨 Sobre o Projeto

O Ink Flow é um site completo para estúdio de tatuagem que oferece:
- Design moderno com paleta escura e destaque vermelho vibrante
- Navegação intuitiva entre páginas distintas
- Formulários interativos com validação
- Galeria de portfólio com filtros
- Sistema de agendamento online
- Responsividade total para todos os dispositivos

## 🎯 Justificativas de Design

### Paleta de Cores
- **Preto (#1C2526)**: Cor principal que transmite elegância e sofisticação
- **Cinza Escuro (#2E3532)**: Cor secundária para contraste sutil
- **Vermelho Vibrante (#D00000)**: Cor de destaque que representa paixão, arte e energia
- **Branco (#F5F5F5)**: Para textos e elementos de destaque

### Tipografia
- **Bebas Neue**: Para títulos e logo - fonte moderna e impactante
- **Montserrat**: Para textos gerais - legível e profissional

### Escolha do Vermelho
O vermelho foi escolhido como cor de destaque por:
- Representar paixão e arte
- Criar forte contraste com o fundo escuro
- Ser uma cor que chama atenção para CTAs
- Estar associada à criatividade e energia

## 📁 Estrutura do Projeto

```
tattoo-studio/
├── index.html              # Página inicial
├── sobre.html              # Sobre o estúdio e equipe
├── portfolio.html          # Galeria de trabalhos
├── servicos.html           # Serviços e preços
├── agendamento.html        # Formulário de agendamento
├── contato.html            # Informações de contato
├── login.html              # Login e cadastro
├── css/
│   └── styles.css          # Estilos principais
├── js/
│   └── script.js           # Funcionalidades JavaScript
├── images/                 # Pasta para imagens
└── README.md               # Este arquivo
```

## 🖼️ Imagens Necessárias

### Pasta `/images/`
Crie as seguintes imagens para o site funcionar completamente:

**Imagens Gerais:**
- `favicon.ico` - Ícone do site
- `hero-bg.jpg` - Imagem de fundo da seção hero (1920x1080px)
- `logo.png` - Logo do estúdio

**Carrossel da Home:**
- `tattoo1.jpg` - Tatuagem destaque 1 (800x400px)
- `tattoo2.jpg` - Tatuagem destaque 2 (800x400px)
- `tattoo3.jpg` - Tatuagem destaque 3 (800x400px)
- `tattoo4.jpg` - Tatuagem destaque 4 (800x400px)

**Equipe:**
- `artist1.jpg` - Foto do Marcus Silva (300x300px)
- `artist2.jpg` - Foto da Ana Costa (300x300px)
- `artist3.jpg` - Foto do Rafael Santos (300x300px)
- `artist4.jpg` - Foto da Carla Mendes (300x300px)

**Portfólio (`/images/portfolio/`):**
- `realismo1.jpg`, `realismo2.jpg`, `realismo3.jpg`
- `aquarela1.jpg`, `aquarela2.jpg`, `aquarela3.jpg`
- `geometrico1.jpg`, `geometrico2.jpg`, `geometrico3.jpg`
- `blackwork1.jpg`, `blackwork2.jpg`, `blackwork3.jpg`
- `fineline1.jpg`, `fineline2.jpg`, `fineline3.jpg`
- `tradicional1.jpg`, `tradicional2.jpg`, `tradicional3.jpg`

Todas as imagens do portfólio devem ter 400x400px para melhor visualização.

## 🚀 Como Executar Localmente

### Opção 1: Servidor Local Simples
1. Baixe todos os arquivos
2. Abra o terminal na pasta do projeto
3. Execute um servidor local:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (se tiver o http-server instalado)
   npx http-server
   ```
4. Acesse `http://localhost:8000`

### Opção 2: Abrir Diretamente
1. Baixe todos os arquivos
2. Abra o arquivo `index.html` no seu navegador
3. Navegue pelas páginas usando os links

## 🌐 Hospedagem

### Opções Recomendadas (Gratuitas)

**1. Netlify (Recomendado)**
- Acesse [netlify.com](https://netlify.com)
- Arraste a pasta do projeto para o deploy
- URL personalizada disponível
- SSL automático

**2. Vercel**
- Acesse [vercel.com](https://vercel.com)
- Conecte com GitHub ou faça upload
- Deploy automático
- Domínio personalizado

**3. GitHub Pages**
- Crie um repositório no GitHub
- Faça upload dos arquivos
- Ative GitHub Pages nas configurações
- Acesse via `username.github.io/repository-name`

### Configuração de Domínio
Para um domínio personalizado (ex: `inkflowsp.com.br`):
1. Registre o domínio em um provedor (Registro.br, GoDaddy, etc.)
2. Configure os DNS para apontar para sua hospedagem
3. Configure SSL/HTTPS

## ⚙️ Funcionalidades

### Implementadas
- ✅ Navegação entre páginas
- ✅ Carrossel de imagens automático
- ✅ Filtros interativos no portfólio
- ✅ Validação de formulários
- ✅ Máscaras para telefone
- ✅ Design responsivo
- ✅ Animações CSS
- ✅ SEO otimizado

### Para Implementar (Futuras)
- 🔄 Integração com banco de dados
- 🔄 Sistema de pagamento
- 🔄 Painel administrativo
- 🔄 Integração com Google Maps
- 🔄 Chat online
- 🔄 Sistema de avaliações

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1440px+)

## 🔍 SEO

### Meta Tags Implementadas
- Title otimizado para cada página
- Meta descriptions únicas
- Keywords relevantes
- Open Graph para redes sociais
- Schema markup para negócios locais

### URLs Amigáveis
- `/` - Home
- `/sobre.html` - Sobre Nós
- `/portfolio.html` - Portfólio
- `/servicos.html` - Serviços
- `/agendamento.html` - Agendamento
- `/contato.html` - Contato
- `/login.html` - Login/Cadastro

## ♿ Acessibilidade

### Implementado
- Contraste adequado (WCAG AA)
- Navegação por teclado
- Alt text para imagens
- Labels para formulários
- Estrutura semântica HTML5
- ARIA labels onde necessário

## 📈 Estratégias de Marketing

### Redes Sociais
1. **Instagram (@inkflowsp)**
   - Posts diários de trabalhos
   - Stories dos processos
   - Reels com time-lapse
   - IGTV com cuidados pós-tatuagem

2. **TikTok (@inkflowsp)**
   - Vídeos do processo de tatuagem
   - Transformações (before/after)
   - Dicas de cuidados
   - Trends adaptados para tatuagem

3. **WhatsApp Business**
   - Atendimento personalizado
   - Catálogo de serviços
   - Status com trabalhos recentes

### Google Ads
- Palavras-chave: "tatuagem São Paulo", "estúdio tatuagem", "tattoo SP"
- Anúncios locais com raio de 50km
- Remarketing para visitantes do site

### Parcerias
- Influenciadores locais
- Outros estúdios para referências
- Lojas de produtos para tatuagem
- Eventos de arte e cultura

## 🛠️ Manutenção

### Atualizações Regulares
- Adicionar novos trabalhos ao portfólio
- Atualizar informações da equipe
- Revisar preços dos serviços
- Backup regular do site

### Monitoramento
- Google Analytics para tráfego
- Google Search Console para SEO
- Formulários de feedback dos clientes
- Métricas de conversão

## 📞 Suporte

Para dúvidas sobre implementação ou customização:
- 📧 Email: suporte@inkflowsp.com.br
- 💬 WhatsApp: (11) 99999-9999
- 🌐 Site: www.inkflowsp.com.br

## 📄 Licença

Este projeto é fictício e foi criado para fins educacionais. Sinta-se livre para usar como base para projetos reais.

---

**Desenvolvido com ❤️ para o Ink Flow Estúdio de Tatuagem**