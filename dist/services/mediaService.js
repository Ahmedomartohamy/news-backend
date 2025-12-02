"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = require("../utils/ApiError");
const uploadToR2_1 = require("../utils/uploadToR2");
const pagination_1 = require("../utils/pagination");
class MediaService {
    /**
     * Upload media file to R2
     */
    async uploadMedia(file, uploadedBy) {
        try {
            // Upload to R2
            const result = await (0, uploadToR2_1.uploadToR2)(file, 'media');
            // Save media record to database
            const media = await prisma_1.default.media.create({
                data: {
                    filename: result.filename,
                    originalName: file.originalname,
                    r2Url: result.url,
                    mimeType: result.mimeType,
                    size: result.size,
                    uploadedBy,
                },
                include: {
                    uploader: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });
            return media;
        }
        catch (error) {
            throw new ApiError_1.ApiError(500, 'Failed to upload file');
        }
    }
    /**
     * Upload multiple media files
     */
    async uploadMultipleMedia(files, uploadedBy) {
        const uploadPromises = files.map((file) => this.uploadMedia(file, uploadedBy));
        const media = await Promise.all(uploadPromises);
        return media;
    }
    /**
     * Get all media with pagination
     */
    async getAllMedia(query, userId, userRole) {
        const { skip, take, page, limit } = (0, pagination_1.getPagination)({
            page: query.page,
            limit: query.limit,
        });
        const where = {};
        // Non-admin users can only see their own uploads
        if (userRole !== 'ADMIN' && userId) {
            where.uploadedBy = userId;
        }
        const [media, total] = await Promise.all([
            prisma_1.default.media.findMany({
                where,
                skip,
                take,
                include: {
                    uploader: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma_1.default.media.count({ where }),
        ]);
        return {
            media,
            pagination: (0, pagination_1.getPaginationMeta)(page, limit, total),
        };
    }
    /**
     * Get media by ID
     */
    async getMediaById(id) {
        const media = await prisma_1.default.media.findUnique({
            where: { id },
            include: {
                uploader: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!media) {
            throw new ApiError_1.ApiError(404, 'Media not found');
        }
        return media;
    }
    /**
     * Get media by user
     */
    async getMediaByUser(userId, query) {
        const { skip, take, page, limit } = (0, pagination_1.getPagination)({
            page: query.page,
            limit: query.limit,
        });
        const [media, total] = await Promise.all([
            prisma_1.default.media.findMany({
                where: { uploadedBy: userId },
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            }),
            prisma_1.default.media.count({ where: { uploadedBy: userId } }),
        ]);
        return {
            media,
            pagination: (0, pagination_1.getPaginationMeta)(page, limit, total),
        };
    }
    /**
     * Delete media
     */
    async deleteMedia(id, userId, userRole) {
        const media = await prisma_1.default.media.findUnique({
            where: { id },
        });
        if (!media) {
            throw new ApiError_1.ApiError(404, 'Media not found');
        }
        // Check permissions
        if (media.uploadedBy !== userId && userRole !== 'ADMIN') {
            throw new ApiError_1.ApiError(403, 'You can only delete your own media');
        }
        try {
            // Delete from R2
            await (0, uploadToR2_1.deleteFromR2)(media.filename);
            // Delete from database
            await prisma_1.default.media.delete({
                where: { id },
            });
            return { message: 'Media deleted successfully' };
        }
        catch (error) {
            throw new ApiError_1.ApiError(500, 'Failed to delete media');
        }
    }
    /**
     * Get media statistics
     */
    async getMediaStats(userId, userRole) {
        const where = {};
        // Non-admin users can only see their own stats
        if (userRole !== 'ADMIN' && userId) {
            where.uploadedBy = userId;
        }
        const [totalFiles, totalSize] = await Promise.all([
            prisma_1.default.media.count({ where }),
            prisma_1.default.media.aggregate({
                where,
                _sum: {
                    size: true,
                },
            }),
        ]);
        return {
            totalFiles,
            totalSize: totalSize._sum.size || 0,
            totalSizeMB: ((totalSize._sum.size || 0) / (1024 * 1024)).toFixed(2),
        };
    }
    /**
     * Search media by filename or original name
     */
    async searchMedia(query, pagination, userId, userRole) {
        const { skip, take, page, limit } = (0, pagination_1.getPagination)({
            page: pagination.page,
            limit: pagination.limit,
        });
        const where = {
            OR: [
                { filename: { contains: query, mode: 'insensitive' } },
                { originalName: { contains: query, mode: 'insensitive' } },
            ],
        };
        // Non-admin users can only search their own uploads
        if (userRole !== 'ADMIN' && userId) {
            where.uploadedBy = userId;
        }
        const [media, total] = await Promise.all([
            prisma_1.default.media.findMany({
                where,
                skip,
                take,
                include: {
                    uploader: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma_1.default.media.count({ where }),
        ]);
        return {
            media,
            pagination: (0, pagination_1.getPaginationMeta)(page, limit, total),
        };
    }
}
exports.MediaService = MediaService;
exports.default = new MediaService();
//# sourceMappingURL=mediaService.js.map