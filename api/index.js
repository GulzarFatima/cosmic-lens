// api/index.js
/* global process */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import nasaRoutes from './routes/nasa.js';
import starmapRoutes from './routes/starmap.js';

dotenv.config();

const app = express();
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());

app.get('/healthz', (_, res) => res.send('ok'));

app.use('/api/nasa', nasaRoutes);
app.use('/api/starmap', starmapRoutes);

const port = process.env.PORT || 5001;
app.listen(port, '0.0.0.0', () => {
  console.log(`Express server running at http://0.0.0.0:${port}`);
});
