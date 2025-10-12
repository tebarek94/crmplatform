# CMS Backend API

Content Management System built with Express, TypeScript, and MySQL.

## Features

- User authentication with JWT
- Article/Content management
- Categories and tags
- Multi-language support
- Search functionality
- Image upload
- RESTful API

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your database credentials

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

### Articles
- GET /api/articles - Get all articles
- GET /api/articles/:id - Get article by ID
- POST /api/articles - Create article (Auth required)
- PUT /api/articles/:id - Update article (Auth required)
- DELETE /api/articles/:id - Delete article (Auth required)

### Categories
- GET /api/categories - Get all categories
- POST /api/categories - Create category (Auth required)

### Pages
- GET /api/pages - Get all pages
- GET /api/pages/:slug - Get page by slug
- POST /api/pages - Create page (Auth required)

## Tech Stack

- Express.js
- TypeScript
- MySQL
- JWT Authentication
- Bcrypt for password hashing

