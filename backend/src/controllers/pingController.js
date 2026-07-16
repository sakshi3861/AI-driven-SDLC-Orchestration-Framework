class PingController {
  static ping(req, res) {
    return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  }
}

module.exports = PingController;
