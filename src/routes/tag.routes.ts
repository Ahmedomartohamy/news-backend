import { Router } from 'express';
import { body, param } from 'express-validator';
import * as tagController from '../controllers/tagController';
import { authenticate } from '../middleware/auth';
import { requireAdmin, requireAuthor } from '../middleware/roleCheck';
import { validate } from '../middleware/validate';

const router = Router();

router.get('/', tagController.getAllTags);
router.get('/popular', tagController.getPopularTags);
router.get('/:slug', tagController.getTagBySlug);
router.get('/:slug/articles', tagController.getArticlesByTag);

router.post(
  '/',
  authenticate,
  requireAuthor,
  [body('name').notEmpty().withMessage('Name is required')],
  validate,
  tagController.createTag
);

router.put(
  '/:id',
  authenticate,
  requireAdmin,
  [
    param('id').isInt().withMessage('Invalid tag ID'),
    body('name').notEmpty().withMessage('Name is required'),
  ],
  validate,
  tagController.updateTag
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  [param('id').isInt().withMessage('Invalid tag ID')],
  validate,
  tagController.deleteTag
);

export default router;