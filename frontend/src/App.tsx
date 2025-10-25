import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import PublicNavbar from './components/PublicNavbar';
import Footer from './components/Footer';
import PublicHome from './pages/PublicHome';
import ViewArticle from './pages/ViewArticle';
import Articles from './pages/Articles';
import Categories from './pages/Categories';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicHome />} />
              <Route path="/article/:slug" element={<ViewArticle />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ViewArticle />} />
              <Route path="/categories" element={<Categories />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              
              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
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
