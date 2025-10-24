# PostgreSQL Migration Guide

## Steps to Complete Migration

### 1. Install Dependencies
```bash
cd backend
npm install pg @types/pg
npm uninstall mysql2 @types/mysql2
```

### 2. Database Setup
- Create PostgreSQL database
- Run the schema from `src/utils/database_postgres.sql`

### 3. Environment Variables
Update your `.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=cms_database
```

### 4. Key Changes Made
- ✅ Updated package.json (replaced mysql2 with pg)
- ✅ Updated database.ts configuration
- ✅ Created PostgreSQL schema
- ✅ Updated render.yaml for PostgreSQL
- ✅ Updated env.example.txt
- ✅ Updated server.ts error message

### 5. Remaining Manual Updates Needed

#### Controller Files Need Updates:
1. **articleController.ts** - Partially updated, needs completion
2. **categoryController.ts** - Needs full update
3. **commentController.ts** - Needs full update  
4. **pageController.ts** - Needs full update

#### Query Pattern Changes:
- Replace `const [result] = await pool.query<RowDataPacket[]>(...)` 
- With `const result = await pool.query(...); const data = result.rows;`
- Replace `?` placeholders with `$1, $2, $3...`
- Replace `LIKE` with `ILIKE` for case-insensitive search
- Replace `insertId` with `RETURNING id` and `result.rows[0].id`

### 6. Testing
After completing all updates:
1. Install dependencies: `npm install`
2. Set up PostgreSQL database
3. Run schema: `psql -d cms_database -f src/utils/database_postgres.sql`
4. Test connection: `npm run dev`
