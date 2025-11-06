import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { testConnection } from "./config/database";
import routes from "./routes";
import { errorHandler, notFound } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - MUST be before other middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://blogbackend-s6k5.onrender.com",
  "https://blogadminside.onrender.com",
];

// Add any additional origins from environment variable
if (process.env.ALLOWED_ORIGINS) {
  const additionalOrigins = process.env.ALLOWED_ORIGINS.split(",").map(
    (origin) => origin.trim()
  );
  allowedOrigins.push(...additionalOrigins);
}

// Create CORS options object
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`🚫 CORS blocked request from origin: ${origin}`);
      console.log(`✅ Allowed origins: ${allowedOrigins.join(", ")}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: false, // Match frontend withCredentials: false
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Configure Helmet to not interfere with CORS
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

// Parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use("/api", routes);

// Root endpoint
app.get("/", (_req, res) => {
  res.json({
    message: "CMS Backend API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      articles: "/api/articles",
      categories: "/api/categories",
      pages: "/api/pages",
      comments: "/api/comments",
    },
  });
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();

    if (!dbConnected) {
      console.error(
        "⚠️  Failed to connect to database. Please check your configuration."
      );
      console.log(
        "💡 Make sure PostgreSQL is running and credentials in .env are correct"
      );
    }

    app.listen(PORT, () => {
      console.log("\n🚀 CMS Backend Server Started!");
      console.log(`📍 Server running on: http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(
        `💾 Database: ${dbConnected ? "Connected ✅" : "Not Connected ❌"}`
      );
      console.log("\n📚 Available endpoints:");
      console.log(`   - GET  /api/health - Health check`);
      console.log(`   - POST /api/auth/register - Register user`);
      console.log(`   - POST /api/auth/login - Login user`);
      console.log(`   - GET  /api/articles - Get all articles`);
      console.log(`   - GET  /api/categories - Get all categories`);
      console.log(`   - GET  /api/pages - Get all pages`);
      console.log(
        `   - GET  /api/comments/article/:id - Get comments for article`
      );
      console.log(`   - POST /api/comments - Create comment`);
      console.log("\n👤 Default admin credentials:");
      console.log("   Email: admin@example.com");
      console.log("   Password: admin123");
      console.log("\n");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Start the server
startServer();

export default app;
