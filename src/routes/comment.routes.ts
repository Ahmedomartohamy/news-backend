import { Router } from 'express';
import { body, param } from 'express-validator';
import * as commentController from '../controllers/commentController';
import { authenticate, optionalAuthenticate } from '../middleware/auth';
import { requireEditor } from '../middleware/roleCheck';
import { validate } from '../middleware/validate';

const router = Router();

router.get('/', authenticate, requireEditor, commentController.getAllComments);
router.get('/stats', authenticate, requireEditor, commentController.getCommentStats);
router.get('/:id', commentController.getCommentById);

router.post(
  '/',
  optionalAuthenticate,
  [
    body('articleId').isInt().withMessage('Article ID is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('parentId').optional().isInt().withMessage('Parent ID must be a number'),
    body('authorName').optional().notEmpty().withMessage('Author name cannot be empty'),
    body('authorEmail').optional().isEmail().withMessage('Invalid email'),
  ],
  validate,
  commentController.createComment
);

router.put(
  '/:id',
  authenticate,
  [
    param('id').isInt().withMessage('Invalid comment ID'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  validate,
  commentController.updateComment
);

router.delete(
  '/:id',
  authenticate,
  [param('id').isInt().withMessage('Invalid comment ID')],
  validate,
  commentController.deleteComment
);

router.patch(
  '/:id/approve',
  authenticate,
  requireEditor,
  [param('id').isInt().withMessage('Invalid comment ID')],
  validate,
  commentController.approveComment
);

router.patch(
  '/:id/reject',
  authenticate,
  requireEditor,
  [param('id').isInt().withMessage('Invalid comment ID')],
  validate,
  commentController.rejectComment
);

router.patch(
  '/:id/spam',
  authenticate,
  requireEditor,
  [param('id').isInt().withMessage('Invalid comment ID')],
  validate,
  commentController.markAsSpam
);

export default router;