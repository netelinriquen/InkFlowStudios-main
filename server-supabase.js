import { createClient } from '@supabase/supabase-js'
import http from 'http'
import url from 'url'
import fs from 'fs'
import path from 'path'

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://tvccuvzcmnrqtrakudju.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Y2N1dnpjbW5ycXRyYWt1ZGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzczNzQsImV4cCI6MjA3NTIxMzM3NH0.802UvU_k3qqyBQX_vRMiN7ofJy1wTKfZU1dk8UPybug'
)

const PORT = process.env.PORT || 3001

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true)
  
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  // Criar usuário
  if (req.method === 'POST' && parsedUrl.pathname === '/users') {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', async () => {
      try {
        const userData = JSON.parse(body)
        const { data, error } = await supabase
          .from('usuarios')
          .insert([userData])
        
        if (error) throw error
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Usuário criado!' }))
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: error.message }))
      }
    })
    return
  }

  // Login
  if (req.method === 'POST' && (parsedUrl.pathname === '/login' || parsedUrl.pathname === '/api/login')) {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', async () => {
      try {
        const loginData = JSON.parse(body)
        const { data, error } = await supabase
          .from('usuarios')
          .select('id, nome, email, criado_em')
          .eq('email', loginData.email)
          .eq('senha', loginData.password)
        
        if (error) throw error
        
        if (data.length > 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ 
            success: true, 
            user: data[0],
            message: 'Login realizado com sucesso!' 
          }))
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ 
            success: false, 
            message: 'Email ou senha inválidos' 
          }))
        }
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: error.message }))
      }
    })
    return
  }

  // Listar usuários
  if (req.method === 'GET' && (parsedUrl.pathname === '/users' || parsedUrl.pathname === '/api/users')) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('id, nome, email, criado_em')
      
      if (error) throw error
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(data))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: error.message }))
    }
    return
  }

  // Criar agendamento
  if (req.method === 'POST' && parsedUrl.pathname === '/appointments') {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', async () => {
      try {
        const data = JSON.parse(body)
        const agendamento = {
          cliente_nome: data.clientName || data.name,
          telefone: data.phone,
          email: data.email,
          idade: data.age ? parseInt(data.age) : null,
          servico: data.service,
          data_agendamento: data.date,
          horario: data.time,
          artista: data.artist || 'Sem preferência',
          tamanho: data.size,
          local_corpo: data.location,
          descricao: data.description,
          orcamento: data.budget,
          primeira_tatuagem: data.firstTattoo || false,
          preco: data.price || 0
        }
        
        const { error } = await supabase
          .from('agendamentos')
          .insert([agendamento])
        
        if (error) throw error
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Agendamento criado com sucesso!', success: true }))
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: error.message }))
      }
    })
    return
  }

  // Listar agendamentos
  if (req.method === 'GET' && parsedUrl.pathname === '/appointments') {
    try {
      const { data, error } = await supabase
        .from('agendamentos')
        .select('*')
        .order('data_agendamento', { ascending: true })
        .order('horario', { ascending: true })
      
      if (error) throw error
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(data))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: error.message }))
    }
    return
  }

  // Servir arquivos estáticos
  if (req.method === 'GET') {
    let filePath = parsedUrl.pathname
    
    if (filePath === '/') {
      filePath = '/index.html'
    }
    
    const possiblePaths = [
      path.join(process.cwd(), filePath),
      path.join(process.cwd(), 'pages', filePath),
      path.join(process.cwd(), 'assets', filePath),
      path.join(process.cwd(), 'assets', 'css', filePath),
      path.join(process.cwd(), 'assets', 'js', filePath),
      path.join(process.cwd(), 'assets', 'images', filePath)
    ]
    
    for (const fullPath of possiblePaths) {
      if (fs.existsSync(fullPath)) {
        const ext = path.extname(fullPath)
        const contentType = {
          '.html': 'text/html',
          '.css': 'text/css',
          '.js': 'text/javascript',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.gif': 'image/gif',
          '.ico': 'image/x-icon'
        }[ext] || 'text/plain'
        
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(fs.readFileSync(fullPath))
        return
      }
    }
  }
  
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Rota não encontrada' }))
})

server.listen(PORT, () => {
  console.log(`🚀 Servidor Supabase na porta ${PORT}`)
  console.log(`📊 Teste: http://localhost:${PORT}`)
  console.log(`🔄 Supabase conectado!`)
})