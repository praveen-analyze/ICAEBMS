import { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { conference } from '../data/conferenceData';

const links = [
  ['About', 'about'],
  ['Theme', 'theme'],
  ['Tracks', 'tracks'],
  ['Important Dates', 'dates'],
  ['Publications', 'publications']
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    gsap.to(menuRef.current, { height: open ? 'auto' : 0, opacity: open ? 1 : 0, duration: 0.35, ease: 'power2.out' });
  }, [open]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header ref={navRef} className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-inner">
        <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-mark"><span>IC</span><span>A</span></span>
          <span className="brand-copy"><strong>{conference.shortName}</strong><small>International Conference · 2026</small></span>
        </button>

        <nav className="desktop-nav">
          {links.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}
        </nav>

        <div className="nav-actions">
          <button className="nav-submit" onClick={() => scrollTo('cta')}>Submit Paper </button>
          <button className="mobile-toggle" aria-label="Toggle navigation" onClick={() => setOpen((v) => !v)}>{open ? 'Close' : 'Menu'}</button>
        </div>
      </div>
      <div ref={menuRef} className="mobile-menu">
        <div className="container mobile-menu-inner">
          {links.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}
          <button className="mobile-submit" onClick={() => scrollTo('cta')}>Submit Paper </button>
        </div>
      </div>
    </header>
  );
}
