"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.changePassword = exports.updateProfile = exports.getCurrentUser = exports.login = exports.register = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const userService_1 = __importDefault(require("../services/userService"));
const jwt_1 = require("../config/jwt");
/**
 * Register a new user
 * POST /api/auth/register
 */
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = req.body;
    const user = await userService_1.default.createUser(data);
    // Generate tokens
    const token = (0, jwt_1.generateToken)({
        userId: user.id,
        email: user.email,
        role: user.role,
    });
    const refreshToken = (0, jwt_1.generateRefreshToken)({
        userId: user.id,
        email: user.email,
        role: user.role,
    });
    res.status(201).json({
        success: true,
        data: {
            user,
            token,
            refreshToken,
        },
        message: 'User registered successfully',
    });
});
/**
 * Login user
 * POST /api/auth/login
 */
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    // Get user with password
    const user = await userService_1.default.getUserByEmail(email);
    if (!user) {
        throw new ApiError_1.ApiError(401, 'Invalid email or password');
    }
    // Check if user is active
    if (!user.isActive) {
        throw new ApiError_1.ApiError(403, 'Your account has been deactivated');
    }
    // Verify password
    const isPasswordValid = await userService_1.default.verifyPassword(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError_1.ApiError(401, 'Invalid email or password');
    }
    // Generate tokens
    const token = (0, jwt_1.generateToken)({
        userId: user.id,
        email: user.email,
        role: user.role,
    });
    const refreshToken = (0, jwt_1.generateRefreshToken)({
        userId: user.id,
        email: user.email,
        role: user.role,
    });
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    res.json({
        success: true,
        data: {
            user: userWithoutPassword,
            token,
            refreshToken,
        },
        message: 'Login successful',
    });
});
/**
 * Get current user
 * GET /api/auth/me
 */
exports.getCurrentUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    const user = await userService_1.default.getUserById(req.user.id);
    res.json({
        success: true,
        data: user,
    });
});
/**
 * Update current user profile
 * PUT /api/auth/me
 */
exports.updateProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    const { name, bio, avatarUrl } = req.body;
    const user = await userService_1.default.updateUser(req.user.id, {
        name,
        bio,
        avatarUrl,
    });
    res.json({
        success: true,
        data: user,
        message: 'Profile updated successfully',
    });
});
/**
 * Change password
 * PUT /api/auth/change-password
 */
exports.changePassword = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    const { oldPassword, newPassword } = req.body;
    const result = await userService_1.default.changePassword(req.user.id, oldPassword, newPassword);
    res.json({
        success: true,
        message: result.message,
    });
});
/**
 * Logout user
 * POST /api/auth/logout
 */
exports.logout = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    // In a stateless JWT system, logout is handled client-side
    // Client should delete the token
    // Here we can implement token blacklisting if needed
    res.json({
        success: true,
        message: 'Logged out successfully',
    });
});
//# sourceMappingURL=authController.js.map