import React from 'react';
import { Link } from 'react-router-dom';
import CCVSection from './CCVSection';
import { familyOffices } from '@/content/family-offices';

const CCVFamilyOfficeEcosystem = () => (
  <CCVSection id="family-offices" heading={familyOffices.ecosystemHeading}>
    <p className="max-w-2xl font-sans text-lg font-light leading-relaxed text-cc-bone/85">{familyOffices.ecosystemText}</p>
    <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-cc-hairline pt-8 sm:grid-cols-3">
      {familyOffices.worksWith.map((w) => (
        <li key={w} className="font-sans text-sm font-light text-cc-ash">{w}</li>
      ))}
    </ul>
    <Link to="/family-offices" className="mt-10 inline-block font-sans text-sm font-light text-cc-brass-light hover:text-cc-brass">
      Explore Partnership Opportunities
    </Link>
  </CCVSection>
);

export default CCVFamilyOfficeEcosystem;
