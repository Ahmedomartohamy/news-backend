"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = require("../utils/ApiError");
const slugify_1 = require("../utils/slugify");
class CategoryService {
    /**
     * Create a new category
     */
    async createCategory(data) {
        // Generate unique slug
        const slug = await (0, slugify_1.generateUniqueSlug)(data.name, async (slug) => {
            const existing = await prisma_1.default.category.findUnique({ where: { slug } });
            return !!existing;
        });
        // Check if parent exists
        if (data.parentId) {
            const parent = await prisma_1.default.category.findUnique({
                where: { id: data.parentId },
            });
            if (!parent) {
                throw new ApiError_1.ApiError(404, 'Parent category not found');
            }
        }
        const category = await prisma_1.default.category.create({
            data: {
                name: data.name,
                slug,
                description: data.description,
                parentId: data.parentId,
            },
            include: {
                parent: true,
                _count: {
                    select: {
                        articles: true,
                        children: true,
                    },
                },
            },
        });
        return category;
    }
    /**
     * Get all categories
     */
    async getAllCategories() {
        const categories = await prisma_1.default.category.findMany({
            include: {
                parent: true,
                children: true,
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        });
        return categories;
    }
    /**
     * Get category by slug
     */
    async getCategoryBySlug(slug) {
        const category = await prisma_1.default.category.findUnique({
            where: { slug },
            include: {
                parent: true,
                children: true,
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
        });
        if (!category) {
            throw new ApiError_1.ApiError(404, 'Category not found');
        }
        return category;
    }
    /**
     * Get category by ID
     */
    async getCategoryById(id) {
        const category = await prisma_1.default.category.findUnique({
            where: { id },
            include: {
                parent: true,
                children: true,
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
        });
        if (!category) {
            throw new ApiError_1.ApiError(404, 'Category not found');
        }
        return category;
    }
    /**
     * Get category tree (hierarchical structure)
     */
    async getCategoryTree() {
        // Get all categories
        const categories = await prisma_1.default.category.findMany({
            include: {
                children: {
                    include: {
                        _count: {
                            select: {
                                articles: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        });
        // Filter only parent categories (no parentId)
        const tree = categories.filter((cat) => !cat.parentId);
        return tree;
    }
    /**
     * Update category
     */
    async updateCategory(id, data) {
        const existing = await prisma_1.default.category.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new ApiError_1.ApiError(404, 'Category not found');
        }
        // Prevent circular reference
        if (data.parentId === id) {
            throw new ApiError_1.ApiError(400, 'Category cannot be its own parent');
        }
        // Generate new slug if name changed
        let slug = existing.slug;
        if (data.name && data.name !== existing.name) {
            slug = await (0, slugify_1.generateUniqueSlug)(data.name, async (slug) => {
                const found = await prisma_1.default.category.findUnique({ where: { slug } });
                return !!found && found.id !== id;
            });
        }
        const category = await prisma_1.default.category.update({
            where: { id },
            data: {
                name: data.name,
                slug,
                description: data.description,
                parentId: data.parentId,
            },
            include: {
                parent: true,
                children: true,
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
        });
        return category;
    }
    /**
     * Delete category
     */
    async deleteCategory(id) {
        const category = await prisma_1.default.category.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        articles: true,
                        children: true,
                    },
                },
            },
        });
        if (!category) {
            throw new ApiError_1.ApiError(404, 'Category not found');
        }
        // Check if category has articles
        if (category._count.articles > 0) {
            throw new ApiError_1.ApiError(400, `Cannot delete category with ${category._count.articles} articles`);
        }
        // Check if category has children
        if (category._count.children > 0) {
            throw new ApiError_1.ApiError(400, `Cannot delete category with ${category._count.children} subcategories`);
        }
        await prisma_1.default.category.delete({
            where: { id },
        });
        return { message: 'Category deleted successfully' };
    }
    /**
     * Get articles by category
     */
    async getArticlesByCategory(categorySlug, page = 1, limit = 10) {
        const category = await prisma_1.default.category.findUnique({
            where: { slug: categorySlug },
        });
        if (!category) {
            throw new ApiError_1.ApiError(404, 'Category not found');
        }
        const skip = (page - 1) * limit;
        const [articles, total] = await Promise.all([
            prisma_1.default.article.findMany({
                where: {
                    categoryId: category.id,
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
                    categoryId: category.id,
                    status: 'PUBLISHED',
                },
            }),
        ]);
        return {
            category,
            articles,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
exports.CategoryService = CategoryService;
exports.default = new CategoryService();
//# sourceMappingURL=categoryService.js.map