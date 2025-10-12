import { Link } from 'react-router-dom';
import type { Article } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {article.featured_image && (
        <img
          src={article.featured_image}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{article.category_name}</span>
          <span className="mx-2">•</span>
          <span>{new Date(article.created_at).toLocaleDateString()}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-primary-600">
          <Link to={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>
        {article.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{t('author')}: {article.author_name}</span>
          <Link
            to={`/articles/${article.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {t('readMore')} →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

