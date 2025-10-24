import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Neon PostgreSQL configuration
const pool = new Pool({
  // Use DATABASE_URL if provided (recommended for Neon)
  connectionString: process.env.DATABASE_URL,
  // Fallback to individual parameters if DATABASE_URL is not provided
  ...(process.env.DATABASE_URL ? {} : {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cms_database',
  }),
  // Optimized settings for Neon serverless
  max: 5, // Reduced for serverless
  min: 0, // Allow connections to scale to zero
  idleTimeoutMillis: 10000, // Shorter idle timeout for serverless
  connectionTimeoutMillis: 10000, // Increased timeout for Neon
  // SSL configuration for Neon (required for production)
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// Test the connection
export const testConnection = async () => {
  try {
    console.log('🔍 Testing database connection...');
    const client = await pool.connect();
    
    // Test with a simple query
    const result = await client.query('SELECT 1 as test');
    console.log('✅ Database connected successfully');
    console.log(`📊 Connection test result: ${result.rows[0].test}`);
    
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error instanceof Error ? error.message : String(error));
    console.error('💡 Make sure your Neon connection string is correct and the database is accessible');
    return false;
  }
};

export default pool;

