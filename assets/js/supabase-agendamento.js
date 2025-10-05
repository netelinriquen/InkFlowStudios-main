// Configuração do Supabase
const SUPABASE_URL = 'https://tvccuvzcmnrqtrakudju.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Y2N1dnpjbW5ycXRyYWt1ZGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzczNzQsImV4cCI6MjA3NTIxMzM3NH0.802UvU_k3qqyBQX_vRMiN7ofJy1wTKfZU1dk8UPybug';

// Inicializar cliente Supabase
let supabaseClient;
try {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase inicializado');
    } else {
        console.error('❌ Supabase não carregado');
    }
} catch (error) {
    console.error('❌ Erro ao inicializar Supabase:', error);
}

// Função para criar agendamento no Supabase
async function criarAgendamento(dadosAgendamento) {
    console.log('🔄 Iniciando criação de agendamento:', dadosAgendamento);
    
    // Verificar se Supabase está disponível
    if (!supabaseClient) {
        throw new Error('❌ Supabase não inicializado. Verifique se a biblioteca foi carregada.');
    }
    
    try {
        const agendamento = {
            nome_cliente: dadosAgendamento.clientName,
            email: dadosAgendamento.email,
            telefone: dadosAgendamento.phone,
            idade: parseInt(dadosAgendamento.age),
            servico: dadosAgendamento.service,
            data_agendamento: dadosAgendamento.date,
            horario: dadosAgendamento.time,
            artista_preferido: dadosAgendamento.artist || 'Sem preferência',
            tamanho: dadosAgendamento.size,
            local_corpo: dadosAgendamento.location,
            descricao: dadosAgendamento.description,
            orcamento: dadosAgendamento.budget,
            primeira_tatuagem: dadosAgendamento.firstTattoo || false,
            status: 'pendente'
        };
        
        console.log('📤 Enviando para Supabase:', agendamento);
        
        const { data, error } = await supabaseClient
            .from('agendamentos')
            .insert([agendamento])
            .select();

        if (error) {
            console.error('❌ Erro do Supabase:', error);
            
            // Erros específicos
            if (error.code === '42P01') {
                throw new Error('❌ Tabela "agendamentos" não existe. Execute o SQL no Supabase.');
            }
            if (error.code === '42501') {
                throw new Error('❌ Sem permissão. Configure as políticas RLS no Supabase.');
            }
            if (error.message.includes('JWT')) {
                throw new Error('❌ Chave de API inválida. Verifique SUPABASE_ANON_KEY.');
            }
            
            throw new Error(`❌ Erro do Supabase: ${error.message}`);
        }

        console.log('✅ Agendamento criado no Supabase:', data);
        return { success: true, data };
    } catch (error) {
        console.error('❌ Erro ao criar agendamento:', error);
        throw error; // Re-throw para mostrar erro específico
    }
}

// Função de fallback para localStorage
function salvarNoLocalStorage(dadosAgendamento) {
    try {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const novoAgendamento = {
            id: Date.now(),
            ...dadosAgendamento,
            status: 'pendente',
            createdAt: new Date().toISOString()
        };
        appointments.push(novoAgendamento);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        console.log('✅ Agendamento salvo no localStorage:', novoAgendamento);
        return { success: true, data: [novoAgendamento], fallback: true };
    } catch (error) {
        console.error('❌ Erro ao salvar no localStorage:', error);
        return { success: false, error: error.message };
    }
}

// Função para listar agendamentos
async function listarAgendamentos() {
    if (!supabaseClient) {
        throw new Error('❌ Supabase não inicializado.');
    }
    
    try {
        const { data, error } = await supabaseClient
            .from('agendamentos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erro do Supabase ao listar:', error);
            throw new Error(`❌ Erro ao listar: ${error.message}`);
        }
        
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao listar agendamentos:', error);
        throw error;
    }
}

// Exportar funções
window.supabaseAgendamento = {
    criarAgendamento,
    listarAgendamentos
};