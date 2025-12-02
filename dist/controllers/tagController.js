"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.updateTag = exports.createTag = exports.getArticlesByTag = exports.getTagBySlug = exports.getPopularTags = exports.getAllTags = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const tagService_1 = __importDefault(require("../services/tagService"));
/**
 * Get all tags
 * GET /api/tags
 */
exports.getAllTags = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const tags = await tagService_1.default.getAllTags();
    res.json({
        success: true,
        data: tags,
    });
});
/**
 * Get popular tags
 * GET /api/tags/popular
 */
exports.getPopularTags = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const tags = await tagService_1.default.getPopularTags(limit);
    res.json({
        success: true,
        data: tags,
    });
});
/**
 * Get tag by slug
 * GET /api/tags/:slug
 */
exports.getTagBySlug = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
        throw new ApiError_1.ApiError(400, 'Tag slug is required');
    }
    const tag = await tagService_1.default.getTagBySlug(slug);
    res.json({
        success: true,
        data: tag,
    });
});
/**
 * Get articles by tag
 * GET /api/tags/:slug/articles
 */
exports.getArticlesByTag = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { slug } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (!slug) {
        throw new ApiError_1.ApiError(400, 'Tag slug is required');
    }
    const result = await tagService_1.default.getArticlesByTag(slug, page, limit);
    res.json({
        success: true,
        data: result,
    });
});
/**
 * Create tag
 * POST /api/tags
 */
exports.createTag = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = req.body;
    const tag = await tagService_1.default.createTag(data);
    res.status(201).json({
        success: true,
        data: tag,
        message: 'Tag created successfully',
    });
});
/**
 * Update tag (Admin only)
 * PUT /api/tags/:id
 */
exports.updateTag = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Tag ID is required');
    }
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const tag = await tagService_1.default.updateTag(id, { name });
    res.json({
        success: true,
        data: tag,
        message: 'Tag updated successfully',
    });
});
/**
 * Delete tag (Admin only)
 * DELETE /api/tags/:id
 */
exports.deleteTag = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Tag ID is required');
    }
    const id = parseInt(req.params.id);
    const result = await tagService_1.default.deleteTag(id);
    res.json({
        success: true,
        message: result.message,
    });
});
//# sourceMappingURL=tagController.js.map