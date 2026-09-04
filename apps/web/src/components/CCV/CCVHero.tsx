import React from 'react';
import { Link } from 'react-router-dom';
import monacoEstate from '@/assets/monaco-luxury-estate.jpg';
import { hero } from '@/content/hero';
import { site } from '@/content/site';

const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(site.contact.introductionSubject)}`;

const CCVHero = () => (
  <section id="hero" className="relative flex min-h-screen items-end overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={monacoEstate}
        alt="Crowley Capital, private markets platform based in Austin with a presence in London and Monaco"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>

    <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
      <div className="cc-reveal max-w-4xl">
        <p className="font-sans text-xs font-light tracking-[0.28em] text-cc-brass-light">CROWLEY CAPITAL</p>
        <h1 className="mt-6 font-serif text-[2.75rem] font-light leading-[1.05] text-white sm:text-6xl lg:text-[4.75rem]">
          {hero.headline}
        </h1>
        <p className="mt-6 font-sans text-base font-light tracking-wide text-white/85 lg:text-lg">{hero.pillarsLine}</p>
        <p className="mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-white/75">{hero.lead}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/strategies"
            className="inline-flex justify-center bg-white px-7 py-3.5 font-sans text-sm font-normal text-black transition-colors hover:bg-white/90"
          >
            {site.cta.secondary}
          </Link>
          <a
            href={mailto}
            className="inline-flex justify-center border border-white/40 px-7 py-3.5 font-sans text-sm font-light text-white transition-colors hover:border-white hover:bg-white/10"
          >
            {site.cta.primary}
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CCVHero;
