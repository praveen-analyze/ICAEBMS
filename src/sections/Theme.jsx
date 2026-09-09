import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { conference } from '../data/conferenceData';

gsap.registerPlugin(ScrollTrigger);

export default function Theme() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.theme-word', { yPercent: 90, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power4.out', scrollTrigger: { trigger: root.current, start: 'top 72%' } });
      gsap.to('.theme-orbit', { rotation: -360, duration: 45, repeat: -1, ease: 'none' });
      gsap.to('.theme-glow', { scale: 1.25, opacity: 0.5, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, root);
    return () => ctx.revert();
  }, []);
  return <section id="theme" className="theme-section" ref={root}><div className="theme-grid"/><div className="theme-orbit"><img src="/images/orbit.svg" alt="" /></div><div className="theme-glow"/>
    <div className="container theme-inner"><p className="eyebrow theme-eyebrow">Conference Theme</p><h2><span className="theme-word">Interdisciplinary</span><span className="theme-word">Innovations</span><span className="theme-word theme-accent"><em>for a Sustainable Future.</em></span></h2><p className="theme-foot">{conference.theme} — a shared direction connecting knowledge, collaboration and sustainable solutions.</p></div>
  </section>;
}
