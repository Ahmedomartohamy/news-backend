"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchArticles = exports.getRelatedArticles = exports.deleteArticle = exports.archiveArticle = exports.publishArticle = exports.updateArticle = exports.createArticle = exports.getArticleBySlug = exports.getAllArticles = void 0;
const client_1 = require("@prisma/client");
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const articleService_1 = __importDefault(require("../services/articleService"));
/**
 * Get all articles with filters
 * GET /api/articles
 */
exports.getAllArticles = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const filters = {};
    if (req.query.status) {
        filters.status = req.query.status;
    }
    if (req.query.categoryId) {
        filters.categoryId = parseInt(req.query.categoryId);
    }
    if (req.query.authorId) {
        filters.authorId = parseInt(req.query.authorId);
    }
    if (req.query.tagId) {
        filters.tagId = parseInt(req.query.tagId);
    }
    if (req.query.search) {
        filters.search = req.query.search;
    }
    const query = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        sort: req.query.sort,
        order: req.query.order,
    };
    // Public users can only see published articles
    if (!req.user) {
        filters.status = client_1.ArticleStatus.PUBLISHED;
    }
    const result = await articleService_1.default.getAllArticles(filters, query);
    res.json({
        success: true,
        data: result.articles,
        pagination: result.pagination,
    });
});
/**
 * Get article by slug
 * GET /api/articles/:slug
 */
exports.getArticleBySlug = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
        throw new ApiError_1.ApiError(400, 'Slug is required');
    }
    // Increment view count only for published articles and non-authenticated users
    const incrementView = !req.user;
    const article = await articleService_1.default.getArticleBySlug(slug, incrementView);
    // Non-authenticated users can only see published articles
    if (!req.user && article.status !== client_1.ArticleStatus.PUBLISHED) {
        throw new ApiError_1.ApiError(404, 'Article not found');
    }
    res.json({
        success: true,
        data: article,
    });
});
/**
 * Create article
 * POST /api/articles
 */
exports.createArticle = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    const data = req.body;
    const article = await articleService_1.default.createArticle(data, req.user.id);
    res.status(201).json({
        success: true,
        data: article,
        message: 'Article created successfully',
    });
});
/**
 * Update article
 * PUT /api/articles/:id
 */
exports.updateArticle = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Article ID is required');
    }
    const id = parseInt(req.params.id);
    const data = req.body;
    const article = await articleService_1.default.updateArticle(id, data, req.user.id, req.user.role);
    res.json({
        success: true,
        data: article,
        message: 'Article updated successfully',
    });
});
/**
 * Publish article
 * PATCH /api/articles/:id/publish
 */
exports.publishArticle = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Article ID is required');
    }
    const id = parseInt(req.params.id);
    const article = await articleService_1.default.publishArticle(id);
    res.json({
        success: true,
        data: article,
        message: 'Article published successfully',
    });
});
/**
 * Archive article
 * PATCH /api/articles/:id/archive
 */
exports.archiveArticle = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Article ID is required');
    }
    const id = parseInt(req.params.id);
    const article = await articleService_1.default.archiveArticle(id);
    res.json({
        success: true,
        data: article,
        message: 'Article archived successfully',
    });
});
/**
 * Delete article
 * DELETE /api/articles/:id
 */
exports.deleteArticle = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Article ID is required');
    }
    const id = parseInt(req.params.id);
    const result = await articleService_1.default.deleteArticle(id, req.user.id, req.user.role);
    res.json({
        success: true,
        message: result.message,
    });
});
/**
 * Get related articles
 * GET /api/articles/:id/related
 */
exports.getRelatedArticles = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Article ID is required');
    }
    const id = parseInt(req.params.id);
    const limit = parseInt(req.query.limit) || 5;
    const articles = await articleService_1.default.getRelatedArticles(id, limit);
    res.json({
        success: true,
        data: articles,
    });
});
/**
 * Search articles
 * GET /api/articles/search
 */
exports.searchArticles = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const search = req.query.q;
    if (!search) {
        throw new ApiError_1.ApiError(400, 'Search query is required');
    }
    const filters = {
        search,
    };
    // Public can only search published articles
    if (!req.user) {
        filters.status = client_1.ArticleStatus.PUBLISHED;
    }
    const query = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
    };
    const result = await articleService_1.default.getAllArticles(filters, query);
    res.json({
        success: true,
        data: result.articles,
        pagination: result.pagination,
    });
});
//# sourceMappingURL=articleController.js.map