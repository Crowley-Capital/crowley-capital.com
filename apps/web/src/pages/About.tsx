import React from 'react';
import CCVPage, { PageHeader, TagList } from '@/components/CCV/CCVPage';
import CCVContact from '@/components/CCV/CCVContact';
import { about } from '@/content/about';
import { site } from '@/content/site';
import cavalieri from '@/assets/about-cavalieri-di-san-martino.jpg';
import milken from '@/assets/about-milken-global-conference.jpg';
import dubai from '@/assets/about-dubai.jpg';

// Photographs shown under Gatherings on the About page. Swap or reorder here.
const gatherings = [
  { src: milken, alt: 'Panel discussion at the 2026 Milken Institute Global Conference' },
  { src: dubai, alt: 'Racecourse gathering in Dubai' },
  { src: cavalieri, alt: 'Jake Crowley at the investiture ceremony of the Cavalieri di San Martino' },
];

const About = () => (
  <CCVPage title="About" description="Jake Crowley is Managing Partner of Crowley Capital, a private investment platform operating across venture capital, private equity, family offices and alternative investments, based in Austin with a presence in London and Monaco.">
    <PageHeader heading={about.heading} intro={site.offices.join(', ')} />
    <section className="border-b border-cc-hairline py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-4">
          <h2 className="font-serif text-3xl font-light text-cc-bone">{site.principal.name}</h2>
          <p className="mt-1 font-sans text-sm font-light text-cc-brass-light">{site.principal.title}</p>
        </div>
        <div className="lg:col-span-8">
          <div className="space-y-5">
            {about.bio.map((p) => <p key={p} className="max-w-2xl font-sans text-lg font-light leading-relaxed text-cc-bone/85">{p}</p>)}
          </div>
          <h3 className="mt-12 font-serif text-2xl font-normal text-cc-bone">Areas of focus</h3>
          <TagList items={about.focus} />
        </div>
      </div>
    </section>
    <section className="border-b border-cc-hairline py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <h2 className="font-serif text-3xl font-light text-cc-bone lg:col-span-4">{about.firmHeading}</h2>
        <div className="space-y-5 lg:col-span-8">
          {about.firm.map((p) => <p key={p} className="max-w-2xl font-sans text-lg font-light leading-relaxed text-cc-bone/85">{p}</p>)}
        </div>
      </div>
    </section>
    <section className="border-b border-cc-hairline py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <h2 className="font-serif text-3xl font-light text-cc-bone">Gatherings</h2>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          <img src={gatherings[0].src} alt={gatherings[0].alt} className="h-64 w-full object-cover sm:col-span-2 lg:col-span-8 lg:h-[26rem]" loading="lazy" />
          <img src={gatherings[2].src} alt={gatherings[2].alt} className="h-64 w-full object-cover object-[50%_35%] lg:col-span-4 lg:h-[26rem]" loading="lazy" />
          <img src={gatherings[1].src} alt={gatherings[1].alt} className="h-64 w-full object-cover sm:col-span-2 lg:col-span-12 lg:h-80" loading="lazy" />
        </div>
      </div>
    </section>
    <CCVContact />
  </CCVPage>
);

export default About;
