import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import AdminAuth from './pages/AdminAuth';
import Dashboard from './pages/Dashboard';
import DashboardArticles from './pages/DashboardArticles';
import ArticleForm from './pages/ArticleForm';
import DashboardCategories from './pages/DashboardCategories';
import DashboardComments from './pages/DashboardComments';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';

// Component to handle root path redirects based on auth status
function RootRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/admin-auth" replace />;
}

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          {/* Root path - redirect based on auth status */}
          <Route path="/" element={<RootRedirect />} />
          
          {/* Admin Auth Route */}
          <Route path="/admin-auth" element={<AdminAuth />} />
          
          {/* Protected Admin Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/articles"
            element={
              <ProtectedRoute>
                <DashboardArticles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/articles/new"
            element={
              <ProtectedRoute>
                <ArticleForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/articles/edit/:id"
            element={
              <ProtectedRoute>
                <ArticleForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/categories"
            element={
              <ProtectedRoute requiredRoles={['admin', 'editor']}>
                <DashboardCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/comments"
            element={
              <ProtectedRoute requiredRoles={['admin', 'editor']}>
                <DashboardComments />
              </ProtectedRoute>
            }
          />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;

