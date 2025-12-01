import { Router } from 'express';
import { body, param } from 'express-validator';
import * as articleController from '../controllers/articleController';
import { authenticate, optionalAuthenticate } from '../middleware/auth';
import { requireAuthor } from '../middleware/roleCheck';
import { validate } from '../middleware/validate';

const router = Router();

/**
 * @route   GET /api/articles/search
 * @desc    Search articles
 * @access  Public
 */
router.get('/search', optionalAuthenticate, articleController.searchArticles);

/**
 * @route   GET /api/articles
 * @desc    Get all articles
 * @access  Public (returns only published for non-authenticated users)
 */
router.get('/', optionalAuthenticate, articleController.getAllArticles);

/**
 * @route   GET /api/articles/:slug
 * @desc    Get article by slug
 * @access  Public (only published articles for non-authenticated users)
 */
router.get('/:slug', optionalAuthenticate, articleController.getArticleBySlug);

/**
 * @route   GET /api/articles/:id/related
 * @desc    Get related articles
 * @access  Public
 */
router.get(
  '/:id/related',
  [param('id').isInt().withMessage('Invalid article ID')],
  validate,
  articleController.getRelatedArticles
);

/**
 * @route   POST /api/articles
 * @desc    Create new article
 * @access  Private (Author, Editor, Admin)
 */
router.post(
  '/',
  authenticate,
  requireAuthor,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('excerpt').optional().isLength({ max: 500 }).withMessage('Excerpt must be less than 500 characters'),
    body('featuredImage').optional().isURL().withMessage('Featured image must be a valid URL'),
    body('categoryId').isInt().withMessage('Category ID must be a number'),
    body('tagIds').optional().isArray().withMessage('Tag IDs must be an array'),
    body('status')
      .optional()
      .isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
      .withMessage('Invalid status'),
  ],
  validate,
  articleController.createArticle
);

/**
 * @route   PUT /api/articles/:id
 * @desc    Update article
 * @access  Private (Owner or Admin)
 */
router.put(
  '/:id',
  authenticate,
  requireAuthor,
  [
    param('id').isInt().withMessage('Invalid article ID'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    body('excerpt').optional().isLength({ max: 500 }).withMessage('Excerpt must be less than 500 characters'),
    body('featuredImage').optional().isURL().withMessage('Featured image must be a valid URL'),
    body('categoryId').optional().isInt().withMessage('Category ID must be a number'),
    body('tagIds').optional().isArray().withMessage('Tag IDs must be an array'),
    body('status')
      .optional()
      .isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
      .withMessage('Invalid status'),
  ],
  validate,
  articleController.updateArticle
);

/**
 * @route   PATCH /api/articles/:id/publish
 * @desc    Publish article
 * @access  Private (Author, Editor, Admin)
 */
router.patch(
  '/:id/publish',
  authenticate,
  requireAuthor,
  [param('id').isInt().withMessage('Invalid article ID')],
  validate,
  articleController.publishArticle
);

/**
 * @route   PATCH /api/articles/:id/archive
 * @desc    Archive article
 * @access  Private (Author, Editor, Admin)
 */
router.patch(
  '/:id/archive',
  authenticate,
  requireAuthor,
  [param('id').isInt().withMessage('Invalid article ID')],
  validate,
  articleController.archiveArticle
);

/**
 * @route   DELETE /api/articles/:id
 * @desc    Delete article
 * @access  Private (Owner or Admin)
 */
router.delete(
  '/:id',
  authenticate,
  requireAuthor,
  [param('id').isInt().withMessage('Invalid article ID')],
  validate,
  articleController.deleteArticle
);

export default router;