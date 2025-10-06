@echo off
echo ========================================
echo     CRIAR TAG DE VERSÃO - GIT
echo ========================================

:: Verificar se há mudanças não commitadas
git status --porcelain > temp_status.txt
set /p STATUS=<temp_status.txt
del temp_status.txt

if not "%STATUS%"=="" (
    echo ⚠️  Há mudanças não commitadas!
    echo Commit as mudanças antes de criar uma tag.
    git status
    pause
    exit /b 1
)

echo Versões existentes:
git tag -l | sort /r

echo.
set /p "VERSION=Digite a nova versão (ex: v1.0.1): "

if "%VERSION%"=="" (
    echo ❌ Versão não pode estar vazia!
    pause
    exit /b 1
)

:: Verificar se a tag já existe
git tag -l | findstr /x "%VERSION%" >nul
if %errorlevel%==0 (
    echo ❌ Versão %VERSION% já existe!
    pause
    exit /b 1
)

set /p "MESSAGE=Descrição da versão: "

:: Criar tag anotada
git tag -a "%VERSION%" -m "%MESSAGE%"

:: Enviar tag para o repositório remoto
git push origin "%VERSION%"

echo.
echo ✅ Tag %VERSION% criada e enviada com sucesso!
echo 📋 Para voltar a esta versão use: git checkout %VERSION%
echo.
pause