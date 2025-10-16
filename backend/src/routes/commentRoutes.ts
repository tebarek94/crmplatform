import { Router } from 'express';
import { body } from 'express-validator';
import { 
  getCommentsByArticle, 
  createComment, 
  updateComment, 
  deleteComment,
  approveComment,
  rejectComment,
  getAllComments
} from '../controllers/commentController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

// Validation rules
const createCommentValidation = [
  body('article_id')
    .isInt({ min: 1 })
    .withMessage('Valid article ID required'),
  body('author_name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Author name must be 1-100 characters'),
  body('author_email')
    .optional()
    .custom((value) => {
      if (value !== null && value !== undefined && value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        throw new Error('Valid email required');
      }
      return true;
    })
    .customSanitizer((value) => {
      return value === null || value === undefined || value.trim() === '' ? null : value;
    }),
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be 1-1000 characters')
];

const updateCommentValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be 1-1000 characters')
];

// Public routes
router.get('/article/:articleId', getCommentsByArticle);
router.post('/', createCommentValidation, validate, createComment);

// Protected routes (admin/editor only)
router.get('/', authenticate, getAllComments);
router.put('/:id', authenticate, updateCommentValidation, validate, updateComment);
router.delete('/:id', authenticate, deleteComment);
router.patch('/:id/approve', authenticate, approveComment);
router.patch('/:id/reject', authenticate, rejectComment);

export default router;
