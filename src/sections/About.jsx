
import SectionHeading from '../components/SectionHeading';

export default function About() {
  return <section id="about" className="section about-section"><div className="container">
    <SectionHeading index="01" eyebrow="Welcome to ICAEBMS-2026" title={<>A global room for <em>ideas</em> to meet impact.</>} text="ICAEBMS brings researchers, academicians, professionals and students together to exchange ideas, present findings and build collaborations across disciplines." />
    <div className="about-layout">
      <div className="about-visual" data-reveal>
        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Tech conference network" />
        <div className="about-caption"><span>INTERDISCIPLINARY BY DESIGN</span></div>
      </div>
      <div className="about-copy" data-reveal>
        <p className="large-copy">More than an academic gathering, ICAEBMS is a space for innovation, interchange and the creation of solutions that address real-world challenges.</p>
        <p>By bringing together applied science, engineering, education, business, management, social sciences and humanities, the conference creates connections that can move ideas beyond traditional boundaries.</p>
        <div className="about-mini-grid">
          <div><span><b>Cross-disciplinary</b> perspectives and collaboration.</span></div>
          <div><span><b>Global participation</b> across academic and professional communities.</span></div>
          <div><span><b>Practical outcomes</b> for a more sustainable and inclusive world.</span></div>
        </div>
      </div>
    </div>
  </div></section>;
}
