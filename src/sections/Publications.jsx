
import SectionHeading from '../components/SectionHeading';

export default function Publications() {
  return <section id="publications" className="section publications-section"><div className="container"><SectionHeading index="07" eyebrow="Proceedings & Publications" title={<>Give your research a <em>wider room.</em></>} text="Selected papers from the conference will be considered for publication opportunities described in the conference material, subject to applicable terms and conditions." />
    <div className="pub-layout"><div className="pub-statement" data-reveal><div className="pub-quote">“</div><p>ICAEBMS-2026 Proceedings will be submitted to the Web of Science Book Citation Index (BkCI) and Scopus for evaluation and indexing purposes.</p><small>T&C apply. Please review the final publication and submission guidelines before submitting.</small></div><div className="pub-marks" data-reveal><div className="pub-mark"><span>SCOPUS</span><small>Evaluation / indexing</small></div><div className="pub-mark"><span>SCIE</span><small>Publication ecosystem</small></div><div className="pub-mark"><span>WEB OF SCIENCE</span><small>Book Citation Index</small></div><div className="pub-mark"><span>CLARIVATE</span><small>Research visibility</small></div></div></div>
  </div></section>;
}
