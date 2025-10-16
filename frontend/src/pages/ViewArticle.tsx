import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articlesAPI } from '../api/articles';
import type { Article } from '../types';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';
import CommentSection from '../components/CommentSection';

const ViewArticle = () => {
  const { t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await articlesAPI.getById(slug);
        setArticle(data.article);
      } catch (err: any) {
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg className="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('articleNotFound')}</h2>
          <p className="text-gray-600 mb-8">{error || t('noResults')}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-medium"
          >
            ← {t('home')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={() => navigate('/')}
            className="text-white/90 hover:text-white mb-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToArticles')}
          </button>

          {article.category_name && (
            <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full mb-4">
              {article.category_name}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{article.author_name}</span>
            </div>
            <span>•</span>
            <span>{new Date(article.created_at).toLocaleDateString()}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
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
      {article.featured_image && (
        <div className="container mx-auto px-4 max-w-4xl -mt-8">
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg shadow-2xl"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          {/* Excerpt */}
          {article.excerpt && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed">
                "{article.excerpt}"
              </p>
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed text-lg"
              style={{ 
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                lineHeight: '1.8'
              }}
            >
              {article.content}
            </div>
          </div>

          {/* Author Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('author')}</p>
                  <p className="font-bold text-gray-800">{article.author_name}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">{t('date')}</p>
                <p className="font-medium text-gray-800">{new Date(article.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-700 font-medium mb-4">{t('shareArticle')}:</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert(t('linkCopied'));
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">{t('copyLink')}</span>
              </button>
              
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm">Facebook</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                <span className="text-sm">Twitter</span>
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-300 transition font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToArticles')}
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-primary-600 text-white px-6 py-4 rounded-lg hover:bg-primary-700 transition font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {t('home')}
          </button>
        </div>

        {/* Comment Section */}
        <CommentSection articleId={article.id} />
      </article>
    </div>
  );
};

export default ViewArticle;
