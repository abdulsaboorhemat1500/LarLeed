import MentorSection from "@/components/mentorships/find-mentor";
import MentorshipProgramsSection from "@/components/mentorships/mentorship-programs";
import ScholarshipFormSection from "@/components/mentorships/scholarship-form";

export default function ScholarshipsProgramsPage(){
    return (
        <>
           <MentorshipProgramsSection />
           <MentorSection />
           <ScholarshipFormSection />
        </>
    );
}