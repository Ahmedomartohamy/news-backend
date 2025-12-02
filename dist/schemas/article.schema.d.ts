import { z } from 'zod';
/**
 * Schema for creating a new article
 */
export declare const createArticleSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    featuredImage: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodNumber;
    tagIds: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
    status: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>>;
}, z.core.$strip>;
/**
 * Schema for updating an article
 */
export declare const updateArticleSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodString>;
    featuredImage: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodNumber>;
    tagIds: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
    status: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>>;
}, z.core.$strip>;
/**
 * Schema for article ID parameter
 */
export declare const articleParamsSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
/**
 * Schema for article slug parameter
 */
export declare const articleSlugParamsSchema: z.ZodObject<{
    slug: z.ZodString;
}, z.core.$strip>;
/**
 * Schema for article query parameters
 */
export declare const articleQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>>;
    categoryId: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number | undefined, string | undefined>>;
    authorId: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number | undefined, string | undefined>>;
    tagId: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number | undefined, string | undefined>>;
    search: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
    page: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    sort: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
/**
 * Type inference exports
 */
export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
export type ArticleParams = z.infer<typeof articleParamsSchema>;
export type ArticleSlugParams = z.infer<typeof articleSlugParamsSchema>;
export type ArticleQuery = z.infer<typeof articleQuerySchema>;
//# sourceMappingURL=article.schema.d.ts.map