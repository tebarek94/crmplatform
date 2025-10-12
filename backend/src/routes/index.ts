import { Router } from 'express';
import authRoutes from './authRoutes';
import articleRoutes from './articleRoutes';
import categoryRoutes from './categoryRoutes';
import pageRoutes from './pageRoutes';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);
router.use('/categories', categoryRoutes);
router.use('/pages', pageRoutes);

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'CMS API is running' });
});

export default router;

