import { z } from 'zod';
/**
 * Schema for creating a new user
 */
export declare const createUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<{
        ADMIN: "ADMIN";
        EDITOR: "EDITOR";
        AUTHOR: "AUTHOR";
    }>>;
}, z.core.$strip>;
/**
 * Schema for updating a user
 */
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schema for changing user role
 */
export declare const changeRoleSchema: z.ZodObject<{
    role: z.ZodEnum<{
        ADMIN: "ADMIN";
        EDITOR: "EDITOR";
        AUTHOR: "AUTHOR";
    }>;
}, z.core.$strip>;
/**
 * Schema for user ID parameter
 */
export declare const userParamsSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
/**
 * Type inference exports
 */
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ChangeRoleInput = z.infer<typeof changeRoleSchema>;
export type UserParams = z.infer<typeof userParamsSchema>;
//# sourceMappingURL=user.schema.d.ts.map