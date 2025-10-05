-- Tabela de Usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) DEFAULT 'funcionario',
    criado_em TIMESTAMP DEFAULT NOW()
);

-- Tabela de Agendamentos (baseada no seu código)
CREATE TABLE agendamentos (
    id SERIAL PRIMARY KEY,
    cliente_nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    idade INTEGER,
    servico VARCHAR(200),
    data_agendamento DATE,
    horario VARCHAR(10),
    artista VARCHAR(100),
    tamanho VARCHAR(50),
    local_corpo VARCHAR(100),
    descricao TEXT,
    orcamento VARCHAR(50),
    primeira_tatuagem BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'pendente',
    preco DECIMAL(10,2) DEFAULT 0,
    criado_em TIMESTAMP DEFAULT NOW()
);

-- Inserir usuário admin
INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
('Admin', 'admin@inkflow.com', 'admin123', 'admin');