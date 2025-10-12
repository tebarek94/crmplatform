import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriesAPI } from '../api/categories';
import type { Category } from '../types';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';

const Categories = () => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesAPI.getAll();
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">{t('categories')}</h1>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/articles?category=${category.slug}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                {category.description && (
                  <p className="text-gray-600 mb-4">{category.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.article_count} {t('articles')}
                  </span>
                  <span className="text-primary-600 font-medium">{t('viewAll')} →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;

