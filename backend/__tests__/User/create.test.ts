import request from 'supertest';
import { app } from '../../src/routes';

describe('User Routes', () => {
    it('should create a new user', async () => {
        const newUser = {
            username: 'testUser',
            password: 'testPassword',
            email: 'test@example.com',
            mobileNumber: '1234567890',
        };
        const res = await request(app).post('/users').send(newUser);
        expect(res.statusCode).toBe(201);
        // Add assertions for created user data
    });

});