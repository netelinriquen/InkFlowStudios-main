-- CRIAR SISTEMA DE ADMIN NO SUPABASE

-- 1. Criar tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGSERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    tipo TEXT DEFAULT 'cliente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Desabilitar RLS para teste
ALTER TABLE usuarios DISABLE ROW LEVEL SECURITY;

-- 3. Criar conta admin padrão
INSERT INTO usuarios (nome, email, senha, tipo) 
VALUES ('Admin', 'admin@inkflow.com', '123456', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 4. Criar alguns usuários de teste
INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
('Cliente Teste', 'cliente@test.com', '123456', 'cliente'),
('João Silva', 'joao@email.com', '123456', 'cliente')
ON CONFLICT (email) DO NOTHING;

-- 5. Verificar usuários criados
SELECT * FROM usuarios;