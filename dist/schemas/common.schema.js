"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = exports.slugParamSchema = exports.idParamSchema = void 0;
const zod_1 = require("zod");
/**
 * Common schema for integer ID parameters
 */
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, 'ID must be a valid number').transform(Number),
});
/**
 * Common schema for slug parameters
 */
exports.slugParamSchema = zod_1.z.object({
    slug: zod_1.z.string().min(1, 'Slug is required'),
});
/**
 * Common schema for pagination query parameters
 */
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    sort: zod_1.z.string().optional(),
    order: zod_1.z.enum(['asc', 'desc']).optional(),
});
//# sourceMappingURL=common.schema.js.map