import { CommentStatus } from '@prisma/client';
import { CreateCommentRequest, PaginationQuery } from '../types/requests';
export declare class CommentService {
    /**
     * Create a new comment
     */
    createComment(data: CreateCommentRequest, userId?: number): Promise<{
        user: {
            id: number;
            name: string;
            avatarUrl: string | null;
        } | null;
        article: {
            id: number;
            title: string;
            slug: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        status: import(".prisma/client").$Enums.CommentStatus;
        parentId: number | null;
        articleId: number;
        userId: number | null;
        authorName: string | null;
        authorEmail: string | null;
    }>;
    /**
     * Get all comments with filters
     */
    getAllComments(filters: {
        status?: CommentStatus;
        articleId?: number;
    }, query: PaginationQuery): Promise<{
        comments: ({
            user: {
                id: number;
                name: string;
                avatarUrl: string | null;
            } | null;
            _count: {
                replies: number;
            };
            article: {
                id: number;
                title: string;
                slug: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            status: import(".prisma/client").$Enums.CommentStatus;
            parentId: number | null;
            articleId: number;
            userId: number | null;
            authorName: string | null;
            authorEmail: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    /**
     * Get comments for an article (including nested replies)
     */
    getArticleComments(articleId: number): Promise<({
        user: {
            id: number;
            name: string;
            avatarUrl: string | null;
        } | null;
        replies: ({
            user: {
                id: number;
                name: string;
                avatarUrl: string | null;
            } | null;
            replies: ({
                user: {
                    id: number;
                    name: string;
                    avatarUrl: string | null;
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                status: import(".prisma/client").$Enums.CommentStatus;
                parentId: number | null;
                articleId: number;
                userId: number | null;
                authorName: string | null;
                authorEmail: string | null;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            status: import(".prisma/client").$Enums.CommentStatus;
            parentId: number | null;
            articleId: number;
            userId: number | null;
            authorName: string | null;
            authorEmail: string | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        status: import(".prisma/client").$Enums.CommentStatus;
        parentId: number | null;
        articleId: number;
        userId: number | null;
        authorName: string | null;
        authorEmail: string | null;
    })[]>;
    /**
     * Get comment by ID
     */
    getCommentById(id: number): Promise<{
        user: {
            id: number;
            name: string;
            avatarUrl: string | null;
        } | null;
        article: {
            id: number;
            title: string;
            slug: string;
        };
        parent: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            status: import(".prisma/client").$Enums.CommentStatus;
            parentId: number | null;
            articleId: number;
            userId: number | null;
            authorName: string | null;
            authorEmail: string | null;
        } | null;
        replies: ({
            user: {
                id: number;
                name: string;
                avatarUrl: string | null;
            } | null;
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            status: import(".prisma/client").$Enums.CommentStatus;
            parentId: number | null;
            articleId: number;
            userId: number | null;
            authorName: string | null;
            authorEmail: string | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        status: import(".prisma/client").$Enums.CommentStatus;
        parentId: number | null;
        articleId: number;
        userId: number | null;
        authorName: string | null;
        authorEmail: string | null;
    }>;
    /**
     * Update comment
     */
    updateComment(id: number, data: {
        content: string;
    }, userId: number, userRole: string): Promise<{
        user: {
            id: number;
            name: string;
            avatarUrl: string | null;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        status: import(".prisma/client").$Enums.CommentStatus;
        parentId: number | null;
        articleId: number;
        userId: number | null;
        authorName: string | null;
        authorEmail: string | null;
    }>;
    /**
     * Approve comment
     */
    approveComment(id: number): Promise<{
        user: {
            id: number;
            name: string;
            avatarUrl: string | null;
        } | null;
        article: {
            id: number;
            title: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        status: import(".prisma/client").$Enums.CommentStatus;
        parentId: number | null;
        articleId: number;
        userId: number | null;
        authorName: string | null;
        authorEmail: string | null;
    }>;
    /**
     * Reject comment
     */
    rejectComment(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        status: import(".prisma/client").$Enums.CommentStatus;
        parentId: number | null;
        articleId: number;
        userId: number | null;
        authorName: string | null;
        authorEmail: string | null;
    }>;
    /**
     * Mark comment as spam
     */
    markAsSpam(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        status: import(".prisma/client").$Enums.CommentStatus;
        parentId: number | null;
        articleId: number;
        userId: number | null;
        authorName: string | null;
        authorEmail: string | null;
    }>;
    /**
     * Delete comment
     */
    deleteComment(id: number, userId: number, userRole: string): Promise<{
        message: string;
    }>;
    /**
     * Get comment statistics
     */
    getCommentStats(): Promise<{
        total: number;
        pending: number;
        approved: number;
        rejected: number;
        spam: number;
    }>;
}
declare const _default: CommentService;
export default _default;
//# sourceMappingURL=commentService.d.ts.map