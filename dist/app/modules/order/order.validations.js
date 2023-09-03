"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
// Define a Zod schema for the OrderedBook model
const orderedBookSchema = zod_1.z.object({
    orderedBooks: zod_1.z.object({
        bookId: zod_1.z.string(),
        quantity: zod_1.z.number().int(),
    })
});
// Define a Zod schema for the Order model
const create = zod_1.z.object({
    orderedBooks: zod_1.z.array(orderedBookSchema),
    status: zod_1.z.string().optional(),
});
exports.OrderValidation = {
    create,
    orderedBookSchema
};
