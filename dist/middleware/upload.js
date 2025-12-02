"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = exports.uploadMultiple = exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const ApiError_1 = require("../utils/ApiError");
// Configuration from environment
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '5242880'); // 5MB default
const ALLOWED_FILE_TYPES = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,image/gif').split(',');
/**
 * File filter to validate file types
 */
const fileFilter = (_req, file, cb) => {
    // Check if file type is allowed
    if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new ApiError_1.ApiError(400, `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}`));
    }
};
/**
 * Multer configuration for file uploads
 * Stores files in memory as Buffer
 */
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter,
});
/**
 * Middleware for single file upload
 * Usage: upload.single('fieldName')
 */
exports.uploadSingle = upload.single('image');
/**
 * Middleware for multiple files upload
 * Usage: upload.array('images', 10)
 */
const uploadMultiple = (fieldName, maxCount = 10) => {
    return upload.array(fieldName, maxCount);
};
exports.uploadMultiple = uploadMultiple;
/**
 * Middleware for multiple fields
 * Usage: uploadFields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 5 }])
 */
const uploadFields = (fields) => {
    return upload.fields(fields);
};
exports.uploadFields = uploadFields;
exports.default = upload;
//# sourceMappingURL=upload.js.map