import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articlesAPI } from '../api/articles';
import type { Article } from '../types';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';

const ArticleDetail = () => {
  const { t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('articleNotFound')}</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/articles" className="text-primary-600 hover:text-primary-700">
            ← {t('backToArticles')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="container mx-auto px-4 max-w-4xl">
        <Link to="/articles" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
          ← {t('backToArticles')}
        </Link>

        {article.featured_image && (
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
          />
        )}

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              {article.category_name && (
                <>
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                    {article.category_name}
                  </span>
                  <span className="mx-2">•</span>
                </>
              )}
              <span>{new Date(article.created_at).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{article.views} {t('views')}</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">{article.title}</h1>

            <div className="flex items-center text-gray-600">
              <span>{t('author')}: {article.author_name}</span>
            </div>
          </div>

          {article.excerpt && (
            <p className="text-xl text-gray-600 mb-6 italic">{article.excerpt}</p>
          )}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;

