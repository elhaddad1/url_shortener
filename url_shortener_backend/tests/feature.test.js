const featureService = require('../src/services/featureService');
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

jest.mock('../src/middleware/rateLimiterMiddleware', () => {
    return () => (req, res, next) => next(); // Skip rate limiting logic
});

describe('Feature Controller Tests', () => {
   
    describe('POST /api/v1/feature', () => {
        afterAll(async () => {
            await mongoose.connection.close();
        });

        it('should return 201 when feature is created successfully', async () => {
            const featureData = { name: 'Feature A', description: 'Feature A description' };
            jest.spyOn(featureService, 'create').mockResolvedValue(featureData);

            const response = await request(app)
                .post('/api/v1/feature')
                .send(featureData);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Feature created successfully.');
            expect(response.body.feature).toEqual(featureData);
        });

        it('should return 400 when feature name is missing', async () => {
            const featureData = { description: 'Feature without a name' };

            const response = await request(app)
                .post('/api/v1/feature')
                .send(featureData);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Feature name is required.');
        });

        it('should return 500 when there is a server error', async () => {
            const featureData = { name: 'Feature A', description: 'Feature A description' };
            jest.spyOn(featureService, 'create').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app)
                .post('/api/v1/feature')
                .send(featureData);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('GET /api/v1/feature', () => {
        afterAll(async () => {
            await mongoose.connection.close();
        });

        it('should return 200 and list of features', async () => {
            const mockFeatures = [
                { id: '1', name: 'Feature A', description: 'Feature A description' },
                { id: '2', name: 'Feature B', description: 'Feature B description' }
            ];
            jest.spyOn(featureService, 'getAll').mockResolvedValue(mockFeatures);

            const response = await request(app).get('/api/v1/feature');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Features fetched successfully.');
            expect(response.body.features).toEqual(mockFeatures);
        });

        it('should return 500 if there is a server error', async () => {
            jest.spyOn(featureService, 'getAll').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app).get('/api/v1/feature');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('GET /api/v1/feature/:id', () => {
        afterAll(async () => {
            await mongoose.connection.close();
        });

        it('should return 200 and feature details by ID', async () => {
            const mockFeature = { id: '1', name: 'Feature A', description: 'Feature A description' };
            jest.spyOn(featureService, 'getById').mockResolvedValue(mockFeature);

            const response = await request(app).get('/api/v1/feature/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockFeature);
        });

        it('should return 500 if there is a server error', async () => {
            jest.spyOn(featureService, 'getById').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app).get('/api/v1/feature/1');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('GET /api/v1/feature/name/:name', () => {
        afterAll(async () => {
            await mongoose.connection.close();
        });

        it('should return 200 and feature details by name', async () => {
            const mockFeature = { id: '1', name: 'Feature A', description: 'Feature A description' };
            jest.spyOn(featureService, 'getFeatureByName').mockResolvedValue(mockFeature);

            const response = await request(app).get('/api/v1/feature/name/Feature A');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockFeature);
        });

        it('should return 500 if there is a server error', async () => {
            jest.spyOn(featureService, 'getFeatureByName').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app).get('/api/v1/feature/name/Feature A');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('PUT /api/v1/feature/:id', () => {
        afterAll(async () => {
            await mongoose.connection.close();
        });

        it('should return 200 and updated feature details', async () => {
            const updatedFeatureData = { name: 'Updated Feature', description: 'Updated feature description' };
            const mockUpdatedFeature = { id: '1', name: 'Updated Feature', description: 'Updated feature description' };
            jest.spyOn(featureService, 'update').mockResolvedValue(mockUpdatedFeature);

            const response = await request(app)
                .put('/api/v1/feature/1')
                .send(updatedFeatureData);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Feature updated successfully.');
            expect(response.body.feature).toEqual(mockUpdatedFeature);
        });

        it('should return 500 if there is a server error', async () => {
            const updatedFeatureData = { name: 'Updated Feature', description: 'Updated feature description' };
            jest.spyOn(featureService, 'update').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app)
                .put('/api/v1/feature/1')
                .send(updatedFeatureData);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('DELETE /api/v1/feature/:id', () => {
        afterAll(async () => {
            await mongoose.connection.close();
        });

        it('should return 200 and the deleted feature details', async () => {
            const mockDeletedFeature = { id: '1', name: 'Feature A', description: 'Feature A description' };
            jest.spyOn(featureService, 'delete').mockResolvedValue(mockDeletedFeature);

            const response = await request(app).delete('/api/v1/feature/1');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Feature deleted successfully.');
            expect(response.body.feature).toEqual(mockDeletedFeature);
        });

        it('should return 500 if there is a server error', async () => {
            jest.spyOn(featureService, 'delete').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app).delete('/api/v1/feature/1');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });
});
