import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const PublicNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="text-xl sm:text-2xl font-bold text-primary-600 flex items-center gap-2">
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            <span className="hidden sm:inline">CMS Platform</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition font-medium">
              {t('home')}
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-primary-600 transition font-medium">
              {t('categories')}
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Welcome, {user?.username}
                </span>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="btn-responsive-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-responsive-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium hidden sm:inline-flex"
              >
                {t('login')}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-700 hover:text-primary-600 transition p-2"
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
          <div className="md:hidden border-t border-gray-200 py-4 animate-responsive-slide-down">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary-600 transition py-2 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link 
                to="/categories" 
                className="text-gray-700 hover:text-primary-600 transition py-2 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('categories')}
              </Link>
              
              {isAuthenticated ? (
                <div className="border-t border-gray-200 pt-3 mt-3 px-4">
                  <div className="text-sm text-gray-600 mb-2 text-center">
                    Welcome, {user?.username}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-center w-full"
                  >
                    {t('logout')}
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-3 mt-3 px-4">
                  <Link
                    to="/login"
                    className="block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNavbar;

