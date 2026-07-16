const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[SERVER] Express server listening on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('[SERVER] SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('[SERVER] Server closed.');
    process.exit(0);
  });
});
