// =====================================================
// ENDPOINTS DE API PARA INTEGRAÇÃO COM SUPABASE
// =====================================================

// Configuração do Supabase
const SUPABASE_URL = 'https://tvccuvzcmnrqtrakudju.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Y2N1dnpjbW5ycXRyYWt1ZGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzczNzQsImV4cCI6MjA3NTIxMzM3NH0.802UvU_k3qqyBQX_vRMiN7ofJy1wTKfZU1dk8UPybug';

// Classe para gerenciar todas as operações do banco
class InkFlowAPI {
    constructor() {
        this.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }

    // =====================================================
    // USUÁRIOS
    // =====================================================
    
    async criarUsuario(dados) {
        const { data, error } = await this.supabase
            .from('usuarios')
            .insert([{
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
                tipo: dados.tipo || 'cliente',
                telefone: dados.telefone,
                data_nascimento: dados.data_nascimento,
                instagram: dados.instagram
            }]);
        return { data, error };
    }

    async buscarUsuario(email, senha) {
        const { data, error } = await this.supabase
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .eq('senha', senha)
            .eq('ativo', true);
        return { data, error };
    }

    async listarUsuarios() {
        const { data, error } = await this.supabase
            .from('usuarios')
            .select('*')
            .eq('ativo', true)
            .order('criado_em', { ascending: false });
        return { data, error };
    }

    // =====================================================
    // ARTISTAS
    // =====================================================
    
    async criarArtista(dados) {
        const { data, error } = await this.supabase
            .from('artistas')
            .insert([{
                nome: dados.nome,
                email: dados.email,
                telefone: dados.telefone,
                especialidades: dados.especialidades,
                bio: dados.bio,
                anos_experiencia: dados.anos_experiencia,
                instagram: dados.instagram,
                status: dados.status || 'ativo',
                comissao: dados.comissao || 50.00,
                foto_url: dados.foto_url
            }]);
        return { data, error };
    }

    async listarArtistas() {
        const { data, error } = await this.supabase
            .from('artistas')
            .select('*')
            .eq('ativo', true)
            .order('nome');
        return { data, error };
    }

    async buscarArtistaPorId(id) {
        const { data, error } = await this.supabase
            .from('artistas')
            .select('*')
            .eq('id', id)
            .single();
        return { data, error };
    }

    // =====================================================
    // SERVIÇOS
    // =====================================================
    
    async criarServico(dados) {
        const { data, error } = await this.supabase
            .from('servicos')
            .insert([{
                nome: dados.nome,
                descricao: dados.descricao,
                categoria: dados.categoria,
                preco_min: dados.preco_min,
                preco_max: dados.preco_max,
                duracao_estimada: dados.duracao_estimada,
                artista_id: dados.artista_id
            }]);
        return { data, error };
    }

    async listarServicos() {
        const { data, error } = await this.supabase
            .from('servicos')
            .select(`
                *,
                artistas (
                    id,
                    nome,
                    especialidades
                )
            `)
            .eq('ativo', true)
            .order('categoria');
        return { data, error };
    }

    // =====================================================
    // AGENDAMENTOS
    // =====================================================
    
    async criarAgendamento(dados) {
        const { data, error } = await this.supabase
            .from('agendamentos')
            .insert([{
                usuario_id: dados.usuario_id,
                artista_id: dados.artista_id,
                servico_id: dados.servico_id,
                nome_cliente: dados.nome_cliente,
                email: dados.email,
                telefone: dados.telefone,
                data_agendamento: dados.data_agendamento,
                horario: dados.horario,
                servico: dados.servico,
                tamanho: dados.tamanho,
                local_corpo: dados.local_corpo,
                descricao: dados.descricao,
                orcamento: dados.orcamento,
                preco: dados.preco || 0,
                primeira_tatuagem: dados.primeira_tatuagem || false
            }]);
        return { data, error };
    }

    async listarAgendamentos() {
        const { data, error } = await this.supabase
            .from('agendamentos_completos')
            .select('*')
            .order('data_agendamento', { ascending: false });
        return { data, error };
    }

    async buscarAgendamentosPorEmail(email) {
        const { data, error } = await this.supabase
            .from('agendamentos')
            .select('*')
            .eq('email', email)
            .order('data_agendamento', { ascending: false });
        return { data, error };
    }

    async atualizarStatusAgendamento(id, status) {
        const { data, error } = await this.supabase
            .from('agendamentos')
            .update({ status: status })
            .eq('id', id);
        return { data, error };
    }

    // =====================================================
    // PORTFÓLIO
    // =====================================================
    
    async adicionarPortfolio(dados) {
        const { data, error } = await this.supabase
            .from('portfolio')
            .insert([{
                artista_id: dados.artista_id,
                titulo: dados.titulo,
                descricao: dados.descricao,
                categoria: dados.categoria,
                imagem_url: dados.imagem_url,
                tags: dados.tags,
                destaque: dados.destaque || false
            }]);
        return { data, error };
    }

    async listarPortfolio(artista_id = null) {
        let query = this.supabase
            .from('portfolio')
            .select(`
                *,
                artistas (
                    id,
                    nome
                )
            `)
            .eq('ativo', true);
            
        if (artista_id) {
            query = query.eq('artista_id', artista_id);
        }
        
        const { data, error } = await query.order('criado_em', { ascending: false });
        return { data, error };
    }

    // =====================================================
    // AVALIAÇÕES
    // =====================================================
    
    async criarAvaliacao(dados) {
        const { data, error } = await this.supabase
            .from('avaliacoes')
            .insert([{
                agendamento_id: dados.agendamento_id,
                usuario_id: dados.usuario_id,
                artista_id: dados.artista_id,
                nota: dados.nota,
                comentario: dados.comentario
            }]);
        return { data, error };
    }

    async listarAvaliacoes(artista_id = null) {
        let query = this.supabase
            .from('avaliacoes')
            .select(`
                *,
                usuarios (nome),
                artistas (nome)
            `)
            .eq('aprovado', true);
            
        if (artista_id) {
            query = query.eq('artista_id', artista_id);
        }
        
        const { data, error } = await query.order('criado_em', { ascending: false });
        return { data, error };
    }

    // =====================================================
    // PAGAMENTOS
    // =====================================================
    
    async registrarPagamento(dados) {
        const { data, error } = await this.supabase
            .from('pagamentos')
            .insert([{
                agendamento_id: dados.agendamento_id,
                valor: dados.valor,
                tipo: dados.tipo,
                forma_pagamento: dados.forma_pagamento,
                status: dados.status || 'pendente',
                observacoes: dados.observacoes
            }]);
        return { data, error };
    }

    async listarPagamentos(agendamento_id = null) {
        let query = this.supabase
            .from('pagamentos')
            .select('*');
            
        if (agendamento_id) {
            query = query.eq('agendamento_id', agendamento_id);
        }
        
        const { data, error } = await query.order('criado_em', { ascending: false });
        return { data, error };
    }

    // =====================================================
    // ESTOQUE
    // =====================================================
    
    async adicionarItemEstoque(dados) {
        const { data, error } = await this.supabase
            .from('estoque')
            .insert([{
                nome: dados.nome,
                categoria: dados.categoria,
                marca: dados.marca,
                quantidade: dados.quantidade,
                quantidade_minima: dados.quantidade_minima || 5,
                preco_unitario: dados.preco_unitario,
                fornecedor: dados.fornecedor,
                data_validade: dados.data_validade
            }]);
        return { data, error };
    }

    async listarEstoque() {
        const { data, error } = await this.supabase
            .from('estoque')
            .select('*')
            .eq('ativo', true)
            .order('nome');
        return { data, error };
    }

    async atualizarQuantidadeEstoque(id, quantidade) {
        const { data, error } = await this.supabase
            .from('estoque')
            .update({ quantidade: quantidade })
            .eq('id', id);
        return { data, error };
    }

    // =====================================================
    // PROMOÇÕES
    // =====================================================
    
    async criarPromocao(dados) {
        const { data, error } = await this.supabase
            .from('promocoes')
            .insert([{
                titulo: dados.titulo,
                descricao: dados.descricao,
                tipo: dados.tipo,
                valor: dados.valor,
                codigo: dados.codigo,
                data_inicio: dados.data_inicio,
                data_fim: dados.data_fim,
                limite_uso: dados.limite_uso
            }]);
        return { data, error };
    }

    async listarPromocoesAtivas() {
        const hoje = new Date().toISOString().split('T')[0];
        const { data, error } = await this.supabase
            .from('promocoes')
            .select('*')
            .eq('ativo', true)
            .lte('data_inicio', hoje)
            .gte('data_fim', hoje);
        return { data, error };
    }

    // =====================================================
    // CONFIGURAÇÕES
    // =====================================================
    
    async buscarConfiguracao(chave) {
        const { data, error } = await this.supabase
            .from('configuracoes')
            .select('valor')
            .eq('chave', chave)
            .single();
        return { data, error };
    }

    async atualizarConfiguracao(chave, valor) {
        const { data, error } = await this.supabase
            .from('configuracoes')
            .upsert([{ chave: chave, valor: valor }]);
        return { data, error };
    }

    // =====================================================
    // ESTATÍSTICAS E RELATÓRIOS
    // =====================================================
    
    async obterEstatisticasGerais() {
        // Total de agendamentos
        const { data: totalAgendamentos } = await this.supabase
            .from('agendamentos')
            .select('id', { count: 'exact' });

        // Agendamentos hoje
        const hoje = new Date().toISOString().split('T')[0];
        const { data: agendamentosHoje } = await this.supabase
            .from('agendamentos')
            .select('id', { count: 'exact' })
            .eq('data_agendamento', hoje);

        // Agendamentos pendentes
        const { data: agendamentosPendentes } = await this.supabase
            .from('agendamentos')
            .select('id', { count: 'exact' })
            .eq('status', 'pendente');

        // Receita mensal
        const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
        const { data: receitaMensal } = await this.supabase
            .from('agendamentos')
            .select('preco')
            .eq('status', 'concluido')
            .gte('data_agendamento', inicioMes);

        const receita = receitaMensal?.reduce((total, item) => total + (item.preco || 0), 0) || 0;

        return {
            totalAgendamentos: totalAgendamentos?.length || 0,
            agendamentosHoje: agendamentosHoje?.length || 0,
            agendamentosPendentes: agendamentosPendentes?.length || 0,
            receitaMensal: receita
        };
    }

    async obterEstatisticasArtista(artista_id) {
        const { data, error } = await this.supabase
            .from('estatisticas_artistas')
            .select('*')
            .eq('id', artista_id)
            .single();
        return { data, error };
    }
}

// Instância global da API
window.inkFlowAPI = new InkFlowAPI();

// =====================================================
// FUNÇÕES DE CONVENIÊNCIA
// =====================================================

// Função para formatar dinheiro
function formatarDinheiro(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Função para formatar data
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Função para formatar data e hora
function formatarDataHora(data) {
    return new Date(data).toLocaleString('pt-BR');
}

// Função para calcular idade
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    
    return idade;
}

// Função para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para validar telefone brasileiro
function validarTelefone(telefone) {
    const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return regex.test(telefone);
}

// Função para gerar código de promoção
function gerarCodigoPromocao() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}