import { z } from 'zod';
/**
 * Schema for creating a new comment
 */
export declare const createCommentSchema: z.ZodObject<{
    articleId: z.ZodNumber;
    content: z.ZodString;
    parentId: z.ZodOptional<z.ZodNumber>;
    authorName: z.ZodOptional<z.ZodString>;
    authorEmail: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schema for updating a comment
 */
export declare const updateCommentSchema: z.ZodObject<{
    content: z.ZodString;
}, z.core.$strip>;
/**
 * Schema for comment ID parameter
 */
export declare const commentParamsSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
/**
 * Type inference exports
 */
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
export type CommentParams = z.infer<typeof commentParamsSchema>;
//# sourceMappingURL=comment.schema.d.ts.map