"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = require("../utils/ApiError");
const slugify_1 = require("../utils/slugify");
const pagination_1 = require("../utils/pagination");
class ArticleService {
    /**
     * Create a new article
     */
    async createArticle(data, authorId) {
        // Generate unique slug
        const slug = await (0, slugify_1.generateUniqueSlug)(data.title, async (slug) => {
            const existing = await prisma_1.default.article.findUnique({ where: { slug } });
            return !!existing;
        });
        // Verify category exists
        if (data.categoryId) {
            const category = await prisma_1.default.category.findUnique({
                where: { id: data.categoryId },
            });
            if (!category) {
                throw new ApiError_1.ApiError(404, 'Category not found');
            }
        }
        // Create article with tags
        const article = await prisma_1.default.article.create({
            data: {
                title: data.title,
                slug,
                content: data.content,
                excerpt: data.excerpt,
                featuredImage: data.featuredImage,
                authorId,
                categoryId: data.categoryId,
                status: data.status || client_1.ArticleStatus.DRAFT,
                publishedAt: data.status === client_1.ArticleStatus.PUBLISHED ? new Date() : null,
                tags: data.tagIds
                    ? {
                        connect: data.tagIds.map((id) => ({ id })),
                    }
                    : undefined,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true,
                    },
                },
                category: true,
                tags: true,
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
        });
        return article;
    }
    /**
     * Get article by slug
     */
    async getArticleBySlug(slug, incrementView = false) {
        const article = await prisma_1.default.article.findUnique({
            where: { slug },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true,
                        bio: true,
                    },
                },
                category: true,
                tags: true,
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
        });
        if (!article) {
            throw new ApiError_1.ApiError(404, 'Article not found');
        }
        // Increment view count
        if (incrementView && article.status === client_1.ArticleStatus.PUBLISHED) {
            await prisma_1.default.article.update({
                where: { id: article.id },
                data: { viewCount: { increment: 1 } },
            });
        }
        return article;
    }
    /**
     * Get article by ID
     */
    async getArticleById(id) {
        const article = await prisma_1.default.article.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true,
                    },
                },
                category: true,
                tags: true,
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
        });
        if (!article) {
            throw new ApiError_1.ApiError(404, 'Article not found');
        }
        return article;
    }
    /**
     * Get all articles with filters and pagination
     */
    async getAllArticles(filters, query) {
        const { skip, take, page, limit } = (0, pagination_1.getPagination)({
            page: query.page,
            limit: query.limit,
        });
        // Build where clause
        const where = {};
        if (filters.status) {
            where.status = filters.status;
        }
        if (filters.categoryId) {
            where.categoryId = filters.categoryId;
        }
        if (filters.authorId) {
            where.authorId = filters.authorId;
        }
        if (filters.tagId) {
            where.tags = {
                some: {
                    id: filters.tagId,
                },
            };
        }
        if (filters.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { content: { contains: filters.search, mode: 'insensitive' } },
                { excerpt: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        // Build orderBy
        const orderBy = {};
        if (query.sort) {
            orderBy[query.sort] = query.order || 'desc';
        }
        else {
            orderBy.createdAt = 'desc';
        }
        const [articles, total] = await Promise.all([
            prisma_1.default.article.findMany({
                where,
                skip,
                take,
                orderBy,
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            avatarUrl: true,
                        },
                    },
                    category: true,
                    tags: true,
                    _count: {
                        select: {
                            comments: true,
                        },
                    },
                },
            }),
            prisma_1.default.article.count({ where }),
        ]);
        return {
            articles,
            pagination: (0, pagination_1.getPaginationMeta)(page, limit, total),
        };
    }
    /**
     * Update article
     */
    async updateArticle(id, data, userId, userRole) {
        // Get existing article
        const existingArticle = await prisma_1.default.article.findUnique({
            where: { id },
        });
        if (!existingArticle) {
            throw new ApiError_1.ApiError(404, 'Article not found');
        }
        // Check permissions
        if (existingArticle.authorId !== userId && userRole !== 'ADMIN') {
            throw new ApiError_1.ApiError(403, 'You can only edit your own articles');
        }
        // Generate new slug if title changed
        let slug = existingArticle.slug;
        if (data.title && data.title !== existingArticle.title) {
            slug = await (0, slugify_1.generateUniqueSlug)(data.title, async (slug) => {
                const existing = await prisma_1.default.article.findUnique({ where: { slug } });
                return !!existing && existing.id !== id;
            });
        }
        // Update article
        const article = await prisma_1.default.article.update({
            where: { id },
            data: {
                title: data.title,
                slug,
                content: data.content,
                excerpt: data.excerpt,
                featuredImage: data.featuredImage,
                categoryId: data.categoryId,
                status: data.status,
                publishedAt: data.status === client_1.ArticleStatus.PUBLISHED && !existingArticle.publishedAt
                    ? new Date()
                    : existingArticle.publishedAt,
                tags: data.tagIds
                    ? {
                        set: data.tagIds.map((id) => ({ id })),
                    }
                    : undefined,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true,
                    },
                },
                category: true,
                tags: true,
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
        });
        return article;
    }
    /**
     * Publish article
     */
    async publishArticle(id) {
        const article = await prisma_1.default.article.update({
            where: { id },
            data: {
                status: client_1.ArticleStatus.PUBLISHED,
                publishedAt: new Date(),
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                    },
                },
                category: true,
                tags: true,
            },
        });
        return article;
    }
    /**
     * Archive article
     */
    async archiveArticle(id) {
        const article = await prisma_1.default.article.update({
            where: { id },
            data: { status: client_1.ArticleStatus.ARCHIVED },
        });
        return article;
    }
    /**
     * Delete article
     */
    async deleteArticle(id, userId, userRole) {
        const article = await prisma_1.default.article.findUnique({
            where: { id },
        });
        if (!article) {
            throw new ApiError_1.ApiError(404, 'Article not found');
        }
        // Check permissions
        if (article.authorId !== userId && userRole !== 'ADMIN') {
            throw new ApiError_1.ApiError(403, 'You can only delete your own articles');
        }
        await prisma_1.default.article.delete({
            where: { id },
        });
        return { message: 'Article deleted successfully' };
    }
    /**
     * Get related articles
     */
    async getRelatedArticles(articleId, limit = 5) {
        const article = await prisma_1.default.article.findUnique({
            where: { id: articleId },
            include: { tags: true },
        });
        if (!article) {
            throw new ApiError_1.ApiError(404, 'Article not found');
        }
        const tagIds = article.tags.map((tag) => tag.id);
        const relatedArticles = await prisma_1.default.article.findMany({
            where: {
                id: { not: articleId },
                status: client_1.ArticleStatus.PUBLISHED,
                OR: [
                    { categoryId: article.categoryId },
                    {
                        tags: {
                            some: {
                                id: { in: tagIds },
                            },
                        },
                    },
                ],
            },
            take: limit,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                    },
                },
                category: true,
                tags: true,
            },
            orderBy: { publishedAt: 'desc' },
        });
        return relatedArticles;
    }
}
exports.ArticleService = ArticleService;
exports.default = new ArticleService();
//# sourceMappingURL=articleService.js.map