// app/(home)/[locale]/page.js
import HomePage from "@/components/homePage/heroSection";
import FeaturedVieos from "@/components/homePage/featuredVideos";
import ScholarshipSliderSection from "@/components/homePage/scholarshipsSection";
import ContactUsSection from "@/components/contact-us";
import WhyChoseUse from "@/components/homePage/whychoseus";
import LarleedMentorship from "@/components/homePage/larleedMentorship";
import ScholarshipsSlider from "@/components/homePage/scholarshipSlider";

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
      {/* <WhyChoseUse /> */}
      <ScholarshipSliderSection />
      <ScholarshipsSlider />
      <FeaturedVieos />
      <LarleedMentorship />
      {/* <ContactUsSection /> */}
    </>
  );
}