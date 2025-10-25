import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminAuth from './pages/AdminAuth';
import Dashboard from './pages/Dashboard';
import DashboardArticles from './pages/DashboardArticles';
import ArticleForm from './pages/ArticleForm';
import DashboardCategories from './pages/DashboardCategories';
import DashboardComments from './pages/DashboardComments';
import NotFound from './pages/NotFound';

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
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
          
          {/* Default redirect to dashboard */}
          <Route path="/" element={<AdminAuth />} />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;

