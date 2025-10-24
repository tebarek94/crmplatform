import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { articlesAPI } from '../api/articles';
import type { Article } from '../types';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';
import { isValidImageUrl, getDefaultPlaceholderImage } from '../utils/imageUtils';

const PublicArticleDetail = () => {
  const { t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError('');
        setImageError(false);
        const data = await articlesAPI.getById(slug);
        setArticle(data.article);
      } catch (err: any) {
        console.error('Error fetching article:', err);
        setError(err.response?.data?.error || 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('articleNotFound')}</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="text-primary-600 hover:text-primary-700"
          >
            ← {t('backToArticles')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={() => navigate(-1)}
            className="text-white/80 hover:text-white mb-6 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToArticles')}
          </button>

          {article.category_name && (
            <span className="inline-block bg-primary-500 text-white text-sm px-3 py-1 rounded-full mb-4">
              {article.category_name}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{article.author_name}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(article.created_at).toLocaleDateString()}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{article.views} {t('views')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-4 max-w-4xl -mt-8 mb-8">
        {isValidImageUrl(article.featured_image) && !imageError ? (
          <div className="relative group">
            <img
              src={article.featured_image!}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-105"
              onError={() => {
                console.log('Image failed to load:', article.featured_image);
                setImageError(true);
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', article.featured_image);
                setImageError(false);
              }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-transparent group-hover:bg-gray-900 transition-all duration-300 rounded-lg"></div>
          </div>
        ) : (
          <div className="w-full h-64 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden">
            {/* Try to show a placeholder image if possible */}
            {article.featured_image && !isValidImageUrl(article.featured_image) && (
              <div className="absolute inset-0">
                <img
                  src={getDefaultPlaceholderImage(article.title)}
                  alt={`Placeholder for ${article.title}`}
                  className="w-full h-full object-cover rounded-lg opacity-50"
                  onError={() => {
                    // If placeholder also fails, show the fallback UI
                  }}
                />
              </div>
            )}
            
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="20" cy="20" r="2" />
                <circle cx="80" cy="20" r="2" />
                <circle cx="20" cy="80" r="2" />
                <circle cx="80" cy="80" r="2" />
                <circle cx="50" cy="50" r="1" />
              </svg>
            </div>
            
            <div className="text-center text-gray-500 relative z-10">
              <svg className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-base md:text-lg font-medium">No Cover Image</p>
              <p className="text-xs md:text-sm opacity-75">This article doesn't have a featured image</p>
              
              {/* Debug info */}
              {import.meta.env.DEV && (
                <div className="mt-4 text-xs text-gray-400">
                  <p>Featured Image URL: {article.featured_image || 'null'}</p>
                  <p>Image Error: {imageError ? 'Yes' : 'No'}</p>
                  <p>Valid URL: {isValidImageUrl(article.featured_image) ? 'Yes' : 'No'}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 max-w-4xl pb-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {article.excerpt && (
            <p className="text-xl text-gray-600 mb-8 italic border-l-4 border-primary-500 pl-6">
              {article.excerpt}
            </p>
          )}

          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-800 leading-relaxed"
              style={{ whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{ 
                __html: article.content.replace(/\n/g, '<br />') 
              }}
            />
          </div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">{t('author')}: <strong>{article.author_name}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{article.views} {t('views')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            ← {t('backToArticles')}
          </button>
          <Link
            to="/"
            className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-medium text-center"
          >
            {t('home')}
          </Link>
        </div>
      </article>
    </div>
  );
};

export default PublicArticleDetail;

