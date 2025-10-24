#!/usr/bin/env node

// Test Neon database connection
const { Pool } = require('pg');
require('dotenv').config();

async function testConnection() {
  console.log('🧪 Testing Neon PostgreSQL connection...');
  console.log('📋 Connection string:', process.env.DATABASE_URL ? 'Set ✅' : 'Not set ❌');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 1,
    connectionTimeoutMillis: 15000,
    acquireTimeoutMillis: 15000,
  });

  try {
    console.log('🔍 Attempting to connect...');
    const client = await pool.connect();
    
    console.log('✅ Connected successfully!');
    
    // Test basic query
    const result = await client.query('SELECT 1 as test, NOW() as current_time');
    console.log('📊 Query test result:', result.rows[0]);
    
    // Test table access
    const tableResult = await client.query("SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'public'");
    console.log(`📋 Tables in database: ${tableResult.rows[0].count}`);
    
    // Test users table
    const userResult = await client.query('SELECT COUNT(*) as count FROM users');
    console.log(`👤 Users in database: ${userResult.rows[0].count}`);
    
    client.release();
    console.log('🎉 All tests passed! Database is ready to use.');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.error('🔧 Troubleshooting tips:');
    console.error('   1. Check your DATABASE_URL in .env file');
    console.error('   2. Verify your Neon project is active');
    console.error('   3. Check your internet connection');
    console.error('   4. Ensure SSL is enabled (sslmode=require)');
  } finally {
    await pool.end();
  }
}

testConnection().catch(console.error);
