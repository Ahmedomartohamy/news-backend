import { z } from 'zod';
/**
 * Schema for media ID parameter
 */
export declare const mediaParamsSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
/**
 * Type inference exports
 */
export type MediaParams = z.infer<typeof mediaParamsSchema>;
//# sourceMappingURL=media.schema.d.ts.map