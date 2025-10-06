# Comandos para subir no GitHub

## 1. Navegar até a pasta do projeto
```bash
cd "c:\Users\DMJ\Downloads\Inkflow2-neithanjogas-patch-2"
```

## 2. Inicializar Git (se necessário)
```bash
git init
git remote add origin https://github.com/theet07/InkFlowStudios.git
```

## 3. Adicionar todas as alterações
```bash
git add .
```

## 4. Fazer commit
```bash
git commit -m "Adicionado painel administrativo e correções no agendamento"
```

## 5. Subir para o GitHub
```bash
git push origin main
```

## Alterações feitas:
- ✅ Adicionada aba "Administrador" no login
- ✅ Criado painel administrativo (admin.html)
- ✅ Corrigido formulário de agendamento
- ✅ Sistema de autenticação completo
- ✅ Credenciais admin: admin@inkflow.com / admin123