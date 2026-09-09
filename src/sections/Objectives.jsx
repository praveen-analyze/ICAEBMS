import { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { objectives } from '../data/conferenceData';

gsap.registerPlugin(ScrollTrigger);

export default function Objectives() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.objective-copy', { x: 50, opacity: 0, duration: 0.9, scrollTrigger: { trigger: root.current, start: 'top 70%' } });
      gsap.utils.toArray('.objective-item').forEach((item, i) => {
        ScrollTrigger.create({ trigger: item, start: 'top 55%', end: 'bottom 45%', onEnter: () => setActive(i), onEnterBack: () => setActive(i) });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return <section className="section objectives-section" ref={root}><div className="container objectives-layout">
    <div className="objectives-sticky"><p className="eyebrow">02 · Conference Objectives</p><h2>Five priorities.<br/><em>One direction.</em></h2><div className="objective-index">{objectives.map(([num], i) => <span key={num} className={active === i ? 'active' : ''}>{num}</span>)}</div></div>
    <div className="objectives-list">{objectives.map(([num, title, text], i) => <article className={`objective-item ${active === i ? 'active' : ''}`} key={num}><div className="objective-number">{num}</div><div className="objective-copy"><h3>{title}</h3><p>{text}</p><span className="objective-arrow"></span></div></article>)}</div>
  </div></section>;
}
