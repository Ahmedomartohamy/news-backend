import { Request, Response } from 'express';
/**
 * Upload single media file
 * POST /api/media/upload
 */
export declare const uploadMedia: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Upload multiple media files
 * POST /api/media/upload-multiple
 */
export declare const uploadMultipleMedia: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get all media
 * GET /api/media
 */
export declare const getAllMedia: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get media by ID
 * GET /api/media/:id
 */
export declare const getMediaById: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get user's media
 * GET /api/media/my-uploads
 */
export declare const getMyMedia: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Search media
 * GET /api/media/search
 */
export declare const searchMedia: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Delete media
 * DELETE /api/media/:id
 */
export declare const deleteMedia: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get media statistics
 * GET /api/media/stats
 */
export declare const getMediaStats: (req: Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=mediaController.d.ts.map