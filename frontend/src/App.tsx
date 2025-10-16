import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import PublicNavbar from './components/PublicNavbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import PublicHome from './pages/PublicHome';
import ViewArticle from './pages/ViewArticle';
import AdminAuth from './pages/AdminAuth';
import Articles from './pages/Articles';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';
import DashboardArticles from './pages/DashboardArticles';
import ArticleForm from './pages/ArticleForm';
import DashboardCategories from './pages/DashboardCategories';
import DashboardComments from './pages/DashboardComments';
import NotFound from './pages/NotFound';

function AppContent() {
  const location = useLocation();
  const isPublicPage = ['/', '/categories'].includes(location.pathname) || 
                       location.pathname.startsWith('/article/') ||
                       (location.pathname.startsWith('/articles/') && location.pathname !== '/articles');
  
  const isDashboardPage = location.pathname.startsWith('/dashboard');
  
  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboardPage && (isPublicPage ? <PublicNavbar /> : <Navbar />)}
          <main className="flex-grow">
            <Routes>
              {/* Public Routes - No Login Required */}
              <Route path="/" element={<PublicHome />} />
              <Route path="/article/:slug" element={<ViewArticle />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ViewArticle />} />
              <Route path="/categories" element={<Categories />} />
              
              {/* Admin Auth Route */}
              <Route path="/admin-auth" element={<AdminAuth />} />
              
              {/* Protected Routes */}
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
          {!isDashboardPage && <Footer />}
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
