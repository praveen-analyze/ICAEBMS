export default function SectionHeading({ index, eyebrow, title, text, light = false }) {
  return (
    <div className={`section-heading ${light ? 'section-heading-light' : ''}`} data-reveal>
      <div className="section-index">{index}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {text && <p className="section-lead">{text}</p>}
      </div>
    </div>
  );
}
