import { Router } from 'express';
import { body, param } from 'express-validator';
import * as categoryController from '../controllers/categoryController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/roleCheck';
import { validate } from '../middleware/validate';

const router = Router();

router.get('/', categoryController.getAllCategories);
router.get('/tree', categoryController.getCategoryTree);
router.get('/:slug', categoryController.getCategoryBySlug);
router.get('/:slug/articles', categoryController.getArticlesByCategory);

router.post(
  '/',
  authenticate,
  requireAdmin,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').optional(),
    body('parentId').optional().isInt().withMessage('Parent ID must be a number'),
  ],
  validate,
  categoryController.createCategory
);

router.put(
  '/:id',
  authenticate,
  requireAdmin,
  [
    param('id').isInt().withMessage('Invalid category ID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  ],
  validate,
  categoryController.updateCategory
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  [param('id').isInt().withMessage('Invalid category ID')],
  validate,
  categoryController.deleteCategory
);

export default router;