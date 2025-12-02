import { Request, Response } from 'express';
/**
 * Get all tags
 * GET /api/tags
 */
export declare const getAllTags: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get popular tags
 * GET /api/tags/popular
 */
export declare const getPopularTags: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get tag by slug
 * GET /api/tags/:slug
 */
export declare const getTagBySlug: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get articles by tag
 * GET /api/tags/:slug/articles
 */
export declare const getArticlesByTag: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Create tag
 * POST /api/tags
 */
export declare const createTag: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Update tag (Admin only)
 * PUT /api/tags/:id
 */
export declare const updateTag: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Delete tag (Admin only)
 * DELETE /api/tags/:id
 */
export declare const deleteTag: (req: Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=tagController.d.ts.map