-- Banco SQL Server
CREATE DATABASE INKFLOW;
GO

USE INKFLOW;
GO

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    senha NVARCHAR(255) NOT NULL,
    tipo NVARCHAR(20) DEFAULT 'funcionario',
    criado_em DATETIME DEFAULT GETDATE()
);

-- Tabela de Clientes
CREATE TABLE clientes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    telefone NVARCHAR(20),
    email NVARCHAR(100),
    cpf NVARCHAR(14),
    data_nascimento DATE,
    criado_em DATETIME DEFAULT GETDATE()
);

-- Tabela de Artistas
CREATE TABLE artistas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    telefone NVARCHAR(20),
    email NVARCHAR(100),
    especialidades NVARCHAR(MAX),
    ativo BIT DEFAULT 1,
    criado_em DATETIME DEFAULT GETDATE()
);

-- Tabela de Agendamentos
CREATE TABLE agendamentos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    cliente_id INT NOT NULL,
    artista_id INT NOT NULL,
    data_agendamento DATE NOT NULL,
    horario TIME NOT NULL,
    servico NVARCHAR(200),
    status NVARCHAR(20) DEFAULT 'agendado',
    preco DECIMAL(10,2),
    observacoes NVARCHAR(MAX),
    criado_em DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (artista_id) REFERENCES artistas(id)
);

-- Dados iniciais
INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
('Admin', 'admin@inkflow.com', 'admin123', 'admin');

INSERT INTO artistas (nome, telefone, especialidades) VALUES 
('João Silva', '11999999999', 'Realismo, Tradicional'),
('Maria Santos', '11888888888', 'Aquarela, Minimalista');

INSERT INTO clientes (nome, telefone, email) VALUES 
('Carlos Oliveira', '11777777777', 'carlos@email.com'),
('Ana Costa', '11666666666', 'ana@email.com');

SELECT * FROM usuarios;
SELECT * FROM agendamentos;
