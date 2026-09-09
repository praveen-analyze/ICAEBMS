import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { dates } from '../data/conferenceData';

gsap.registerPlugin(ScrollTrigger);

export default function ImportantDates() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-fill', { scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 72%' } });
      gsap.from('.date-card', { y: 35, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 68%' } });
    }, root);
    return () => ctx.revert();
  }, []);
  return <section id="dates" className="section dates-section" ref={root}><div className="container"><div className="dates-head"><div><p className="eyebrow">05 · Important Dates</p><h2>The path from <em>abstract</em><br/>to final registration.</h2></div><div className="dates-note">Keep your research journey moving. Mark the milestones early.</div></div>
    <div className="timeline"><div className="timeline-base"/><div className="timeline-fill"/>{dates.map(([date, label], i) => <div className="date-card" key={date}><span className="date-dot">0{i+1}</span><time>{date}</time><strong>{label}</strong></div>)}</div>
  </div></section>;
}
