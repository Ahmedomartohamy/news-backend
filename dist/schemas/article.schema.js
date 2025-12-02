"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleQuerySchema = exports.articleSlugParamsSchema = exports.articleParamsSchema = exports.updateArticleSchema = exports.createArticleSchema = void 0;
const zod_1 = require("zod");
/**
 * Article status enum
 */
const articleStatusEnum = zod_1.z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);
/**
 * Schema for creating a new article
 */
exports.createArticleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    content: zod_1.z.string().min(1, 'Content is required'),
    excerpt: zod_1.z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
    featuredImage: zod_1.z.string().url('Featured image must be a valid URL').optional(),
    categoryId: zod_1.z.number().int('Category ID must be a number'),
    tagIds: zod_1.z.array(zod_1.z.number().int()).optional(),
    status: articleStatusEnum.optional(),
});
/**
 * Schema for updating an article
 */
exports.updateArticleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title cannot be empty').optional(),
    content: zod_1.z.string().min(1, 'Content cannot be empty').optional(),
    excerpt: zod_1.z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
    featuredImage: zod_1.z.string().url('Featured image must be a valid URL').optional(),
    categoryId: zod_1.z.number().int('Category ID must be a number').optional(),
    tagIds: zod_1.z.array(zod_1.z.number().int()).optional(),
    status: articleStatusEnum.optional(),
});
/**
 * Schema for article ID parameter
 */
exports.articleParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, 'Invalid article ID').transform(Number),
});
/**
 * Schema for article slug parameter
 */
exports.articleSlugParamsSchema = zod_1.z.object({
    slug: zod_1.z.string().min(1, 'Slug is required'),
});
/**
 * Schema for article query parameters
 */
exports.articleQuerySchema = zod_1.z.object({
    status: articleStatusEnum.optional(),
    categoryId: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
    authorId: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
    tagId: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
    search: zod_1.z.string().optional(),
    q: zod_1.z.string().optional(),
    page: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    sort: zod_1.z.string().optional(),
    order: zod_1.z.enum(['asc', 'desc']).optional(),
});
//# sourceMappingURL=article.schema.js.map