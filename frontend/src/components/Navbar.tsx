import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-primary-600">
            CMS Platform
          </Link>

          {/* Desktop Navigation */}
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

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {isAuthenticated && (
              <>
                <span className="text-gray-700 hidden lg:inline">{t('welcome')}, {user?.username}</span>
                {(user?.role === 'admin' || user?.role === 'editor' || user?.role === 'author') && (
                  <Link
                    to="/dashboard"
                    className="bg-primary-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-primary-700 transition text-sm sm:text-base"
                  >
                    {t('dashboard')}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
                >
                  {t('logout')}
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-primary-600 transition p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary-600 transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link 
                to="/articles" 
                className="text-gray-700 hover:text-primary-600 transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('articles')}
              </Link>
              <Link 
                to="/categories" 
                className="text-gray-700 hover:text-primary-600 transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('categories')}
              </Link>
              
              {isAuthenticated && (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="text-sm text-gray-500 mb-3">
                    {t('welcome')}, {user?.username}
                  </div>
                  {(user?.role === 'admin' || user?.role === 'editor' || user?.role === 'author') && (
                    <Link
                      to="/dashboard"
                      className="block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition mb-2 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('dashboard')}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

