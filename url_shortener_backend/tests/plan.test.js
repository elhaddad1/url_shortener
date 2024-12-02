const planService = require('../src/services/planService');
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

jest.mock('../src/middleware/rateLimiterMiddleware', () => {
    return () => (req, res, next) => next(); // Skip rate limiting logic
});
describe('Plan Controller Tests', () => {
   
    describe('POST /api/v1/plan', () => {
        afterAll(async () => {
            await mongoose.connection.close();
        });

        it('should return 201 when plan is created successfully', async () => {
            const planData = { name: 'Premium', description: 'Premium plan with full features' };
            jest.spyOn(planService, 'create').mockResolvedValue(planData);

            const response = await request(app)
                .post('/api/v1/plan')
                .send(planData);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Plan created successfully');
            expect(response.body.plan).toEqual(planData);
        });

        it('should return 500 when there is a server error', async () => {
            const planData = { name: 'Premium', description: 'Premium plan with full features' };
            jest.spyOn(planService, 'create').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app)
                .post('/api/v1/plan')
                .send(planData);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('GET /api/v1/plan', () => {
        afterAll(async () => {
            await mongoose.connection.close();
        });

        it('should return 200 and list of plans', async () => {
            const mockPlans = [
                { id: '1', name: 'Basic', description: 'Basic plan with limited features' },
                { id: '2', name: 'Premium', description: 'Premium plan with full features' }
            ];
            jest.spyOn(planService, 'getAll').mockResolvedValue(mockPlans);

            const response = await request(app).get('/api/v1/plan');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPlans);
        });

        it('should return 500 if there is a server error', async () => {
            jest.spyOn(planService, 'getAll').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app).get('/api/v1/plan');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('GET /api/v1/plan/:id', () => {
        afterAll(async () => {
            await mongoose.connection.close();
        });

        it('should return 200 and plan details by ID', async () => {
            const mockPlan = { id: '1', name: 'Basic', description: 'Basic plan with limited features' };
            jest.spyOn(planService, 'getById').mockResolvedValue(mockPlan);

            const response = await request(app).get('/api/v1/plan/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPlan);
        });

        it('should return 500 if there is a server error', async () => {
            jest.spyOn(planService, 'getById').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app).get('/api/v1/plan/1');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('GET /api/v1/plan/name/:name', () => {
        afterAll(async () => {
            await mongoose.connection.close();
        });

        it('should return 200 and plan details by name', async () => {
            const mockPlan = { id: '1', name: 'Premium', description: 'Premium plan with full features' };
            jest.spyOn(planService, 'getPlanByName').mockResolvedValue(mockPlan);

            const response = await request(app).get('/api/v1/plan/name/Premium');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPlan);
        });

        it('should return 500 if there is a server error', async () => {
            jest.spyOn(planService, 'getPlanByName').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app).get('/api/v1/plan/name/Premium');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('PUT /api/v1/plan/:id', () => {
        afterAll(async () => {
            await mongoose.connection.close();
        });

        it('should return 200 and updated plan details', async () => {
            const updatedPlanData = { name: 'Updated Plan', description: 'Updated plan description' };
            const mockUpdatedPlan = { id: '1', name: 'Updated Plan', description: 'Updated plan description' };
            jest.spyOn(planService, 'update').mockResolvedValue(mockUpdatedPlan);

            const response = await request(app)
                .put('/api/v1/plan/1')
                .send(updatedPlanData);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Plan updated successfully');
            expect(response.body.plan).toEqual(mockUpdatedPlan);
        });

        it('should return 500 if there is a server error', async () => {
            const updatedPlanData = { name: 'Updated Plan', description: 'Updated plan description' };
            jest.spyOn(planService, 'update').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app)
                .put('/api/v1/plan/1')
                .send(updatedPlanData);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('DELETE /api/v1/plan/:id', () => {
        afterAll(async () => {
            await mongoose.connection.close();
        });

        it('should return 200 and the deleted plan details', async () => {
            const mockDeletedPlan = { id: '1', name: 'Basic', description: 'Basic plan with limited features' };
            jest.spyOn(planService, 'delete').mockResolvedValue(mockDeletedPlan);

            const response = await request(app).delete('/api/v1/plan/1');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Plan deleted successfully');
            expect(response.body.plan).toEqual(mockDeletedPlan);
        });

        it('should return 500 if there is a server error', async () => {
            jest.spyOn(planService, 'delete').mockRejectedValue(new Error('Internal server error'));

            const response = await request(app).delete('/api/v1/plan/1');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });
});
