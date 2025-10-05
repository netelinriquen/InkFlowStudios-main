-- SQL para criar a tabela de agendamentos no Supabase
CREATE TABLE IF NOT EXISTS agendamentos (
    id SERIAL PRIMARY KEY,
    nome_cliente VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    idade INTEGER NOT NULL,
    servico VARCHAR(100) NOT NULL,
    data_agendamento DATE NOT NULL,
    horario TIME NOT NULL,
    artista_preferido VARCHAR(100),
    tamanho VARCHAR(50),
    local_corpo VARCHAR(100),
    descricao TEXT,
    orcamento VARCHAR(50),
    primeira_tatuagem BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;

-- Criar policy para permitir INSERT para usuários anônimos
CREATE POLICY "Permitir inserção de agendamentos" ON agendamentos
    FOR INSERT WITH CHECK (true);

-- Criar policy para permitir SELECT para usuários anônimos
CREATE POLICY "Permitir leitura de agendamentos" ON agendamentos
    FOR SELECT USING (true);