"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySlugParamsSchema = exports.categoryParamsSchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for creating a new category
 */
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    description: zod_1.z.string().optional(),
    parentId: zod_1.z.number().int('Parent ID must be a number').optional(),
});
/**
 * Schema for updating a category
 */
exports.updateCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name cannot be empty').optional(),
    description: zod_1.z.string().optional(),
    parentId: zod_1.z.number().int('Parent ID must be a number').optional(),
});
/**
 * Schema for category ID parameter
 */
exports.categoryParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, 'Invalid category ID').transform(Number),
});
/**
 * Schema for category slug parameter
 */
exports.categorySlugParamsSchema = zod_1.z.object({
    slug: zod_1.z.string().min(1, 'Slug is required'),
});
//# sourceMappingURL=category.schema.js.map