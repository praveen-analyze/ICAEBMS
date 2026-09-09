import { useState } from 'react';

import SectionHeading from '../components/SectionHeading';
import { tracks } from '../data/conferenceData';

export default function Tracks() {
  const [open, setOpen] = useState(0);
  return <section id="tracks" className="section tracks-section"><div className="container"><SectionHeading index="04" eyebrow="Call for Papers" title={<>Six tracks. <em>One shared conversation.</em></>} text="We invite researchers, academicians and professionals to submit their papers." />
    <div className="track-list">{tracks.map(([num, title], i) => <div className={`track-row ${open === i ? 'open' : ''}`} key={num}><button onMouseEnter={() => setOpen(i)} onFocus={() => setOpen(i)} onClick={() => setOpen(open === i ? -1 : i)}><span className="track-num">{num}</span><strong>{title}</strong><span className="track-icon">{open === i ? '-' : '+'}</span></button>{open === i && <div className="track-detail"><p>Explore research and emerging practice in <b>{title.toLowerCase()}</b> within an interdisciplinary setting.</p><button onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>Prepare your paper </button></div>}</div>)}</div>
  </div></section>;
}
