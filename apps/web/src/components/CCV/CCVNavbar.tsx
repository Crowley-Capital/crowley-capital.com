import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import CCVLogo from './CCVLogo';
import { site } from '@/content/site';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Investment Strategies', to: '/strategies' },
  { label: 'Family Offices', to: '/family-offices' },
    { label: 'Insights', to: '/articles' },
  { label: 'About', to: '/about' },
];

const CCVNavbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const contactHref = `mailto:${site.contact.email}?subject=${encodeURIComponent(site.contact.introductionSubject)}`;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open || pathname !== '/' ? 'bg-black border-b border-cc-hairline' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="Crowley Capital home">
          <CCVLogo size="sm" variant="dark" />
          <span className="hidden text-lg font-semibold tracking-tight text-white sm:block">Crowley Capital</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-sans text-sm font-light transition-colors hover:text-white ${pathname === l.to || (l.to !== '/' && pathname.startsWith(l.to)) ? 'text-white' : 'text-white/70'}`}
            >
              {l.label}
            </Link>
          ))}
          <a href={contactHref} className="border border-cc-brass px-5 py-2 font-sans text-sm text-cc-brass transition-colors hover:bg-cc-brass hover:text-black">
            Contact
          </a>
        </nav>

        <button className="text-white lg:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-cc-hairline bg-black px-6 pb-8 pt-2 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="block border-b border-cc-hairline py-4 font-serif text-2xl font-light text-white">{l.label}</Link>
              </li>
            ))}
            <li>
              <a href={contactHref} className="mt-6 block w-full border border-cc-brass py-3 text-center font-sans text-sm text-cc-brass">Contact</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default CCVNavbar;
