import Fastify, { FastifyInstance } from 'fastify';
import { app } from './app';

describe('GET /', () => {
  let server: FastifyInstance;

  beforeEach(() => {
    server = Fastify();
    server.register(app);
  });

  it('should be able to add items', async () => {
    const rAddItems = await server.inject({
      method: 'POST',
      url: '/',
      body: {
        title: 'Ayogaki del Tore',
        year: 1992,
      },
    });

    expect(rAddItems.json()).toEqual({ message: 'Success add item' });

    const rReadItems = await server.inject({
      method: 'GET',
      url: '/',
    });

    expect(rReadItems.json()[0]).toMatchObject({
      title: 'Ayogaki del Tore',
      year: 1992,
    });
  });
});
