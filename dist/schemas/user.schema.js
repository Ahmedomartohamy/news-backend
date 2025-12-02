"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userParamsSchema = exports.changeRoleSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
/**
 * User role enum
 */
const userRoleEnum = zod_1.z.enum(['ADMIN', 'EDITOR', 'AUTHOR']);
/**
 * Schema for creating a new user
 */
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Please provide a valid email'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters long'),
    name: zod_1.z.string().min(1, 'Name is required'),
    role: userRoleEnum.optional(),
});
/**
 * Schema for updating a user
 */
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name cannot be empty').optional(),
    bio: zod_1.z.string().max(500, 'Bio must be less than 500 characters').optional(),
    avatarUrl: zod_1.z.string().url('Avatar URL must be a valid URL').optional(),
});
/**
 * Schema for changing user role
 */
exports.changeRoleSchema = zod_1.z.object({
    role: userRoleEnum,
});
/**
 * Schema for user ID parameter
 */
exports.userParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, 'Invalid user ID').transform(Number),
});
//# sourceMappingURL=user.schema.js.map