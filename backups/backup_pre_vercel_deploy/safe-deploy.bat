@echo off
echo ========================================
echo      DEPLOY SEGURO - VERCEL
echo ========================================

:: 1. Criar backup automático
echo 📦 Criando backup antes do deploy...
call backup-system.bat

:: 2. Verificar status do Git
echo.
echo 🔍 Verificando status do Git...
git status --porcelain > temp_status.txt
set /p STATUS=<temp_status.txt
del temp_status.txt

if not "%STATUS%"=="" (
    echo ⚠️  Há mudanças não commitadas!
    echo Deseja commitá-las agora? (S/N)
    set /p "COMMIT_NOW="
    
    if /i "%COMMIT_NOW%"=="S" (
        set /p "COMMIT_MSG=Mensagem do commit: "
        git add .
        git commit -m "!COMMIT_MSG!"
        git push origin main
    ) else (
        echo ❌ Deploy cancelado. Commit as mudanças primeiro.
        pause
        exit /b 1
    )
)

:: 3. Criar tag de versão
echo.
echo 🏷️  Criar tag de versão? (S/N)
set /p "CREATE_TAG="

if /i "%CREATE_TAG%"=="S" (
    call create-version-tag.bat
)

:: 4. Deploy no Vercel
echo.
echo 🚀 Iniciando deploy no Vercel...

:: Verificar se Vercel CLI está instalado
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI não instalado!
    echo Instale com: npm i -g vercel
    pause
    exit /b 1
)

:: Fazer deploy
vercel --prod

echo.
echo ✅ Deploy concluído!
echo 📋 Em caso de problemas, use restore-backup.bat
echo.
pause