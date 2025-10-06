-- CORRIGIR TABELA AGENDAMENTOS NO SUPABASE

-- 1. Deletar tabela existente (se houver)
DROP TABLE IF EXISTS agendamentos;

-- 2. Criar tabela com estrutura correta
CREATE TABLE agendamentos (
    id BIGSERIAL PRIMARY KEY,
    nome_cliente TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    idade INTEGER NOT NULL,
    servico TEXT NOT NULL,
    data_agendamento DATE NOT NULL,
    horario TIME NOT NULL,
    artista_preferido TEXT,
    tamanho TEXT,
    local_corpo TEXT,
    descricao TEXT,
    orcamento TEXT,
    primeira_tatuagem BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'pendente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Desabilitar RLS temporariamente para teste
ALTER TABLE agendamentos DISABLE ROW LEVEL SECURITY;

-- 4. Inserir dados de teste
INSERT INTO agendamentos (
    nome_cliente, email, telefone, idade, servico, 
    data_agendamento, horario, artista_preferido, 
    tamanho, local_corpo, descricao, orcamento, 
    primeira_tatuagem, status
) VALUES (
    'Teste Cliente', 
    'teste@email.com', 
    '(11) 99999-9999', 
    25, 
    'Tatuagem Teste',
    '2024-02-15',
    '14:00',
    'Artista Teste',
    'pequena',
    'braço',
    'Teste de agendamento',
    'ate-300',
    false,
    'pendente'
);

-- 5. Verificar se funcionou
SELECT * FROM agendamentos;