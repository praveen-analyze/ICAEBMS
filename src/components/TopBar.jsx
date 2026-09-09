
import { conference } from '../data/conferenceData';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-track">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="topbar-loop" key={i}>
            <span className="topbar-live"> HYBRID EVENT</span>
            <span>You can participate in person at {conference.location} or virtually from your home or office.</span>
            <span className="topbar-dot">•</span>
            <span>{conference.date}</span>
            <span className="topbar-dot">•</span>
            <span>{conference.format}</span>
            
          </div>
        ))}
      </div>
    </div>
  );
}
