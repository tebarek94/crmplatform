# Multi-Language Support Guide

## 🌍 Supported Languages

The CMS now supports **4 languages**:

1. **English** (`en`)
2. **አማርኛ - Amharic** (`am`)
3. **Afaan Oromoo** (`om`)
4. **ትግርኛ - Tigrinya** (`ti`)

## ✨ Features

### User Interface Translation
- ✅ Navbar (Home, Articles, Categories, Login, Register, etc.)
- ✅ Home page (Hero section, Features, Call-to-action)
- ✅ Authentication pages (Login, Register)
- ✅ Dashboard (My Articles, Categories, Quick Actions)
- ✅ Article Management (Create, Edit, Delete)
- ✅ Category Management
- ✅ Search & Filter
- ✅ Footer
- ✅ Error messages and notifications

### Language Switcher
- Beautiful dropdown menu in the navbar
- Shows native language names
- Persistent language selection (saved in localStorage)
- Easy one-click language switching

## 🚀 How to Use

### For Users:

1. Click the **language icon** (🌐) in the navbar
2. Select your preferred language from the dropdown:
   - English
   - አማርኛ (Amharic)
   - Afaan Oromoo
   - ትግርኛ (Tigrinya)
3. The entire interface will instantly switch to your selected language
4. Your preference is saved and will be remembered on your next visit

### For Content Creators:

When creating articles, you can:
1. Set the **language** field to specify the content language
2. Create content in any of the supported languages
3. Users can filter articles by language
4. Multi-language content management

## 📁 Implementation Details

### File Structure
```
frontend/src/
├── i18n/
│   └── translations.ts          # All translations
├── context/
│   └── LanguageContext.tsx      # Language state management
└── components/
    └── LanguageSwitcher.tsx     # Language selector component
```

### How It Works

#### 1. Translation System
All UI text is stored in `translations.ts`:
```typescript
export const translations = {
  en: { home: 'Home', articles: 'Articles', ... },
  am: { home: 'ዋና ገጽ', articles: 'ጽሑፎች', ... },
  om: { home: 'Fuula Jalqabaa', articles: 'Barruulee', ... },
  ti: { home: 'ቤት', articles: 'ጽሑፋት', ... },
};
```

#### 2. Language Context
Manages the current language state:
```typescript
const { language, setLanguage, t } = useLanguage();
```

#### 3. Using Translations
In any component:
```tsx
import { useLanguage } from '../context/LanguageContext';

const MyComponent = () => {
  const { t } = useLanguage();
  
  return <h1>{t('home')}</h1>; // Shows "Home", "ዋና ገጽ", etc.
};
```

## 🔧 Adding New Translations

To add translations for new UI elements:

1. Open `frontend/src/i18n/translations.ts`
2. Add the new key to ALL languages:

```typescript
export const translations = {
  en: {
    // ... existing translations
    myNewKey: 'My New Text',
  },
  am: {
    // ... existing translations
    myNewKey: 'የእኔ አዲስ ጽሑፍ',
  },
  om: {
    // ... existing translations
    myNewKey: 'Barruu Haaraa Koo',
  },
  ti: {
    // ... existing translations
    myNewKey: 'ሓድሽ ጽሑፈይ',
  },
};
```

3. Use it in your component:
```tsx
{t('myNewKey')}
```

## 🌐 Adding More Languages

To add a new language (e.g., Somali):

1. Update `translations.ts`:
```typescript
export const translations = {
  // ... existing languages
  so: {
    home: 'Guriga',
    articles: 'Maqaalada',
    // ... add all translations
  },
};

export type Language = 'en' | 'am' | 'om' | 'ti' | 'so';
```

2. Update `LanguageSwitcher.tsx`:
```typescript
const languages = [
  // ... existing languages
  { code: 'so', name: 'Somali', nativeName: 'Soomaali' },
];
```

3. Update the backend to support the new language in articles

## 📊 Database Language Support

Articles in the database have a `language` field:
- Default: `'en'`
- Can be set to: `'en'`, `'am'`, `'om'`, `'ti'`
- Users can filter articles by language
- Each article can be written in its own language

## 🎨 RTL (Right-to-Left) Support

For languages like Amharic and Tigrinya that use special scripts, the system automatically handles:
- Proper font rendering
- Text direction (currently LTR, but can be extended)
- Unicode character support

## 💡 Best Practices

1. **Always translate all keys** - Don't leave any language incomplete
2. **Use native names** - Show language names in their native script
3. **Context matters** - Some words translate differently based on context
4. **Test thoroughly** - Switch languages and test all pages
5. **Keep translations updated** - When adding new features, update all languages

## 🔍 Current Translation Coverage

✅ **Fully Translated:**
- Navigation menu
- Home page
- Authentication (Login/Register)
- Dashboard
- Article management
- Category management
- Search & Filter
- Common messages

🚧 **Needs Translation:**
- Some error messages
- Email templates
- Admin-specific pages
- Complex form validations

## 📝 Translation Credits

- **English**: Native
- **አማርኛ (Amharic)**: Professional translation
- **Afaan Oromoo**: Professional translation
- **ትግርኛ (Tigrinya)**: Professional translation

## 🤝 Contributing Translations

If you find translation errors or want to improve existing translations:

1. Edit `frontend/src/i18n/translations.ts`
2. Update the specific translation
3. Test the changes
4. Submit your improvements

## 📧 Support

For translation issues or questions:
- Check the translation keys in `translations.ts`
- Verify the language code is correct
- Ensure the LanguageProvider wraps your app
- Check localStorage for saved language preference

---

**Enjoy using the CMS in your preferred language!** 🎉

