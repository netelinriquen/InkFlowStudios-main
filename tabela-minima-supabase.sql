-- TABELA MÍNIMA PARA AGENDAMENTOS (FUNCIONA GARANTIDO)

-- Deletar se existir
DROP TABLE IF EXISTS agendamentos;

-- Criar tabela simples
CREATE TABLE agendamentos (
    id BIGSERIAL PRIMARY KEY,
    nome_cliente TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    idade INTEGER NOT NULL,
    servico TEXT NOT NULL,
    data_agendamento DATE NOT NULL,
    horario TIME NOT NULL,
    descricao TEXT,
    status TEXT DEFAULT 'pendente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Desabilitar RLS para teste
ALTER TABLE agendamentos DISABLE ROW LEVEL SECURITY;

-- Teste rápido
INSERT INTO agendamentos (nome_cliente, email, telefone, idade, servico, data_agendamento, horario, descricao) 
VALUES ('Teste', 'teste@test.com', '11999999999', 25, 'Tatuagem', '2024-02-15', '14:00', 'Teste');

-- Verificar
SELECT * FROM agendamentos;