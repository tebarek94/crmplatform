# Neon PostgreSQL Setup Guide

## 🚀 Using Neon PostgreSQL with Your CMS Project

[Neon](https://neon.com/) is a serverless PostgreSQL platform that offers instant provisioning, autoscaling, and modern features perfect for your CMS project.

### ✅ What's Already Configured

Your project has been updated to work with Neon PostgreSQL:
- ✅ Database configuration supports Neon connection strings
- ✅ SSL configuration for secure connections
- ✅ Environment variables updated for Neon
- ✅ Render deployment configuration updated

### 🔧 Setup Steps

#### 1. Get Your Neon Connection Details

From your Neon dashboard, you'll need:
- **Connection String**: `postgresql://username:password@host.neon.tech/database?sslmode=require`
- **Individual Parameters**:
  - Host: `your-project.neon.tech`
  - Port: `5432`
  - Username: `your-username`
  - Password: `your-password`
  - Database: `your-database-name`

#### 2. Local Development Setup

Create a `.env` file in your `backend` directory:

```env
# Option 1: Using Neon connection string (Recommended)
DATABASE_URL=postgresql://username:password@your-project.neon.tech/database?sslmode=require

# Option 2: Using individual parameters
DB_HOST=your-project.neon.tech
DB_PORT=5432
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name

# Other configuration
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

#### 3. Set Up Database Schema

Run the PostgreSQL schema on your Neon database:

```bash
# Install dependencies
cd backend
npm install

# Connect to your Neon database and run the schema
psql "postgresql://username:password@your-project.neon.tech/database?sslmode=require" -f src/utils/database_postgres.sql
```

#### 4. Test Local Connection

```bash
cd backend
npm run dev
```

You should see: `✅ Database connected successfully`

#### 5. Deploy to Render

Update your `render.yaml` with your actual Neon credentials:

```yaml
envVars:
  - key: DATABASE_URL
    value: postgresql://username:password@your-project.neon.tech/database?sslmode=require
```

### 🌟 Neon Benefits for Your Project

- **Instant Provisioning**: Database ready in 300ms
- **Autoscaling**: Automatically scales with your traffic
- **Branching**: Create database branches for development/testing
- **Point-in-time Recovery**: Restore to any second within 30 days
- **Serverless**: Scales to zero when idle, saving costs
- **100% PostgreSQL**: Full compatibility with PostgreSQL features

### 🔗 Useful Neon Features

1. **Database Branching**: Create isolated copies for development
2. **Connection Pooling**: Handles thousands of connections efficiently
3. **Instant Restores**: Recover TBs of data in seconds
4. **API Management**: Manage databases programmatically
5. **AI Integration**: Built-in vector search for AI applications

### 📊 Monitoring & Management

- Monitor your database performance in the Neon dashboard
- Set up alerts for connection limits or performance issues
- Use Neon's API to manage databases programmatically
- Take advantage of branching for safe schema migrations

### 🚨 Important Notes

- Always use SSL connections (`sslmode=require`) for production
- Neon automatically handles connection pooling
- Your database scales to zero when idle (cost-effective)
- Use the connection string format for best compatibility

### 🔧 Troubleshooting

If you encounter connection issues:
1. Verify your connection string format
2. Check that SSL is enabled (`sslmode=require`)
3. Ensure your Neon project is active
4. Check firewall settings if connecting from restricted networks

### 📚 Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [PostgreSQL Tutorial](https://neon.tech/docs/tutorials)
- [Connection Examples](https://neon.tech/docs/connect/connect-from-any-app)
- [Neon Discord Community](https://discord.gg/neondatabase)
