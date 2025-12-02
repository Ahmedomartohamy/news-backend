"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = require("../utils/ApiError");
const pagination_1 = require("../utils/pagination");
class UserService {
    /**
     * Create a new user
     */
    async createUser(data) {
        // Check if email already exists
        const existingUser = await prisma_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new ApiError_1.ApiError(409, 'Email already registered');
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        // Create user
        const user = await prisma_1.default.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                role: data.role || client_1.UserRole.AUTHOR,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatarUrl: true,
                bio: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    /**
     * Get user by email (for login)
     */
    async getUserByEmail(email) {
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        return user;
    }
    /**
     * Get user by ID
     */
    async getUserById(id) {
        const user = await prisma_1.default.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatarUrl: true,
                bio: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        articles: true,
                        comments: true,
                    },
                },
            },
        });
        if (!user) {
            throw new ApiError_1.ApiError(404, 'User not found');
        }
        return user;
    }
    /**
     * Get all users with pagination
     */
    async getAllUsers(query) {
        const { skip, take, page, limit } = (0, pagination_1.getPagination)({
            page: query.page,
            limit: query.limit,
        });
        const [users, total] = await Promise.all([
            prisma_1.default.user.findMany({
                skip,
                take,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    avatarUrl: true,
                    isActive: true,
                    createdAt: true,
                    _count: {
                        select: {
                            articles: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma_1.default.user.count(),
        ]);
        return {
            users,
            pagination: (0, pagination_1.getPaginationMeta)(page, limit, total),
        };
    }
    /**
     * Update user
     */
    async updateUser(id, data) {
        const user = await prisma_1.default.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatarUrl: true,
                bio: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    /**
     * Change user password
     */
    async changePassword(id, oldPassword, newPassword) {
        const user = await prisma_1.default.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new ApiError_1.ApiError(404, 'User not found');
        }
        // Verify old password
        const isPasswordValid = await bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new ApiError_1.ApiError(401, 'Current password is incorrect');
        }
        // Hash new password
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        // Update password
        await prisma_1.default.user.update({
            where: { id },
            data: { password: hashedPassword },
        });
        return { message: 'Password changed successfully' };
    }
    /**
     * Change user role (admin only)
     */
    async changeUserRole(id, role) {
        const user = await prisma_1.default.user.update({
            where: { id },
            data: { role },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatarUrl: true,
                bio: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    /**
     * Deactivate user
     */
    async deactivateUser(id) {
        await prisma_1.default.user.update({
            where: { id },
            data: { isActive: false },
        });
        return { message: 'User deactivated successfully' };
    }
    /**
     * Activate user
     */
    async activateUser(id) {
        await prisma_1.default.user.update({
            where: { id },
            data: { isActive: true },
        });
        return { message: 'User activated successfully' };
    }
    /**
     * Delete user
     */
    async deleteUser(id) {
        await prisma_1.default.user.delete({
            where: { id },
        });
        return { message: 'User deleted successfully' };
    }
    /**
     * Verify password
     */
    async verifyPassword(plainPassword, hashedPassword) {
        return bcryptjs_1.default.compare(plainPassword, hashedPassword);
    }
}
exports.UserService = UserService;
exports.default = new UserService();
//# sourceMappingURL=userService.js.map