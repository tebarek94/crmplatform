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
          className="w-full h-40 sm:h-48 object-cover"
        />
      )}
      <div className="p-4 sm:p-6">
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2">
          <span className="truncate">{article.category_name}</span>
          <span className="mx-2 flex-shrink-0">•</span>
          <span className="flex-shrink-0">{new Date(article.created_at).toLocaleDateString()}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 hover:text-primary-600 line-clamp-2">
          <Link to={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>
        {article.excerpt && (
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">{article.excerpt}</p>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <span className="text-xs sm:text-sm text-gray-500 truncate">{t('author')}: {article.author_name}</span>
          <Link
            to={`/articles/${article.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base self-start sm:self-auto"
          >
            {t('readMore')} →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

