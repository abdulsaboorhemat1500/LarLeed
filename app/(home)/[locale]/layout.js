const locales = ['en', 'ps', 'fa'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function HomeLocaleLayout({ children }) {
  return children;
}