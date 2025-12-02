import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
/**
 * Middleware to check if user has required role
 * Must be used AFTER authenticate middleware
 */
export declare const requireRole: (...allowedRoles: UserRole[]) => (req: Request, _res: Response, next: NextFunction) => void;
/**
 * Check if user is admin
 */
export declare const requireAdmin: (req: Request, _res: Response, next: NextFunction) => void;
/**
 * Check if user is admin or editor
 */
export declare const requireEditor: (req: Request, _res: Response, next: NextFunction) => void;
/**
 * Check if user is admin, editor, or author (basically any authenticated user)
 */
export declare const requireAuthor: (req: Request, _res: Response, next: NextFunction) => void;
/**
 * Check if user owns the resource or is admin
 */
export declare const requireOwnerOrAdmin: (getUserId: (req: Request) => number) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=roleCheck.d.ts.map