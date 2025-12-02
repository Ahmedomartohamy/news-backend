"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = require("../utils/ApiError");
const pagination_1 = require("../utils/pagination");
class CommentService {
    /**
     * Create a new comment
     */
    async createComment(data, userId) {
        // Verify article exists
        const article = await prisma_1.default.article.findUnique({
            where: { id: data.articleId },
        });
        if (!article) {
            throw new ApiError_1.ApiError(404, 'Article not found');
        }
        // Verify parent comment exists if provided
        if (data.parentId) {
            const parentComment = await prisma_1.default.comment.findUnique({
                where: { id: data.parentId },
            });
            if (!parentComment) {
                throw new ApiError_1.ApiError(404, 'Parent comment not found');
            }
            if (parentComment.articleId !== data.articleId) {
                throw new ApiError_1.ApiError(400, 'Parent comment belongs to different article');
            }
        }
        // For guest comments, require name and email
        if (!userId && (!data.authorName || !data.authorEmail)) {
            throw new ApiError_1.ApiError(400, 'Guest comments require name and email');
        }
        const comment = await prisma_1.default.comment.create({
            data: {
                articleId: data.articleId,
                userId,
                parentId: data.parentId,
                content: data.content,
                authorName: data.authorName,
                authorEmail: data.authorEmail,
                status: client_1.CommentStatus.PENDING, // Default to pending for moderation
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                    },
                },
                article: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
            },
        });
        return comment;
    }
    /**
     * Get all comments with filters
     */
    async getAllComments(filters, query) {
        const { skip, take, page, limit } = (0, pagination_1.getPagination)({
            page: query.page,
            limit: query.limit,
        });
        const where = {};
        if (filters.status) {
            where.status = filters.status;
        }
        if (filters.articleId) {
            where.articleId = filters.articleId;
        }
        const [comments, total] = await Promise.all([
            prisma_1.default.comment.findMany({
                where,
                skip,
                take,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatarUrl: true,
                        },
                    },
                    article: {
                        select: {
                            id: true,
                            title: true,
                            slug: true,
                        },
                    },
                    _count: {
                        select: {
                            replies: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma_1.default.comment.count({ where }),
        ]);
        return {
            comments,
            pagination: (0, pagination_1.getPaginationMeta)(page, limit, total),
        };
    }
    /**
     * Get comments for an article (including nested replies)
     */
    async getArticleComments(articleId) {
        // Only get approved comments for public view
        const comments = await prisma_1.default.comment.findMany({
            where: {
                articleId,
                status: client_1.CommentStatus.APPROVED,
                parentId: null, // Only get top-level comments
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                    },
                },
                replies: {
                    where: {
                        status: client_1.CommentStatus.APPROVED,
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                avatarUrl: true,
                            },
                        },
                        replies: {
                            where: {
                                status: client_1.CommentStatus.APPROVED,
                            },
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        avatarUrl: true,
                                    },
                                },
                            },
                            orderBy: { createdAt: 'asc' },
                        },
                    },
                    orderBy: { createdAt: 'asc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return comments;
    }
    /**
     * Get comment by ID
     */
    async getCommentById(id) {
        const comment = await prisma_1.default.comment.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                    },
                },
                article: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
                parent: true,
                replies: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                avatarUrl: true,
                            },
                        },
                    },
                },
            },
        });
        if (!comment) {
            throw new ApiError_1.ApiError(404, 'Comment not found');
        }
        return comment;
    }
    /**
     * Update comment
     */
    async updateComment(id, data, userId, userRole) {
        const comment = await prisma_1.default.comment.findUnique({
            where: { id },
        });
        if (!comment) {
            throw new ApiError_1.ApiError(404, 'Comment not found');
        }
        // Check permissions
        if (comment.userId !== userId && userRole !== 'ADMIN') {
            throw new ApiError_1.ApiError(403, 'You can only edit your own comments');
        }
        const updatedComment = await prisma_1.default.comment.update({
            where: { id },
            data: {
                content: data.content,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                    },
                },
            },
        });
        return updatedComment;
    }
    /**
     * Approve comment
     */
    async approveComment(id) {
        const comment = await prisma_1.default.comment.update({
            where: { id },
            data: { status: client_1.CommentStatus.APPROVED },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                    },
                },
                article: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
        return comment;
    }
    /**
     * Reject comment
     */
    async rejectComment(id) {
        const comment = await prisma_1.default.comment.update({
            where: { id },
            data: { status: client_1.CommentStatus.REJECTED },
        });
        return comment;
    }
    /**
     * Mark comment as spam
     */
    async markAsSpam(id) {
        const comment = await prisma_1.default.comment.update({
            where: { id },
            data: { status: client_1.CommentStatus.SPAM },
        });
        return comment;
    }
    /**
     * Delete comment
     */
    async deleteComment(id, userId, userRole) {
        const comment = await prisma_1.default.comment.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        replies: true,
                    },
                },
            },
        });
        if (!comment) {
            throw new ApiError_1.ApiError(404, 'Comment not found');
        }
        // Check permissions
        if (comment.userId !== userId && userRole !== 'ADMIN') {
            throw new ApiError_1.ApiError(403, 'You can only delete your own comments');
        }
        // Warn if comment has replies
        if (comment._count.replies > 0) {
            throw new ApiError_1.ApiError(400, `Cannot delete comment with ${comment._count.replies} replies. Delete replies first.`);
        }
        await prisma_1.default.comment.delete({
            where: { id },
        });
        return { message: 'Comment deleted successfully' };
    }
    /**
     * Get comment statistics
     */
    async getCommentStats() {
        const [total, pending, approved, rejected, spam] = await Promise.all([
            prisma_1.default.comment.count(),
            prisma_1.default.comment.count({ where: { status: client_1.CommentStatus.PENDING } }),
            prisma_1.default.comment.count({ where: { status: client_1.CommentStatus.APPROVED } }),
            prisma_1.default.comment.count({ where: { status: client_1.CommentStatus.REJECTED } }),
            prisma_1.default.comment.count({ where: { status: client_1.CommentStatus.SPAM } }),
        ]);
        return {
            total,
            pending,
            approved,
            rejected,
            spam,
        };
    }
}
exports.CommentService = CommentService;
exports.default = new CommentService();
//# sourceMappingURL=commentService.js.map