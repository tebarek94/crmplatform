# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database and run migrations
CREATE DATABASE cms_database;
EXIT;

# Import schema
mysql -u root -p cms_database < backend/src/utils/database.sql
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file with your MySQL password
echo "PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=cms_database
JWT_SECRET=secret123
JWT_EXPIRE=7d" > .env

npm run dev
```

Backend will start on **http://localhost:5000**

### 3. Frontend Setup (New Terminal)

```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

npm run dev
```

Frontend will start on **http://localhost:5173**

### 4. Login

Open **http://localhost:5173** and login:

- **Email:** admin@example.com  
- **Password:** admin123

## 📋 Commands Cheat Sheet

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production server
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📡 API Endpoints

**Health Check:** GET http://localhost:5000/api/health

**Authentication:**
- POST /api/auth/register - Register user
- POST /api/auth/login - Login user

**Articles:**
- GET /api/articles - Get all articles
- POST /api/articles - Create article (auth required)

**Categories:**
- GET /api/categories - Get all categories
- POST /api/categories - Create category (auth required)

## 🔑 Default Credentials

- Email: admin@example.com
- Password: admin123

## ⚠️ Troubleshooting

**Database Error?**
- Check MySQL is running
- Verify .env credentials
- Ensure database exists

**Port Error?**
- Change PORT in backend/.env
- Update VITE_API_URL in frontend/.env

**Connection Error?**
- Verify backend is running
- Check browser console for errors
- Ensure .env files are created

## 📚 Full Documentation

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

