const request = require('supertest');
const app = require('../src/app');

describe('Auth API', () => {
    it('should register a user', async () => {
        const res = await request(app).post('/auth/register').send({
            email: 'test@example.com',
            password: 'password123'
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.email).toEqual('test@example.com');
    });
});
