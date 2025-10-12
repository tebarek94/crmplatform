import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { articlesAPI } from '../api/articles';
import AdminLayout from '../components/AdminLayout';
import DashboardStats from '../components/DashboardStats';
import type { Article } from '../types';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await articlesAPI.getAll({ limit: 50 });
      setArticles(data.articles);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalArticles: articles.length,
    publishedArticles: articles.filter(a => a.status === 'published').length,
    draftArticles: articles.filter(a => a.status === 'draft').length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
  };

  return (
    <AdminLayout>
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold mb-2">
          {t('welcome')}, {user?.username}!
        </h2>
        <p className="text-white/90">
          Role: <span className="font-semibold capitalize">{user?.role}</span> • {user?.email}
        </p>
      </div>

      {/* Stats Grid */}
      {!loading && (
        <DashboardStats
          totalArticles={stats.totalArticles}
          publishedArticles={stats.publishedArticles}
          draftArticles={stats.draftArticles}
          totalViews={stats.totalViews}
        />
      )}

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/dashboard/articles"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{t('myArticles')}</h3>
          <p className="text-gray-600">{t('manageArticles')}</p>
          <div className="mt-4 flex items-center text-primary-600 font-medium">
            <span>Go to Articles</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {(user?.role === 'admin' || user?.role === 'editor') && (
          <>
            <Link
              to="/dashboard/categories"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('categories')}</h3>
              <p className="text-gray-600">{t('manageCategories')}</p>
              <div className="mt-4 flex items-center text-green-600 font-medium">
                <span>Manage Categories</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              to="/"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">View Public Site</h3>
              <p className="text-gray-600">See how your content looks to visitors</p>
              <div className="mt-4 flex items-center text-purple-600 font-medium">
                <span>Open Site</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </Link>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

