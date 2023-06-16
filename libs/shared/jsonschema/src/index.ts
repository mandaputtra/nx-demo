import { Static, Type } from '@sinclair/typebox';

export const AddItemSchema = Type.Object({
  title: Type.String({ minLength: 10 }),
  year: Type.Number({ minimum: 1000 }),
});

export type AddItemType = Static<typeof AddItemSchema>;
