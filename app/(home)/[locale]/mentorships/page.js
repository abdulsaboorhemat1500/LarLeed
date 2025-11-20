import MentorSection from "@/app/(home)/[locale]/mentorships/components/find-mentor";
import MentorshipProgramsSection from "@/app/(home)/[locale]/mentorships/components/mentorship-programs";
// import ScholarshipFormSection from "@/components/mentorships/scholarship-form";
export const runtime = "edge";
export default function ScholarshipsProgramsPage() {
  return (
    <>
      <MentorshipProgramsSection />
      <MentorSection />
      {/* <ScholarshipFormSection /> */}
    </>
  );
}
