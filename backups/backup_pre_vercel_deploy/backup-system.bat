@echo off
echo ========================================
echo    SISTEMA DE BACKUP - INKFLOW STUDIOS
echo ========================================

set "PROJECT_DIR=%~dp0"
set "BACKUP_DIR=%PROJECT_DIR%backups"
set "TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
set "TIMESTAMP=%TIMESTAMP: =0%"
set "BACKUP_NAME=inkflow_backup_%TIMESTAMP%"

echo Criando backup em: %BACKUP_DIR%\%BACKUP_NAME%

:: Criar diretório de backup se não existir
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

:: Criar backup completo (excluindo node_modules e .git)
echo Copiando arquivos...
robocopy "%PROJECT_DIR%" "%BACKUP_DIR%\%BACKUP_NAME%" /E /XD node_modules .git backups bot\.wwebjs_auth bot\.wwebjs_cache /XF *.log

:: Criar arquivo de informações do backup
echo Backup criado em: %date% %time% > "%BACKUP_DIR%\%BACKUP_NAME%\backup_info.txt"
git log --oneline -1 >> "%BACKUP_DIR%\%BACKUP_NAME%\backup_info.txt" 2>nul

echo.
echo ✅ Backup criado com sucesso!
echo 📁 Local: %BACKUP_DIR%\%BACKUP_NAME%
echo.
pause