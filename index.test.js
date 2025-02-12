const request = require('supertest');
const { app, cache } = require('./index');

describe('Cache API Tests', () => {
    test('Should store and retrieve a value', async () => {
        await request(app)
            .post('/cache')
            .send({ key: 'test', value: 'hello', ttl: 1000 })
            .expect(200);

        const res = await request(app).get('/cache/test');
        expect(res.status).toBe(200);
        expect(res.body.value).toBe('hello');
    });

    test('Should return 404 for expired key', async () => {
        cache.set('temp', 'data', 500); // Set manually
        await new Promise(res => setTimeout(res, 600)); // Wait for expiration
        const res = await request(app).get('/cache/temp');
        expect(res.status).toBe(404);
    });
});
