"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentParamsSchema = exports.updateCommentSchema = exports.createCommentSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for creating a new comment
 */
exports.createCommentSchema = zod_1.z.object({
    articleId: zod_1.z.number().int('Article ID is required'),
    content: zod_1.z.string().min(1, 'Content is required'),
    parentId: zod_1.z.number().int('Parent ID must be a number').optional(),
    authorName: zod_1.z.string().min(1, 'Author name cannot be empty').optional(),
    authorEmail: zod_1.z.string().email('Invalid email').optional(),
});
/**
 * Schema for updating a comment
 */
exports.updateCommentSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, 'Content is required'),
});
/**
 * Schema for comment ID parameter
 */
exports.commentParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, 'Invalid comment ID').transform(Number),
});
//# sourceMappingURL=comment.schema.js.map