import { Request, Response } from 'express';
/**
 * Get all articles with filters
 * GET /api/articles
 */
export declare const getAllArticles: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get article by slug
 * GET /api/articles/:slug
 */
export declare const getArticleBySlug: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Create article
 * POST /api/articles
 */
export declare const createArticle: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Update article
 * PUT /api/articles/:id
 */
export declare const updateArticle: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Publish article
 * PATCH /api/articles/:id/publish
 */
export declare const publishArticle: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Archive article
 * PATCH /api/articles/:id/archive
 */
export declare const archiveArticle: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Delete article
 * DELETE /api/articles/:id
 */
export declare const deleteArticle: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get related articles
 * GET /api/articles/:id/related
 */
export declare const getRelatedArticles: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Search articles
 * GET /api/articles/search
 */
export declare const searchArticles: (req: Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=articleController.d.ts.map