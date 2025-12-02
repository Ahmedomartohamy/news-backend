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
const articleController = __importStar(require("../controllers/articleController"));
const auth_1 = require("../middleware/auth");
const roleCheck_1 = require("../middleware/roleCheck");
const validate_1 = require("../middleware/validate");
const article_schema_1 = require("../schemas/article.schema");
const router = (0, express_1.Router)();
/**
 * @route   GET /api/articles/search
 * @desc    Search articles
 * @access  Public
 */
router.get('/search', auth_1.optionalAuthenticate, articleController.searchArticles);
/**
 * @route   GET /api/articles
 * @desc    Get all articles
 * @access  Public (returns only published for non-authenticated users)
 */
router.get('/', auth_1.optionalAuthenticate, articleController.getAllArticles);
/**
 * @route   GET /api/articles/:slug
 * @desc    Get article by slug
 * @access  Public (only published articles for non-authenticated users)
 */
router.get('/:slug', auth_1.optionalAuthenticate, articleController.getArticleBySlug);
/**
 * @route   GET /api/articles/:id/related
 * @desc    Get related articles
 * @access  Public
 */
router.get('/:id/related', (0, validate_1.validate)(article_schema_1.articleParamsSchema, 'params'), articleController.getRelatedArticles);
/**
 * @route   POST /api/articles
 * @desc    Create new article
 * @access  Private (Author, Editor, Admin)
 */
router.post('/', auth_1.authenticate, roleCheck_1.requireAuthor, (0, validate_1.validate)(article_schema_1.createArticleSchema, 'body'), articleController.createArticle);
/**
 * @route   PUT /api/articles/:id
 * @desc    Update article
 * @access  Private (Owner or Admin)
 */
router.put('/:id', auth_1.authenticate, roleCheck_1.requireAuthor, (0, validate_1.validate)(article_schema_1.articleParamsSchema, 'params'), (0, validate_1.validate)(article_schema_1.updateArticleSchema, 'body'), articleController.updateArticle);
/**
 * @route   PATCH /api/articles/:id/publish
 * @desc    Publish article
 * @access  Private (Author, Editor, Admin)
 */
router.patch('/:id/publish', auth_1.authenticate, roleCheck_1.requireAuthor, (0, validate_1.validate)(article_schema_1.articleParamsSchema, 'params'), articleController.publishArticle);
/**
 * @route   PATCH /api/articles/:id/archive
 * @desc    Archive article
 * @access  Private (Author, Editor, Admin)
 */
router.patch('/:id/archive', auth_1.authenticate, roleCheck_1.requireAuthor, (0, validate_1.validate)(article_schema_1.articleParamsSchema, 'params'), articleController.archiveArticle);
/**
 * @route   DELETE /api/articles/:id
 * @desc    Delete article
 * @access  Private (Owner or Admin)
 */
router.delete('/:id', auth_1.authenticate, roleCheck_1.requireAuthor, (0, validate_1.validate)(article_schema_1.articleParamsSchema, 'params'), articleController.deleteArticle);
exports.default = router;
//# sourceMappingURL=article.routes.js.map