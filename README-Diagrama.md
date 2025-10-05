# Diagrama de Classes - Ink Flow Studios

## 📋 Visão Geral

Este diagrama de classes representa a arquitetura do sistema de gerenciamento do **Ink Flow Studios**, um estúdio de tatuagem em São Paulo. O sistema foi desenvolvido para gerenciar agendamentos, clientes, artistas e operações administrativas.

## 🏗️ Estrutura do Sistema

### 📦 Pacotes Principais

#### 1. **Sistema de Autenticação**
- **AuthSystem**: Gerencia login, logout e controle de acesso
- **User**: Representa usuários do sistema (clientes e administradores)

#### 2. **Sistema de Agendamentos**
- **AppointmentSync**: Sincronização de agendamentos entre diferentes interfaces
- **Appointment**: Representa um agendamento de tatuagem

#### 3. **Gerenciamento de Clientes**
- **ClientManager**: Controlador para operações CRUD de clientes
- **Client**: Entidade cliente com histórico e preferências

#### 4. **Gerenciamento de Artistas**
- **ArtistManager**: Controlador para operações CRUD de artistas
- **Artist**: Entidade artista com especialidades e agenda
- **PriceStructure**: Estrutura de preços por tamanho
- **Schedule**: Agenda semanal do artista
- **WorkDay**: Dia de trabalho individual
- **MonthlyStats**: Estatísticas mensais do artista

#### 5. **Sistema de Administração**
- **AdminModules**: Interface administrativa central

#### 6. **Sistema de API**
- **API**: Camada de acesso a dados
- **DataSync**: Sincronização em tempo real entre abas

#### 7. **Sistema de Chatbot**
- **InkFlowChatbot**: Assistente virtual "Lily"
- **UserContext**: Contexto da conversa
- **Message**: Mensagens do chat

#### 8. **Bot WhatsApp**
- **WhatsAppBot**: Bot para atendimento via WhatsApp

## 🔗 Relacionamentos Principais

### Composição
- `Artist` possui `PriceStructure`, `Schedule` e `MonthlyStats`
- `Schedule` contém múltiplos `WorkDay`
- `InkFlowChatbot` possui `UserContext` e gerencia `Message`

### Agregação
- `AuthSystem` gerencia múltiplos `User`
- `ClientManager` gerencia múltiplos `Client`
- `ArtistManager` gerencia múltiplos `Artist`
- `AppointmentSync` sincroniza múltiplos `Appointment`

### Dependência
- `AdminModules` usa `AppointmentSync`, `ClientManager` e `ArtistManager`
- `API` realiza operações CRUD em todas as entidades
- `DataSync` sincroniza com `API`

### Referência
- `Appointment` referencia `Client` e `Artist`

## 🎯 Funcionalidades Principais

### Para Clientes
- ✅ Cadastro e login
- ✅ Agendamento de sessões
- ✅ Visualização de agendamentos
- ✅ Chat com assistente virtual

### Para Administradores
- ✅ Dashboard com métricas
- ✅ Gerenciamento de agendamentos
- ✅ Cadastro e controle de clientes
- ✅ Gerenciamento de artistas
- ✅ Relatórios financeiros
- ✅ Controle de estoque

### Para Artistas
- ✅ Agenda personalizada
- ✅ Especialidades e preços
- ✅ Estatísticas de performance
- ✅ Portfólio integrado

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js (para bot WhatsApp)
- **Banco de Dados**: LocalStorage (com fallback para JSON Server)
- **APIs Externas**: Google Gemini (chatbot)
- **Bibliotecas**: 
  - WhatsApp Web.js (bot)
  - Chart.js (gráficos)
  - Font Awesome (ícones)

## 📱 Integrações

### WhatsApp Bot
- Atendimento automatizado 24/7
- Agendamento via WhatsApp
- Menu interativo
- Informações sobre serviços

### Chatbot Web (Lily)
- Assistente virtual no site
- Respostas contextuais
- Integração com API Gemini
- Histórico de conversas

### Sincronização
- Dados sincronizados entre abas
- Fallback para localStorage
- Sistema de notificações em tempo real

## 🎨 Padrões de Design Utilizados

1. **MVC (Model-View-Controller)**
   - Models: User, Client, Artist, Appointment
   - Views: HTML templates e renderização dinâmica
   - Controllers: Manager classes

2. **Observer Pattern**
   - DataSync para notificações de mudanças
   - Event listeners para UI

3. **Singleton Pattern**
   - AuthSystem como instância global
   - API como classe estática

4. **Factory Pattern**
   - Geração de dados de exemplo
   - Criação de elementos HTML

## 📊 Métricas do Sistema

- **Classes**: 15+ classes principais
- **Relacionamentos**: 20+ associações
- **Funcionalidades**: 50+ métodos públicos
- **Integrações**: 3 sistemas externos

## 🚀 Como Usar o Diagrama

1. **Visualização**: Use qualquer ferramenta que suporte PlantUML
2. **Edição**: Modifique o arquivo `diagrama-classes.puml`
3. **Exportação**: Gere PNG, SVG ou PDF conforme necessário

### Ferramentas Recomendadas
- PlantUML Online Server
- VS Code com extensão PlantUML
- IntelliJ IDEA com plugin PlantUML

## 📝 Notas de Implementação

- Sistema projetado para ser **responsivo** e **mobile-first**
- **Fallbacks** implementados para funcionar offline
- **Validação** de dados em múltiplas camadas
- **Segurança** básica com controle de acesso
- **Escalabilidade** preparada para banco de dados real

---

*Desenvolvido para Ink Flow Studios - Transformando pele em arte desde 2025* 🎨