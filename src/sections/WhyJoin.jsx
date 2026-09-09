import { useState } from 'react';

import SectionHeading from '../components/SectionHeading';
import { benefits } from '../data/conferenceData';

export default function WhyJoin() {
  const [active, setActive] = useState(0);
  return <section className="section why-section"><div className="container why-layout"><div className="why-head"><SectionHeading index="06" eyebrow="Why Join ICAEBMS?" title={<>A conference built for <em>momentum.</em></>} text="More than an academic event, ICAEBMS is a global platform for innovation, collaboration and growth." /></div>
    <div className="why-body"><div className="why-list">{benefits.map(([num, title, text], i) => <button className={active === i ? 'active' : ''} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} key={num}><span>{num}</span><strong>{title}</strong></button>)}</div><div className="why-feature"><span>{benefits[active][0]}</span><h3>{benefits[active][1]}</h3><p>{benefits[active][2]}</p><div className="why-feature-circle"></div></div></div>
  </div></section>;
}
