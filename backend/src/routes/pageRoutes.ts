import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage
} from '../controllers/pageController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

// Validation rules
const pageValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Title must be 3-255 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Invalid status'),
  body('language')
    .optional()
    .isLength({ min: 2, max: 10 })
    .withMessage('Invalid language code')
];

// Routes
router.get('/', getAllPages);
router.get('/:slug', getPageBySlug);
router.post(
  '/',
  authenticate,
  authorize('admin', 'editor'),
  pageValidation,
  validate,
  createPage
);
router.put(
  '/:id',
  authenticate,
  authorize('admin', 'editor'),
  pageValidation,
  validate,
  updatePage
);
router.delete(
  '/:id',
  authenticate,
  authorize('admin', 'editor'),
  deletePage
);

export default router;

