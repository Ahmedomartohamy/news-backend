import { Router } from 'express';
import { param } from 'express-validator';
import * as mediaController from '../controllers/mediaController';
import { authenticate } from '../middleware/auth';
import { uploadSingle, uploadMultiple } from '../middleware/upload';
import { uploadRateLimiter } from '../middleware/rateLimiter';
import { validate } from '../middleware/validate';

const router = Router();

router.use(authenticate); // All media routes require authentication

router.get('/', mediaController.getAllMedia);
router.get('/stats', mediaController.getMediaStats);
router.get('/search', mediaController.searchMedia);
router.get('/my-uploads', mediaController.getMyMedia);

router.get(
  '/:id',
  [param('id').isInt().withMessage('Invalid media ID')],
  validate,
  mediaController.getMediaById
);

router.post('/upload', uploadRateLimiter, uploadSingle, mediaController.uploadMedia);

router.post(
  '/upload-multiple',
  uploadRateLimiter,
  uploadMultiple('images', 10),
  mediaController.uploadMultipleMedia
);

router.delete(
  '/:id',
  [param('id').isInt().withMessage('Invalid media ID')],
  validate,
  mediaController.deleteMedia
);

export default router;