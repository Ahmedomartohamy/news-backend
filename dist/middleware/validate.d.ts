import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
/**
 * Validation source type
 */
type ValidationSource = 'body' | 'params' | 'query';
/**
 * Zod validation middleware
 * Validates request data against a Zod schema
 */
export declare const validate: (schema: ZodSchema, source?: ValidationSource) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validate.d.ts.map