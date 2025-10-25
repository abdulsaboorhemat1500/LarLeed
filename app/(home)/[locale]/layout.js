import HeaderSection from "@/components/layout/header";
import TopBanner from "@/components/layout/tip-banner";
import FooterSection from "@/components/layout/footer";

const locales = ['en', 'ps', 'fa'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function HomeLocaleLayout({ children, params }) {
  const { locale } = params;
  const direction = locale === 'en' ? 'ltr' : 'rtl';
  
  return (
    <div lang={locale} dir={direction}>
      <TopBanner />
      <HeaderSection />
      {children}
      <FooterSection />
    </div>
  );
}