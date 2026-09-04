import React from 'react';
import { Link } from 'react-router-dom';
import CCVPage, { PageHeader } from '@/components/CCV/CCVPage';
import { strategies } from '@/content/strategies';

// One shared layout for all three sections so the left rail, text column and
// sector grid line up identically down the page.
const Block = ({ id, number, heading, paragraphs, listHeading, items, children }: {
  id: string; number: string; heading: string; paragraphs: string[];
  listHeading: string; items: readonly string[]; children?: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 border-b border-cc-hairline py-16 lg:py-24">
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
      <div className="lg:col-span-4">
        <p className="font-sans text-sm font-light text-cc-brass">{number}</p>
        <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-cc-bone">{heading}</h2>
      </div>
      <div className="lg:col-span-8">
        <div className="space-y-5">
          {paragraphs.map((p) => <p key={p} className="max-w-2xl font-sans text-lg font-light leading-relaxed text-cc-bone/85">{p}</p>)}
        </div>
        <h3 className="mt-12 font-serif text-2xl font-normal text-cc-bone">{listHeading}</h3>
        <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
          {items.map((i) => (
            <li key={i} className="border-t border-cc-hairline pt-2 font-sans text-sm font-light text-cc-bone/80">{i}</li>
          ))}
        </ul>
        {children}
      </div>
    </div>
  </section>
);

const Strategies = () => (
  <CCVPage title="Investment Strategies" description="Crowley Capital invests across venture capital, private equity and strategic investments, and family office and sovereign capital, with depth in infrastructure, data centers, dual-use technology, defense, space, sports and alternative assets.">
    <PageHeader heading={strategies.heading} intro={strategies.intro} />
    <Block id="venture-capital" number="01" heading={strategies.venture.heading} paragraphs={strategies.venture.paragraphs} listHeading="Sectors" items={strategies.venture.sectors} />
    <Block id="private-equity" number="02" heading={strategies.privateEquity.heading} paragraphs={strategies.privateEquity.paragraphs} listHeading="Sectors" items={strategies.privateEquity.sectors}>
      <div className="mt-12 border-l-2 border-cc-brass pl-6">
        <h3 className="font-serif text-2xl font-normal text-cc-bone">{strategies.privateEquity.dualUse.heading}</h3>
        <p className="mt-3 max-w-2xl font-sans text-base font-light leading-relaxed text-cc-ash">{strategies.privateEquity.dualUse.text}</p>
      </div>
    </Block>
    <Block id="family-offices" number="03" heading={strategies.familyOffices.heading} paragraphs={strategies.familyOffices.paragraphs} listHeading="Who we work alongside" items={strategies.familyOffices.partners}>
      <Link to={strategies.familyOffices.link} className="mt-10 inline-block font-sans text-sm font-light text-cc-brass-light hover:text-cc-brass">Explore Partnership Opportunities</Link>
    </Block>
  </CCVPage>
);

export default Strategies;
