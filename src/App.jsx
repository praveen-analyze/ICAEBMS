import { useEffect, useRef, useState } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import ConferenceSnapshot from './sections/ConferenceSnapshot';
import About from './sections/About';
import Theme from './sections/Theme';
import Objectives from './sections/Objectives';
import Highlights from './sections/Highlights';
import Tracks from './sections/Tracks';
import ImportantDates from './sections/ImportantDates';
import WhyJoin from './sections/WhyJoin';
import Publications from './sections/Publications';
import FinalCTA from './sections/FinalCTA';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. General elements reveal ───────────────────────────── */
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 87%',
              once: true
            }
          }
        );
      });

      /* ── 2. Staggered cards / lists reveal ────────────────────── */
      gsap.utils.toArray('.stagger-reveal').forEach((el) => {
        const children = el.children;
        gsap.fromTo(children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              once: true
            }
          }
        );
      });

      /* ── 3. Section headings slide-up reveal ──────────────────── */
      gsap.utils.toArray('.section-heading').forEach((el) => {
        const index   = el.querySelector('.section-index');
        const eyebrow = el.querySelector('.eyebrow');
        const h2      = el.querySelector('h2');
        const lead    = el.nextElementSibling;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });

        if (index)   tl.fromTo(index,   { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
        if (eyebrow) tl.fromTo(eyebrow, { y: 12,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');
        if (h2)      tl.fromTo(h2,      { y: 30,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.35');
        if (lead && lead.classList.contains('section-lead'))
          tl.fromTo(lead, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4');
      });

      /* ── 4. Highlight cards stagger ───────────────────────────── */
      const highlightGrid = document.querySelector('.highlight-grid');
      if (highlightGrid) {
        gsap.fromTo(highlightGrid.children,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.85,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: highlightGrid,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      /* ── 5. Track rows reveal ─────────────────────────────────── */
      const trackList = document.querySelector('.track-list');
      if (trackList) {
        gsap.fromTo(trackList.children,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: trackList,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      /* ── 6. Snapshot counter-up animation ─────────────────────── */
      const snapshotItems = document.querySelectorAll('.snapshot-item strong');
      snapshotItems.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 15 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              once: true
            }
          }
        );
      });

      /* ── 7. Pub marks reveal ──────────────────────────────────── */
      const pubMarks = document.querySelector('.pub-marks');
      if (pubMarks) {
        gsap.fromTo(pubMarks.children,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: 'back.out(1.3)',
            scrollTrigger: {
              trigger: pubMarks,
              start: 'top 82%',
              once: true
            }
          }
        );
      }

      /* ── 8. Why-Join feature panel reveal ─────────────────────── */
      const whyFeature = document.querySelector('.why-feature');
      if (whyFeature) {
        gsap.fromTo(whyFeature,
          { x: 40, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: whyFeature,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      /* ── 9. Footer brand heading reveal ───────────────────────── */
      const footerBrand = document.querySelector('.footer-brand h3');
      if (footerBrand) {
        gsap.fromTo(footerBrand,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerBrand,
              start: 'top 90%',
              once: true
            }
          }
        );
      }

      /* ── 10. Magnetic hover effect on buttons ─────────────────── */
      const magneticEls = document.querySelectorAll('.btn, .nav-submit');
      magneticEls.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect   = btn.getBoundingClientRect();
          const cx     = rect.left + rect.width  / 2;
          const cy     = rect.top  + rect.height / 2;
          const dx     = (e.clientX - cx) * 0.25;
          const dy     = (e.clientY - cy) * 0.25;
          gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
      });

      /* ── 11. Parallax — theme-orbit ───────────────────────────── */
      const themeOrbit = document.querySelector('.theme-orbit');
      if (themeOrbit) {
        gsap.to(themeOrbit, {
          yPercent: -18,
          rotation: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: '.theme-section',
            start: 'top bottom',
            end:   'bottom top',
            scrub: 1.2
          }
        });
      }

      /* ── 12. Kicker line grow animation ───────────────────────── */
      const kickerLine = document.querySelector('.kicker-line');
      if (kickerLine) {
        gsap.fromTo(kickerLine,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.8, delay: 0.8, ease: 'power3.out' }
        );
      }

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="site-shell">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <ConferenceSnapshot />
        <About />
        <Theme />
        <Objectives />
        <Highlights />
        <Tracks />
        <ImportantDates />
        <WhyJoin />
        <Publications />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
