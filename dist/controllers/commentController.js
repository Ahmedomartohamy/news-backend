"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentStats = exports.markAsSpam = exports.rejectComment = exports.approveComment = exports.deleteComment = exports.updateComment = exports.createComment = exports.getCommentById = exports.getArticleComments = exports.getAllComments = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const commentService_1 = __importDefault(require("../services/commentService"));
/**
 * Get all comments (Admin only)
 * GET /api/comments
 */
exports.getAllComments = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const filters = {};
    if (req.query.status) {
        filters.status = req.query.status;
    }
    if (req.query.articleId) {
        filters.articleId = parseInt(req.query.articleId);
    }
    const query = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
    };
    const result = await commentService_1.default.getAllComments(filters, query);
    res.json({
        success: true,
        data: result.comments,
        pagination: result.pagination,
    });
});
/**
 * Get comments for an article
 * GET /api/articles/:articleId/comments
 */
exports.getArticleComments = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.articleId) {
        throw new ApiError_1.ApiError(400, 'Article ID is required');
    }
    const articleId = parseInt(req.params.articleId);
    const comments = await commentService_1.default.getArticleComments(articleId);
    res.json({
        success: true,
        data: comments,
    });
});
/**
 * Get comment by ID
 * GET /api/comments/:id
 */
exports.getCommentById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Comment ID is required');
    }
    const id = parseInt(req.params.id);
    const comment = await commentService_1.default.getCommentById(id);
    res.json({
        success: true,
        data: comment,
    });
});
/**
 * Create comment
 * POST /api/comments
 */
exports.createComment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = req.body;
    const userId = req.user?.id;
    const comment = await commentService_1.default.createComment(data, userId);
    res.status(201).json({
        success: true,
        data: comment,
        message: 'Comment created successfully. It will be visible after moderation.',
    });
});
/**
 * Update comment
 * PUT /api/comments/:id
 */
exports.updateComment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Comment ID is required');
    }
    const id = parseInt(req.params.id);
    const { content } = req.body;
    const comment = await commentService_1.default.updateComment(id, { content }, req.user.id, req.user.role);
    res.json({
        success: true,
        data: comment,
        message: 'Comment updated successfully',
    });
});
/**
 * Delete comment
 * DELETE /api/comments/:id
 */
exports.deleteComment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Comment ID is required');
    }
    const id = parseInt(req.params.id);
    const result = await commentService_1.default.deleteComment(id, req.user.id, req.user.role);
    res.json({
        success: true,
        message: result.message,
    });
});
/**
 * Approve comment (Admin/Editor only)
 * PATCH /api/comments/:id/approve
 */
exports.approveComment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Comment ID is required');
    }
    const id = parseInt(req.params.id);
    const comment = await commentService_1.default.approveComment(id);
    res.json({
        success: true,
        data: comment,
        message: 'Comment approved successfully',
    });
});
/**
 * Reject comment (Admin/Editor only)
 * PATCH /api/comments/:id/reject
 */
exports.rejectComment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Comment ID is required');
    }
    const id = parseInt(req.params.id);
    const comment = await commentService_1.default.rejectComment(id);
    res.json({
        success: true,
        data: comment,
        message: 'Comment rejected successfully',
    });
});
/**
 * Mark comment as spam (Admin/Editor only)
 * PATCH /api/comments/:id/spam
 */
exports.markAsSpam = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Comment ID is required');
    }
    const id = parseInt(req.params.id);
    const comment = await commentService_1.default.markAsSpam(id);
    res.json({
        success: true,
        data: comment,
        message: 'Comment marked as spam',
    });
});
/**
 * Get comment statistics (Admin only)
 * GET /api/comments/stats
 */
exports.getCommentStats = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const stats = await commentService_1.default.getCommentStats();
    res.json({
        success: true,
        data: stats,
    });
});
//# sourceMappingURL=commentController.js.map