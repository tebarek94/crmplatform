# Content Management System (CMS)

A full-stack Content Management System built with Express, TypeScript, PostgreSQL (backend) and React, TypeScript, Tailwind CSS (frontend).

## 🚀 Features

### Backend
- ✅ RESTful API with Express.js & TypeScript
- ✅ PostgreSQL database with proper schema design
- ✅ JWT authentication & authorization
- ✅ User roles (Admin, Editor, Author)
- ✅ Article management with categories
- ✅ Page management
- ✅ Search and filtering
- ✅ Input validation
- ✅ Security headers with Helmet
- ✅ CORS enabled

### Frontend
- ✅ Modern React 18 with TypeScript
- ✅ Tailwind CSS for styling
- ✅ React Router for navigation
- ✅ Authentication with JWT
- ✅ Protected routes
- ✅ Responsive design
- ✅ Article browsing and search
- ✅ Category filtering
- ✅ User dashboard

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd dawetolanbiay
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from env.example.txt)
echo PORT=5000 > .env
echo NODE_ENV=development >> .env
echo DB_HOST=localhost >> .env
echo DB_PORT=5432 >> .env
echo DB_USER=postgres >> .env
echo DB_PASSWORD=your_postgres_password >> .env
echo DB_NAME=cms_database >> .env
echo JWT_SECRET=your_super_secret_jwt_key >> .env
echo JWT_EXPIRE=7d >> .env

# Or manually create .env file with the above variables
```

### 3. Database Setup

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE cms_database;

# Connect to the database
\c cms_database

# Run the SQL script
\i src/utils/database.sql

# Or copy and paste the contents of database.sql into PostgreSQL
```

Alternatively, create the database manually:

```sql
CREATE DATABASE cms_database;
```

Then run the SQL commands from `backend/src/utils/database.sql`.

### 4. Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or build and run production
npm run build
npm start
```

The backend server will start on `http://localhost:5000`

### 5. Frontend Setup

```bash
# Open a new terminal
cd frontend

# Install dependencies
npm install

# Create .env file
echo VITE_API_URL=http://localhost:5000/api > .env

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |

### Article Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/articles` | Get all articles | No |
| GET | `/api/articles/:id` | Get article by ID/slug | No |
| POST | `/api/articles` | Create article | Yes (Author+) |
| PUT | `/api/articles/:id` | Update article | Yes (Owner/Editor/Admin) |
| DELETE | `/api/articles/:id` | Delete article | Yes (Owner/Admin) |

### Category Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/categories` | Get all categories | No |
| GET | `/api/categories/:id` | Get category by ID/slug | No |
| POST | `/api/categories` | Create category | Yes (Editor/Admin) |
| PUT | `/api/categories/:id` | Update category | Yes (Editor/Admin) |
| DELETE | `/api/categories/:id` | Delete category | Yes (Editor/Admin) |

### Page Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/pages` | Get all pages | No |
| GET | `/api/pages/:slug` | Get page by slug | No |
| POST | `/api/pages` | Create page | Yes (Editor/Admin) |
| PUT | `/api/pages/:id` | Update page | Yes (Editor/Admin) |
| DELETE | `/api/pages/:id` | Delete page | Yes (Editor/Admin) |

## 👤 Default Admin Credentials

After running the database migration, you can login with:

- **Email:** admin@example.com
- **Password:** admin123

⚠️ **Important:** Change the default admin password after first login!

## 🗂️ Project Structure

```
dawetolanbiay/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth & validation middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Helper functions
│   │   └── server.ts        # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── api/             # API service functions
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context
│   │   ├── pages/           # Page components
│   │   ├── types/           # TypeScript interfaces
│   │   ├── App.tsx          # Main app
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=cms_database

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Open browser to `http://localhost:5173`
3. Register a new account or use default admin credentials
4. Create articles, categories, and pages
5. Test the search and filter functionality

## 🚀 Deployment

This project is configured for deployment on [Render](https://render.com) with PostgreSQL database support.

### Prerequisites for Deployment

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **Neon Database**: Create a PostgreSQL database at [neon.tech](https://neon.tech) (or use any PostgreSQL provider)
3. **GitHub Repository**: Push your code to GitHub

### Deployment Steps

#### 1. Database Setup (Neon)

1. Go to [neon.tech](https://neon.tech) and create a new project
2. Copy the connection string (it looks like: `postgresql://username:password@hostname/database`)
3. Note down the individual connection parameters if needed

#### 2. Backend Deployment

1. **Connect Repository**: 
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**:
   - **Name**: `cms-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: `backend`

3. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   DATABASE_URL=your_neon_connection_string_here
   ```

4. **Advanced Settings**:
   - **Health Check Path**: `/api/health`
   - **Auto-Deploy**: Enable for automatic deployments

#### 3. Frontend Deployment

1. **Create Static Site**:
   - Go to Render Dashboard
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure Site**:
   - **Name**: `cms-frontend` (or your preferred name)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Root Directory**: `frontend`

3. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-service-name.onrender.com/api
   ```

#### 4. Database Migration

After deployment, you need to run the database migration:

1. **Option 1: Using Render Shell**:
   - Go to your backend service on Render
   - Click "Shell" tab
   - Run: `psql $DATABASE_URL -f src/utils/database.sql`

2. **Option 2: Using Neon Console**:
   - Go to your Neon project
   - Open the SQL Editor
   - Copy and paste the contents of `backend/src/utils/database.sql`

#### 5. Update Frontend API URL

Update the frontend environment variable with your actual backend URL:
```
VITE_API_URL=https://your-backend-service-name.onrender.com/api
```

### Using render.yaml (Recommended)

The project includes a `render.yaml` file for easy deployment. To use it:

1. **Update Database Connection**:
   - Edit `render.yaml`
   - Replace `YOUR_NEON_CONNECTION_STRING_HERE` with your actual Neon connection string

2. **Deploy via Render Dashboard**:
   - Go to Render Dashboard
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect and use the `render.yaml` configuration

### Post-Deployment

1. **Test the Application**:
   - Visit your frontend URL
   - Register a new account or use default admin credentials
   - Test creating articles, categories, and pages

2. **Default Admin Credentials**:
   - **Email**: admin@example.com
   - **Password**: admin123
   - ⚠️ **Important**: Change the default admin password after first login!

3. **Monitor Logs**:
   - Check Render logs for any errors
   - Monitor database connections
   - Verify health check endpoint is responding

### Troubleshooting Deployment

#### Common Issues:

1. **Database Connection Failed**:
   - Verify DATABASE_URL is correct
   - Check if database exists and is accessible
   - Ensure database migration has been run

2. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

3. **CORS Errors**:
   - Verify frontend VITE_API_URL matches backend URL
   - Check backend CORS configuration
   - Ensure both services are deployed and running

4. **Health Check Failures**:
   - Verify `/api/health` endpoint exists
   - Check backend service is running
   - Review backend logs for errors

### Environment Variables Reference

#### Backend (Production)
```env
NODE_ENV=production
PORT=10000
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
DATABASE_URL=postgresql://user:password@host:port/database
```

#### Frontend (Production)
```env
VITE_API_URL=https://your-backend-service.onrender.com/api
```

## 📝 Features to Implement (Future)

- [ ] Image upload functionality
- [ ] Rich text editor for articles
- [ ] Comments system
- [ ] Tags for articles
- [ ] User profile management
- [ ] Email notifications
- [ ] Social media sharing
- [ ] Article drafts auto-save
- [ ] Multi-language support
- [ ] SEO optimization
- [ ] Analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check database credentials in .env
- Ensure database exists and migration has been run

### Port Already in Use
- Change PORT in backend/.env
- Update VITE_API_URL in frontend/.env accordingly

### CORS Errors
- Verify backend is running
- Check API URL in frontend/.env
- Ensure CORS is enabled in backend

## 📧 Contact

For questions or support, please open an issue in the repository.

---

Built with ❤️ using Express, React, TypeScript, and Tailwind CSS

