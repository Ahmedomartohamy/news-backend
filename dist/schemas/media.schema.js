"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaParamsSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for media ID parameter
 */
exports.mediaParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, 'Invalid media ID').transform(Number),
});
//# sourceMappingURL=media.schema.js.map