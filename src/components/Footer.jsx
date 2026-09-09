
import { conference } from '../data/conferenceData';

export default function Footer() {
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <div className="brand-mark footer-mark"><span>IC</span><span>A</span></div>
          <div>
            <p className="eyebrow light">ICAEBMS · 2026</p>
            <h3>Interdisciplinary<br /><em>Innovations</em><br />for a Sustainable Future</h3>
          </div>
        </div>
        <div className="footer-description">
          <p>{conference.name}</p>
          <span>{conference.organizer}</span>
        </div>
      </div>

      <div className="container footer-grid">
        <div>
          <p className="footer-label">Conference</p>
          <p>{conference.date}</p>
          <p>{conference.location}</p>
          <p>{conference.format}</p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <button onClick={() => jump('about')}>About</button>
          <button onClick={() => jump('tracks')}>Tracks</button>
          <button onClick={() => jump('dates')}>Important Dates</button>
          <button onClick={() => jump('publications')}>Publications</button>
        </div>
        <div>
          <p className="footer-label">Organizer</p>
          <p>Confworld Educational Research and Development Association</p>
          <p className="footer-isbn">ISBN {conference.isbn}</p>
        </div>
        <div className="footer-logos">
          <p className="footer-label">Partner Marks</p>
          <div className="logo-row"><span>CERADA</span><span>ICAEBMS</span></div>
          <div className="logo-row"><span>SDG</span><span>Scopus</span><span>WoS</span></div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 ICAEBMS. All rights reserved.</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top </button>
      </div>
    </footer>
  );
}
