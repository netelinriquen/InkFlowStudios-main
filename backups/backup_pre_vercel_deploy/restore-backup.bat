@echo off
echo ========================================
echo   RESTAURAR BACKUP - INKFLOW STUDIOS
echo ========================================

set "PROJECT_DIR=%~dp0"
set "BACKUP_DIR=%PROJECT_DIR%backups"

echo Backups disponíveis:
echo.
dir /b "%BACKUP_DIR%" 2>nul

echo.
set /p "BACKUP_NAME=Digite o nome do backup para restaurar: "

if not exist "%BACKUP_DIR%\%BACKUP_NAME%" (
    echo ❌ Backup não encontrado!
    pause
    exit /b 1
)

echo.
echo ⚠️  ATENÇÃO: Isso irá substituir os arquivos atuais!
set /p "CONFIRM=Tem certeza? (S/N): "

if /i not "%CONFIRM%"=="S" (
    echo Operação cancelada.
    pause
    exit /b 0
)

echo.
echo Restaurando backup...

:: Fazer backup do estado atual antes de restaurar
call backup-system.bat

:: Restaurar arquivos (excluindo .git para manter histórico)
robocopy "%BACKUP_DIR%\%BACKUP_NAME%" "%PROJECT_DIR%" /E /XD .git backups /XF backup_info.txt

echo.
echo ✅ Backup restaurado com sucesso!
echo 📋 Informações do backup:
type "%BACKUP_DIR%\%BACKUP_NAME%\backup_info.txt" 2>nul
echo.
pause