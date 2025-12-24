"use client";

import { useTranslations } from "../../hooks/useTranslations";
export default function LarleedMission() {
  const { t } = useTranslations();
  return (
    <section className="py-16 bg-blue-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-custom-half mb-4">
            LarLeed's Mission
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Mission Text */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-semibold mb-6">
            {t("Banner.description")}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            At LarLeed, we are dedicated to empowering the next generation of
            Afghan leaders by providing access to quality education, fostering
            meaningful dialogue, and nurturing visionary thinking. We believe
            that through knowledge exchange and open conversations, young
            Afghans can overcome barriers and create sustainable change in their
            communities. Our mission is to build bridges of opportunity that
            connect ambitious youth with the resources, mentorship, and
            platforms they need to transform their aspirations into reality.
          </p>
        </div>
      </div>
    </section>
  );
}
