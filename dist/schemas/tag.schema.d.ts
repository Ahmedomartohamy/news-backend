import { z } from 'zod';
/**
 * Schema for creating a new tag
 */
export declare const createTagSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
/**
 * Schema for updating a tag
 */
export declare const updateTagSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
/**
 * Schema for tag ID parameter
 */
export declare const tagParamsSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
/**
 * Schema for tag slug parameter
 */
export declare const tagSlugParamsSchema: z.ZodObject<{
    slug: z.ZodString;
}, z.core.$strip>;
/**
 * Type inference exports
 */
export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
export type TagParams = z.infer<typeof tagParamsSchema>;
export type TagSlugParams = z.infer<typeof tagSlugParamsSchema>;
//# sourceMappingURL=tag.schema.d.ts.map