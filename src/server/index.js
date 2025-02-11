const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

app.use(cors());
app.use(express.json());

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Only serve static files and handle SPA routing in production
if (!isDev) {
  // Serve static files from the dist directory
  app.use(express.static(path.join(__dirname, '../../dist')));

  // Handle SPA routing - always return index.html for client routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (isDev) {
    console.log('Running in development mode - static file serving is disabled');
  }
});