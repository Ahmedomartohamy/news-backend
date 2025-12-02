import { Request, Response } from 'express';
/**
 * Register a new user
 * POST /api/auth/register
 */
export declare const register: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Login user
 * POST /api/auth/login
 */
export declare const login: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get current user
 * GET /api/auth/me
 */
export declare const getCurrentUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Update current user profile
 * PUT /api/auth/me
 */
export declare const updateProfile: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Change password
 * PUT /api/auth/change-password
 */
export declare const changePassword: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Logout user
 * POST /api/auth/logout
 */
export declare const logout: (req: Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=authController.d.ts.map