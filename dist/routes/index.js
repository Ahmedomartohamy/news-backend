"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const article_routes_1 = __importDefault(require("./article.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const tag_routes_1 = __importDefault(require("./tag.routes"));
const comment_routes_1 = __importDefault(require("./comment.routes"));
const media_routes_1 = __importDefault(require("./media.routes"));
const router = (0, express_1.Router)();
// Health check
router.get('/health', (_req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString(),
    });
});
// Mount routes
router.use('/auth', auth_routes_1.default);
router.use('/users', user_routes_1.default);
router.use('/articles', article_routes_1.default);
router.use('/categories', category_routes_1.default);
router.use('/tags', tag_routes_1.default);
router.use('/comments', comment_routes_1.default);
router.use('/media', media_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map