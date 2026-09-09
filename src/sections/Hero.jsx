import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { conference } from "../data/conferenceData";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);
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
        y: 20,
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
        y: 20,
        opacity: 0,
      });

      gsap.set(".hero-actions", {
        y: 20,
        opacity: 0,
      });

      gsap.set(".hero-visual", {
        y: 35,
        opacity: 0,
      });

      gsap.set(".hero-rail", {
        y: 25,
        opacity: 0,
      });

      gsap.set(".hero-top-line", {
        scaleX: 0,
        transformOrigin: "left center",
      });

      /* =========================================================
         INTRO
      ========================================================= */

      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .from(".hero-background-image", {
          scale: 1.12,
          duration: 2,
          ease: "power3.out",
        })
        .to(
          ".hero-top-line",
          {
            scaleX: 1,
            duration: 0.9,
          },
          "-=1.4"
        )
        .to(
          ".hero-kicker",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.45"
        )
        .to(
          ".hero-title-line",
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.75,
            stagger: 0.07,
            ease: "power3.inOut",
          },
          "-=0.35"
        )
        .to(
          ".hero-title-inner",
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.07,
            ease: "power4.out",
          },
          "-=0.6"
        )
        .to(
          ".hero-description",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.55"
        )
        .to(
          ".hero-actions",
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
          },
          "-=0.45"
        )
        .to(
          ".hero-visual",
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.65"
        )
        .to(
          ".hero-rail",
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
          },
          "-=0.4"
        );

      /* =========================================================
         FLOATING
      ========================================================= */

      if (!reduceMotion) {
        gsap.to(".title-accent", {
          y: -6,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".hero-image-card", {
          y: -6,
          duration: 4,
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
         DESKTOP SCROLL
      ========================================================= */

      if (!reduceMotion && imageRef.current && root.current) {
        gsap.to(imageRef.current, {
          yPercent: 12,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".hero-main", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "20% top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".hero-rail", {
          y: 60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "55% top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      /* =========================================================
         MOUSE EFFECT
      ========================================================= */

      const imageX = imageRef.current ? gsap.quickTo(imageRef.current, "x", {
        duration: 1.1,
        ease: "power3.out",
      }) : () => {};

      const imageY = imageRef.current ? gsap.quickTo(imageRef.current, "y", {
        duration: 1.1,
        ease: "power3.out",
      }) : () => {};

      const glowX = glowRef.current ? gsap.quickTo(glowRef.current, "x", {
        duration: 0.8,
        ease: "power3.out",
      }) : () => {};

      const glowY = glowRef.current ? gsap.quickTo(glowRef.current, "y", {
        duration: 0.8,
        ease: "power3.out",
      }) : () => {};

      const visualX = visualRef.current ? gsap.quickTo(visualRef.current, "x", {
        duration: 1.1,
        ease: "power3.out",
      }) : () => {};

      const visualY = visualRef.current ? gsap.quickTo(visualRef.current, "y", {
        duration: 1.1,
        ease: "power3.out",
      }) : () => {};

      const handleMouseMove = (event) => {
        if (window.innerWidth < 768 || reduceMotion) return;

        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;

        imageX(x * 18);
        imageY(y * 12);

        glowX(event.clientX - 250);
        glowY(event.clientY - 250);

        visualX(x * -8);
        visualY(y * -6);
      };

      window.addEventListener("mousemove", handleMouseMove);

      /* =========================================================
         MAGNETIC BUTTONS
      ========================================================= */

      const buttons = root.current?.querySelectorAll(".magnetic") || [];

      buttons.forEach((button) => {
        const xTo = gsap.quickTo(button, "x", {
          duration: 0.35,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(button, "y", {
          duration: 0.35,
          ease: "power3.out",
        });

        const enter = () => {
          gsap.to(button, {
            scale: 1.03,
            duration: 0.25,
          });
        };

        const move = (event) => {
          if (window.innerWidth < 768) return;

          const rect = button.getBoundingClientRect();

          const x =
            event.clientX -
            (rect.left + rect.width / 2);

          const y =
            event.clientY -
            (rect.top + rect.height / 2);

          xTo(x * 0.12);
          yTo(y * 0.12);
        };

        const leave = () => {
          xTo(0);
          yTo(0);

          gsap.to(button, {
            scale: 1,
            duration: 0.35,
          });
        };

        button.addEventListener("mouseenter", enter);
        button.addEventListener("mousemove", move);
        button.addEventListener("mouseleave", leave);

        button._cleanup = () => {
          button.removeEventListener("mouseenter", enter);
          button.removeEventListener("mousemove", move);
          button.removeEventListener("mouseleave", leave);
        };
      });

      /* =========================================================
         IMAGE TILT
      ========================================================= */

      const visual = visualRef.current;

      const visualMove = (event) => {
        if (!visual || window.innerWidth < 768 || reduceMotion) return;

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
          rotateY: x * 6,
          rotateX: -y * 6,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      const visualLeave = () => {
        gsap.to(".hero-image-card", {
          rotateY: 0,
          rotateX: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      };

      visual.addEventListener("mousemove", visualMove);
      visual.addEventListener("mouseleave", visualLeave);

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
          visualMove
        );

        visual.removeEventListener(
          "mouseleave",
          visualLeave
        );

        buttons.forEach((button) => {
          button._cleanup?.();
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
        min-h-[100svh]
        overflow-hidden
        bg-[#f4f0e8]
        text-[#111827]
      "
    >

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=2200&q=90"
          alt="International conference"
          className="
            hero-background-image
            absolute
            inset-[-6%]
            h-[112%]
            w-[112%]
            object-cover
            opacity-[0.1]
            grayscale
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[#f4f0e8]/95
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_80%_35%,rgba(201,154,61,.12),transparent_42%)]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.05]
            bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)]
            bg-[size:70px_70px]
          "
        />

        <div
          className="
            absolute
            right-[-25vw]
            top-[15%]
            h-[100vw]
            w-[100vw]
            max-h-[850px]
            max-w-[850px]
            rounded-full
            border
            border-[#111827]/[0.06]
          "
        />

        <div
          className="
            absolute
            -left-[200px]
            -top-[200px]
            h-[400px]
            w-[400px]
            rounded-full
            bg-[#c99a3d]/10
            blur-[100px]
          "
        />

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
            blur-[100px]
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
          px-5
          pt-5
          sm:px-6
          sm:pt-6
          md:px-10
          lg:px-14
        "
      >

        <div className="flex items-center justify-between">

          <div className="flex min-w-0 items-center gap-3">

            <div
              className="
                relative
                flex
                h-6
                w-6
                shrink-0
                items-center
                justify-center
                sm:h-7
                sm:w-7
              "
            >
              <span className="absolute h-2 w-2 rounded-full bg-[#c99a3d]" />

              <span
                className="
                  absolute
                  h-5
                  w-5
                  rounded-full
                  border
                  border-[#c99a3d]/40
                  sm:h-6
                  sm:w-6
                "
              />
            </div>

            <span
              className="
                truncate
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#111827]/60
                sm:text-[10px]
                sm:tracking-[0.25em]
              "
            >
              ICAEBMS / 2026
            </span>

          </div>

          <span
            className="
              ml-3
              shrink-0
              text-[8px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#9b7427]
              sm:text-[9px]
              sm:tracking-[0.22em]
            "
          >
            Hybrid Event
          </span>

        </div>

        <div
          className="
            hero-top-line
            mt-4
            h-px
            bg-[#111827]/15
            sm:mt-5
          "
        />

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        className="
          hero-main
          relative
          z-20
          px-5
          pb-32
          pt-10
          sm:px-6
          sm:pb-36
          sm:pt-12
          md:px-10
          md:pb-40
          md:pt-16
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
              grid-cols-1
              items-center
              gap-12
              md:gap-16
              lg:grid-cols-[1.3fr_.7fr]
              xl:grid-cols-[1.25fr_.75fr]
              lg:gap-20
            "
          >

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="min-w-0">

              {/* KICKER */}

              <div
                className="
                  hero-kicker
                  mb-6
                  flex
                  flex-wrap
                  items-center
                  gap-3
                  sm:mb-8
                  sm:gap-4
                "
              >

                <span
                  className="
                    flex
                    items-center
                    gap-2
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-[#9b7427]
                    sm:text-[10px]
                    sm:tracking-[0.28em]
                    md:text-xs
                  "
                >
                  <span className="h-px w-5 bg-[#c99a3d] sm:w-7" />

                  Global Academic Platform
                </span>

                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.14em]
                    text-[#111827]/35
                    sm:text-[9px]
                    sm:tracking-[0.2em]
                  "
                >
                  {conference?.edition || "ICAEBMS-2026"}
                </span>

              </div>

              {/* =================================================
                  TITLE
              ================================================= */}

              <div className="hero-title w-full max-w-[100%] lg:max-w-[950px] xl:max-w-[1100px]">

                {/* 1 */}

                <div
                  className="
                    hero-title-line
                    w-full
                    overflow-hidden
                    py-[0.08em]
                  "
                >
                  <div
                    className="
                      hero-title-inner
                      block
                      break-words
                      text-[clamp(2rem,8vw,7rem)]
                      font-black
                      leading-[0.98]
                      tracking-[-0.055em]
                      sm:text-[clamp(2.5rem,7vw,7rem)]
                      md:text-[clamp(3rem,6.5vw,7rem)]
                      lg:text-[clamp(3.5rem,5.5vw,7rem)]
                    "
                  >
                    Interdisciplinary
                  </div>
                </div>

                {/* 2 */}

                <div
                  className="
                    hero-title-line
                    w-full
                    overflow-hidden
                    py-[0.08em]
                  "
                >
                  <div
                    className="
                      hero-title-inner
                      title-accent
                      block
                      break-words
                      bg-gradient-to-r
                      from-[#9b7427]
                      via-[#d2a94e]
                      to-[#9b7427]
                      bg-clip-text
                      text-[clamp(2rem,8vw,7rem)]
                      font-black
                      leading-[0.95]
                      tracking-[-0.065em]
                      text-transparent
                      sm:text-[clamp(2.5rem,7vw,7rem)]
                      md:text-[clamp(3rem,6.5vw,7rem)]
                      lg:text-[clamp(3.5rem,5.5vw,7rem)]
                    "
                  >
                    Innovations
                  </div>
                </div>

                {/* 3 */}

                <div
                  className="
                    hero-title-line
                    w-full
                    overflow-hidden
                    py-[0.08em]
                  "
                >
                  <div
                    className="
                      hero-title-inner
                      flex
                      w-full
                      flex-wrap
                      items-baseline
                      gap-x-2
                      gap-y-1
                      text-[clamp(2rem,8vw,7rem)]
                      font-black
                      leading-[0.95]
                      tracking-[-0.065em]
                      sm:gap-x-3
                      sm:text-[clamp(2.5rem,7vw,7rem)]
                      md:gap-x-4
                      md:text-[clamp(3rem,6.5vw,7rem)]
                      lg:text-[clamp(3.5rem,5.5vw,7rem)]
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

                {/* 4 */}

                <div
                  className="
                    hero-title-line
                    w-full
                    overflow-hidden
                    py-[0.08em]
                  "
                >
                  <div
                    className="
                      hero-title-inner
                      block
                      text-[clamp(2rem,8vw,7rem)]
                      font-black
                      leading-[0.95]
                      tracking-[-0.065em]
                      sm:text-[clamp(2.5rem,7vw,7rem)]
                      md:text-[clamp(3rem,6.5vw,7rem)]
                      lg:text-[clamp(3.5rem,5.5vw,7rem)]
                    "
                  >
                    Future<span className="text-[#c99a3d]">.</span>
                  </div>
                </div>

              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p
                className="
                  hero-description
                  mt-7
                  max-w-2xl
                  text-[13px]
                  leading-6
                  text-[#111827]/55
                  sm:mt-8
                  sm:text-sm
                  sm:leading-7
                  md:mt-9
                  md:text-[15px]
                "
              >
                {conference?.name ||
                  "International Conference on Applied Science, Engineering, Education, Business, Management and Social Science & Humanities"}
              </p>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div
                className="
                  hero-actions
                  mt-7
                  flex
                  w-full
                  flex-col
                  gap-3
                  sm:mt-8
                  sm:flex-row
                  sm:flex-wrap
                "
              >

                <button
                  onClick={() => jumpTo("cta")}
                  className="
                    magnetic
                    group
                    relative
                    flex
                    min-h-[48px]
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-[#111827]
                    px-6
                    py-3.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-white
                    shadow-[0_15px_40px_rgba(17,24,39,.15)]
                    sm:w-auto
                    sm:min-h-[52px]
                    sm:px-7
                    sm:text-xs
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

                    <span className="text-[#c99a3d]">
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
                      group-hover:translate-y-0
                    "
                  />

                </button>

                <button
                  onClick={() => jumpTo("about")}
                  className="
                    magnetic
                    group
                    flex
                    min-h-[48px]
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    border
                    border-[#111827]/15
                    bg-white/40
                    px-6
                    py-3.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-[#111827]/75
                    backdrop-blur-md
                    sm:w-auto
                    sm:min-h-[52px]
                    sm:px-7
                    sm:text-xs
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

              {/* ORGANIZER */}

              <div
                className="
                  mt-6
                  max-w-xl
                  text-[8px]
                  uppercase
                  leading-5
                  tracking-[0.15em]
                  text-[#111827]/35
                  sm:mt-7
                  sm:text-[9px]
                  sm:tracking-[0.18em]
                "
              >
                Organized by{" "}
                <span className="font-bold text-[#111827]/55">
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
                max-w-[500px]
                lg:ml-auto
              "
            >

              {/* CARD */}

              <div
                className="
                  hero-image-card
                  relative
                  mx-auto
                  w-[76%]
                  max-w-[390px]
                  overflow-hidden
                  rounded-[1.5rem]
                  border
                  border-white/80
                  bg-white/40
                  shadow-[0_25px_70px_rgba(17,24,39,.14)]
                  [transform-style:preserve-3d]
                  sm:rounded-[2rem]
                  sm:w-[72%]
                "
              >

                <div className="aspect-[0.78]">

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

                </div>

                {/* TOP */}

                <div
                  className="
                    absolute
                    left-4
                    right-4
                    top-4
                    flex
                    items-center
                    justify-between
                    sm:left-5
                    sm:right-5
                    sm:top-5
                  "
                >

                  <span
                    className="
                      rounded-full
                      border
                      border-white/25
                      bg-black/15
                      px-2.5
                      py-1.5
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-white/80
                      backdrop-blur-md
                      sm:px-3
                      sm:text-[8px]
                    "
                  >
                    Hybrid Event
                  </span>

                  <span
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-white/70
                    "
                  >
                    01
                  </span>

                </div>

                {/* BOTTOM */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    right-5
                    text-white
                    sm:bottom-6
                    sm:left-6
                    sm:right-6
                  "
                >

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <span className="h-1.5 w-1.5 rounded-full bg-[#d5ab50]" />

                    <span
                      className="
                        text-[7px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-white/60
                        sm:text-[8px]
                      "
                    >
                      Bangkok, Thailand
                    </span>

                  </div>

                  <h3
                    className="
                      text-3xl
                      font-black
                      tracking-[-0.05em]
                      sm:text-4xl
                    "
                  >
                    10—11
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[8px]
                      uppercase
                      tracking-[0.2em]
                      text-white/55
                      sm:text-[9px]
                    "
                  >
                    August 2026
                  </p>

                </div>

              </div>

              {/* =================================================
                  DATE CARD
              ================================================= */}

              <div
                className="
                  absolute
                  -bottom-5
                  left-0
                  z-20
                  w-[140px]
                  rounded-xl
                  border
                  border-[#111827]/10
                  bg-[#f8f5ee]/95
                  p-4
                  shadow-[0_15px_40px_rgba(17,24,39,.1)]
                  backdrop-blur-xl
                  sm:-left-2
                  sm:-bottom-6
                  sm:w-[165px]
                  sm:rounded-2xl
                  sm:p-5
                  md:-left-5
                "
              >

                <div
                  className="
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#9b7427]
                    sm:text-[8px]
                    sm:tracking-[0.3em]
                  "
                >
                  Conference
                </div>

                <div
                  className="
                    mt-1
                    text-xl
                    font-black
                    tracking-[-0.05em]
                    sm:mt-2
                    sm:text-2xl
                  "
                >
                  2026
                </div>

                <div
                  className="
                    mt-0.5
                    text-[7px]
                    uppercase
                    tracking-[0.14em]
                    text-[#111827]/40
                    sm:text-[8px]
                  "
                >
                  10—11 August
                </div>

              </div>

              {/* =================================================
                  LOCATION CARD
              ================================================= */}

              <div
                className="
                  absolute
                  -right-1
                  top-[15%]
                  z-20
                  hidden
                  w-[125px]
                  rounded-xl
                  bg-[#111827]
                  p-3.5
                  text-white
                  shadow-[0_15px_40px_rgba(17,24,39,.14)]
                  sm:block
                  sm:w-[135px]
                  sm:rounded-2xl
                  sm:p-4
                  md:-right-2
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-[7px]
                    uppercase
                    tracking-[0.2em]
                    text-white/45
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c99a3d]" />

                  Location
                </div>

                <div className="mt-2 text-sm font-bold">
                  Bangkok
                </div>

                <div
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.14em]
                    text-white/40
                  "
                >
                  Thailand
                </div>

              </div>

              {/* DECORATIONS */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-2
                  -top-3
                  h-16
                  w-16
                  rounded-full
                  border
                  border-[#c99a3d]/35
                  sm:-right-4
                  sm:-top-5
                  sm:h-24
                  sm:w-24
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-2
                  -top-3
                  h-16
                  w-16
                  rounded-full
                  border
                  border-dashed
                  border-[#111827]/10
                  sm:-right-4
                  sm:-top-5
                  sm:h-24
                  sm:w-24
                "
              />

              <div
                className="
                  hero-pulse
                  absolute
                  right-[16%]
                  top-[4%]
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-[#c99a3d]
                  sm:h-3
                  sm:w-3
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[-40px]
                  right-[-5px]
                  z-[-1]
                  select-none
                  text-[8rem]
                  font-black
                  leading-none
                  tracking-[-0.12em]
                  text-[#111827]/[0.035]
                  sm:bottom-[-55px]
                  sm:right-[-15px]
                  sm:text-[12rem]
                "
              >
                26
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* =====================================================
          BOTTOM RAIL
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
          bg-[#f4f0e8]/90
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

          <div
            className="
              border-r
              border-[#111827]/10
              px-5
              py-3
              sm:px-6
              sm:py-4
              md:px-10
              md:py-5
            "
          >
            <span
              className="
                mb-1
                block
                text-[7px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#111827]/35
                sm:text-[8px]
                sm:tracking-[0.3em]
              "
            >
              Date
            </span>

            <span
              className="
                block
                truncate
                text-[10px]
                font-bold
                sm:text-xs
                md:text-sm
              "
            >
              {conference?.date || "10–11 Aug, 2026"}
            </span>
          </div>

          <div
            className="
              border-r
              border-[#111827]/10
              px-5
              py-3
              sm:px-6
              sm:py-4
              md:px-10
              md:py-5
            "
          >
            <span
              className="
                mb-1
                block
                text-[7px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#111827]/35
                sm:text-[8px]
                sm:tracking-[0.3em]
              "
            >
              Location
            </span>

            <span
              className="
                block
                truncate
                text-[10px]
                font-bold
                sm:text-xs
                md:text-sm
              "
            >
              {conference?.location || "Bangkok, Thailand"}
            </span>
          </div>

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

            <span className="text-sm font-bold">
              In-Person + Online
            </span>
          </div>

          <div
            className="
              px-5
              py-3
              sm:px-6
              sm:py-4
              md:px-10
              md:py-5
            "
          >
            <span
              className="
                mb-1
                block
                text-[7px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#111827]/35
                sm:text-[8px]
                sm:tracking-[0.3em]
              "
            >
              Host
            </span>

            <span
              className="
                text-[10px]
                font-bold
                sm:text-xs
                md:text-sm
              "
            >
              CERADA
            </span>
          </div>

        </div>
      </div>

      {/* =====================================================
          DESKTOP SCROLL
      ===================================================== */}

      <div
        className="
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
            width: 100%;
          }

          .hero-main {
            width: 100%;
          }

          .hero-title {
            width: 100%;
            max-width: 100%;
          }

          .hero-title-line {
            width: 100%;
            max-width: 100%;
          }

          .hero-title-inner {
            max-width: 100%;
            white-space: normal;
            overflow-wrap: break-word;
            word-break: break-word;
          }

          .hero-description {
            width: 100%;
            max-width: 100%;
          }

          .hero-visual {
            width: 100%;
            max-width: 100%;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-title-inner {
            white-space: normal;
            overflow-wrap: break-word;
            word-break: break-word;
          }
        }

        @media (min-width: 1024px) {
          .hero-title-inner {
            white-space: normal;
            overflow-wrap: break-word;
            word-break: break-word;
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