/**
 * General API rate limiter
 * 100 requests per 15 minutes
 */
export declare const apiRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Strict rate limiter for auth endpoints
 * 5 requests per 15 minutes
 */
export declare const authRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Medium rate limiter for uploads
 * 20 uploads per 15 minutes
 */
export declare const uploadRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Lenient rate limiter for public endpoints
 * 200 requests per 15 minutes
 */
export declare const publicRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
export default apiRateLimiter;
//# sourceMappingURL=rateLimiter.d.ts.map