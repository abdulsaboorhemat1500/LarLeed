'use client';

export const runtime = 'edge';
import DonateSection from "./components/donate";
import DonationImpactPage from "./components/DonateImpactPage";
export default function Donate() {
  return (
    <>
      <DonateSection />
      <DonationImpactPage />
    </>
  );
}