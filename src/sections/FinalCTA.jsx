
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-card', { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 80%' } });
      gsap.to('.cta-image', { scale: 1.06, yPercent: 5, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return <section id="cta" className="cta-section" ref={root}><div className="cta-image"><img src="/images/bangkok-poster.svg" alt="Bangkok inspired conference artwork" /></div><div className="cta-overlay"/><div className="container cta-inner"><div className="cta-card"><p className="eyebrow light">10–11 AUG 2026 · BANGKOK, THAILAND</p><h2>Share your research.<br/><em>Shape the future.</em></h2><p>Join researchers, academicians, professionals and students around a shared platform for knowledge and collaboration.</p><button className="btn btn-light">Submit Your Paper </button><div className="cta-location"> Hybrid conference · In person + Online</div></div></div></section>;
}
