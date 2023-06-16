import { Static, Type } from '@sinclair/typebox';

export const ItemSchema = Type.Object({
  title: Type.String({ minLength: 1 }),
  year: Type.Number({ minimum: 1000 }),
});

export type ItemType = Static<typeof ItemSchema>;
