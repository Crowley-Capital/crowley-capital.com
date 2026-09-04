import React from 'react';
import CCVSection from './CCVSection';
import { philosophy } from '@/content/philosophy';

const CCVPhilosophy = () => (
  <CCVSection id="philosophy" heading={philosophy.heading}>
    <div className="space-y-6">
      {philosophy.paragraphs.map((p) => (
        <p key={p} className="max-w-2xl font-sans text-lg font-light leading-relaxed text-cc-bone/85">{p}</p>
      ))}
    </div>
    <div className="mt-12 grid grid-cols-1 gap-8 border-t border-cc-hairline pt-8 sm:grid-cols-2 lg:grid-cols-3">
      {philosophy.principles.map((pr) => (
        <div key={pr.name}>
          <h3 className="font-serif text-xl font-normal text-cc-bone">{pr.name}</h3>
          <p className="mt-2 font-sans text-sm font-light leading-relaxed text-cc-ash">{pr.description}</p>
        </div>
      ))}
    </div>
  </CCVSection>
);

export default CCVPhilosophy;
