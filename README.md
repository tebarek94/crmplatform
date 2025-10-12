# Content Management System (CMS)

A full-stack Content Management System built with Express, TypeScript, MySQL (backend) and React, TypeScript, Tailwind CSS (frontend).

## 🚀 Features

### Backend
- ✅ RESTful API with Express.js & TypeScript
- ✅ MySQL database with proper schema design
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
- MySQL (v8 or higher)
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
echo DB_PORT=3306 >> .env
echo DB_USER=root >> .env
echo DB_PASSWORD=your_mysql_password >> .env
echo DB_NAME=cms_database >> .env
echo JWT_SECRET=your_super_secret_jwt_key >> .env
echo JWT_EXPIRE=7d >> .env

# Or manually create .env file with the above variables
```

### 3. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Run the SQL script
source src/utils/database.sql

# Or copy and paste the contents of database.sql into MySQL
```

Alternatively, create the database manually:

```sql
CREATE DATABASE cms_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
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
DB_PORT=3306
DB_USER=root
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
- Verify MySQL is running
- Check database credentials in .env
- Ensure database exists

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

