import { config } from 'dotenv';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure environment variables first, before any other code
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
config({ 
  path: path.join(__dirname, `../../${envFile}`),
  override: true // Ensure variables are overridden if they exist in process.env
});

import { securityMiddleware, errorHandler, notFoundHandler } from './middleware/index.js';
import userRoutes from './routes/users.route.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isDev = process.env.NODE_ENV !== 'production';

// Log environment state
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: PORT,
  envFile: envFile
});

// CORS configuration
const corsOptions = {
  origin: isDev 
    ? 'http://localhost:5173' // Vite dev server
    : process.env.CLIENT_URL || true,
  credentials: true
};

// Apply middleware
app.use(securityMiddleware);
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    environment: process.env.NODE_ENV,
    port: PORT,
    timestamp: new Date().toISOString() 
  });
});

// Only serve static files and handle SPA routing in production
if (!isDev) {
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  if (isDev) {
    console.log(`API available at http://localhost:${PORT}`);
    console.log('Client dev server will proxy API requests automatically');
  }
});