const urlService = require('../src/services/urlService');
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

jest.mock('../src/middleware/rateLimiterMiddleware', () => {
    return () => (req, res, next) => next(); // Skip rate limiting logic
});

describe('URL Controller Tests', () => {

    describe('POST /api/v1/url/shorten', () => {
        afterAll(async () => {
            await mongoose.connection.close();
          });

        it('should return 201 when short URL is created successfully', async () => {
            const response = await request(app)
                .post('/api/v1/url/shorten')
                .send({ originalUrl: 'https://example.com' });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Short URL created successfully.');
            expect(response.body.shortUrl).toBeDefined();
        });

        it('should return 400 when original URL is missing', async () => {
            const response = await request(app)
                .post('/api/v1/url/shorten')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Original URL is required.');
        });

        it('should return 500 when there is a server error', async () => {
            jest.spyOn(urlService, 'createShortUrl').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app)
                .post('/api/v1/url/shorten')
                .send({ originalUrl: 'https://example.com' });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('GET /api/v1/url/r/:slug', () => {
        afterAll(async () => {
            await mongoose.connection.close();
          });

        it('should return 302 for a successful redirection', async () => {
            jest.spyOn(urlService, 'getOriginalUrl').mockResolvedValue('https://example.com');

           const res = await request(app)
            .post('/api/v1/url/shorten')
            .send({ originalUrl: 'https://example.com' });

            const response = await request(app).get(`/api/v1/url/r/${res.body.shortUrl}`);

            expect(response.status).toBe(302);
            expect(response.header.location).toBe('https://example.com');
        });

        it('should return 404 if the original URL is not found', async () => {
            jest.spyOn(urlService, 'getOriginalUrl').mockResolvedValue(null);

            const response = await request(app).get('/api/v1/url/r/someSlug');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Original URL not found.');
        });
    });

    describe('GET /api/v1/url', () => {
        afterAll(async () => {
            await mongoose.connection.close();
          });
        it('should return 200 and list of URLs', async () => {
            const mockUrls = [{ id: '1', originalUrl: 'https://example.com', shortUrl: 'short.ly/1' }];
            jest.spyOn(urlService, 'getAll').mockResolvedValue(mockUrls);

            const response = await request(app).get('/api/v1/url');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('URLs fetched successfully.');
            expect(response.body.urls).toEqual(mockUrls);
        });

        it('should return 500 if there is a server error', async () => {
            jest.spyOn(urlService, 'getAll').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app).get('/api/v1/url');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('GET /api/v1/url/:id', () => {
        afterAll(async () => {
            await mongoose.connection.close();
          });
        it('should return 200 and URL details by ID', async () => {
            const mockUrl = { id: '1', originalUrl: 'https://example.com', shortUrl: 'short.ly/1' };
            jest.spyOn(urlService, 'getById').mockResolvedValue(mockUrl);

            const response = await request(app).get('/api/v1/url/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUrl);
        });

        it('should return 500 if there is a server error', async () => {
            jest.spyOn(urlService, 'getById').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app).get('/api/v1/url/1');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('PUT /api/v1/url/:id', () => {
        afterAll(async () => {
            await mongoose.connection.close();
          });
        it('should return 200 and updated URL details', async () => {
            const updatedUrlData = { originalUrl: 'https://updated.com' };
            const mockUpdatedUrl = { id: '1', originalUrl: 'https://updated.com', shortUrl: 'short.ly/1' };
            jest.spyOn(urlService, 'update').mockResolvedValue(mockUpdatedUrl);

            const response = await request(app)
                .put('/api/v1/url/1')
                .send(updatedUrlData);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('URL updated successfully.');
            expect(response.body.url).toEqual(mockUpdatedUrl);
        });

        it('should return 500 if there is a server error', async () => {
            const updatedUrlData = { originalUrl: 'https://updated.com' };
            jest.spyOn(urlService, 'update').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app)
                .put('/api/v1/url/1')
                .send(updatedUrlData);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('DELETE /api/v1/url/:id', () => {
        afterAll(async () => {
            await mongoose.connection.close();
          });
        it('should return 200 and the deleted URL details', async () => {
            const mockDeletedUrl = { id: '1', originalUrl: 'https://example.com', shortUrl: 'short.ly/1' };
            jest.spyOn(urlService, 'delete').mockResolvedValue(mockDeletedUrl);

            const response = await request(app).delete('/api/v1/url/1');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('URL deleted successfully.');
            expect(response.body.url).toEqual(mockDeletedUrl);
        });

        it('should return 500 if there is a server error', async () => {
            jest.spyOn(urlService, 'delete').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app).delete('/api/v1/url/1');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });
});