"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireOwnerOrAdmin = exports.requireAuthor = exports.requireEditor = exports.requireAdmin = exports.requireRole = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = require("../utils/ApiError");
/**
 * Middleware to check if user has required role
 * Must be used AFTER authenticate middleware
 */
const requireRole = (...allowedRoles) => {
    return (req, _res, next) => {
        try {
            // Check if user is authenticated
            if (!req.user) {
                throw new ApiError_1.ApiError(401, 'Authentication required');
            }
            // Check if user has one of the allowed roles
            if (!allowedRoles.includes(req.user.role)) {
                throw new ApiError_1.ApiError(403, `Access denied. Required role: ${allowedRoles.join(' or ')}`);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.requireRole = requireRole;
/**
 * Check if user is admin
 */
exports.requireAdmin = (0, exports.requireRole)(client_1.UserRole.ADMIN);
/**
 * Check if user is admin or editor
 */
exports.requireEditor = (0, exports.requireRole)(client_1.UserRole.ADMIN, client_1.UserRole.EDITOR);
/**
 * Check if user is admin, editor, or author (basically any authenticated user)
 */
exports.requireAuthor = (0, exports.requireRole)(client_1.UserRole.ADMIN, client_1.UserRole.EDITOR, client_1.UserRole.AUTHOR);
/**
 * Check if user owns the resource or is admin
 */
const requireOwnerOrAdmin = (getUserId) => {
    return (req, _res, next) => {
        try {
            if (!req.user) {
                throw new ApiError_1.ApiError(401, 'Authentication required');
            }
            const resourceUserId = getUserId(req);
            const isOwner = req.user.id === resourceUserId;
            const isAdmin = req.user.role === client_1.UserRole.ADMIN;
            if (!isOwner && !isAdmin) {
                throw new ApiError_1.ApiError(403, 'You can only modify your own resources');
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.requireOwnerOrAdmin = requireOwnerOrAdmin;
//# sourceMappingURL=roleCheck.js.map