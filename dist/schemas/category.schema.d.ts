import { z } from 'zod';
/**
 * Schema for creating a new category
 */
export declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Schema for updating a category
 */
export declare const updateCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Schema for category ID parameter
 */
export declare const categoryParamsSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
/**
 * Schema for category slug parameter
 */
export declare const categorySlugParamsSchema: z.ZodObject<{
    slug: z.ZodString;
}, z.core.$strip>;
/**
 * Type inference exports
 */
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CategoryParams = z.infer<typeof categoryParamsSchema>;
export type CategorySlugParams = z.infer<typeof categorySlugParamsSchema>;
//# sourceMappingURL=category.schema.d.ts.map