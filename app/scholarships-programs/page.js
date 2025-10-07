import HeroSection from "./components/hero-section";
import ListSchoolCardSection from "./components/list-course-cards";
import MasterDegreeCardListSection from "./components/list-masters-degree";
import PhdCardListSection from "./components/list-phd";
import UndergraduateCardListSection from "./components/list-undergraduate-level";

export default function ScholarshipsProgramsPage(){
    return (
        <>
            <HeroSection />
            <ListSchoolCardSection />
            <UndergraduateCardListSection />
            <MasterDegreeCardListSection />
            <PhdCardListSection />
        </>
    );
}