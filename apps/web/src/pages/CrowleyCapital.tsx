import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CCVNavbar from '@/components/CCV/CCVNavbar';
import CCVHero from '@/components/CCV/CCVHero';
import CCVPillars from '@/components/CCV/CCVPillars';
import CCVFocus from '@/components/CCV/CCVFocus';
import CCVPhilosophy from '@/components/CCV/CCVPhilosophy';
import CCVFamilyOfficeEcosystem from '@/components/CCV/CCVFamilyOfficeEcosystem';
import CCVConvenings from '@/components/CCV/CCVConvenings';
import CCVLeadership from '@/components/CCV/CCVLeadership';
import CCVNewsletter from '@/components/CCV/CCVNewsletter';
import CCVContact from '@/components/CCV/CCVContact';
import CCVFooter from '@/components/CCV/CCVFooter';
import { site } from '@/content/site';

// Homepage section order. Reorder or remove lines here to change the page.
const CrowleyCapital = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = `${site.name} | Private Investment Allocator: Venture Capital, Private Equity, Family Offices | Austin, Texas`;
    const target = location.hash ? location.hash.slice(1) : location.state?.scrollTo;
    if (target) {
      setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-cc-charcoal font-sans text-cc-bone antialiased">
      <CCVNavbar />
      <main>
        <CCVHero />
        <CCVPillars />
        <CCVFocus />
        <CCVPhilosophy />
        <CCVFamilyOfficeEcosystem />
        <CCVConvenings />
        <CCVLeadership />
        <CCVNewsletter />
        <CCVContact />
      </main>
      <CCVFooter />
    </div>
  );
};

export default CrowleyCapital;
