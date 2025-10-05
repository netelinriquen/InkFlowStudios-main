# ✅ VERIFICAR CONFIGURAÇÃO SUPABASE

## 🔍 **CHECKLIST RÁPIDO**

### 1️⃣ **Tabela criada?**
```sql
-- Execute no SQL Editor do Supabase:
SELECT * FROM agendamentos LIMIT 1;
```
- ✅ Se funcionar = tabela existe
- ❌ Se der erro = execute `criar-tabela-supabase.sql`

### 2️⃣ **Políticas RLS configuradas?**
```sql
-- Verifique se existem:
SELECT * FROM pg_policies WHERE tablename = 'agendamentos';
```
- ✅ Deve mostrar 2 políticas
- ❌ Se vazio = execute as políticas do SQL

### 3️⃣ **Credenciais corretas?**
No arquivo `assets/js/supabase-agendamento.js`:
- URL: `https://SEU-PROJECT-ID.supabase.co`
- KEY: Sua chave pública (anon key)

### 4️⃣ **Teste rápido**
1. Abra `teste-supabase.html`
2. Clique "Testar Conexão"
3. Deve mostrar "✅ Conexão OK!"

---

## 🚨 **SE AINDA NÃO FUNCIONAR**

### **Erro comum: RLS bloqueando**
Execute no Supabase:
```sql
-- Desabilitar RLS temporariamente para teste
ALTER TABLE agendamentos DISABLE ROW LEVEL SECURITY;

-- Depois de testar, reabilite:
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
```

### **Verificar no console do navegador:**
1. F12 → Console
2. Procure por erros vermelhos
3. Copie a mensagem de erro

---

## 📋 **COMANDOS ÚTEIS**

### **Ver todos os agendamentos:**
```sql
SELECT * FROM agendamentos ORDER BY created_at DESC;
```

### **Limpar tabela:**
```sql
DELETE FROM agendamentos;
```

### **Recriar tabela:**
```sql
DROP TABLE IF EXISTS agendamentos;
-- Depois execute o criar-tabela-supabase.sql
```