-- Banco de Dados InkFlowStudios
CREATE DATABASE inkflowstudios;
USE inkflowstudios;

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'funcionario') DEFAULT 'funcionario',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Clientes
CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    cpf VARCHAR(14),
    data_nascimento DATE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Artistas
CREATE TABLE artistas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    especialidades TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamentos
CREATE TABLE agendamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    artista_id INT NOT NULL,
    data_agendamento DATE NOT NULL,
    horario TIME NOT NULL,
    servico VARCHAR(200),
    status ENUM('agendado', 'confirmado', 'concluido', 'cancelado') DEFAULT 'agendado',
    preco DECIMAL(10,2),
    observacoes TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (artista_id) REFERENCES artistas(id)
);

-- Inserir dados iniciais
INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
('Admin', 'admin@inkflow.com', 'admin123', 'admin');

INSERT INTO artistas (nome, telefone, especialidades) VALUES 
('João Silva', '11999999999', 'Realismo, Tradicional'),
('Maria Santos', '11888888888', 'Aquarela, Minimalista');

INSERT INTO clientes (nome, telefone, email) VALUES 
('Carlos Oliveira', '11777777777', 'carlos@email.com'),
('Ana Costa', '11666666666', 'ana@email.com');