# 🤖 Chatbot Ink Flow - Documentação

## Visão Geral

O chatbot do Ink Flow é um assistente virtual inteligente que responde automaticamente às perguntas mais frequentes dos visitantes do site. Ele foi desenvolvido para melhorar a experiência do usuário e reduzir a carga de atendimento manual.

## 🎯 Funcionalidades

### Respostas Automáticas
O chatbot responde a perguntas sobre:
- **Horários de funcionamento**
- **Preços e orçamentos**
- **Estilos de tatuagem**
- **Processo de agendamento**
- **Cuidados pós-tatuagem**
- **Localização do estúdio**
- **Tempo de sessão**
- **Informações sobre dor**
- **Idade mínima**
- **Política de retoque**

### Botões Rápidos
Interface com botões para perguntas mais comuns:
- Horários
- Preços
- Estilos
- Agendar

### Design Responsivo
- Funciona perfeitamente em desktop e mobile
- Interface adaptável ao tema do site
- Animações suaves e profissionais

## 🛠️ Implementação Técnica

### Arquivos Envolvidos

1. **`js/chatbot.js`** - Lógica principal do chatbot
2. **`css/styles.css`** - Estilos visuais (seção Chatbot Styles)
3. **Páginas HTML** - Script incluído em todas as páginas principais

### Estrutura do Código

```javascript
class InkFlowChatbot {
    constructor() {
        this.responses = {
            // Respostas pré-definidas
        };
        this.init();
    }
    
    // Métodos principais:
    // - createChatbot() - Cria a interface
    // - bindEvents() - Vincula eventos
    // - getResponse() - Processa mensagens
    // - addMessage() - Adiciona mensagens ao chat
}
```

## 📱 Interface do Usuário

### Botão Flutuante
- Posicionado no canto inferior direito
- Cor vermelha (#DC143C) seguindo a identidade visual
- Ícone de chat intuitivo
- Efeito hover com escala

### Janela do Chat
- **Dimensões**: 350x500px (desktop), 300x450px (mobile)
- **Header**: Título "Assistente Ink Flow" com botão fechar
- **Área de mensagens**: Scroll automático
- **Input**: Campo de texto + botão enviar
- **Botões rápidos**: Atalhos para perguntas frequentes

### Mensagens
- **Bot**: Fundo escuro, alinhamento à esquerda
- **Usuário**: Fundo vermelho, alinhamento à direita
- **Animação**: Fade in suave para novas mensagens

## 🧠 Sistema de Respostas

### Palavras-chave Reconhecidas

| Categoria | Palavras-chave | Resposta |
|-----------|----------------|----------|
| Horários | horario, funciona, aberto | Horário de funcionamento |
| Preços | preco, valor, custa, quanto | Informações sobre preços |
| Agendamento | agendar, marcar, consulta | Como agendar |
| Cuidados | cuidado, cicatriz, pomada | Cuidados pós-tatuagem |
| Estilos | estilo, tipo, realismo, aquarela | Estilos disponíveis |
| Localização | onde, local, endereco | Endereço do estúdio |
| Tempo | tempo, demora, sessao | Duração das sessões |
| Dor | dor, doi, machuca | Informações sobre dor |
| Idade | idade, menor, anos | Idade mínima |
| Retoque | retoque, garantia, refazer | Política de retoque |

### Respostas Padrão
- Saudações automáticas
- Mensagem de erro para perguntas não reconhecidas
- Direcionamento para WhatsApp quando necessário

## 🎨 Personalização Visual

### Cores Utilizadas
- **Primária**: `var(--accent-red)` (#DC143C)
- **Fundo**: `var(--secondary-dark)` (#1A1A1A)
- **Texto**: `var(--text-light)` (#FFFFFF)
- **Bordas**: `var(--tertiary-dark)` (#262626)

### Animações
- **fadeIn**: Entrada suave das mensagens
- **hover**: Efeitos nos botões
- **scale**: Crescimento do botão principal

## 📊 Métricas e Analytics

### Dados Coletados (Futuro)
- Número de conversas iniciadas
- Perguntas mais frequentes
- Taxa de resolução automática
- Tempo médio de sessão

### Melhorias Sugeridas
1. **Integração com Analytics** - Rastrear uso do chatbot
2. **Base de conhecimento expandida** - Mais respostas
3. **Integração com WhatsApp** - Transferência de conversas
4. **Histórico de conversas** - Salvar conversas do usuário
5. **Respostas contextuais** - IA mais avançada

## 🔧 Manutenção

### Atualizações Regulares
- Revisar e atualizar respostas
- Adicionar novas palavras-chave
- Monitorar perguntas não respondidas
- Ajustar interface conforme feedback

### Testes Recomendados
- Testar em diferentes dispositivos
- Verificar responsividade
- Validar todas as respostas
- Testar botões rápidos

## 🚀 Como Usar

### Para Visitantes
1. Clique no botão de chat no canto inferior direito
2. Digite sua pergunta ou use os botões rápidos
3. Receba resposta instantânea
4. Continue a conversa conforme necessário

### Para Administradores
1. Monitore as conversas através do console do navegador
2. Atualize respostas no arquivo `chatbot.js`
3. Adicione novas palavras-chave conforme necessário
4. Teste regularmente o funcionamento

## 📞 Suporte

Para dúvidas sobre o chatbot ou sugestões de melhorias:
- **Email**: inkflowstudios07@gmail.com
- **WhatsApp**: +1 (514) 437-3894

---

**Desenvolvido para o Ink Flow Estúdio de Tatuagem**
*Versão 1.0 - Janeiro 2025*