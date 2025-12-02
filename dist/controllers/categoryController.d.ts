import { Request, Response } from 'express';
/**
 * Get all categories
 * GET /api/categories
 */
export declare const getAllCategories: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get category tree (hierarchical)
 * GET /api/categories/tree
 */
export declare const getCategoryTree: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get category by slug
 * GET /api/categories/:slug
 */
export declare const getCategoryBySlug: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get articles by category
 * GET /api/categories/:slug/articles
 */
export declare const getArticlesByCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Create category (Admin only)
 * POST /api/categories
 */
export declare const createCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Update category (Admin only)
 * PUT /api/categories/:id
 */
export declare const updateCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Delete category (Admin only)
 * DELETE /api/categories/:id
 */
export declare const deleteCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=categoryController.d.ts.map