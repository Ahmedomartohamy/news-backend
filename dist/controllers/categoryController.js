"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getArticlesByCategory = exports.getCategoryBySlug = exports.getCategoryTree = exports.getAllCategories = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const categoryService_1 = __importDefault(require("../services/categoryService"));
/**
 * Get all categories
 * GET /api/categories
 */
exports.getAllCategories = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const categories = await categoryService_1.default.getAllCategories();
    res.json({
        success: true,
        data: categories,
    });
});
/**
 * Get category tree (hierarchical)
 * GET /api/categories/tree
 */
exports.getCategoryTree = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const tree = await categoryService_1.default.getCategoryTree();
    res.json({
        success: true,
        data: tree,
    });
});
/**
 * Get category by slug
 * GET /api/categories/:slug
 */
exports.getCategoryBySlug = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
        throw new ApiError_1.ApiError(400, 'Category slug is required');
    }
    const category = await categoryService_1.default.getCategoryBySlug(slug);
    res.json({
        success: true,
        data: category,
    });
});
/**
 * Get articles by category
 * GET /api/categories/:slug/articles
 */
exports.getArticlesByCategory = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { slug } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (!slug) {
        throw new ApiError_1.ApiError(400, 'Category slug is required');
    }
    const result = await categoryService_1.default.getArticlesByCategory(slug, page, limit);
    res.json({
        success: true,
        data: result,
    });
});
/**
 * Create category (Admin only)
 * POST /api/categories
 */
exports.createCategory = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = req.body;
    const category = await categoryService_1.default.createCategory(data);
    res.status(201).json({
        success: true,
        data: category,
        message: 'Category created successfully',
    });
});
/**
 * Update category (Admin only)
 * PUT /api/categories/:id
 */
exports.updateCategory = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Category ID is required');
    }
    const id = parseInt(req.params.id);
    const { name, description, parentId } = req.body;
    const category = await categoryService_1.default.updateCategory(id, {
        name,
        description,
        parentId,
    });
    res.json({
        success: true,
        data: category,
        message: 'Category updated successfully',
    });
});
/**
 * Delete category (Admin only)
 * DELETE /api/categories/:id
 */
exports.deleteCategory = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Category ID is required');
    }
    const id = parseInt(req.params.id);
    const result = await categoryService_1.default.deleteCategory(id);
    res.json({
        success: true,
        message: result.message,
    });
});
//# sourceMappingURL=categoryController.js.map