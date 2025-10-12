import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            CMS Platform
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
              {t('home')}
            </Link>
            <Link to="/articles" className="text-gray-700 hover:text-primary-600 transition">
              {t('articles')}
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-primary-600 transition">
              {t('categories')}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 hidden lg:inline">{t('welcome')}, {user?.username}</span>
                {(user?.role === 'admin' || user?.role === 'editor' || user?.role === 'author') && (
                  <Link
                    to="/dashboard"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                  >
                    {t('dashboard')}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

