import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { articlesAPI } from '../api/articles';
import { categoriesAPI } from '../api/categories';
import type { Category } from '../types';
import { useLanguage } from '../context/LanguageContext';
import AdminLayout from '../components/AdminLayout';
import { isValidImageUrl } from '../utils/imageUtils';

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
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState(false);
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
      setImagePreview(article.featured_image || '');
    } catch (error) {
      console.error('Failed to fetch article:', error);
      setError('Failed to load article');
    }
  };

  const handleImageChange = (url: string) => {
    setFeaturedImage(url);
    setImageError(false);
    
    if (isValidImageUrl(url)) {
      setImagePreview(url);
    } else {
      setImagePreview('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate featured image URL if provided
    if (featuredImage && !isValidImageUrl(featuredImage)) {
      setError('Please enter a valid image URL for the featured image');
      setLoading(false);
      return;
    }

    try {
      const articleData = {
        title,
        content,
        excerpt,
        category_id: parseInt(categoryId),
        status,
        language,
        featured_image: featuredImage.trim() || undefined,
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  featuredImage && !isValidImageUrl(featuredImage) 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300'
                }`}
                value={featuredImage}
                onChange={(e) => handleImageChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              
              {/* Image Preview */}
              {imagePreview && isValidImageUrl(imagePreview) && (
                <div className="mt-4">
                  <label className="block text-sm text-gray-600 mb-2">Preview:</label>
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Featured image preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      onError={() => setImageError(true)}
                      onLoad={() => setImageError(false)}
                    />
                    {imageError && (
                      <div className="absolute inset-0 bg-red-100 flex items-center justify-center rounded-lg">
                        <div className="text-center text-red-600">
                          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <p className="text-sm">Failed to load image</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Validation Messages */}
              {featuredImage && !isValidImageUrl(featuredImage) && (
                <p className="mt-2 text-sm text-red-600">
                  Please enter a valid image URL (e.g., https://example.com/image.jpg)
                </p>
              )}
              
              {/* Help Text */}
              <p className="mt-2 text-sm text-gray-500">
                Enter a valid image URL. The image will be displayed as the article cover.
              </p>
              
              {/* Sample Image URLs */}
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Quick sample URLs:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'https://picsum.photos/800/400?random=1',
                    'https://picsum.photos/800/400?random=2',
                    'https://picsum.photos/800/400?random=3',
                    'https://via.placeholder.com/800x400/6366f1/ffffff?text=Sample+Image'
                  ].map((url, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleImageChange(url)}
                      className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition"
                    >
                      Sample {index + 1}
                    </button>
                  ))}
                </div>
              </div>
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

