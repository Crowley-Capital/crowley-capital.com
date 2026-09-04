import React from 'react';
import { Link } from 'react-router-dom';
import CCVSection from './CCVSection';
import { about } from '@/content/about';
import { site } from '@/content/site';

const CCVLeadership = () => (
  <CCVSection id="leadership" heading={about.leadershipHeading} tone="deep">
    <h3 className="font-serif text-3xl font-light text-cc-bone">
      {site.principal.name}
      <span className="block font-sans text-sm font-light text-cc-brass-light">{site.principal.title}</span>
    </h3>
    <p className="mt-6 max-w-2xl font-sans text-lg font-light leading-relaxed text-cc-bone/85">{about.short}</p>
    <Link to="/about" className="mt-8 inline-block font-sans text-sm font-light text-cc-brass-light hover:text-cc-brass">Learn More</Link>
  </CCVSection>
);

export default CCVLeadership;
