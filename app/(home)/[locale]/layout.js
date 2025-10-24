// app/(home)/[locale]/layout.js
const locales = ['en', 'ps', 'fa'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function HomeLocaleLayout({ children, params }) {
  const { locale } = params;
  
  // Set direction based on locale
  const direction = locale === 'en' ? 'ltr' : 'rtl';
  
  return (
    <div lang={locale} dir={direction}>
      {children}
    </div>
  );
}