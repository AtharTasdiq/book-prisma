import { z } from 'zod';

const create = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required'
        }),
        // book: z.string({
        //     required_error: 'Book is required'
        // })
    })
});


const update = z.object({
    body: z.object({
        title: z.string().optional(),
        // book: z.string().optional(),
    })
});


export const CategoryValidation = {
    create,
    update
};