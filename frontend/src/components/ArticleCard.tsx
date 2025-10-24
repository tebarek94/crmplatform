import { Link } from 'react-router-dom';
import type { Article } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const { t } = useLanguage();
  return (
    <div className="card-responsive-hover overflow-hidden">
      {article.featured_image && (
        <img
          src={article.featured_image}
          alt={article.title}
          className="img-responsive-video"
        />
      )}
      <div className="p-responsive-sm">
        <div className="flex items-center text-responsive-xs text-gray-500 mb-2">
          <span className="truncate">{article.category_name}</span>
          <span className="mx-2 flex-shrink-0">•</span>
          <span className="flex-shrink-0">{new Date(article.created_at).toLocaleDateString()}</span>
        </div>
        <h3 className="text-responsive-lg font-bold text-gray-800 mb-2 hover:text-primary-600 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          <Link to={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>
        {article.excerpt && (
          <p className="text-responsive-sm text-gray-600 mb-3 sm:mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{article.excerpt}</p>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-responsive-sm">
          <span className="text-responsive-xs text-gray-500 truncate">{t('author')}: {article.author_name}</span>
          <Link
            to={`/articles/${article.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-responsive-sm self-start sm:self-auto"
          >
            {t('readMore')} →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

