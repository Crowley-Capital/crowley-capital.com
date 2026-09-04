import React from 'react';
import { convenings } from '@/content/convenings';
import { site } from '@/content/site';
import buildingCapacity from '@/assets/convening-building-capacity.jpg';
import austinRemarks from '@/assets/convening-austin-remarks.jpg';
import austinEvening from '@/assets/convening-austin-evening.jpg';
import monaco from '@/assets/convening-monaco.jpg';

const photos = [
  { src: buildingCapacity, alt: 'Crowley Capital Building Capacity symposium, Austin, speakers and partners on stage' },
  { src: austinRemarks, alt: 'Jake Crowley, Managing Partner, giving remarks at a Crowley Capital private capital convening in Austin' },
  { src: monaco, alt: 'Crowley Capital private capital convening, Monaco' },
  { src: austinEvening, alt: 'Crowley Capital evening convening, Austin' },
];

const CCVConvenings = () => {
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(site.contact.inviteSubject)}`;
  return (
    <section id="convenings" className="bg-cc-charcoal py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl font-light leading-tight text-cc-bone lg:text-5xl">{convenings.heading}</h2>
            <div className="mt-6 space-y-4">
              {convenings.paragraphs.map((p) => (
                <p key={p} className="font-sans text-base font-light leading-relaxed text-cc-ash">{p}</p>
              ))}
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2">
              {convenings.participants.map((p) => (
                <li key={p} className="font-sans text-sm font-light text-cc-bone/75">{p}</li>
              ))}
            </ul>
            <a
              href={mailto}
              className="mt-10 inline-block border border-cc-brass px-6 py-3 font-sans text-sm text-cc-brass transition-colors hover:bg-cc-brass hover:text-cc-charcoal"
            >
              {convenings.requestLabel}
            </a>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3">
              <img src={photos[0].src} alt={photos[0].alt} className="col-span-2 h-64 w-full object-cover sm:h-96" loading="lazy" />
              <img src={photos[1].src} alt={photos[1].alt} className="h-44 w-full object-cover sm:h-64" loading="lazy" />
              <img src={photos[2].src} alt={photos[2].alt} className="h-44 w-full object-cover object-[50%_65%] sm:h-64" loading="lazy" />
              <img src={photos[3].src} alt={photos[3].alt} className="col-span-2 h-56 w-full object-cover sm:h-72" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CCVConvenings;
