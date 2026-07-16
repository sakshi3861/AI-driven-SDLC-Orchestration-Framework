const request = require('supertest');
const app = require('../src/app');
const { pool } = require('../src/config/db');

afterAll(async () => {
  await pool.end();
});

describe('Ping Endpoint', () => {
  it('should return 200 OK and timestamp', async () => {
    const res = await request(app)
      .get('/api/ping')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('timestamp');
  });
});
