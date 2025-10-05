import http.server
import socketserver
import socket

PORT = 8000

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    local_ip = get_local_ip()
    print(f"Servidor rodando em:")
    print(f"Local: http://localhost:{PORT}")
    print(f"Rede: http://{local_ip}:{PORT}")
    print("Pressione Ctrl+C para parar")
    httpd.serve_forever()