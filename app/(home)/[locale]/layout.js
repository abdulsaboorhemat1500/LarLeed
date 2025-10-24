// app/(home)/[locale]/layout.js
const locales = ['en', 'ps', 'fa'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const runtime = 'edge'; // Add this line

export default function HomeLocaleLayout({ children, params }) {
  const { locale } = params;
  const direction = locale === 'en' ? 'ltr' : 'rtl';
  
  return (
    <div lang={locale} dir={direction}>
      {children}
    </div>
  );
}