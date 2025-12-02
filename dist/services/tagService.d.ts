import { CreateTagRequest } from '../types/requests';
export declare class TagService {
    /**
     * Create a new tag
     */
    createTag(data: CreateTagRequest): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    }>;
    /**
     * Get all tags
     */
    getAllTags(): Promise<({
        _count: {
            articles: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    })[]>;
    /**
     * Get tag by slug
     */
    getTagBySlug(slug: string): Promise<{
        _count: {
            articles: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    }>;
    /**
     * Get tag by ID
     */
    getTagById(id: number): Promise<{
        _count: {
            articles: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    }>;
    /**
     * Get popular tags
     */
    getPopularTags(limit?: number): Promise<({
        _count: {
            articles: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    })[]>;
    /**
     * Update tag
     */
    updateTag(id: number, data: {
        name?: string;
    }): Promise<{
        _count: {
            articles: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    }>;
    /**
     * Delete tag
     */
    deleteTag(id: number): Promise<{
        message: string;
    }>;
    /**
     * Get articles by tag
     */
    getArticlesByTag(tagSlug: string, page?: number, limit?: number): Promise<{
        tag: {
            id: number;
            name: string;
            createdAt: Date;
            slug: string;
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
     * Get or create tags by names (batch)
     */
    getOrCreateTags(tagNames: string[]): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        slug: string;
    }[]>;
}
declare const _default: TagService;
export default _default;
//# sourceMappingURL=tagService.d.ts.map