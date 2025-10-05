// Configuração do Supabase
const SUPABASE_URL = 'https://tvccuvzcmnrqtrakudju.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Y2N1dnpjbW5ycXRyYWt1ZGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzczNzQsImV4cCI6MjA3NTIxMzM3NH0.802UvU_k3qqyBQX_vRMiN7ofJy1wTKfZU1dk8UPybug';

// Inicializar cliente Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Função para criar agendamento no Supabase
async function criarAgendamento(dadosAgendamento) {
    try {
        const { data, error } = await supabaseClient
            .from('agendamentos')
            .insert([{
                nome_cliente: dadosAgendamento.clientName,
                email: dadosAgendamento.email,
                telefone: dadosAgendamento.phone,
                idade: parseInt(dadosAgendamento.age),
                servico: dadosAgendamento.service,
                data_agendamento: dadosAgendamento.date,
                horario: dadosAgendamento.time,
                artista_preferido: dadosAgendamento.artist,
                tamanho: dadosAgendamento.size,
                local_corpo: dadosAgendamento.location,
                descricao: dadosAgendamento.description,
                orcamento: dadosAgendamento.budget,
                primeira_tatuagem: dadosAgendamento.firstTattoo,
                status: 'pendente',
                created_at: new Date().toISOString()
            }]);

        if (error) {
            console.error('Erro do Supabase:', error);
            throw error;
        }

        console.log('Agendamento criado:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        return { success: false, error: error.message };
    }
}

// Função para listar agendamentos
async function listarAgendamentos() {
    try {
        const { data, error } = await supabaseClient
            .from('agendamentos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao listar agendamentos:', error);
        return { success: false, error: error.message };
    }
}

// Exportar funções
window.supabaseAgendamento = {
    criarAgendamento,
    listarAgendamentos
};