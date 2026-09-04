import React from 'react';
import { Link } from 'react-router-dom';
import CCVSection from './CCVSection';
import { about } from '@/content/about';
import { site } from '@/content/site';

const CCVLeadership = () => (
  <CCVSection id="leadership" heading={about.leadershipHeading} tone="deep">
    <h3 className="font-serif text-3xl font-light text-white">
      {site.principal.name}
      <span className="block font-sans text-sm font-light text-white/85">{site.principal.title}</span>
    </h3>
    <p className="mt-6 max-w-2xl font-sans text-lg font-light leading-relaxed text-white">{about.short}</p>
    <Link to="/about" className="mt-8 inline-block font-sans text-sm font-light text-white underline underline-offset-4 hover:text-cc-brass">Learn More</Link>
  </CCVSection>
);

export default CCVLeadership;
