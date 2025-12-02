"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = require("../utils/ApiError");
/**
 * Global error handler middleware
 * Must be the last middleware in the chain
 */
const errorHandler = (err, _req, res, _next) => {
    // Default error
    let statusCode = 500;
    let message = 'Internal Server Error';
    let isOperational = false;
    // Handle ApiError (our custom errors)
    if (err instanceof ApiError_1.ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        isOperational = err.isOperational;
    }
    // Handle Prisma errors
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        isOperational = true;
        switch (err.code) {
            case 'P2002':
                // Unique constraint violation
                statusCode = 409;
                message = `Duplicate entry: ${err.meta?.target || 'field'} already exists`;
                break;
            case 'P2025':
                // Record not found
                statusCode = 404;
                message = 'Record not found';
                break;
            case 'P2003':
                // Foreign key constraint failed
                statusCode = 400;
                message = 'Invalid reference to related record';
                break;
            case 'P2014':
                // Required relation violation
                statusCode = 400;
                message = 'Related record is required';
                break;
            default:
                statusCode = 400;
                message = 'Database error occurred';
        }
    }
    // Handle Prisma validation errors
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = 'Invalid data provided';
        isOperational = true;
    }
    // Handle JWT errors
    else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
        isOperational = true;
    }
    else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
        isOperational = true;
    }
    // Handle Multer errors (file upload)
    else if (err.name === 'MulterError') {
        statusCode = 400;
        message = `File upload error: ${err.message}`;
        isOperational = true;
    }
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', {
            name: err.name,
            message: err.message,
            stack: err.stack,
            statusCode,
        });
    }
    // Log non-operational errors (unexpected errors)
    if (!isOperational) {
        console.error('CRITICAL ERROR:', err);
    }
    // Send error response
    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
            details: err instanceof ApiError_1.ApiError ? undefined : err.message,
        }),
    });
};
exports.errorHandler = errorHandler;
/**
 * Handle 404 errors for undefined routes
 */
const notFound = (req, _res, next) => {
    const error = new ApiError_1.ApiError(404, `Route ${req.originalUrl} not found`);
    next(error);
};
exports.notFound = notFound;
//# sourceMappingURL=errorHandler.js.map