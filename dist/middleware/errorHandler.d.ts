import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
/**
 * Global error handler middleware
 * Must be the last middleware in the chain
 */
export declare const errorHandler: (err: Error | ApiError, _req: Request, res: Response, _next: NextFunction) => void;
/**
 * Handle 404 errors for undefined routes
 */
export declare const notFound: (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map