import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const PublicNavbar = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600 flex items-center gap-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            <span className="hidden sm:inline">CMS Platform</span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition font-medium">
              {t('home')}
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-primary-600 transition font-medium">
              {t('categories')}
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
              >
                {t('dashboard')}
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
              >
                {t('login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;

