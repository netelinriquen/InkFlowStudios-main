const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Middleware para CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

// Middleware para parsing JSON
server.use(jsonServer.bodyParser);

// Middleware de autenticação
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const user = db.get('users').find({ email, password }).value();
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: userWithoutPassword,
      token: `token_${user.id}_${Date.now()}`
    });
  } else {
    res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }
});

// Middleware para registro de usuários
server.post('/auth/register', (req, res) => {
  const { name, email, password, phone, birth } = req.body;
  const db = router.db;
  
  // Verificar se email já existe
  const existingUser = db.get('users').find({ email }).value();
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email já cadastrado' });
  }
  
  // Criar novo usuário
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    phone,
    birth,
    role: 'client',
    createdAt: new Date().toISOString()
  };
  
  db.get('users').push(newUser).write();
  
  const { password: _, ...userWithoutPassword } = newUser;
  res.json({
    success: true,
    user: userWithoutPassword,
    token: `token_${newUser.id}_${Date.now()}`
  });
});

// Middleware para validação de agendamentos
server.use('/appointments', (req, res, next) => {
  if (req.method === 'POST') {
    const appointment = req.body;
    appointment.id = Date.now();
    appointment.status = appointment.status || 'pendente';
    appointment.createdAt = new Date().toISOString();
    appointment.updatedAt = new Date().toISOString();
  }
  
  if (req.method === 'PUT' || req.method === 'PATCH') {
    req.body.updatedAt = new Date().toISOString();
  }
  
  next();
});

// Middleware para estatísticas (admin)
server.get('/admin/stats', (req, res) => {
  const db = router.db;
  const appointments = db.get('appointments').value();
  const users = db.get('users').value();
  
  const stats = {
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter(a => a.status === 'pendente').length,
    confirmedAppointments: appointments.filter(a => a.status === 'confirmado').length,
    completedAppointments: appointments.filter(a => a.status === 'concluido').length,
    totalUsers: users.filter(u => u.role === 'client').length,
    recentAppointments: appointments.slice(-5).reverse()
  };
  
  res.json(stats);
});

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Ink Flow API rodando na porta ${PORT}`);
  console.log(`📊 Admin: http://localhost:${PORT}/admin/stats`);
  console.log(`🔐 Auth: http://localhost:${PORT}/auth/login`);
});