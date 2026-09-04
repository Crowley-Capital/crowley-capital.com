import React from 'react';

interface SectionProps {
  id: string;
  heading: string;
  intro?: string;
  tone?: 'charcoal' | 'deep';
  children: React.ReactNode;
}

// Shared section frame: heading on the left rail, content on the right on wide screens.
const CCVSection = ({ id, heading, intro, tone = 'charcoal', children }: SectionProps) => (
  <section id={id} className={`${tone === 'deep' ? 'bg-cc-deep' : 'bg-cc-charcoal'} py-20 lg:py-28`}>
    <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="font-serif text-4xl font-light leading-tight text-cc-bone lg:text-5xl">{heading}</h2>
          {intro && <p className="mt-6 max-w-sm font-sans text-base font-light leading-relaxed text-cc-ash">{intro}</p>}
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </div>
  </section>
);

export default CCVSection;
