import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <div className="mb-8">
          <svg className="w-32 h-32 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-4">{t('articleNotFound')}</h2>
        <p className="text-gray-600 mb-8 text-lg">
          {t('noResults')}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-medium"
          >
            {t('home')}
          </Link>
          <Link
            to="/articles"
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            {t('browseArticles')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

