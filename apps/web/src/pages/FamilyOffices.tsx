import React from 'react';
import CCVPage, { PageHeader, TagList } from '@/components/CCV/CCVPage';
import CCVConvenings from '@/components/CCV/CCVConvenings';
import CCVContact from '@/components/CCV/CCVContact';
import { familyOffices } from '@/content/family-offices';

const FamilyOffices = () => (
  <CCVPage title="Family Offices and Private Capital" description="Crowley Capital works alongside single and multi-family offices, institutional investors, hedge funds and strategic partners as a principal in private equity, venture capital, secondaries and alternative assets.">
    <PageHeader heading={familyOffices.heading} intro={familyOffices.intro} />
    <section className="border-b border-cc-hairline py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-4">
          <h2 className="font-serif text-3xl font-light text-cc-bone">Who we work alongside</h2>
          <ul className="mt-6 space-y-2">
            {familyOffices.worksWith.map((w) => <li key={w} className="font-sans text-sm font-light text-cc-ash">{w}</li>)}
          </ul>
        </div>
        <div className="lg:col-span-8">
          <div className="space-y-5">
            {familyOffices.paragraphs.map((p) => <p key={p} className="max-w-2xl font-sans text-lg font-light leading-relaxed text-cc-bone/85">{p}</p>)}
          </div>
          <h3 className="mt-12 font-serif text-2xl font-normal text-cc-bone">Where we work together</h3>
          <TagList items={familyOffices.themes} />
        </div>
      </div>
    </section>
    <CCVConvenings />
    <CCVContact />
  </CCVPage>
);

export default FamilyOffices;
