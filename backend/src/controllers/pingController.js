// Strictly generic health check / ping controller
// No domain or business-specific logic

const getPing = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'pong',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};

module.exports = {
  getPing,
};
