import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

/**
 * Validation middleware
 * Checks validation results from express-validator
 */
export const validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => ({
            field: error.type === 'field' ? error.path : 'unknown',
            message: error.msg,
        }));

        res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errorMessages,
        });
        return;
    }

    next();
};

/**
 * Wrapper to run validation chains and then validate
 */
export const validateRequest = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // Run all validations
        for (const validation of validations) {
            await validation.run(req);
        }

        // Check for errors
        validate(req, res, next);
    };
};