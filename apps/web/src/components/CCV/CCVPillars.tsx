import React from 'react';
import { Link } from 'react-router-dom';
import { pillars } from '@/content/hero';

const CCVPillars = () => (
  <section id="pillars" className="bg-cc-charcoal py-20 lg:py-28" aria-labelledby="pillars-heading">
    <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
      <h2 id="pillars-heading" className="sr-only">Three investment pillars</h2>
      <div className="grid grid-cols-1 gap-px bg-cc-hairline lg:grid-cols-3">
        {pillars.map((p) => (
          <article key={p.slug} className="bg-cc-charcoal py-10 lg:px-10 lg:py-4 first:lg:pl-0 last:lg:pr-0">
            <p className="font-sans text-sm font-light text-cc-brass">{p.number}</p>
            <h3 className="mt-4 font-serif text-3xl font-light leading-tight text-cc-bone lg:text-[2.1rem]">{p.name}</h3>
            <p className="mt-5 font-sans text-base font-light leading-relaxed text-cc-ash">{p.summary}</p>
            <Link
              to={p.slug === 'family-offices' ? '/family-offices' : `/strategies#${p.slug}`}
              className="mt-6 inline-block font-sans text-sm font-light text-cc-brass-light hover:text-cc-brass"
            >
              Learn More
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default CCVPillars;
