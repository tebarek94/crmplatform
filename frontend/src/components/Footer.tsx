import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CMS Platform</h3>
            <p className="text-gray-400">
              {t('heroSubtitle')}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition">
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="/articles" className="text-gray-400 hover:text-white transition">
                  {t('articles')}
                </a>
              </li>
              <li>
                <a href="/categories" className="text-gray-400 hover:text-white transition">
                  {t('categories')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
            <p className="text-gray-400">Email: info@cmsplatform.com</p>
            <p className="text-gray-400">Phone: +1 234 567 8900</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CMS Platform. {t('allRightsReserved')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

