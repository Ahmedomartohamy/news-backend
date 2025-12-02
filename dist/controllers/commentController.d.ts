import { Request, Response } from 'express';
/**
 * Get all comments (Admin only)
 * GET /api/comments
 */
export declare const getAllComments: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get comments for an article
 * GET /api/articles/:articleId/comments
 */
export declare const getArticleComments: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get comment by ID
 * GET /api/comments/:id
 */
export declare const getCommentById: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Create comment
 * POST /api/comments
 */
export declare const createComment: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Update comment
 * PUT /api/comments/:id
 */
export declare const updateComment: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Delete comment
 * DELETE /api/comments/:id
 */
export declare const deleteComment: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Approve comment (Admin/Editor only)
 * PATCH /api/comments/:id/approve
 */
export declare const approveComment: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Reject comment (Admin/Editor only)
 * PATCH /api/comments/:id/reject
 */
export declare const rejectComment: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Mark comment as spam (Admin/Editor only)
 * PATCH /api/comments/:id/spam
 */
export declare const markAsSpam: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get comment statistics (Admin only)
 * GET /api/comments/stats
 */
export declare const getCommentStats: (req: Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=commentController.d.ts.map