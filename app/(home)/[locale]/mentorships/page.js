import MentorSection from "@/app/(home)/[locale]/mentorships/components/find-mentor";
import MentorshipProgramsSection from "@/app/(home)/[locale]/mentorships/components/mentorship-programs";
import NeedHelpSection from "@/components/homePage/needhelp";
export const runtime = "edge";
export default function ScholarshipsProgramsPage() {
  return (
    <>
      <MentorshipProgramsSection />
      <MentorSection />
      <NeedHelpSection />
    </>
  );
}
