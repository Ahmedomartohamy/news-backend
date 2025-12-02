"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.activateUser = exports.deactivateUser = exports.changeUserRole = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const userService_1 = __importDefault(require("../services/userService"));
/**
 * Get all users (Admin only)
 * GET /api/users
 */
exports.getAllUsers = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const query = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
    };
    const result = await userService_1.default.getAllUsers(query);
    res.json({
        success: true,
        data: result.users,
        pagination: result.pagination,
    });
});
/**
 * Get user by ID (Admin only)
 * GET /api/users/:id
 */
exports.getUserById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'User ID is required');
    }
    const id = parseInt(req.params.id);
    const user = await userService_1.default.getUserById(id);
    res.json({
        success: true,
        data: user,
    });
});
/**
 * Create user (Admin only)
 * POST /api/users
 */
exports.createUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password, name, role } = req.body;
    const user = await userService_1.default.createUser({
        email,
        password,
        name,
        role,
    });
    res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully',
    });
});
/**
 * Update user (Admin only)
 * PUT /api/users/:id
 */
exports.updateUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'User ID is required');
    }
    const id = parseInt(req.params.id);
    const { name, bio, avatarUrl } = req.body;
    const user = await userService_1.default.updateUser(id, {
        name,
        bio,
        avatarUrl,
    });
    res.json({
        success: true,
        data: user,
        message: 'User updated successfully',
    });
});
/**
 * Change user role (Admin only)
 * PATCH /api/users/:id/role
 */
exports.changeUserRole = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'User ID is required');
    }
    const id = parseInt(req.params.id);
    const { role } = req.body;
    const user = await userService_1.default.changeUserRole(id, role);
    res.json({
        success: true,
        data: user,
        message: 'User role updated successfully',
    });
});
/**
 * Deactivate user (Admin only)
 * PATCH /api/users/:id/deactivate
 */
exports.deactivateUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'User ID is required');
    }
    const id = parseInt(req.params.id);
    const result = await userService_1.default.deactivateUser(id);
    res.json({
        success: true,
        message: result.message,
    });
});
/**
 * Activate user (Admin only)
 * PATCH /api/users/:id/activate
 */
exports.activateUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'User ID is required');
    }
    const id = parseInt(req.params.id);
    const result = await userService_1.default.activateUser(id);
    res.json({
        success: true,
        message: result.message,
    });
});
/**
 * Delete user (Admin only)
 * DELETE /api/users/:id
 */
exports.deleteUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'User ID is required');
    }
    const id = parseInt(req.params.id);
    // Prevent deleting yourself
    if (req.user && req.user.id === id) {
        throw new ApiError_1.ApiError(400, 'You cannot delete your own account');
    }
    const result = await userService_1.default.deleteUser(id);
    res.json({
        success: true,
        message: result.message,
    });
});
//# sourceMappingURL=userController.js.map