"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaStats = exports.deleteMedia = exports.searchMedia = exports.getMyMedia = exports.getMediaById = exports.getAllMedia = exports.uploadMultipleMedia = exports.uploadMedia = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const mediaService_1 = __importDefault(require("../services/mediaService"));
/**
 * Upload single media file
 * POST /api/media/upload
 */
exports.uploadMedia = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    if (!req.file) {
        throw new ApiError_1.ApiError(400, 'No file uploaded');
    }
    const media = await mediaService_1.default.uploadMedia(req.file, req.user.id);
    res.status(201).json({
        success: true,
        data: media,
        message: 'File uploaded successfully',
    });
});
/**
 * Upload multiple media files
 * POST /api/media/upload-multiple
 */
exports.uploadMultipleMedia = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        throw new ApiError_1.ApiError(400, 'No files uploaded');
    }
    const media = await mediaService_1.default.uploadMultipleMedia(req.files, req.user.id);
    res.status(201).json({
        success: true,
        data: media,
        message: `${media.length} files uploaded successfully`,
    });
});
/**
 * Get all media
 * GET /api/media
 */
exports.getAllMedia = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    const query = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 20,
    };
    const result = await mediaService_1.default.getAllMedia(query, req.user.id, req.user.role);
    res.json({
        success: true,
        data: result.media,
        pagination: result.pagination,
    });
});
/**
 * Get media by ID
 * GET /api/media/:id
 */
exports.getMediaById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Media ID is required');
    }
    const id = parseInt(req.params.id);
    const media = await mediaService_1.default.getMediaById(id);
    res.json({
        success: true,
        data: media,
    });
});
/**
 * Get user's media
 * GET /api/media/my-uploads
 */
exports.getMyMedia = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    const query = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 20,
    };
    const result = await mediaService_1.default.getMediaByUser(req.user.id, query);
    res.json({
        success: true,
        data: result.media,
        pagination: result.pagination,
    });
});
/**
 * Search media
 * GET /api/media/search
 */
exports.searchMedia = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    const searchQuery = req.query.q;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(400, 'Search query is required');
    }
    const query = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 20,
    };
    const result = await mediaService_1.default.searchMedia(searchQuery, query, req.user.id, req.user.role);
    res.json({
        success: true,
        data: result.media,
        pagination: result.pagination,
    });
});
/**
 * Delete media
 * DELETE /api/media/:id
 */
exports.deleteMedia = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    if (!req.params.id) {
        throw new ApiError_1.ApiError(400, 'Media ID is required');
    }
    const id = parseInt(req.params.id);
    const result = await mediaService_1.default.deleteMedia(id, req.user.id, req.user.role);
    res.json({
        success: true,
        message: result.message,
    });
});
/**
 * Get media statistics
 * GET /api/media/stats
 */
exports.getMediaStats = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, 'Not authenticated');
    }
    const stats = await mediaService_1.default.getMediaStats(req.user.id, req.user.role);
    res.json({
        success: true,
        data: stats,
    });
});
//# sourceMappingURL=mediaController.js.map