import { z } from 'zod';

// Define a Zod schema for the OrderedBook model
const orderedBookSchema = z.object({
  orderedBooks: z.object({
    bookId: z.string(),
    quantity: z.number().int(),
  })
});

// Define a Zod schema for the Order model
const create = z.object({
  orderedBooks: z.array(orderedBookSchema),
  status: z.string().optional(),
});

export const OrderValidation = {
  create,
  orderedBookSchema
};





