import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

// Validation rules
const categoryValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be 2-100 characters'),
  body('description')
    .optional()
    .trim()
];

// Routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post(
  '/',
  authenticate,
  authorize('admin', 'editor'),
  categoryValidation,
  validate,
  createCategory
);
router.put(
  '/:id',
  authenticate,
  authorize('admin', 'editor'),
  categoryValidation,
  validate,
  updateCategory
);
router.delete(
  '/:id',
  authenticate,
  authorize('admin', 'editor'),
  deleteCategory
);

export default router;

