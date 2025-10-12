import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/articleController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

// Validation rules
const articleValidation = [
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
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status'),
  body('language')
    .optional()
    .isLength({ min: 2, max: 10 })
    .withMessage('Invalid language code')
];

// Routes
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post(
  '/',
  authenticate,
  authorize('admin', 'editor', 'author'),
  articleValidation,
  validate,
  createArticle
);
router.put(
  '/:id',
  authenticate,
  authorize('admin', 'editor', 'author'),
  articleValidation,
  validate,
  updateArticle
);
router.delete(
  '/:id',
  authenticate,
  authorize('admin', 'editor', 'author'),
  deleteArticle
);

export default router;

