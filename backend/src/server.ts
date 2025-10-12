import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import routes from './routes';
import { errorHandler, notFound } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Logging middleware
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api', routes);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'CMS Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      articles: '/api/articles',
      categories: '/api/categories',
      pages: '/api/pages'
    }
  });
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('⚠️  Failed to connect to database. Please check your configuration.');
      console.log('💡 Make sure MySQL is running and credentials in .env are correct');
    }

    app.listen(PORT, () => {
      console.log('\n🚀 CMS Backend Server Started!');
      console.log(`📍 Server running on: http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`💾 Database: ${dbConnected ? 'Connected ✅' : 'Not Connected ❌'}`);
      console.log('\n📚 Available endpoints:');
      console.log(`   - GET  /api/health - Health check`);
      console.log(`   - POST /api/auth/register - Register user`);
      console.log(`   - POST /api/auth/login - Login user`);
      console.log(`   - GET  /api/articles - Get all articles`);
      console.log(`   - GET  /api/categories - Get all categories`);
      console.log(`   - GET  /api/pages - Get all pages`);
      console.log('\n👤 Default admin credentials:');
      console.log('   Email: admin@example.com');
      console.log('   Password: admin123');
      console.log('\n');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Start the server
startServer();

export default app;

