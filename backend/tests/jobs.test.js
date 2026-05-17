const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

require('dotenv').config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/jobs', () => {
  it('should return an array of jobs', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should filter jobs by category', async () => {
    const res = await request(app).get('/api/jobs?category=Plumbing');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach(job => {
      expect(job.category).toBe('Plumbing');
    });
  });

  it('should filter jobs by status', async () => {
    const res = await request(app).get('/api/jobs?status=Open');
    expect(res.statusCode).toBe(200);
    res.body.forEach(job => {
      expect(job.status).toBe('Open');
    });
  });
});

describe('POST /api/jobs', () => {
  it('should create a new job', async () => {
    const res = await request(app)
      .post('/api/jobs')
      .send({
        title: 'Test Job',
        description: 'Test description for unit test',
        category: 'Plumbing',
        location: 'Glasgow',
        contactName: 'Test User',
        contactEmail: 'test@example.com',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Job');
    expect(res.body.status).toBe('Open');
    expect(res.body._id).toBeDefined();

    // cleanup — delete the test job
    await request(app).delete(`/api/jobs/${res.body._id}`);
  });

  it('should return 400 if required fields missing', async () => {
    const res = await request(app)
      .post('/api/jobs')
      .send({
        title: 'Missing description',
      });
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/jobs')
      .send({
        title: 'Test',
        description: 'Test desc',
        category: 'Plumbing',
        location: 'Glasgow',
        contactName: 'John',
        contactEmail: 'not-an-email',
      });
    expect(res.statusCode).toBe(400);
  });
});