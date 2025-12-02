"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = require("../utils/ApiError");
const slugify_1 = require("../utils/slugify");
class TagService {
    /**
     * Create a new tag
     */
    async createTag(data) {
        // Generate unique slug
        const slug = await (0, slugify_1.generateUniqueSlug)(data.name, async (slug) => {
            const existing = await prisma_1.default.tag.findUnique({ where: { slug } });
            return !!existing;
        });
        const tag = await prisma_1.default.tag.create({
            data: {
                name: data.name,
                slug,
            },
        });
        return tag;
    }
    /**
     * Get all tags
     */
    async getAllTags() {
        const tags = await prisma_1.default.tag.findMany({
            include: {
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        });
        return tags;
    }
    /**
     * Get tag by slug
     */
    async getTagBySlug(slug) {
        const tag = await prisma_1.default.tag.findUnique({
            where: { slug },
            include: {
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
        });
        if (!tag) {
            throw new ApiError_1.ApiError(404, 'Tag not found');
        }
        return tag;
    }
    /**
     * Get tag by ID
     */
    async getTagById(id) {
        const tag = await prisma_1.default.tag.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
        });
        if (!tag) {
            throw new ApiError_1.ApiError(404, 'Tag not found');
        }
        return tag;
    }
    /**
     * Get popular tags
     */
    async getPopularTags(limit = 10) {
        const tags = await prisma_1.default.tag.findMany({
            take: limit,
            include: {
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
            orderBy: {
                articles: {
                    _count: 'desc',
                },
            },
        });
        return tags;
    }
    /**
     * Update tag
     */
    async updateTag(id, data) {
        const existing = await prisma_1.default.tag.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new ApiError_1.ApiError(404, 'Tag not found');
        }
        // Generate new slug if name changed
        let slug = existing.slug;
        if (data.name && data.name !== existing.name) {
            slug = await (0, slugify_1.generateUniqueSlug)(data.name, async (slug) => {
                const found = await prisma_1.default.tag.findUnique({ where: { slug } });
                return !!found && found.id !== id;
            });
        }
        const tag = await prisma_1.default.tag.update({
            where: { id },
            data: {
                name: data.name,
                slug,
            },
            include: {
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
        });
        return tag;
    }
    /**
     * Delete tag
     */
    async deleteTag(id) {
        const tag = await prisma_1.default.tag.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
        });
        if (!tag) {
            throw new ApiError_1.ApiError(404, 'Tag not found');
        }
        // Check if tag is used in articles
        if (tag._count.articles > 0) {
            throw new ApiError_1.ApiError(400, `Cannot delete tag used in ${tag._count.articles} articles`);
        }
        await prisma_1.default.tag.delete({
            where: { id },
        });
        return { message: 'Tag deleted successfully' };
    }
    /**
     * Get articles by tag
     */
    async getArticlesByTag(tagSlug, page = 1, limit = 10) {
        const tag = await prisma_1.default.tag.findUnique({
            where: { slug: tagSlug },
        });
        if (!tag) {
            throw new ApiError_1.ApiError(404, 'Tag not found');
        }
        const skip = (page - 1) * limit;
        const [articles, total] = await Promise.all([
            prisma_1.default.article.findMany({
                where: {
                    tags: {
                        some: {
                            id: tag.id,
                        },
                    },
                    status: 'PUBLISHED',
                },
                skip,
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
                    _count: {
                        select: {
                            comments: true,
                        },
                    },
                },
                orderBy: { publishedAt: 'desc' },
            }),
            prisma_1.default.article.count({
                where: {
                    tags: {
                        some: {
                            id: tag.id,
                        },
                    },
                    status: 'PUBLISHED',
                },
            }),
        ]);
        return {
            tag,
            articles,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    /**
     * Get or create tags by names (batch)
     */
    async getOrCreateTags(tagNames) {
        const tags = [];
        for (const name of tagNames) {
            const slug = await (0, slugify_1.generateUniqueSlug)(name, async (slug) => {
                const existing = await prisma_1.default.tag.findUnique({ where: { slug } });
                return !!existing;
            });
            const tag = await prisma_1.default.tag.upsert({
                where: { slug },
                update: {},
                create: { name, slug },
            });
            tags.push(tag);
        }
        return tags;
    }
}
exports.TagService = TagService;
exports.default = new TagService();
//# sourceMappingURL=tagService.js.map