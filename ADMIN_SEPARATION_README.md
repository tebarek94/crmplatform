# Admin and Frontend Separation

## Structure Overview

Your project has been reorganized with separate admin and public frontend folders:

```
dawetolanbiay/
├── backend/          # Public API (articles, categories, comments for public viewing)
├── backend/admin/    # Admin API (admin-only operations)
├── frontend/         # Public-facing website
├── admin/            # Admin dashboard application
└── README.md
```

## What Has Been Done

### 1. Admin Frontend Created (`/admin/`)
A new separate admin application has been created with:
- **Location**: `admin/` folder at project root
- **Structure**: Same as frontend (Vite + React + TypeScript + Tailwind)
- **Contains**:
  - Admin authentication page (`AdminAuth.tsx`)
  - Dashboard pages (Dashboard, Articles, Categories, Comments)
  - Article form for creating/editing
  - Protected routes with authentication
  - Admin-specific components (AdminLayout, DashboardStats)
  - Complete API client setup

### 2. Frontend Cleaned (`/frontend/`)
The public frontend has been cleaned:
- **Removed**: All admin/dashboard routes and pages
- **Removed**: Admin authentication
- **Removed**: Protected routes
- **Kept**: Only public pages (Home, Articles, Categories, View Article)
- **Simplified**: App.tsx now only has public routes

### 3. Backend Admin Folder Created (`/backend/admin/`)
A separate backend admin folder structure has been created:
- **Location**: `backend/admin/` 
- **Structure**: Same structure as main backend
- **Ready for**: Admin-specific API endpoints and middleware

## Next Steps to Complete Setup

### 1. Install Dependencies for Admin Frontend
```bash
cd admin
npm install
```

### 2. Install Dependencies for Admin Backend
```bash
cd backend/admin
npm install
```

### 3. Configure Admin Frontend
- Copy `admin/env.example.txt` to `admin/.env`
- Set API URL (different port for admin API)
```
VITE_API_URL=http://localhost:5001
```

### 4. Configure Admin Backend
You need to:
- Copy backend controllers/routes to `backend/admin/src/`
- Modify to use admin-specific port (e.g., 5001)
- Add admin-specific middleware and authentication
- Create separate admin server.ts

### 5. Update Backend Package.json Scripts
Add separate scripts for admin backend:
```json
{
  "scripts": {
    "dev:admin": "nodemon admin/src/server.ts",
    "build:admin": "tsc --project admin/tsconfig.json"
  }
}
```

### 6. Run the Applications

**Public Frontend:**
```bash
cd frontend
npm run dev  # Runs on http://localhost:5173
```

**Admin Dashboard:**
```bash
cd admin
npm run dev  # Runs on http://localhost:5174 (or another port)
```

**Public Backend:**
```bash
cd backend
npm run dev  # Runs on http://localhost:5000
```

**Admin Backend:**
```bash
cd backend/admin
npm run dev  # Runs on http://localhost:5001
```

## File Organization

### Admin Application (`/admin/src/`)
```
admin/src/
├── pages/
│   ├── AdminAuth.tsx           # Admin login/register
│   ├── Dashboard.tsx           # Main dashboard
│   ├── DashboardArticles.tsx   # Article management
│   ├── DashboardCategories.tsx # Category management
│   ├── DashboardComments.tsx   # Comment moderation
│   ├── ArticleForm.tsx         # Create/edit articles
│   └── NotFound.tsx
├── components/
│   ├── AdminLayout.tsx         # Admin layout wrapper
│   ├── DashboardStats.tsx      # Dashboard statistics
│   └── ProtectedRoute.tsx      # Auth guard
├── context/
│   ├── AuthContext.tsx         # Authentication state
│   └── LanguageContext.tsx     # i18n support
├── api/                        # API client functions
├── App.tsx                     # Admin routing
└── main.tsx                    # Entry point
```

### Public Frontend (`/frontend/src/`)
```
frontend/src/
├── pages/
│   ├── PublicHome.tsx          # Public homepage
│   ├── Articles.tsx            # Article listing
│   ├── Categories.tsx          # Category listing
│   ├── ViewArticle.tsx         # Single article view
│   └── NotFound.tsx
├── components/
│   ├── PublicNavbar.tsx        # Public navigation
│   ├── Footer.tsx              # Footer
│   └── ...
├── App.tsx                     # Public routing (NO admin routes)
└── main.tsx                    # Entry point
```

## Benefits of This Separation

1. **Security**: Admin code is completely separate from public code
2. **Performance**: Public site doesn't load admin code
3. **Deployment**: Can deploy admin and public separately
4. **Development**: Teams can work independently
5. **Maintenance**: Easier to manage and update each part

## Access URLs

Once configured:
- **Public Website**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5174
- **Public API**: http://localhost:5000/api
- **Admin API**: http://localhost:5001/api/admin

## Important Notes

- The admin and frontend are now COMPLETELY SEPARATE applications
- They each need their own `npm install` and `npm run dev`
- They each connect to their own backend API endpoints
- Admin routes are NO LONGER in the public frontend
- Public users CANNOT access admin features

## What You Need to Do

1. Run `npm install` in both `admin/` and `backend/admin/` folders
2. Copy the backend source files to `backend/admin/src/` and modify server.ts to use a different port
3. Update API endpoints to separate public vs admin operations
4. Test both applications separately

Your admin and public frontends are now properly separated!


