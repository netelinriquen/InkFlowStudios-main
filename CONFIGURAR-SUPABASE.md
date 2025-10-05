# 🔧 CONFIGURAÇÃO DO SUPABASE

## ⚠️ IMPORTANTE: Configure suas credenciais

Para que os agendamentos apareçam na tabela do Supabase, você precisa:

### 1️⃣ **OBTER SUAS CREDENCIAIS**
1. Acesse seu painel do Supabase
2. Vá em **Settings** → **API**
3. Copie:
   - **Project URL** (ex: `https://abc123.supabase.co`)
   - **Anon public key** (chave pública)

### 2️⃣ **ATUALIZAR O ARQUIVO**
Edite o arquivo `assets/js/supabase-agendamento.js`:

```javascript
// SUBSTITUA ESTAS LINHAS:
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

// PELAS SUAS CREDENCIAIS:
const SUPABASE_URL = 'https://SEU-PROJECT-ID.supabase.co';
const SUPABASE_ANON_KEY = 'SUA-CHAVE-PUBLICA-AQUI';
```

### 3️⃣ **CRIAR A TABELA**
Execute este SQL no Supabase:

```sql
CREATE TABLE agendamentos (
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
```

### 4️⃣ **TESTAR**
1. Faça um agendamento no site
2. Verifique se aparece na tabela `agendamentos` do Supabase
3. ✅ Pronto!

---

## 🚨 PROBLEMAS COMUNS

### **Erro de CORS:**
- Vá em **Authentication** → **Settings** → **Site URL**
- Adicione: `http://localhost:3000` e seu domínio

### **Erro de permissão:**
- Vá em **Authentication** → **Policies**
- Crie policy para permitir INSERT na tabela `agendamentos`

### **Tabela não existe:**
- Execute o SQL acima no **SQL Editor**

---

## 📋 CHECKLIST

- [ ] Credenciais configuradas
- [ ] Tabela criada
- [ ] Policies configuradas
- [ ] Teste realizado
- [ ] Agendamentos aparecendo no Supabase

**Após configurar, os agendamentos aparecerão automaticamente na tabela!** 🎉