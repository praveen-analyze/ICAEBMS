import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { conference } from "../data/conferenceData";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);
  const titleRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /* =========================================================
         INITIAL STATES
      ========================================================= */

      gsap.set(".hero-kicker", {
        y: 25,
        opacity: 0,
      });

      gsap.set(".hero-title-line", {
        clipPath: "inset(0 0 100% 0)",
      });

      gsap.set(".hero-title-inner", {
        yPercent: 105,
        opacity: 0,
      });

      gsap.set(".hero-description", {
        y: 25,
        opacity: 0,
      });

      gsap.set(".hero-actions", {
        y: 25,
        opacity: 0,
      });

      gsap.set(".hero-visual", {
        x: 80,
        opacity: 0,
      });

      gsap.set(".hero-rail", {
        y: 40,
        opacity: 0,
      });

      gsap.set(".hero-top-line", {
        scaleX: 0,
        transformOrigin: "left center",
      });

      /* =========================================================
         INTRO TIMELINE
      ========================================================= */

      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .from(".hero-background-image", {
          scale: 1.16,
          duration: 2.2,
          ease: "power3.out",
        })
        .to(
          ".hero-top-line",
          {
            scaleX: 1,
            duration: 1,
          },
          "-=1.5"
        )
        .to(
          ".hero-kicker",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.5"
        )
        .to(
          ".hero-title-line",
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.inOut",
          },
          "-=0.45"
        )
        .to(
          ".hero-title-inner",
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.75"
        )
        .to(
          ".hero-description",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.65"
        )
        .to(
          ".hero-actions",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.55"
        )
        .to(
          ".hero-visual",
          {
            x: 0,
            opacity: 1,
            duration: 1.25,
            ease: "power3.out",
          },
          "-=1"
        )
        .to(
          ".hero-rail",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.7"
        );

      /* =========================================================
         FLOATING WORD
      ========================================================= */

      if (!reduceMotion) {
        gsap.to(".title-accent", {
          y: -7,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".hero-image-card", {
          y: -8,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".hero-image-number", {
          y: 6,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".hero-pulse", {
          scale: 1.5,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power2.out",
        });
      }

      /* =========================================================
         IMAGE PARALLAX
      ========================================================= */

      if (!reduceMotion) {
        gsap.to(imageRef.current, {
          yPercent: 14,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".hero-main", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "25% top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".hero-visual", {
          yPercent: -8,
          rotate: -2,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".hero-rail", {
          y: 80,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "50% top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      /* =========================================================
         MOUSE PARALLAX
      ========================================================= */

      const moveImageX = gsap.quickTo(imageRef.current, "x", {
        duration: 1.2,
        ease: "power3.out",
      });

      const moveImageY = gsap.quickTo(imageRef.current, "y", {
        duration: 1.2,
        ease: "power3.out",
      });

      const moveGlowX = gsap.quickTo(glowRef.current, "x", {
        duration: 0.9,
        ease: "power3.out",
      });

      const moveGlowY = gsap.quickTo(glowRef.current, "y", {
        duration: 0.9,
        ease: "power3.out",
      });

      const moveVisualX = gsap.quickTo(visualRef.current, "x", {
        duration: 1.3,
        ease: "power3.out",
      });

      const moveVisualY = gsap.quickTo(visualRef.current, "y", {
        duration: 1.3,
        ease: "power3.out",
      });

      const handleMouseMove = (event) => {
        if (window.innerWidth < 768 || reduceMotion) return;

        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;

        moveImageX(x * 22);
        moveImageY(y * 16);

        moveGlowX(event.clientX - 250);
        moveGlowY(event.clientY - 250);

        moveVisualX(x * -12);
        moveVisualY(y * -8);
      };

      window.addEventListener("mousemove", handleMouseMove);

      /* =========================================================
         MAGNETIC BUTTONS
      ========================================================= */

      const magneticButtons =
        root.current.querySelectorAll(".magnetic");

      magneticButtons.forEach((button) => {
        const xTo = gsap.quickTo(button, "x", {
          duration: 0.45,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(button, "y", {
          duration: 0.45,
          ease: "power3.out",
        });

        const enter = () => {
          gsap.to(button, {
            scale: 1.035,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const move = (event) => {
          const rect = button.getBoundingClientRect();

          const x =
            event.clientX -
            (rect.left + rect.width / 2);

          const y =
            event.clientY -
            (rect.top + rect.height / 2);

          xTo(x * 0.16);
          yTo(y * 0.16);
        };

        const leave = () => {
          xTo(0);
          yTo(0);

          gsap.to(button, {
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
          });
        };

        button.addEventListener("mouseenter", enter);
        button.addEventListener("mousemove", move);
        button.addEventListener("mouseleave", leave);

        button._heroCleanup = () => {
          button.removeEventListener("mouseenter", enter);
          button.removeEventListener("mousemove", move);
          button.removeEventListener("mouseleave", leave);
        };
      });

      /* =========================================================
         IMAGE CARD TILT
      ========================================================= */

      const visual = visualRef.current;

      const handleVisualMove = (event) => {
        if (window.innerWidth < 768 || reduceMotion) return;

        const rect = visual.getBoundingClientRect();

        const x =
          (event.clientX -
            (rect.left + rect.width / 2)) /
          rect.width;

        const y =
          (event.clientY -
            (rect.top + rect.height / 2)) /
          rect.height;

        gsap.to(".hero-image-card", {
          rotateY: x * 8,
          rotateX: -y * 8,
          duration: 0.7,
          ease: "power3.out",
        });
      };

      const handleVisualLeave = () => {
        gsap.to(".hero-image-card", {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      visual.addEventListener("mousemove", handleVisualMove);
      visual.addEventListener("mouseleave", handleVisualLeave);

      /* =========================================================
         CLEANUP
      ========================================================= */

      return () => {
        window.removeEventListener(
          "mousemove",
          handleMouseMove
        );

        visual.removeEventListener(
          "mousemove",
          handleVisualMove
        );

        visual.removeEventListener(
          "mouseleave",
          handleVisualLeave
        );

        magneticButtons.forEach((button) => {
          button._heroCleanup?.();
        });
      };
    }, root);

    return () => ctx.revert();
  }, []);

  const jumpTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      ref={root}
      className="
        hero-section
        relative
        min-h-screen
        overflow-hidden
        bg-[#f4f0e8]
        text-[#111827]
        selection:bg-[#c99a3d]
        selection:text-white
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none">

        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2200&q=90"
          alt="International conference"
          className="
            hero-background-image
            absolute
            inset-[-8%]
            h-[116%]
            w-[116%]
            object-cover
            opacity-[0.13]
            grayscale
          "
        />

        {/* Cream overlay */}

        <div
          className="
            absolute
            inset-0
            bg-[#f4f0e8]/90
          "
        />

        {/* Right-side warm gradient */}

        <div
          className="
            absolute
            right-0
            top-0
            h-full
            w-[65%]
            bg-[radial-gradient(circle_at_70%_45%,rgba(201,154,61,.13),transparent_55%)]
          "
        />

        {/* Editorial grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.07]
            bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)]
            bg-[size:90px_90px]
          "
        />

        {/* Large decorative circle */}

        <div
          className="
            absolute
            -right-[18vw]
            top-[10vh]
            h-[65vw]
            w-[65vw]
            max-h-[850px]
            max-w-[850px]
            rounded-full
            border
            border-[#111827]/[0.08]
          "
        />

        <div
          className="
            absolute
            -right-[10vw]
            top-[18vh]
            h-[48vw]
            w-[48vw]
            max-h-[620px]
            max-w-[620px]
            rounded-full
            border
            border-[#c99a3d]/20
          "
        />

        {/* Mouse glow */}

        <div
          ref={glowRef}
          className="
            absolute
            left-[-250px]
            top-[-250px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#c99a3d]/10
            blur-[110px]
          "
        />
      </div>

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header
        className="
          relative
          z-30
          px-6
          pt-6
          md:px-10
          lg:px-14
          lg:pt-7
        "
      >
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute h-2 w-2 rounded-full bg-[#c99a3d]" />

              <span
                className="
                  absolute
                  h-6
                  w-6
                  rounded-full
                  border
                  border-[#c99a3d]/40
                "
              />
            </div>

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#111827]/65
                md:text-xs
              "
            >
              ICAEBMS / 2026
            </span>

          </div>

          <div
            className="
              hidden
              text-[9px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-[#111827]/40
              md:block
            "
          >
            International Conference
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              text-[9px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#9b7427]
              md:text-[10px]
            "
          >
            Hybrid Event

            <span className="h-1.5 w-1.5 rounded-full bg-[#c99a3d]" />
          </div>
        </div>

        <div
          className="
            hero-top-line
            mt-5
            h-px
            w-full
            bg-[#111827]/15
          "
        />
      </header>

      {/* =====================================================
          MAIN HERO
      ===================================================== */}

      <div
        className="
          hero-main
          relative
          z-20
          flex
          min-h-[calc(100vh-120px)]
          items-center
          px-6
          py-14
          md:px-10
          md:py-20
          lg:px-14
          lg:py-16
        "
      >

        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
          "
        >

          <div
            className="
              grid
              items-center
              gap-14
              lg:grid-cols-[1.15fr_.85fr]
              lg:gap-20
            "
          >

            {/* =================================================
                LEFT
            ================================================= */}

            <div>

              {/* KICKER */}

              <div
                className="
                  hero-kicker
                  mb-8
                  flex
                  flex-wrap
                  items-center
                  gap-4
                "
              >

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-[#9b7427]
                    md:text-xs
                  "
                >
                  <span className="h-px w-8 bg-[#c99a3d]" />

                  Global Academic Platform
                </span>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-[#111827]/35
                  "
                >
                  {conference?.edition || "ICAEBMS-2026"}
                </span>

              </div>

              {/* =================================================
                  TITLE

                  IMPORTANT:
                  The wrapper has controlled clipping and
                  sufficient padding so GSAP never cuts letters.
              ================================================= */}

              <div
                ref={titleRef}
                className="
                  hero-title
                  max-w-[1050px]
                  [perspective:1000px]
                "
              >

                {/* Line 1 */}

                <div
                  className="
                    hero-title-line
                    overflow-hidden
                    pb-[0.08em]
                  "
                >
                  <div
                    className="
                      hero-title-inner
                      block
                      text-[clamp(3.5rem,8.5vw,8.8rem)]
                      font-black
                      leading-[0.91]
                      tracking-[-0.065em]
                    "
                  >
                    Interdisciplinary
                  </div>
                </div>

                {/* Line 2 */}

                <div
                  className="
                    hero-title-line
                    overflow-hidden
                    pb-[0.08em]
                  "
                >
                  <div
                    className="
                      hero-title-inner
                      title-accent
                      block
                      text-[clamp(3.5rem,8.5vw,8.8rem)]
                      font-black
                      leading-[0.91]
                      tracking-[-0.065em]
                      text-transparent
                      bg-clip-text
                      bg-gradient-to-r
                      from-[#9b7427]
                      via-[#d2a94e]
                      to-[#9b7427]
                    "
                  >
                    Innovations
                  </div>
                </div>

                {/* Line 3 */}

                <div
                  className="
                    hero-title-line
                    overflow-hidden
                    pb-[0.08em]
                  "
                >
                  <div
                    className="
                      hero-title-inner
                      flex
                      flex-wrap
                      items-baseline
                      gap-x-4
                      text-[clamp(3.5rem,8.5vw,8.8rem)]
                      font-black
                      leading-[0.91]
                      tracking-[-0.065em]
                    "
                  >
                    <span>for a</span>

                    <span
                      className="
                        font-serif
                        font-normal
                        italic
                        text-[#263142]/85
                      "
                    >
                      Sustainable
                    </span>
                  </div>
                </div>

                {/* Line 4 */}

                <div
                  className="
                    hero-title-line
                    overflow-hidden
                    pb-[0.08em]
                  "
                >
                  <div
                    className="
                      hero-title-inner
                      block
                      text-[clamp(3.5rem,8.5vw,8.8rem)]
                      font-black
                      leading-[0.91]
                      tracking-[-0.065em]
                    "
                  >
                    Future
                    <span className="text-[#c99a3d]">.</span>
                  </div>
                </div>

              </div>

              {/* DESCRIPTION */}

              <p
                className="
                  hero-description
                  mt-9
                  max-w-2xl
                  text-sm
                  font-normal
                  leading-7
                  text-[#111827]/55
                  md:text-[15px]
                  md:leading-7
                "
              >
                {conference?.name ||
                  "International Conference on Applied Science, Engineering, Education, Business, Management and Social Science & Humanities"}
              </p>

              {/* ACTIONS */}

              <div
                className="
                  hero-actions
                  mt-9
                  flex
                  flex-wrap
                  gap-3
                "
              >

                {/* PRIMARY */}

                <button
                  onClick={() => jumpTo("cta")}
                  className="
                    magnetic
                    group
                    relative
                    overflow-hidden
                    rounded-full
                    bg-[#111827]
                    px-7
                    py-4
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white
                    shadow-[0_15px_40px_rgba(17,24,39,.18)]
                  "
                >

                  <span
                    className="
                      relative
                      z-10
                      flex
                      items-center
                      gap-3
                    "
                  >
                    Submit Your Paper

                    <span
                      className="
                        text-[#c99a3d]
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    >
                      ↗
                    </span>
                  </span>

                  <span
                    className="
                      absolute
                      inset-0
                      translate-y-full
                      bg-[#c99a3d]
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:translate-y-0
                    "
                  />

                </button>

                {/* SECONDARY */}

                <button
                  onClick={() => jumpTo("about")}
                  className="
                    magnetic
                    group
                    flex
                    items-center
                    gap-4
                    rounded-full
                    border
                    border-[#111827]/15
                    bg-white/35
                    px-7
                    py-4
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-[#111827]/75
                    backdrop-blur-md
                    transition-colors
                    duration-300
                    hover:bg-white/70
                  "
                >
                  Explore Conference

                  <span
                    className="
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#111827]/15
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </button>

              </div>

              {/* SMALL ORGANIZER LINE */}

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  items-center
                  gap-3
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-[#111827]/35
                "
              >
                <span>Organized by</span>

                <span className="font-bold text-[#111827]/60">
                  Confworld Educational Research and Development
                  Association
                </span>

              </div>

            </div>

            {/* =================================================
                RIGHT VISUAL
            ================================================= */}

            <div
              ref={visualRef}
              className="
                hero-visual
                relative
                mx-auto
                w-full
                max-w-[550px]
                lg:ml-auto
              "
            >

              {/* Decorative vertical label */}

              <div
                className="
                  absolute
                  -left-8
                  top-1/2
                  z-20
                  hidden
                  -translate-y-1/2
                  -rotate-90
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.35em]
                  text-[#111827]/35
                  lg:block
                "
              >
                International / 2026
              </div>

              {/* IMAGE CARD */}

              <div
                className="
                  hero-image-card
                  relative
                  mx-auto
                  aspect-[0.78]
                  w-[78%]
                  max-w-[410px]
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/70
                  bg-white/50
                  shadow-[0_35px_100px_rgba(17,24,39,.16)]
                  [transform-style:preserve-3d]
                "
              >

                <img
                  src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=90"
                  alt="Conference audience"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    grayscale-[20%]
                  "
                />

                {/* Image overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#111827]/90
                    via-[#111827]/20
                    to-transparent
                  "
                />

                {/* Top label */}

                <div
                  className="
                    absolute
                    left-5
                    right-5
                    top-5
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      rounded-full
                      border
                      border-white/25
                      bg-black/15
                      px-3
                      py-1.5
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.25em]
                      text-white/80
                      backdrop-blur-md
                    "
                  >
                    Hybrid Event
                  </span>

                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-white/70
                    "
                  >
                    01
                  </span>

                </div>

                {/* Bottom content */}

                <div
                  className="
                    absolute
                    bottom-6
                    left-6
                    right-6
                    text-white
                  "
                >

                  <div
                    className="
                      mb-3
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d5ab50]" />

                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-white/60
                      "
                    >
                      Bangkok, Thailand
                    </span>
                  </div>

                  <h3
                    className="
                      text-3xl
                      font-bold
                      tracking-[-0.04em]
                      md:text-4xl
                    "
                  >
                    10—11
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      uppercase
                      tracking-[0.3em]
                      text-white/55
                    "
                  >
                    August 2026
                  </p>

                </div>

              </div>

              {/* =================================================
                  FLOATING DATE CARD
              ================================================= */}

              <div
                className="
                  absolute
                  -bottom-7
                  left-0
                  z-30
                  w-[180px]
                  rounded-2xl
                  border
                  border-[#111827]/10
                  bg-[#f8f5ee]/95
                  p-5
                  shadow-[0_20px_50px_rgba(17,24,39,.12)]
                  backdrop-blur-xl
                  md:-left-8
                "
              >

                <div
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-[#9b7427]
                  "
                >
                  Conference
                </div>

                <div
                  className="
                    mt-2
                    text-2xl
                    font-black
                    tracking-[-0.05em]
                    text-[#111827]
                  "
                >
                  2026
                </div>

                <div
                  className="
                    mt-1
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-[#111827]/40
                  "
                >
                  10—11 August
                </div>

              </div>

              {/* =================================================
                  FLOATING LOCATION CARD
              ================================================= */}

              <div
                className="
                  absolute
                  -right-3
                  top-[18%]
                  z-30
                  hidden
                  w-[145px]
                  rounded-2xl
                  border
                  border-[#111827]/10
                  bg-[#111827]
                  p-4
                  text-white
                  shadow-[0_20px_50px_rgba(17,24,39,.18)]
                  md:block
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-white/45
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c99a3d]" />

                  Location
                </div>

                <div
                  className="
                    mt-2
                    text-sm
                    font-bold
                  "
                >
                  Bangkok
                </div>

                <div
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-white/40
                  "
                >
                  Thailand
                </div>

              </div>

              {/* =================================================
                  ORBIT
              ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-3
                  -top-5
                  h-24
                  w-24
                  rounded-full
                  border
                  border-[#c99a3d]/30
                  md:-right-8
                  md:-top-8
                  md:h-32
                  md:w-32
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-3
                  -top-5
                  h-24
                  w-24
                  rounded-full
                  border
                  border-dashed
                  border-[#111827]/10
                  md:-right-8
                  md:-top-8
                  md:h-32
                  md:w-32
                "
              />

              <div
                className="
                  hero-pulse
                  pointer-events-none
                  absolute
                  right-[18%]
                  top-[4%]
                  h-3
                  w-3
                  rounded-full
                  bg-[#c99a3d]
                "
              />

              {/* Large background number */}

              <div
                className="
                  hero-image-number
                  pointer-events-none
                  absolute
                  bottom-[-55px]
                  right-[-15px]
                  z-[-1]
                  select-none
                  text-[10rem]
                  font-black
                  leading-none
                  tracking-[-0.12em]
                  text-[#111827]/[0.035]
                  md:text-[14rem]
                "
              >
                26
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM INFORMATION RAIL
      ===================================================== */}

      <div
        className="
          hero-rail
          absolute
          bottom-0
          left-0
          right-0
          z-30
          border-t
          border-[#111827]/10
          bg-[#f4f0e8]/75
          backdrop-blur-xl
        "
      >

        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            grid-cols-2
            md:grid-cols-4
          "
        >

          {/* DATE */}

          <div
            className="
              border-r
              border-[#111827]/10
              px-6
              py-4
              md:px-10
              md:py-5
            "
          >
            <span
              className="
                mb-1
                block
                text-[8px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#111827]/35
              "
            >
              Date
            </span>

            <span
              className="
                text-xs
                font-bold
                text-[#111827]
                md:text-sm
              "
            >
              {conference?.date || "10–11 Aug, 2026"}
            </span>
          </div>

          {/* LOCATION */}

          <div
            className="
              border-r
              border-[#111827]/10
              px-6
              py-4
              md:px-10
              md:py-5
            "
          >
            <span
              className="
                mb-1
                block
                text-[8px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#111827]/35
              "
            >
              Location
            </span>

            <span
              className="
                text-xs
                font-bold
                text-[#111827]
                md:text-sm
              "
            >
              {conference?.location || "Bangkok, Thailand"}
            </span>
          </div>

          {/* FORMAT */}

          <div
            className="
              hidden
              border-r
              border-[#111827]/10
              px-6
              py-4
              md:block
              md:px-10
              md:py-5
            "
          >
            <span
              className="
                mb-1
                block
                text-[8px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#111827]/35
              "
            >
              Format
            </span>

            <span
              className="
                text-xs
                font-bold
                text-[#111827]
                md:text-sm
              "
            >
              In-Person + Online
            </span>
          </div>

          {/* HOST */}

          <div
            className="
              px-6
              py-4
              md:px-10
              md:py-5
            "
          >
            <span
              className="
                mb-1
                block
                text-[8px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#111827]/35
              "
            >
              Host
            </span>

            <span
              className="
                text-xs
                font-bold
                text-[#111827]
                md:text-sm
              "
            >
              CERADA
            </span>
          </div>

        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <div
        className="
          hero-scroll
          absolute
          bottom-28
          right-6
          z-30
          hidden
          flex-col
          items-center
          gap-4
          md:flex
          lg:right-12
        "
      >

        <span
          className="
            [writing-mode:vertical-rl]
            text-[8px]
            font-bold
            uppercase
            tracking-[0.35em]
            text-[#111827]/35
          "
        >
          Scroll to discover
        </span>

        <div
          className="
            relative
            h-14
            w-px
            overflow-hidden
            bg-[#111827]/15
          "
        >

          <div
            className="
              absolute
              left-0
              top-0
              h-1/2
              w-full
              bg-[#c99a3d]
              animate-[heroScroll_1.8s_ease-in-out_infinite]
            "
          />

        </div>
      </div>

      {/* =====================================================
          MOBILE DATE LABEL
      ===================================================== */}

      <div
        className="
          absolute
          bottom-3
          left-1/2
          z-40
          -translate-x-1/2
          text-[8px]
          font-bold
          uppercase
          tracking-[0.3em]
          text-[#111827]/30
          md:hidden
        "
      >
        ICAEBMS — Bangkok 2026
      </div>

      {/* =====================================================
          INLINE ANIMATION
      ===================================================== */}

      <style>{`
        @keyframes heroScroll {
          0% {
            transform: translateY(-100%);
          }

          50% {
            transform: translateY(100%);
          }

          100% {
            transform: translateY(200%);
          }
        }

        @media (max-width: 767px) {
          .hero-section {
            min-height: 100svh;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-section *,
          .hero-section *::before,
          .hero-section *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}