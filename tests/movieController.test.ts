import request from 'supertest';
import app from '../src/app';
import * as movieService from '../src/services/movieService';
import { Movie } from '../src/models/movie';

jest.mock('../src/services/movieService.ts');

describe('User Controller', () => {
    describe('GET /Movies', () => {
        it('should response status is 200', async () => {
            const response = await request(app.app).get('/movies/1/1');
            expect(response.status).toBe(200);
        });
    });

});