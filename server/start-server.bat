@echo off
echo Iniciando servidor JSON...
echo.
echo Certifique-se de ter o Node.js instalado
echo.
cd /d "%~dp0"
if not exist node_modules (
    echo Instalando dependencias...
    npm install json-server
)
echo.
echo Servidor rodando em http://localhost:3000
echo Pressione Ctrl+C para parar o servidor
echo.
node server.js
pause