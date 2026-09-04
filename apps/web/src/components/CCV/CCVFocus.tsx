import React from 'react';
import { focus } from '@/content/focus';

const CCVFocus = () => (
  <section id="focus" className="border-y border-cc-hairline bg-cc-deep py-16 lg:py-20">
    <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
      <h2 className="font-serif text-3xl font-light text-cc-bone lg:text-4xl">{focus.heading}</h2>
      <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:grid-cols-7">
        {focus.areas.map((a) => (
          <li key={a} className="border-t border-cc-hairline pt-3">
            <h3 className="font-sans text-sm font-light text-cc-bone/85">{a}</h3>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default CCVFocus;
