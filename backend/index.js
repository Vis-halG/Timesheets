import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

// Middleware
app.use(cors());
app.use(express.json());

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  designation: user.designation,
  department: user.department
});

const users = [
  {
    id: 1,
    name: 'Vishal Admin',
    email: 'admin@company.com',
    password: 'admin123',
    role: 'admin',
    designation: 'Workspace Owner',
    department: 'Operations'
  },
  {
    id: 2,
    name: 'Vishal Staff',
    email: 'employee@company.com',
    password: 'employee123',
    role: 'employee',
    designation: 'Software Engineer',
    department: 'Engineering'
  }
];

const sessions = new Map();

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const userId = token ? sessions.get(token) : null;
  const user = users.find((item) => item.id === userId);

  if (!user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  req.user = user;
  req.token = token;
  next();
};

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'You do not have permission to access this resource' });
  }

  next();
};

// In-memory storage (to be replaced by Firebase)
let entries = [
  {
    id: 1,
    employeeId: 2,
    employeeName: 'Vishal Staff',
    description: "UI Design for Dashboard",
    project: { name: "Acme Corp Redesign", color: "bg-blue-500", client: "Acme Corp" },
    tags: ["Design"],
    billable: true,
    startTime: "09:00 AM",
    endTime: "11:30 AM",
    duration: "02:30:00",
    durationMs: 9000000,
    date: "Today",
  }
];

// Routes
app.get('/', (req, res) => {
  res.send('Timesheet API is running...');
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email.toLowerCase() === String(email || '').toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = crypto.randomUUID();
  sessions.set(token, user.id);

  res.json({ token, user: publicUser(user) });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  sessions.delete(req.token);
  res.status(204).send();
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json(publicUser(req.user));
});

// GET all entries
app.get('/api/entries', requireAuth, (req, res) => {
  if (req.user.role === 'admin') {
    return res.json(entries);
  }

  res.json(entries.filter((entry) => entry.employeeId === req.user.id));
});

// POST new entry
app.post('/api/entries', requireAuth, requireRole('employee'), (req, res) => {
  const newEntry = {
    id: Date.now(),
    employeeId: req.user.id,
    employeeName: req.user.name,
    status: 'draft',
    ...req.body
  };
  entries.unshift(newEntry);
  res.status(201).json(newEntry);
});

// DELETE entry
app.delete('/api/entries/:id', requireAuth, (req, res) => {
  const entryId = parseInt(req.params.id);
  const entry = entries.find((item) => item.id === entryId);

  if (!entry) {
    return res.status(404).json({ message: 'Entry not found' });
  }

  if (req.user.role !== 'admin' && entry.employeeId !== req.user.id) {
    return res.status(403).json({ message: 'You can only delete your own entries' });
  }

  entries = entries.filter(e => e.id !== entryId);
  res.status(204).send();
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
