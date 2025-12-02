import { CreateArticleRequest, UpdateArticleRequest, ArticleFilters, PaginationQuery } from '../types/requests';
export declare class ArticleService {
    /**
     * Create a new article
     */
    createArticle(data: CreateArticleRequest, authorId: number): Promise<{
        _count: {
            comments: number;
        };
        author: {
            id: number;
            email: string;
            name: string;
            avatarUrl: string | null;
        };
        category: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        } | null;
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
    }>;
    /**
     * Get article by slug
     */
    getArticleBySlug(slug: string, incrementView?: boolean): Promise<{
        _count: {
            comments: number;
        };
        author: {
            id: number;
            email: string;
            name: string;
            avatarUrl: string | null;
            bio: string | null;
        };
        category: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        } | null;
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
    }>;
    /**
     * Get article by ID
     */
    getArticleById(id: number): Promise<{
        _count: {
            comments: number;
        };
        author: {
            id: number;
            email: string;
            name: string;
            avatarUrl: string | null;
        };
        category: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        } | null;
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
    }>;
    /**
     * Get all articles with filters and pagination
     */
    getAllArticles(filters: ArticleFilters, query: PaginationQuery): Promise<{
        articles: ({
            _count: {
                comments: number;
            };
            author: {
                id: number;
                name: string;
                avatarUrl: string | null;
            };
            category: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                slug: string;
                parentId: number | null;
            } | null;
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
    /**
     * Update article
     */
    updateArticle(id: number, data: UpdateArticleRequest, userId: number, userRole: string): Promise<{
        _count: {
            comments: number;
        };
        author: {
            id: number;
            email: string;
            name: string;
            avatarUrl: string | null;
        };
        category: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        } | null;
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
    }>;
    /**
     * Publish article
     */
    publishArticle(id: number): Promise<{
        author: {
            id: number;
            name: string;
            avatarUrl: string | null;
        };
        category: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        } | null;
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
    }>;
    /**
     * Archive article
     */
    archiveArticle(id: number): Promise<{
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
    }>;
    /**
     * Delete article
     */
    deleteArticle(id: number, userId: number, userRole: string): Promise<{
        message: string;
    }>;
    /**
     * Get related articles
     */
    getRelatedArticles(articleId: number, limit?: number): Promise<({
        author: {
            id: number;
            name: string;
            avatarUrl: string | null;
        };
        category: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            parentId: number | null;
        } | null;
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
    })[]>;
}
declare const _default: ArticleService;
export default _default;
//# sourceMappingURL=articleService.d.ts.map