const request = require('supertest');
const app = require('../src/app');

describe('GET /api/ping', () => {
  it('should return 200 OK and a success status with message pong', async () => {
    const res = await request(app)
      .get('/api/ping')
      .expect(200);

    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('message', 'pong');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('uptime');
  });

  it('should return 404 for non-existent routes', async () => {
    const res = await request(app)
      .get('/api/non-existent-route')
      .expect(404);

    expect(res.body).toHaveProperty('status', 'fail');
    expect(res.body.message).toContain('not found');
  });
});
