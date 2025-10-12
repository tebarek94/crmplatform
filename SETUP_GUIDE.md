# CMS Setup Guide - Step by Step

This guide will walk you through setting up the CMS application from scratch.

## Prerequisites Check

Before starting, ensure you have:

- [ ] Node.js installed (v16+) - Check with: `node --version`
- [ ] MySQL installed and running - Check with: `mysql --version`
- [ ] npm installed - Check with: `npm --version`

## Step 1: Database Setup (5 minutes)

### 1.1 Start MySQL

**Windows:**
- Open Services and start MySQL service
- Or start MySQL from XAMPP/WAMP

**Mac/Linux:**
```bash
sudo mysql.server start
# or
sudo service mysql start
```

### 1.2 Create Database

```bash
# Login to MySQL
mysql -u root -p

# Enter your MySQL password when prompted
```

In MySQL console:

```sql
-- Create the database
CREATE DATABASE cms_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Verify it was created
SHOW DATABASES;

-- Exit MySQL
EXIT;
```

### 1.3 Run Database Migrations

**Option 1: Using MySQL command line**

```bash
mysql -u root -p cms_database < backend/src/utils/database.sql
```

**Option 2: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your database
3. Open `backend/src/utils/database.sql`
4. Execute the script

## Step 2: Backend Setup (5 minutes)

### 2.1 Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 2.2 Configure Environment Variables

Create a `.env` file in the `backend` directory:

**Windows PowerShell:**
```powershell
@"
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=cms_database

JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
"@ | Out-File -FilePath .env -Encoding utf8
```

**Mac/Linux/Git Bash:**
```bash
cat > .env << EOF
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=cms_database

JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
EOF
```

⚠️ **Important:** Replace `YOUR_MYSQL_PASSWORD_HERE` with your actual MySQL root password!

### 2.3 Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# You should see:
# ✅ Database connected successfully
# 🚀 CMS Backend Server Started!
# 📍 Server running on: http://localhost:5000
```

If successful, test the health check:
- Open browser to: http://localhost:5000/api/health
- You should see: `{"status":"OK","message":"CMS API is running"}`

**Keep this terminal window open!**

## Step 3: Frontend Setup (5 minutes)

### 3.1 Install Frontend Dependencies

**Open a NEW terminal window:**

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### 3.2 Configure Environment Variables

Create a `.env` file in the `frontend` directory:

**Windows PowerShell:**
```powershell
"VITE_API_URL=http://localhost:5000/api" | Out-File -FilePath .env -Encoding utf8
```

**Mac/Linux/Git Bash:**
```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### 3.3 Start Frontend Server

```bash
# Start development server
npm run dev

# You should see:
# VITE v5.x.x  ready in XXX ms
# ➜  Local:   http://localhost:5173/
```

## Step 4: Test the Application (5 minutes)

### 4.1 Open the Application

Open your browser to: **http://localhost:5173**

You should see the CMS home page!

### 4.2 Login with Default Admin Account

1. Click "Login" in the top right
2. Use these credentials:
   - **Email:** admin@example.com
   - **Password:** admin123
3. Click "Sign in"

You should be redirected to the dashboard!

### 4.3 Test Creating Content

1. From dashboard, click "My Articles"
2. Click "+ New Article"
3. Fill in the form and save
4. View your article on the home page

## Common Issues & Solutions

### Issue: "Database connection failed"

**Solution:**
1. Verify MySQL is running
2. Check database credentials in `backend/.env`
3. Ensure database `cms_database` exists
4. Test connection: `mysql -u root -p cms_database`

### Issue: "Port 5000 already in use"

**Solution:**
1. Change PORT in `backend/.env` to 5001 (or any free port)
2. Update `frontend/.env`: `VITE_API_URL=http://localhost:5001/api`
3. Restart both servers

### Issue: "Cannot find module" errors

**Solution:**
```bash
# In backend directory
rm -rf node_modules
npm install

# In frontend directory  
rm -rf node_modules
npm install
```

### Issue: Frontend can't connect to backend (CORS errors)

**Solution:**
1. Verify backend is running on port 5000
2. Check `frontend/.env` has correct API URL
3. Clear browser cache and reload

### Issue: "npm ERR! code ELIFECYCLE"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## Verification Checklist

After setup, verify these work:

- [ ] Backend server starts without errors
- [ ] Database connection successful
- [ ] Health check endpoint works: http://localhost:5000/api/health
- [ ] Frontend server starts without errors
- [ ] Home page loads at http://localhost:5173
- [ ] Can login with admin credentials
- [ ] Dashboard is accessible
- [ ] Can create a test article
- [ ] Articles display on home page

## Next Steps

1. **Change Admin Password**
   - Login and update the default admin password

2. **Create Content**
   - Add categories
   - Write articles
   - Create pages

3. **Customize**
   - Update colors in `frontend/tailwind.config.js`
   - Modify branding in components
   - Add your own content

## Development Workflow

### Starting the Application

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Stopping the Application

Press `Ctrl + C` in both terminal windows.

### Making Changes

- Backend changes will auto-reload (nodemon)
- Frontend changes will auto-reload (Vite HMR)
- Database changes require manual migration

## Production Deployment

For production deployment:

1. **Backend:**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm run build
   # Deploy the 'dist' folder to your hosting
   ```

3. Update environment variables for production
4. Use a proper MySQL server (not localhost)
5. Enable HTTPS
6. Set up proper security measures

## Need Help?

If you encounter issues:

1. Check the terminal output for error messages
2. Review the `.env` files for correct configuration
3. Verify MySQL is running and accessible
4. Check that ports 5000 and 5173 are available
5. Review the troubleshooting section above

---

🎉 **Congratulations!** You've successfully set up the CMS application!

