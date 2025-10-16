import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articlesAPI } from '../api/articles';
import type { Article } from '../types';
import { useLanguage } from '../context/LanguageContext';
import ArticleCard from '../components/ArticleCard';
import Loading from '../components/Loading';

const Home = () => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articlesAPI.getAll({ limit: 6, status: 'published' });
        setArticles(data.articles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">{t('heroTitle')}</h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 px-4">
              {t('heroSubtitle')}
            </p>
            <div className="flex justify-center">
              <Link
                to="/articles"
                className="bg-white text-primary-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
              >
                {t('browseArticles')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{t('latestArticles')}</h2>
            <Link
              to="/articles"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base self-start sm:self-auto"
            >
              {t('viewAll')} →
            </Link>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 text-base sm:text-lg">{t('noArticles')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            {t('whyChoose')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{t('richContent')}</h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t('richContentDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{t('community')}</h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t('communityDesc')}
              </p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-primary-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{t('easyToUse')}</h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t('easyToUseDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

