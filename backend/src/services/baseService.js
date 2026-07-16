const db = require('../config/db');

class BaseService {
  static async query(sql, params) {
    try {
      const result = await db.query(sql, params);
      return result.rows;
    } catch (err) {
      console.error(`Database Query Error on SQL: ${sql}`, err);
      throw err;
    }
  }
}

module.exports = BaseService;
