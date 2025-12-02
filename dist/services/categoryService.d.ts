import { CreateCategoryRequest } from '../types/requests';
export declare class CategoryService {
    /**
     * Create a new category
     */
    createCategory(data: CreateCategoryRequest): Promise<{
        _count: {
            articles: number;
            children: number;
        };
        parent: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        } | null;
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        parentId: number | null;
    }>;
    /**
     * Get all categories
     */
    getAllCategories(): Promise<({
        _count: {
            articles: number;
        };
        parent: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        } | null;
        children: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        parentId: number | null;
    })[]>;
    /**
     * Get category by slug
     */
    getCategoryBySlug(slug: string): Promise<{
        _count: {
            articles: number;
        };
        parent: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        } | null;
        children: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        parentId: number | null;
    }>;
    /**
     * Get category by ID
     */
    getCategoryById(id: number): Promise<{
        _count: {
            articles: number;
        };
        parent: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        } | null;
        children: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        parentId: number | null;
    }>;
    /**
     * Get category tree (hierarchical structure)
     */
    getCategoryTree(): Promise<({
        _count: {
            articles: number;
        };
        children: ({
            _count: {
                articles: number;
            };
        } & {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        })[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        parentId: number | null;
    })[]>;
    /**
     * Update category
     */
    updateCategory(id: number, data: {
        name?: string;
        description?: string;
        parentId?: number;
    }): Promise<{
        _count: {
            articles: number;
        };
        parent: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        } | null;
        children: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        parentId: number | null;
    }>;
    /**
     * Delete category
     */
    deleteCategory(id: number): Promise<{
        message: string;
    }>;
    /**
     * Get articles by category
     */
    getArticlesByCategory(categorySlug: string, page?: number, limit?: number): Promise<{
        category: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        };
        articles: ({
            _count: {
                comments: number;
            };
            author: {
                id: number;
                name: string;
                avatarUrl: string | null;
            };
            tags: {
                id: number;
                name: string;
                createdAt: Date;
                slug: string;
            }[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            content: string;
            excerpt: string | null;
            featuredImage: string | null;
            authorId: number;
            categoryId: number | null;
            status: import(".prisma/client").$Enums.ArticleStatus;
            viewCount: number;
            publishedAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
declare const _default: CategoryService;
export default _default;
//# sourceMappingURL=categoryService.d.ts.map