import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CCVNavbar from './CCVNavbar';
import CCVFooter from './CCVFooter';
import { site } from '@/content/site';

interface PageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

// Shared page shell for subpages. Sets the document title and meta description, scrolls to hash anchors.
const CCVPage = ({ title, description, children }: PageProps) => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    document.title = `${title} | ${site.name}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, [title, description, hash, pathname]);

  return (
    <div className="min-h-screen bg-cc-charcoal font-sans text-cc-bone antialiased">
      <CCVNavbar />
      <main className="pt-20">{children}</main>
      <CCVFooter />
    </div>
  );
};

export default CCVPage;

export const PageHeader = ({ heading, intro }: { heading: string; intro?: string }) => (
  <header className="border-b border-cc-hairline bg-cc-deep py-16 lg:py-24">
    <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
      <h1 className="font-serif text-5xl font-light leading-tight text-cc-bone lg:text-6xl">{heading}</h1>
      {intro && <p className="mt-6 max-w-2xl font-sans text-lg font-light leading-relaxed text-cc-ash">{intro}</p>}
    </div>
  </header>
);

export const TagList = ({ items }: { items: readonly string[] }) => (
  <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
    {items.map((i) => (
      <li key={i} className="border-t border-cc-hairline pt-2 font-sans text-sm font-light text-cc-bone/80">{i}</li>
    ))}
  </ul>
);
