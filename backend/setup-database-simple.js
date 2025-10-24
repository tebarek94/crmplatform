#!/usr/bin/env node

// Simple database setup script for Neon PostgreSQL
const { Pool } = require('pg');
require('dotenv').config();

async function setupDatabase() {
  console.log('🚀 Setting up Neon PostgreSQL database schema...');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log('🔍 Testing connection...');
    await pool.query('SELECT 1');
    console.log('✅ Connected to Neon database successfully!');

    // Create tables one by one
    console.log('\n📝 Creating tables...');

    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'author' CHECK (role IN ('admin', 'editor', 'author')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Categories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        parent_id INTEGER NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);
    console.log('✅ Categories table created');

    // Articles table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        featured_image VARCHAR(255),
        category_id INTEGER,
        author_id INTEGER NOT NULL,
        language VARCHAR(10) DEFAULT 'en',
        status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        published_at TIMESTAMP NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Articles table created');

    // Pages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        language VARCHAR(10) DEFAULT 'en',
        status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Pages table created');

    // Tags table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        slug VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tags table created');

    // Article tags junction table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS article_tags (
        article_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (article_id, tag_id),
        FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Article tags table created');

    // Comments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        article_id INTEGER NOT NULL,
        author_name VARCHAR(100) NOT NULL,
        author_email VARCHAR(100) NULL,
        content TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Comments table created');

    // Create indexes
    console.log('\n📊 Creating indexes...');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_articles_language ON articles(language)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_pages_language ON pages(language)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(article_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status)');
    console.log('✅ All indexes created');

    // Insert default data
    console.log('\n👤 Inserting default data...');
    
    // Insert admin user
    await pool.query(`
      INSERT INTO users (username, email, password, role) VALUES 
      ('admin', 'admin@example.com', '$2a$10$xQHJZ8xqV.PZXzKq5Qx6PuJYvK0rZY8h3yVJzH5vJ3xJ3Zq4K5vK0', 'admin')
      ON CONFLICT (username) DO NOTHING
    `);
    console.log('✅ Admin user created');

    // Insert sample categories
    await pool.query(`
      INSERT INTO categories (name, slug, description) VALUES 
      ('Articles', 'articles', 'General articles and blog posts'),
      ('News', 'news', 'Latest news and updates'),
      ('Tutorials', 'tutorials', 'Educational tutorials and guides'),
      ('Documentation', 'documentation', 'Technical documentation')
      ON CONFLICT (slug) DO NOTHING
    `);
    console.log('✅ Sample categories created');

    console.log('\n🎉 Database setup completed successfully!');
    console.log('✅ All tables, indexes, and default data have been created');
    
    // Verify setup
    const tableCount = await pool.query("SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'public'");
    const userCount = await pool.query('SELECT COUNT(*) as count FROM users');
    const categoryCount = await pool.query('SELECT COUNT(*) as count FROM categories');
    
    console.log(`\n📊 Database Summary:`);
    console.log(`   - Tables: ${tableCount.rows[0].count}`);
    console.log(`   - Users: ${userCount.rows[0].count}`);
    console.log(`   - Categories: ${categoryCount.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase().catch(console.error);
