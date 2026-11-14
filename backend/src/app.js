
import express from 'express';
import disciplinasRouter from './routes/disciplinas.js';
import atividadesRouter from './routes/atividades.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// --- Middleware global (antes das rotas) ---
app.use(express.json());
app.use(logger);

// --- Health check ---
app.get('/', (req, res) => {
  res.json({
    api: 'PrazoZero API',
    versao: '1.0.0',
    rotas: ['/disciplinas', '/atividades'],
  });
});

// --- Rotas ---
app.use('/disciplinas', disciplinasRouter);
app.use('/atividades', atividadesRouter);

// --- 404 para rotas que não existem ---
app.use((req, res) => {
  res.status(404).json({ erro: `Rota ${req.method} ${req.url} não existe` });
});

// --- Tratador de erro: SEMPRE o último ---
app.use(errorHandler);

export default app;
