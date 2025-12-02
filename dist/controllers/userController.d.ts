import { Request, Response } from 'express';
/**
 * Get all users (Admin only)
 * GET /api/users
 */
export declare const getAllUsers: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get user by ID (Admin only)
 * GET /api/users/:id
 */
export declare const getUserById: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Create user (Admin only)
 * POST /api/users
 */
export declare const createUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Update user (Admin only)
 * PUT /api/users/:id
 */
export declare const updateUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Change user role (Admin only)
 * PATCH /api/users/:id/role
 */
export declare const changeUserRole: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Deactivate user (Admin only)
 * PATCH /api/users/:id/deactivate
 */
export declare const deactivateUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Activate user (Admin only)
 * PATCH /api/users/:id/activate
 */
export declare const activateUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Delete user (Admin only)
 * DELETE /api/users/:id
 */
export declare const deleteUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=userController.d.ts.map