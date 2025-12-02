import { z } from 'zod';
/**
 * Common schema for integer ID parameters
 */
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
/**
 * Common schema for slug parameters
 */
export declare const slugParamSchema: z.ZodObject<{
    slug: z.ZodString;
}, z.core.$strip>;
/**
 * Common schema for pagination query parameters
 */
export declare const paginationSchema: z.ZodObject<{
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
export type IdParam = z.infer<typeof idParamSchema>;
export type SlugParam = z.infer<typeof slugParamSchema>;
export type PaginationQuery = z.infer<typeof paginationSchema>;
//# sourceMappingURL=common.schema.d.ts.map