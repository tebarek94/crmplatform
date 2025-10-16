import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">CMS Platform</h3>
            <p className="text-sm sm:text-base text-gray-400">
              {t('heroSubtitle')}
            </p>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm sm:text-base text-gray-400 hover:text-white transition">
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="/articles" className="text-sm sm:text-base text-gray-400 hover:text-white transition">
                  {t('articles')}
                </a>
              </li>
              <li>
                <a href="/categories" className="text-sm sm:text-base text-gray-400 hover:text-white transition">
                  {t('categories')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('contact')}</h4>
            <p className="text-sm sm:text-base text-gray-400">Email: info@cmsplatform.com</p>
            <p className="text-sm sm:text-base text-gray-400">Phone: +1 234 567 8900</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
          <p className="text-xs sm:text-sm">&copy; 2025 CMS Platform. {t('allRightsReserved')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

