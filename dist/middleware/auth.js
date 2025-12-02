"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthenticate = exports.authenticate = void 0;
const jwt_1 = require("../config/jwt");
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = require("../utils/ApiError");
const authenticate = async (req, _res, next) => {
    try {
        // 1. Get token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError_1.ApiError(401, 'No token provided. Please login.');
        }
        // 2. Extract token (remove 'Bearer ' prefix)
        const token = authHeader.substring(7);
        // 3. Verify token
        let decoded;
        try {
            decoded = (0, jwt_1.verifyToken)(token);
        }
        catch (error) {
            throw new ApiError_1.ApiError(401, 'Invalid or expired token. Please login again.');
        }
        // 4. Fetch user from database
        const user = await prisma_1.default.user.findUnique({
            where: { id: decoded.userId },
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
        // 5. Check if user exists and is active
        if (!user) {
            throw new ApiError_1.ApiError(401, 'User not found. Please login again.');
        }
        if (!user.isActive) {
            throw new ApiError_1.ApiError(403, 'Your account has been deactivated.');
        }
        // 6. Attach user to request object
        req.user = user;
        // 7. Continue to next middleware/controller
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
// Optional middleware - doesn't fail if no token
const optionalAuthenticate = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            try {
                const decoded = (0, jwt_1.verifyToken)(token);
                const user = await prisma_1.default.user.findUnique({
                    where: { id: decoded.userId },
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
                if (user && user.isActive) {
                    req.user = user;
                }
            }
            catch (error) {
                // Silently fail - optional auth
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.optionalAuthenticate = optionalAuthenticate;
//# sourceMappingURL=auth.js.map