import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { articlesAPI } from '../api/articles';
import { categoriesAPI } from '../api/categories';
import type { Category } from '../types';
import { useLanguage } from '../context/LanguageContext';
import AdminLayout from '../components/AdminLayout';

const ArticleForm = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [language, setLanguage] = useState('en');
  const [featuredImage, setFeaturedImage] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchArticle();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const data = await categoriesAPI.getAll();
      setCategories(data.categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchArticle = async () => {
    try {
      const data = await articlesAPI.getById(id!);
      const article = data.article;
      setTitle(article.title);
      setContent(article.content);
      setExcerpt(article.excerpt || '');
      setCategoryId(article.category_id.toString());
      setStatus(article.status as 'draft' | 'published');
      setLanguage(article.language);
      setFeaturedImage(article.featured_image || '');
    } catch (error) {
      console.error('Failed to fetch article:', error);
      setError('Failed to load article');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const articleData = {
        title,
        content,
        excerpt,
        category_id: parseInt(categoryId),
        status,
        language,
        featured_image: featuredImage || undefined,
      };

      if (isEdit) {
        await articlesAPI.update(id!, articleData);
      } else {
        await articlesAPI.create(articleData);
      }

      navigate('/dashboard/articles');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {isEdit ? t('editArticle') : t('createArticle')}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">{t('title')} *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('title')}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">{t('excerpt')}</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder={t('excerpt')}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">{t('content')} *</label>
            <textarea
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={15}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('content')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">{t('category')} *</label>
              <select
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">{t('category')}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">{t('status')} *</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              >
                <option value="draft">{t('draft')}</option>
                <option value="published">{t('published')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">{t('language')}</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="en"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">{t('featuredImage')}</label>
              <input
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {loading ? `${t('loading')}...` : isEdit ? t('updateArticle') : t('createArticle')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/articles')}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              {t('cancel')}
            </button>
        </div>
      </form>
      </div>
    </AdminLayout>
  );
};

export default ArticleForm;

