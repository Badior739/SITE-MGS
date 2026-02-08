import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Autorise le Frontend à parler au Backend
app.use(express.json()); // Permet de lire le JSON envoyé par le Frontend

// --- ROUTES DE TEST ---

// 1. Vérification que le serveur tourne
app.get('/', (req, res) => {
  res.send('🚀 Mind Graphix API is running!');
});

// 2. Vérification de la connexion BDD
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'OK', database: 'Connected', timestamp: new Date() });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ status: 'ERROR', database: 'Disconnected', error: String(error) });
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur Backend démarré sur http://localhost:${PORT}`);
  console.log(`📊 Base de données connectée via Prisma`);
});