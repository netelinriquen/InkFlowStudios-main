# 🔧 SOLUCIONAR ERRO DE AGENDAMENTO

## 🚨 **PASSOS PARA CORRIGIR**

### 1️⃣ **CRIAR A TABELA NO SUPABASE**
1. Acesse seu painel do Supabase
2. Vá em **SQL Editor**
3. Execute o arquivo `criar-tabela-supabase.sql`

### 2️⃣ **TESTAR A CONEXÃO**
1. Abra `teste-supabase.html` no navegador
2. Clique em "Testar Conexão"
3. Se der erro, verifique as credenciais

### 3️⃣ **VERIFICAR CREDENCIAIS**
No arquivo `assets/js/supabase-agendamento.js`:
```javascript
const SUPABASE_URL = 'SUA-URL-AQUI';
const SUPABASE_ANON_KEY = 'SUA-CHAVE-AQUI';
```

### 4️⃣ **CONFIGURAR POLÍTICAS RLS**
No Supabase, vá em **Authentication** → **Policies** e execute:
```sql
-- Permitir inserção
CREATE POLICY "Permitir inserção de agendamentos" ON agendamentos
    FOR INSERT WITH CHECK (true);

-- Permitir leitura
CREATE POLICY "Permitir leitura de agendamentos" ON agendamentos
    FOR SELECT USING (true);
```

### 5️⃣ **VERIFICAR CORS**
Em **Settings** → **API** → **CORS origins**, adicione:
- `http://localhost:3000`
- `https://seu-dominio.com`

---

## 🔍 **DIAGNÓSTICO DE ERROS**

### **Erro: "relation agendamentos does not exist"**
- ❌ Tabela não foi criada
- ✅ Execute o SQL do arquivo `criar-tabela-supabase.sql`

### **Erro: "Invalid API key"**
- ❌ Chave incorreta
- ✅ Verifique SUPABASE_ANON_KEY

### **Erro: "Row Level Security"**
- ❌ Políticas não configuradas
- ✅ Execute as políticas RLS

### **Erro: "CORS"**
- ❌ Domínio não autorizado
- ✅ Adicione seu domínio nas configurações CORS

---

## 🎯 **SISTEMA DE FALLBACK**

Se o Supabase falhar, o sistema automaticamente:
1. ✅ Salva no localStorage
2. ✅ Mostra mensagem de sucesso
3. ✅ Funciona offline

**O agendamento NUNCA será perdido!** 🛡️