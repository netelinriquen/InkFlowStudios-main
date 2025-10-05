const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.on('qr', qr => {
    console.log('📱 Escaneie o QR Code no WhatsApp:');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('✅ Bot Ink Flow Studios conectado!');
    console.log('🎨 Pronto para atender clientes!');
});

client.on('auth_failure', msg => {
    console.error('❌ Falha na autenticação:', msg);
});

client.on('disconnected', (reason) => {
    console.log('⚠️ Bot desconectado:', reason);
});

const agendamentos = {};
const sessoes = {};

client.on('message', async msg => {
    // Ignorar mensagens de grupos e próprias mensagens
    if (msg.from.includes('@g.us') || msg.fromMe) return;
    
    console.log(`📩 ${msg.from}: ${msg.body}`);
    
    const user = msg.from;
    const texto = msg.body.toLowerCase().trim();
    
    try {
        // Saudações iniciais
        if (['ola', 'olá', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'menu', 'inicio'].includes(texto)) {
            sessoes[user] = 'menu';
            await msg.reply(`🎨 *Bem-vindo ao Ink Flow Studios!*\n\nSomos especialistas em tatuagens artísticas em São Paulo.\n\n📋 *MENU PRINCIPAL - Digite o número:*\n\n1️⃣ Fazer agendamento\n2️⃣ Ver preços\n3️⃣ Localização e contato\n4️⃣ Horários de funcionamento\n5️⃣ Estilos de tatuagem\n6️⃣ Cuidados e cicatrização\n7️⃣ Dúvidas frequentes\n8️⃣ Portfólio e Instagram\n9️⃣ Falar com atendente\n\n💬 Digite apenas o *número* da opção desejada!`);
            return;
        }
        
        // Opção 1 - Agendamento
        if (msg.body === '1' && !agendamentos[user]) {
            agendamentos[user] = { step: 'nome' };
            await msg.reply('📝 *Vamos agendar sua tatuagem!*\n\nPrimeiro, me informe seu *nome completo*:');
            return;
        }
        
        // Processo de agendamento
        if (agendamentos[user]) {
            const a = agendamentos[user];
            
            if (a.step === 'nome') {
                a.nome = msg.body;
                a.step = 'idade';
                await msg.reply(`Prazer em conhecê-lo, ${msg.body}! 😊\n\nQual sua *idade*? (Atendemos apenas maiores de 18 anos)`);
            }
            else if (a.step === 'idade') {
                const idade = parseInt(msg.body);
                if (idade < 18) {
                    await msg.reply('❌ Desculpe, só atendemos maiores de 18 anos conforme legislação.\n\nDigite *menu* para outras opções.');
                    delete agendamentos[user];
                    return;
                }
                a.idade = idade;
                a.step = 'telefone';
                await msg.reply('✅ Perfeito!\n\nAgora me informe seu *telefone* para contato:');
            }
            else if (a.step === 'telefone') {
                a.telefone = msg.body;
                a.step = 'estilo';
                await msg.reply('📱 Ótimo!\n\nQue *estilo de tatuagem* você tem em mente?\n\n*Digite o número do estilo:*\n\n1️⃣ Realismo\n2️⃣ Aquarela\n3️⃣ Geométrica\n4️⃣ Fine Line\n5️⃣ Blackwork\n6️⃣ Tradicional\n7️⃣ Outro\n\n💬 Digite o *número* do estilo:');
            }
            else if (a.step === 'estilo') {
                a.estilo = msg.body;
                a.step = 'ideia';
                await msg.reply('🎨 Excelente escolha!\n\nAgora descreva *detalhadamente sua ideia*:\n\n• O que você quer tatuar?\n• Onde no corpo?\n• Tamanho aproximado?\n• Alguma referência específica?');
            }
            else if (a.step === 'ideia') {
                a.ideia = msg.body;
                a.step = 'disponibilidade';
                await msg.reply('💡 Ideia incrível!\n\nPara finalizar, me informe sua *disponibilidade*:\n\n• Que dias da semana você pode?\n• Período preferido (manhã/tarde/noite)?\n• Alguma data específica em mente?');
            }
            else if (a.step === 'disponibilidade') {
                a.disponibilidade = msg.body;
                
                // Salvar agendamento
                const novoAgendamento = {
                    id: Date.now(),
                    timestamp: new Date().toISOString(),
                    nome: a.nome,
                    idade: a.idade,
                    telefone: a.telefone,
                    estilo: a.estilo,
                    ideia: a.ideia,
                    disponibilidade: a.disponibilidade,
                    whatsapp: user,
                    status: 'pendente'
                };
                
                // Salvar em arquivo
                let agendamentosSalvos = [];
                try {
                    if (fs.existsSync('./agendamentos.json')) {
                        agendamentosSalvos = JSON.parse(fs.readFileSync('./agendamentos.json', 'utf8'));
                    }
                } catch (error) {
                    console.log('Criando novo arquivo de agendamentos');
                }
                
                agendamentosSalvos.push(novoAgendamento);
                fs.writeFileSync('./agendamentos.json', JSON.stringify(agendamentosSalvos, null, 2));
                
                await msg.reply(`✅ *Agendamento Registrado com Sucesso!*\n\n📋 *Resumo do seu pedido:*\n\n👤 Nome: ${a.nome}\n🎂 Idade: ${a.idade} anos\n📱 Telefone: ${a.telefone}\n🎨 Estilo: ${a.estilo}\n💡 Ideia: ${a.ideia}\n📅 Disponibilidade: ${a.disponibilidade}\n\n⏰ *Próximos passos:*\n• Nossa equipe analisará sua solicitação\n• Entraremos em contato em até 24 horas\n• Agendaremos uma consulta gratuita\n• Faremos o orçamento personalizado\n\n🏪 *Ink Flow Studios*\n📍 São Paulo, SP\n📷 Instagram: @inkflowstudios\n\n💬 Digite *menu* para outras opções!`);
                
                console.log(`📅 NOVO AGENDAMENTO: ${a.nome} - ${a.telefone} - ${a.estilo}`);
                delete agendamentos[user];
            }
            return;
        }
        
        // Opção 2 - Preços
        if (msg.body === '2') {
            await msg.reply('💰 *Tabela de Preços*\n\n*Digite o número para ver:*\n\n1️⃣ Preços por tamanho\n2️⃣ Preços por estilo\n3️⃣ Formas de pagamento\n4️⃣ O que está incluso\n5️⃣ Fazer orçamento personalizado\n6️⃣ Voltar ao menu principal\n\n💬 Digite o *número* da opção!');
            sessoes[user] = 'precos';
        }
        
        // Opção 3 - Localização
        else if (msg.body === '3') {
            await msg.reply('📍 *Localização e Contato*\n\n*Digite o número para ver:*\n\n1️⃣ Endereço completo\n2️⃣ Como chegar (transporte)\n3️⃣ Estacionamento\n4️⃣ Contatos e redes sociais\n5️⃣ Enviar localização no Maps\n6️⃣ Voltar ao menu principal\n\n💬 Digite o *número* da opção!');
            sessoes[user] = 'localizacao';
        }
        
        // Opção 4 - Horários
        else if (msg.body === '4') {
            await msg.reply('🕐 *Horários de Funcionamento*\n\n📅 *Segunda a Sexta:*\n• Atendimento: 10h às 20h\n• Agendamentos: 10h às 19h\n\n📅 *Sábados:*\n• Atendimento: 9h às 18h\n• Agendamentos: 9h às 17h\n\n📅 *Domingos e Feriados:*\n• Fechado para descanso da equipe\n\n⚡ *Atendimento Express:*\n• Seg a Sex: 12h às 14h\n• Sáb: 10h às 12h\n\n📞 *WhatsApp 24h* para dúvidas!\n\n💡 Digite *1* para agendar ou *menu* para voltar!');
        }
        
        // Opção 5 - Estilos
        else if (msg.body === '5') {
            await msg.reply('🎨 *Estilos de Tatuagem*\n\n*Digite o número do estilo:*\n\n1️⃣ Realismo (retratos, animais)\n2️⃣ Aquarela (cores fluidas)\n3️⃣ Geométrica (mandalas, formas)\n4️⃣ Fine Line (traços finos)\n5️⃣ Blackwork (só preto)\n6️⃣ Tradicional (old school)\n7️⃣ Minimalista\n8️⃣ Oriental (dragões, carpas)\n9️⃣ Voltar ao menu principal\n\n💬 Digite o *número* do estilo!');
            sessoes[user] = 'estilos';
        }
        
        // Opção 6 - Cuidados
        else if (msg.body === '6') {
            await msg.reply('🩹 *Cuidados e Cicatrização*\n\n*Digite o número para saber:*\n\n1️⃣ Primeiras 24 horas\n2️⃣ Limpeza diária (1ª semana)\n3️⃣ Cuidados 2ª semana\n4️⃣ O que evitar (30 dias)\n5️⃣ Pomadas recomendadas\n6️⃣ Sinais de alerta\n7️⃣ Timeline de cicatrização\n8️⃣ Dúvidas sobre cuidados\n9️⃣ Voltar ao menu principal\n\n💬 Digite o *número* da informação!');
            sessoes[user] = 'cuidados';
        }
        
        // Opção 7 - Dúvidas Frequentes
        else if (msg.body === '7') {
            await msg.reply('❓ *Dúvidas Frequentes*\n\n*Digite o número da sua dúvida:*\n\n1️⃣ Tatuagem dói muito?\n2️⃣ Quanto tempo demora?\n3️⃣ Como é a cicatrização?\n4️⃣ Posso fazer exercícios?\n5️⃣ Quando posso tomar sol?\n6️⃣ Primeira tatuagem - dicas\n7️⃣ Colorida ou preto e cinza?\n8️⃣ Como escolher o tamanho?\n9️⃣ Voltar ao menu principal\n\n💬 Digite o *número* da dúvida!');
            sessoes[user] = 'duvidas';
        }
        
        // Opção 8 - Portfólio
        else if (msg.body === '8') {
            await msg.reply('📷 *Portfólio e Redes Sociais*\n\n*Digite o número para ver:*\n\n1️⃣ Instagram principal\n2️⃣ TikTok com processos\n3️⃣ Trabalhos de realismo\n4️⃣ Trabalhos de aquarela\n5️⃣ Trabalhos geométricos\n6️⃣ Fine line e minimalista\n7️⃣ Blackwork e tradicional\n8️⃣ Antes e depois\n9️⃣ Voltar ao menu principal\n\n💬 Digite o *número* da opção!');
            sessoes[user] = 'portfolio';
        }
        
        // Opção 9 - Atendente
        else if (msg.body === '9') {
            await msg.reply('👨💼 *Falar com Atendente Humano*\n\n⏰ *Horários de Atendimento:*\n• Segunda a Sexta: 10h às 20h\n• Sábado: 9h às 18h\n\n💬 *Para atendimento imediato:*\n• Aguarde, em breve um atendente\n  entrará em contato\n• Ou continue usando o menu\n\n🤖 *Enquanto isso:*\nPosso ajudar com informações!\nDigite *menu* para voltar.');
        }
        
        // Submenus
        else if (sessoes[user] === 'precos') {
            if (msg.body === '1') {
                await msg.reply('💰 *Preços por Tamanho*\n\n🔍 *Pequena (até 5cm):*\n• R$ 200 - R$ 400\n• 1-2 horas\n\n📎 *Média (5-15cm):*\n• R$ 400 - R$ 800\n• 2-4 horas\n\n📊 *Grande (15-30cm):*\n• R$ 800 - R$ 1.500\n• 4-8 horas\n\n📈 *Extra Grande (30cm+):*\n• R$ 1.500+\n• Múltiplas sessões\n\n💬 Digite *2* para mais preços ou *menu*');
            } else if (msg.body === '6') {
                sessoes[user] = 'menu';
                await msg.reply('🔙 Voltando ao menu principal...\n\nDigite *menu* para ver as opções!');
            }
        }
        
        else if (sessoes[user] === 'duvidas') {
            if (msg.body === '1') {
                await msg.reply('😰 *Tatuagem dói muito?*\n\n💡 A dor varia conforme:\n• Local do corpo\n• Seu limite de dor\n• Tamanho da tatuagem\n\n👍 *Menos dolorosos:*\nBraço, antebraço, panturrilha\n\n😬 *Mais sensíveis:*\nCostelas, coluna, pés\n\n💬 Digite *7* para mais dúvidas ou *menu*');
            } else if (msg.body === '2') {
                await msg.reply('⏱️ *Quanto tempo demora?*\n\n🎨 *Estimativas:*\n• Pequena: 1-2 horas\n• Média: 2-4 horas\n• Grande: 4-8 horas\n• Extra grande: Várias sessões\n\n💡 Depende da complexidade!\n\n💬 Digite *7* para mais dúvidas ou *menu*');
            } else if (msg.body === '9') {
                sessoes[user] = 'menu';
                await msg.reply('🔙 Voltando ao menu principal...\n\nDigite *menu* para ver as opções!');
            }
        }
        
        else if (sessoes[user] === 'portfolio') {
            if (msg.body === '1') {
                await msg.reply('📷 *Instagram Principal*\n\n@inkflowstudios\n\n🎨 Nosso feed principal com:\n• Trabalhos recentes\n• Processo de criação\n• Dicas de cuidados\n• Stories diários\n\n👀 Segue lá para se inspirar!\n\n💬 Digite *8* para mais opções ou *menu*');
            } else if (msg.body === '2') {
                await msg.reply('🎥 *TikTok - Processos*\n\n@inkflowsp\n\n🎬 Vídeos incríveis:\n• Time-lapse das tatuagens\n• Antes e depois\n• Bastidores do estúdio\n• Dicas rápidas\n\n🔥 Conteúdo viral diário!\n\n💬 Digite *8* para mais opções ou *menu*');
            } else if (msg.body === '9') {
                sessoes[user] = 'menu';
                await msg.reply('🔙 Voltando ao menu principal...\n\nDigite *menu* para ver as opções!');
            }
        }
        
        else if (sessoes[user] === 'estilos') {
            if (msg.body === '1') {
                await msg.reply('🖼️ *Realismo*\n\n🎨 *Características:*\n• Retratos hiper-realistas\n• Animais com detalhes\n• Paisagens e objetos\n• Sombreados perfeitos\n\n💰 *Preço:* R$ 500 - R$ 2.000\n⏱️ *Tempo:* 3-8 horas\n\n📷 Veja exemplos: @inkflowstudios\n\n💬 Digite *5* para mais estilos ou *menu*');
            } else if (msg.body === '2') {
                await msg.reply('🌈 *Aquarela*\n\n🎨 *Características:*\n• Efeito de tinta fluida\n• Cores vibrantes\n• Respingos artísticos\n• Estilo único\n\n💰 *Preço:* R$ 400 - R$ 1.200\n⏱️ *Tempo:* 2-5 horas\n\n📷 Veja exemplos: @inkflowstudios\n\n💬 Digite *5* para mais estilos ou *menu*');
            } else if (msg.body === '9') {
                sessoes[user] = 'menu';
                await msg.reply('🔙 Voltando ao menu principal...\n\nDigite *menu* para ver as opções!');
            }
        }
        
        else if (sessoes[user] === 'cuidados') {
            if (msg.body === '1') {
                await msg.reply('⏰ *Primeiras 24 Horas*\n\n🛡️ *Cuidados imediatos:*\n• Mantenha o filme plástico\n• Não retire antes de 2-4h\n• Não molhe a tatuagem\n• Evite sol direto\n• Não faça exercícios\n\n🚨 *Importante:*\nVermelhidão e inchaço são normais!\n\n💬 Digite *6* para mais cuidados ou *menu*');
            } else if (msg.body === '2') {
                await msg.reply('🧼 *Limpeza Diária (1ª Semana)*\n\n🚿 *Como limpar:*\n• Água morna + sabão neutro\n• Lave delicadamente com as mãos\n• Seque com papel toalha\n• Aplique pomada fina\n\n🔄 *Frequência:* 3x ao dia\n\n❌ *Não use:* Bucha, toalha, álcool\n\n💬 Digite *6* para mais cuidados ou *menu*');
            } else if (msg.body === '9') {
                sessoes[user] = 'menu';
                await msg.reply('🔙 Voltando ao menu principal...\n\nDigite *menu* para ver as opções!');
            }
        }
        
        // Resposta padrão
        else {
            await msg.reply(`😊 Oi! Vi que você escreveu: "${msg.body}"\n\n🤔 Para melhor atendimento, use nosso menu:\n\n💬 Digite *menu* para ver todas as opções!\n\nOu digite o número de 1 a 9 para acessar diretamente! 😉`);
        }
        
    } catch (error) {
        console.error('❌ Erro ao processar mensagem:', error);
        await msg.reply('😅 Ops! Ocorreu um erro temporário.\n\nTente novamente ou digite *menu* para recomeçar.');
    }
});

client.initialize();

console.log('🚀 Iniciando Bot Ink Flow Studios...');
console.log('📱 Aguardando QR Code...');