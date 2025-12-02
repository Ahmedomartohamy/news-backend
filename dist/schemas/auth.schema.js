"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.updateProfileSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for user registration
 */
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Please provide a valid email'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters long'),
    name: zod_1.z.string().min(1, 'Name is required'),
});
/**
 * Schema for user login
 */
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Please provide a valid email'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
/**
 * Schema for updating user profile
 */
exports.updateProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name cannot be empty').optional(),
    bio: zod_1.z.string().max(500, 'Bio must be less than 500 characters').optional(),
    avatarUrl: zod_1.z.string().url('Avatar URL must be a valid URL').optional(),
});
/**
 * Schema for changing password
 */
exports.changePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string().min(1, 'Current password is required'),
    newPassword: zod_1.z.string().min(8, 'New password must be at least 8 characters long'),
});
//# sourceMappingURL=auth.schema.js.map