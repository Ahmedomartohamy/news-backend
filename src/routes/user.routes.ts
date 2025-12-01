import { Router } from 'express';
import { body, param } from 'express-validator';
import * as userController from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/roleCheck';
import { validate } from '../middleware/validate';

const router = Router();

// All user routes require admin authentication
router.use(authenticate, requireAdmin);

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private (Admin)
 */
router.get('/', userController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private (Admin)
 */
router.get(
  '/:id',
  [param('id').isInt().withMessage('Invalid user ID')],
  validate,
  userController.getUserById
);

/**
 * @route   POST /api/users
 * @desc    Create new user
 * @access  Private (Admin)
 */
router.post(
  '/',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
    body('role')
      .optional()
      .isIn(['ADMIN', 'EDITOR', 'AUTHOR'])
      .withMessage('Invalid role'),
  ],
  validate,
  userController.createUser
);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Private (Admin)
 */
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('Invalid user ID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('bio').optional().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
    body('avatarUrl').optional().isURL().withMessage('Avatar URL must be a valid URL'),
  ],
  validate,
  userController.updateUser
);

/**
 * @route   PATCH /api/users/:id/role
 * @desc    Change user role
 * @access  Private (Admin)
 */
router.patch(
  '/:id/role',
  [
    param('id').isInt().withMessage('Invalid user ID'),
    body('role')
      .isIn(['ADMIN', 'EDITOR', 'AUTHOR'])
      .withMessage('Invalid role'),
  ],
  validate,
  userController.changeUserRole
);

/**
 * @route   PATCH /api/users/:id/deactivate
 * @desc    Deactivate user
 * @access  Private (Admin)
 */
router.patch(
  '/:id/deactivate',
  [param('id').isInt().withMessage('Invalid user ID')],
  validate,
  userController.deactivateUser
);

/**
 * @route   PATCH /api/users/:id/activate
 * @desc    Activate user
 * @access  Private (Admin)
 */
router.patch(
  '/:id/activate',
  [param('id').isInt().withMessage('Invalid user ID')],
  validate,
  userController.activateUser
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Private (Admin)
 */
router.delete(
  '/:id',
  [param('id').isInt().withMessage('Invalid user ID')],
  validate,
  userController.deleteUser
);

export default router;