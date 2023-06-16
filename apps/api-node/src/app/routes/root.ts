import { FastifyInstance } from 'fastify';
import { ItemSchema, ItemType } from '@nx-demo/shared/jsonschema';

const items = [];

export default async function (fastify: FastifyInstance) {
  fastify.post<{ Body: ItemType }>(
    '/',
    {
      schema: {
        body: ItemSchema,
      },
    },
    async function (req) {
      const body = req.body;
      items.push(body);
      return { message: 'Success add item' };
    }
  );

  fastify.get<{ Reply: ItemType[] }>('/', async function () {
    return items;
  });
}
