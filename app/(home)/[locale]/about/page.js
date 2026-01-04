"use client";
import { useState, useEffect, useMemo } from "react";
import { useApi } from "@/app/hooks/useApi";
import TeamSection from "@/components/homePage/teamSection";
import SocialMediaSection from "@/components/homePage/socialmedia";
import { useParams } from "next/navigation";
import { useTranslations } from "@/hooks/useTranslations";

export const runtime = "edge";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { locale = "en" } = await params;

  // Locale-specific metadata
  const metadataByLocale = {
    en: {
      title: "About Larleed - Empowering Education in Afghanistan",
      description:
        "Learn about Larleed's mission to provide educational resources, scholarships, and mentorship for Afghan students. Discover our story, values, and impact.",
      keywords:
        "Afghanistan education, scholarships, student resources, educational support, mentorship, Larleed foundation",
      openGraph: {
        title: "About Larleed - Transforming Education in Afghanistan",
        description:
          "Empowering Afghan students through scholarships, mentorship, and educational resources. Join our mission to create educational opportunities.",
        url: `https://larleed.org/${locale}about`,
        siteName: "Larleed",
        images: [
          {
            url: "https://www.mile.ie/wp-content/uploads/2022/04/icons_about.png",
            width: 1200,
            height: 630,
            alt: "Larleed - Empowering Afghan Education",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "About Larleed - Empowering Education in Afghanistan",
        description:
          "Learn about Larleed's mission to provide educational resources for Afghan students",
        images: [
          "https://www.mile.ie/wp-content/uploads/2022/04/icons_about.png",
        ],
      },
    },
    ps: {
      title: "لرلید - دافغان پیغلو او ځوانانو وصلول",
      description:
        "د لرلید ماموریت، ارزښتونه او اغیزې وپېژنئ. د افغان زده کړیالانو لپاره د زده کړې سرچینې، بورسونه او لارښوونې چمتو کول.",
      keywords:
        "افغانستان زده کړه, بورسونه, بورسیه، مکاتب، درسونه، لرلید څوک ده، د لرلید په اړه، لرلید کور، لرلید افغانستان، د افغانستان لرلید، زموږ لرلید، زموږ په اړه، د افغان پیغلو هیله، زده کوونکي، زموږ کور، سکالرشیپونه، انلاین سکالرشیپونه، زده کوونکي،زده کړیالان, زده کړې مرستې, لارښوونې, لارلیډ بنسټ",
      openGraph: {
        title: "د لرلید په اړه - په افغانستان کې د زده کړې بدلون",
        description:
          "د بورسونو، لارښوونو او زده کړې سرچینو له لارې د افغان زده کړیالانو پیاوړتیا. زموږ په ماموریت کې ګډون وکړئ.",
        url: "https://larleed.org/ps/about",
        siteName: "لرلید",
        images: [
          {
            url: "https://www.mile.ie/wp-content/uploads/2022/04/icons_about.png",
            width: 1200,
            height: 630,
            alt: "لرلید - دافغان پیغلو او ځوانانو وصلول",
          },
        ],
        locale: "ps_AF",
        type: "website",
      },
    },
    fa: {
      title: "درباره لرلید - وصل نمودن جوانان افغان",
      description:
        "ماموریت، ارزش‌ها و تأثیرات لرلید را بشناسید. ارائه منابع آموزشی، بورسیه‌ها و راهنمایی برای دانش‌آموزان افغان.",
      keywords:
        "آموزش افغانستان, بورسیه‌ها, دانش‌آموزان, حمایت آموزشی, راهنمایی, سکالرشیپ ها، سکالرشیپ، بورس، افغانستان بورسیه ها، بورسیه های ازاد، بورسیه های انلاین، کورس ها، کورس های رایګان، کوډ، ویب، ډیزاین، مکاتب، دروس ها، درس انلاین، درس دادن، بنیاد لارلید",
      openGraph: {
        title: "درباره لرلید - تحول آموزش در افغانستان",
        description:
          "توانمندسازی دانش‌آموزان افغان از طریق بورسیه‌ها، راهنمایی و منابع آموزشی. به مأموریت ما بپیوندید.",
        url: "https://larleed.org/fa/about",
        siteName: "لارلید",
        images: [
          {
            url: "https://www.mile.ie/wp-content/uploads/2022/04/icons_about.png",
            width: 1200,
            height: 630,
            alt: "لرلید - وصل نمودن جوانان افغان",
          },
        ],
        locale: "fa_AF",
        type: "website",
      },
    },
  };

  const localeMetadata = metadataByLocale[locale] || metadataByLocale.en;

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
    keywords: localeMetadata.keywords,

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      ...localeMetadata.openGraph,
    },

    // Twitter
    twitter: locale === "en" ? localeMetadata.twitter : undefined,

    // Additional metadata
    alternates: {
      canonical: `https://larleed.org/${locale}/about`,
      languages: {
        en: "https://larleed.org/en/about",
        ps: "https://larleed.org/ps/about",
        fa: "https://larleed.org/fa/about",
      },
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    

    // Structured data for rich snippets
    other: {
      // JSON-LD structured data
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Larleed",
        url: "https://larleed.org",
        logo: "https://larleed.org/logo.png",
        description: localeMetadata.description,
        founder: {
          "@type": "Abdul Hamid",
          name: "Organization Founder",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "Afghanistan",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "info@larleed.org",
        },
        sameAs: [
          "https://facebook.com/larleed",
          "https://twitter.com/larleed",
          "https://linkedin.com/company/larleed",
          "https://instagram.com/larleed",
        ],
      }),
    },
  };
}

export default function AboutPage() {
  const [threeSectionTexts, setThreeSectionTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();
  const { locale } = useParams();
  const { t } = useTranslations();

  // Normalize locale to match database field suffixes
  const normalizedLocale = useMemo(() => {
    const localeMap = {
      en: "english",
      ps: "pashto",
      fa: "dari",
    };
    return localeMap[locale] || "english";
  }, [locale]);

  const getTexts = async () => {
    try {
      const result = await get("/api/threesectiontexts");
      if (result.success) {
        setThreeSectionTexts(result.data || []);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTexts();
  }, []);

  // Get the first text entry
  const currentText =
    threeSectionTexts.length > 0 ? threeSectionTexts[0] : null;

  // Helper function to get the appropriate language field
  const getLocalizedAboutText = () => {
    if (!currentText) return "";

    const fieldName = `about_${normalizedLocale}`;
    const englishField = "about_english";

    // Try the localized field first, then fallback to English
    return currentText[fieldName] || currentText[englishField] || "";
  };

  const aboutText = getLocalizedAboutText();

  // Structured data for rich snippets (Breadcrumb and AboutPage)
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "en" ? "Home" : locale === "ps" ? "کور" : "خانه",
          item: `https://larleed.org/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name:
            locale === "en" ? "About" : locale === "ps" ? "په اړه" : "درباره",
          item: `https://larleed.org/${locale}/about`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name:
        locale === "en"
          ? "About Larleed"
          : locale === "ps"
          ? "د لارلیډ په اړه"
          : "درباره لارلید",
      description:
        locale === "en"
          ? "Learn about Larleed's mission to provide educational resources, scholarships, and mentorship for Afghan students."
          : locale === "ps"
          ? "د لارلیډ ماموریت، ارزښتونه او اغیزې وپېژنئ. د افغان زده کړیالانو لپاره د زده کړې سرچینې، بورسونه او لارښوونې."
          : "ماموریت، ارزش‌ها و تأثیرات لارلید را بشناسید. ارائه منابع آموزشی، بورسیه‌ها و راهنمایی برای دانش‌آموزان افغان.",
      publisher: {
        "@type": "Organization",
        name: "Larleed",
        logo: {
          "@type": "ImageObject",
          url: "https://larleed.org/logo.png",
        },
      },
      datePublished: "2023-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section
        id="donate"
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Background Design */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-custom-half rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-400 rounded-full opacity-20"></div>
          </div>

          {/* Geometric Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-32 h-32 border-2 border-blue-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 border-2 border-indigo-200 rounded-full opacity-20"></div>
          </div>

          <div className="flex flex-col items-center justify-center min-h-screen py-12">
            {/* Breadcrumb Navigation for SEO */}
            <nav className="w-full max-w-7xl mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <a href={`/${locale}`} className="hover:text-blue-600">
                    {locale === "en"
                      ? "Home"
                      : locale === "ps"
                      ? "کور"
                      : "خانه"}
                  </a>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-gray-900 font-medium" aria-current="page">
                  {locale === "en"
                    ? "About"
                    : locale === "ps"
                    ? "په اړه"
                    : "درباره"}
                </li>
              </ol>
            </nav>

            {/* Header with semantic HTML for SEO */}
            <header className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t("HomePage.about larleed")}
              </h1>
              <div className="w-24 h-1.5 bg-cutom-half mx-auto rounded-full"></div>
            </header>

            {/* About Content Card with semantic HTML */}
            <main className="w-full max-w-7xl">
              <article className="rounded-2xl shadow-xl border border-blue/50 p-8 lg:p-12">
                {aboutText ? (
                  <div
                    className="text-gray-700 leading-relaxed text-lg prose prose-lg max-w-none
                    prose-headings:text-gray-900 prose-p:text-gray-700 
                    prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700
                    prose-ul:text-gray-700 prose-ol:text-gray-700
                    prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-blue-800
                    prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-blue-700
                    prose-p:mb-4 prose-p:text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: aboutText,
                    }}
                  />
                ) : (
                  <div className="text-center py-12">
                    <div className="mb-6">
                      <svg
                        className="w-20 h-20 text-gray-300 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-3">
                      About Content Coming Soon
                    </h2>
                  </div>
                )}
              </article>
            </main>

          
          </div>
        </div>
      </section>
      <TeamSection />
      <SocialMediaSection />
    </>
  );
}
