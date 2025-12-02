"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagSlugParamsSchema = exports.tagParamsSchema = exports.updateTagSchema = exports.createTagSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for creating a new tag
 */
exports.createTagSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
});
/**
 * Schema for updating a tag
 */
exports.updateTagSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
});
/**
 * Schema for tag ID parameter
 */
exports.tagParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, 'Invalid tag ID').transform(Number),
});
/**
 * Schema for tag slug parameter
 */
exports.tagSlugParamsSchema = zod_1.z.object({
    slug: zod_1.z.string().min(1, 'Slug is required'),
});
//# sourceMappingURL=tag.schema.js.map