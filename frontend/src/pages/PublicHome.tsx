import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articlesAPI } from '../api/articles';
import { categoriesAPI } from '../api/categories';
import type { Article, Category } from '../types';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';

const PublicHome = () => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, [page, selectedCategory, searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await articlesAPI.getAll({
        page,
        limit: 12,
        status: 'published',
        category: selectedCategory,
        search: searchTerm,
      });
      setArticles(data.articles);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoriesAPI.getAll();
      setCategories(data.categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug === selectedCategory ? '' : slug);
    setPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  if (loading && page === 1) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 sm:py-16 lg:py-20">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-responsive-4xl font-bold mb-4 sm:mb-6">{t('heroTitle')}</h1>
            <p className="text-responsive-lg mb-6 sm:mb-8">{t('heroSubtitle')}</p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                  type="text"
                  placeholder={t('searchArticles')}
                  className="flex-1 input-responsive text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn-responsive-md bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  {t('search')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bg-white shadow-md py-3 sm:py-4 sticky top-0 z-10">
        <div className="container-responsive">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => handleCategoryClick('')}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full whitespace-nowrap transition text-sm sm:text-base ${
                selectedCategory === ''
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('allCategories')}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full whitespace-nowrap transition text-sm sm:text-base ${
                  selectedCategory === category.slug
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="hidden sm:inline">{category.name} ({category.article_count})</span>
                <span className="sm:hidden">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-8 sm:py-12">
        <div className="container-responsive">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : articles.length > 0 ? (
            <>
              <div className="grid-responsive-3 gap-responsive-md mb-6 sm:mb-8">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/article/${article.slug}`}
                    className="card-responsive-hover overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
                  >
                    {article.featured_image ? (
                      <img
                        src={article.featured_image}
                        alt={article.title}
                        className="img-responsive-video"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="p-responsive-sm">
                      {article.category_name && (
                        <span className="inline-block bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full mb-2">
                          {article.category_name}
                        </span>
                      )}
                      <h3 className="text-responsive-base font-bold text-gray-800 mb-2 hover:text-primary-600 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-gray-600 text-responsive-sm mb-3 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{article.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="truncate">{article.author_name}</span>
                        <span className="flex-shrink-0">{article.views} {t('views')}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {new Date(article.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-center items-center gap-responsive-sm">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="btn-responsive-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <span className="hidden sm:inline">← Previous</span>
                    <span className="sm:hidden">← Prev</span>
                  </button>
                  
                  <div className="flex gap-1 overflow-x-auto">
                    {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                      const pageNum = idx + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition text-sm sm:text-base ${
                            page === pageNum
                              ? 'bg-primary-600 text-white'
                              : 'bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="btn-responsive-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <span className="hidden sm:inline">Next →</span>
                    <span className="sm:hidden">Next →</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-xl">{t('noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PublicHome;

