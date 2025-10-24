#!/usr/bin/env node

// Quick setup script for Neon PostgreSQL with DATABASE_URL
const fs = require('fs');
const path = require('path');

console.log('🚀 Neon PostgreSQL Setup Helper');
console.log('================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example.txt');

if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
  console.log('📝 Please update your DATABASE_URL in the .env file with your Neon connection string');
} else {
  console.log('📝 Creating .env file from template...');
  
  if (fs.existsSync(envExamplePath)) {
    const envContent = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('📝 Please update your DATABASE_URL in the .env file with your Neon connection string');
  } else {
    console.log('❌ env.example.txt not found');
  }
}

console.log('\n🔧 Next Steps:');
console.log('1. Get your Neon connection string from: https://console.neon.tech/');
console.log('2. Update DATABASE_URL in your .env file');
console.log('3. Run: npm install');
console.log('4. Run: psql "your-connection-string" -f src/utils/database_postgres.sql');
console.log('5. Run: npm run dev');
console.log('\n📚 For detailed instructions, see: NEON_SETUP_GUIDE.md');
