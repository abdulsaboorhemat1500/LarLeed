import HomePage from '@/components/homePage/heroSection';
import FeaturedStories from "@/components/homePage/featuredStories";
import FeaturedVieos from "@/components/homePage/featuredVideos";
import WorkThusFor from "@/components/homePage/workThusFor";
import TeamSection from "@/components/homePage/teamSection";
import ContactUsSection from "@/components/contact-us";




export default function Home() {

  
  return (
    <>
      <HomePage />
      <FeaturedStories />
      <FeaturedVieos />
      <WorkThusFor />
      <TeamSection />
      <ContactUsSection />
    </>
  );
}
