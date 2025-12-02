"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mediaController = __importStar(require("../controllers/mediaController"));
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const rateLimiter_1 = require("../middleware/rateLimiter");
const validate_1 = require("../middleware/validate");
const media_schema_1 = require("../schemas/media.schema");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate); // All media routes require authentication
router.get('/', mediaController.getAllMedia);
router.get('/stats', mediaController.getMediaStats);
router.get('/search', mediaController.searchMedia);
router.get('/my-uploads', mediaController.getMyMedia);
router.get('/:id', (0, validate_1.validate)(media_schema_1.mediaParamsSchema, 'params'), mediaController.getMediaById);
router.post('/upload', rateLimiter_1.uploadRateLimiter, upload_1.uploadSingle, mediaController.uploadMedia);
router.post('/upload-multiple', rateLimiter_1.uploadRateLimiter, (0, upload_1.uploadMultiple)('images', 10), mediaController.uploadMultipleMedia);
router.delete('/:id', (0, validate_1.validate)(media_schema_1.mediaParamsSchema, 'params'), mediaController.deleteMedia);
exports.default = router;
//# sourceMappingURL=media.routes.js.map