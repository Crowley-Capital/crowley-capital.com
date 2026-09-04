import React from 'react';
import { site } from '@/content/site';

const CCVContact = () => {
  const href = `mailto:${site.contact.email}?subject=${encodeURIComponent(site.contact.introductionSubject)}`;
  return (
    <section id="contact" className="bg-cc-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <h2 className="max-w-3xl font-serif text-4xl font-light leading-tight text-cc-bone lg:text-6xl">{site.cta.primary}</h2>
        <p className="mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-cc-ash">
          If we share a relationship, ask them to make the introduction. If not, write to us directly and tell us who you are.
        </p>
        <a href={href} className="mt-10 inline-block bg-cc-brass px-8 py-4 font-sans text-sm text-cc-charcoal transition-colors hover:bg-cc-brass-light">
          {site.cta.connect}
        </a>
        <p className="mt-6 font-sans text-sm font-light text-cc-ash">{site.contact.email}</p>
      </div>
    </section>
  );
};

export default CCVContact;
