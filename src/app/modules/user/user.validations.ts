import { z } from 'zod';
import { role } from './user.constants';

const create = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }),
        email: z.string({
            required_error: 'Email is required'
        }),
        password: z.string({
            required_error: 'Password is required'
        }),
        role: z.enum([...role] as [string, ...string[]],{
            required_error: 'Role is required',
        }),
        contactNo: z.string({
            required_error: 'Contact No is required'
        }),
        address: z.string({
            required_error: 'Address is required'
        }),
        profileImg: z.string({
            required_error: 'Profile Image is required'
        }),
    })
});


const update = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        password: z.string().optional(),
        role: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
        profileImg: z.string().optional(),
    })
});


export const UserValidation = {
    create,
    update
};