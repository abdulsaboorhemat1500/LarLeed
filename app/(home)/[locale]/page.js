// app/(home)/[locale]/page.js
import HomePage from '@/components/homePage/heroSection';
// import FeaturedStories from "@/components/homePage/featuredStories";
import FeaturedVieos from "@/components/homePage/featuredVideos";
import ScholarshipSliderSection from "@/components/homePage/scholarshipsSection";
// import TeamSection from "@/components/homePage/teamSection";
import ContactUsSection from "@/components/contact-us";
import WhyChoseUse from "@/components/homePage/whychoseus";
import CEOPage from "@/components/homePage/ceo";
import LarleedMission from '@/components/homePage/larleedMission';

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ps" }, { locale: "fa" }];
}

export async function generateMetadata({ params }) {
  const { locale } = params;

  const metadata = {
    en: {
      title: "LarLeed - Online Learning Platform",
      description:
        "Connecting Afghan Youth through Education, Dialogue, and Vision",
    },
    ps: {
      title: "لرلید - آنلاین زده کړې پلیټفارم",
      description:
        "د افغان ځوانانو د زده کړې، خبرو اترو او لید له لارې سره نښلول",
    },
    fa: {
      title: "لرلید - پلتفرم آموزش آنلاین",
      description: "اتصال جوانان افغان از طریق آموزش، گفتگو و چشم انداز",
    },
  };

  return {
    title: metadata[locale]?.title || metadata.en.title,
    description: metadata[locale]?.description || metadata.en.description,
  };
}

export default function LocalizedHomePage({ params }) {
  return (
    <>
      <HomePage />
      <WhyChoseUse />
      <ScholarshipSliderSection />
      <LarleedMission />
      {/* <FeaturedStories /> */}
      <FeaturedVieos />
      <CEOPage />
      {/* <TeamSection /> */}
      <ContactUsSection />
    </>
  );
}