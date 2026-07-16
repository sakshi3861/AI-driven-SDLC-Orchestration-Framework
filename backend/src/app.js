const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// Register routes
app.use('/api', routes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message || err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
  });
});

module.exports = app;
