
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
  const orbitalRef = useRef(null);
  const stampRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* =========================================================
         HERO INTRO
      ========================================================= */

      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .from(".hero-bg", {
          scale: 1.18,
          duration: 2.2,
          ease: "power3.out",
        })
        .from(
          ".hero-noise",
          {
            opacity: 0,
            duration: 1.2,
          },
          "-=1.5"
        )
        .from(
          ".hero-nav-line",
          {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1,
          },
          "-=1"
        )
        .from(
          ".hero-eyebrow",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".title-line",
          {
            yPercent: 120,
            rotateX: 35,
            opacity: 0,
            duration: 1.15,
            stagger: 0.13,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.65"
        )
        .from(
          ".hero-actions",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".hero-index",
          {
            x: 40,
            opacity: 0,
            duration: 1,
          },
          "-=0.8"
        )
        .from(
          ".hero-orbit",
          {
            scale: 0.4,
            opacity: 0,
            rotation: -80,
            duration: 1.5,
            ease: "back.out(1.2)",
          },
          "-=1"
        );

      /* =========================================================
         TITLE WORD FLOAT
      ========================================================= */

      gsap.to(".title-accent", {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =========================================================
         ORBIT ROTATION
      ========================================================= */

      gsap.to(".orbit-ring-one", {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".orbit-ring-two", {
        rotation: -360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".orbit-dot", {
        scale: 1.7,
        opacity: 0.4,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =========================================================
         IMAGE PARALLAX
      ========================================================= */

      gsap.to(imageRef.current, {
        yPercent: 18,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =========================================================
         HERO EXIT
      ========================================================= */

      gsap.to(".hero-main-content", {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "45% top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-index", {
        yPercent: 25,
        rotate: 8,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "35% top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-scroll", {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: root.current,
          start: "10% top",
          end: "25% top",
          scrub: true,
        },
      });

      /* =========================================================
         MOUSE PARALLAX
      ========================================================= */

      const moveX = gsap.quickTo(imageRef.current, "x", {
        duration: 1.2,
        ease: "power3.out",
      });

      const moveY = gsap.quickTo(imageRef.current, "y", {
        duration: 1.2,
        ease: "power3.out",
      });

      const glowX = gsap.quickTo(glowRef.current, "x", {
        duration: 0.8,
        ease: "power3.out",
      });

      const glowY = gsap.quickTo(glowRef.current, "y", {
        duration: 0.8,
        ease: "power3.out",
      });

      const handleMouseMove = (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;

        moveX(x * 28);
        moveY(y * 20);

        glowX(e.clientX - 250);
        glowY(e.clientY - 250);

        gsap.to(".hero-title", {
          rotateY: x * 2,
          rotateX: -y * 2,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      /* =========================================================
         MAGNETIC BUTTONS
      ========================================================= */

      const magneticButtons = document.querySelectorAll(".magnetic");

      magneticButtons.forEach((button) => {
        const xTo = gsap.quickTo(button, "x", {
          duration: 0.4,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(button, "y", {
          duration: 0.4,
          ease: "power3.out",
        });

        const enter = () => {
          gsap.to(button, {
            scale: 1.04,
            duration: 0.3,
          });
        };

        const move = (e) => {
          const rect = button.getBoundingClientRect();

          const x =
            e.clientX - (rect.left + rect.width / 2);

          const y =
            e.clientY - (rect.top + rect.height / 2);

          xTo(x * 0.18);
          yTo(y * 0.18);
        };

        const leave = () => {
          xTo(0);
          yTo(0);

          gsap.to(button, {
            scale: 1,
            duration: 0.4,
          });
        };

        button.addEventListener("mouseenter", enter);
        button.addEventListener("mousemove", move);
        button.addEventListener("mouseleave", leave);
      });

      /* =========================================================
         ORBIT TILT
      ========================================================= */

      const orbit = orbitalRef.current;

      const orbitMove = (e) => {
        const rect = orbit.getBoundingClientRect();

        const x =
          (e.clientX - (rect.left + rect.width / 2)) /
          20;

        const y =
          (e.clientY - (rect.top + rect.height / 2)) /
          20;

        gsap.to(orbit, {
          rotateX: -y,
          rotateY: x,
          duration: 0.7,
          ease: "power3.out",
        });
      };

      const orbitLeave = () => {
        gsap.to(orbit, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      orbit.addEventListener("mousemove", orbitMove);
      orbit.addEventListener("mouseleave", orbitLeave);

      /* =========================================================
         RESPONSIVE
      ========================================================= */

      mm.add("(max-width: 767px)", () => {
        gsap.set(".hero-index", {
          scale: 0.75,
        });

        gsap.set(".hero-description", {
          maxWidth: "100%",
        });
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        orbit.removeEventListener("mousemove", orbitMove);
        orbit.removeEventListener("mouseleave", orbitLeave);

        magneticButtons.forEach((button) => {
          button.replaceWith(button.cloneNode(true));
        });
      };
    }, root);

    return () => ctx.revert();
  }, []);

  const jumpTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={root}
      className="
        relative
        min-h-screen
        bg-[#050A12]
        text-white
        overflow-hidden
        selection:bg-[#F4B942]
        selection:text-black
      "
    >

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 overflow-hidden">

        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2200&q=90"
          alt="International conference"
          className="
            hero-bg
            absolute
            inset-[-5%]
            w-[110%]
            h-[110%]
            object-cover
            opacity-50
            grayscale-[20%]
          "
        />

        {/* cinematic overlay */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(90deg,#050A12_0%,rgba(5,10,18,.82)_35%,rgba(5,10,18,.48)_70%,#050A12_100%)]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(180deg,#050A12_0%,transparent_30%,transparent_70%,#050A12_100%)]
          "
        />

        {/* grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.08]
            bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            bg-[size:80px_80px]
          "
        />

        {/* mouse glow */}
        <div
          ref={glowRef}
          className="
            absolute
            -left-[250px]
            -top-[250px]
            w-[500px]
            h-[500px]
            rounded-full
            bg-[#F4B942]/10
            blur-[100px]
            pointer-events-none
          "
        />

        {/* noise */}
        <div
          className="
            hero-noise
            absolute
            inset-0
            opacity-[0.055]
            pointer-events-none
            bg-[url('https://grainy-gradients.vercel.app/noise.svg')]
          "
        />
      </div>

      {/* =====================================================
          TOP SYSTEM BAR
      ===================================================== */}

      <div className="relative z-20 px-6 md:px-10 lg:px-14 pt-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-3 h-3 rounded-full bg-[#F4B942] shadow-[0_0_20px_#F4B942]" />

            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/60">
              ICAEBMS / 2026
            </span>

          </div>

          <span className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-white/40">
            International Conference
          </span>

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#F4B942]">
            Hybrid / 01
          </span>

        </div>

        <div className="hero-nav-line mt-5 h-px bg-white/15" />
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="relative z-10 min-h-[calc(100vh-100px)] flex items-center">

        <div className="hero-main-content w-full px-6 md:px-10 lg:px-14 py-16">

          <div className="max-w-[1500px] mx-auto">

            <div className="grid lg:grid-cols-12 gap-12 items-center">

              {/* =============================================
                  LEFT CONTENT
              ============================================= */}

              <div className="lg:col-span-8">

                <div className="hero-eyebrow flex items-center gap-4 mb-8">

                  <span className="text-[#F4B942] text-[10px] md:text-xs font-semibold tracking-[0.35em] uppercase">
                    Global Academic Platform
                  </span>

                  <span className="h-px w-16 bg-[#F4B942]/60" />

                  <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">
                    {conference?.edition || "ICAEBMS-2026"}
                  </span>

                </div>

                {/* TITLE */}

                <div
                  ref={titleRef}
                  className="hero-title max-w-5xl"
                  style={{
                    perspective: "1000px",
                  }}
                >

                  <div className="overflow-hidden">
                    <div className="title-line text-[clamp(3.8rem,9vw,9rem)] leading-[0.82] font-black tracking-[-0.065em]">
                      Interdisciplinary
                    </div>
                  </div>

                  <div className="overflow-hidden">

                    <div className="title-line text-[clamp(3.8rem,9vw,9rem)] leading-[0.82] font-black tracking-[-0.065em]">

                      <span className="title-accent text-transparent bg-clip-text bg-gradient-to-r from-[#F4B942] via-[#FFD76A] to-[#F4B942]">
                        Innovations
                      </span>

                    </div>

                  </div>

                  <div className="overflow-hidden">

                    <div className="title-line flex flex-wrap items-baseline gap-3 text-[clamp(3.8rem,9vw,9rem)] leading-[0.82] font-black tracking-[-0.065em]">

                      <span>for a</span>

                      <span className="italic font-serif font-normal text-white/90">
                        Sustainable
                      </span>

                    </div>

                  </div>

                  <div className="overflow-hidden">

                    <div className="title-line text-[clamp(3.8rem,9vw,9rem)] leading-[0.82] font-black tracking-[-0.065em]">

                      Future<span className="text-[#F4B942]">.</span>

                    </div>

                  </div>

                </div>

                {/* DESCRIPTION */}

                <p className="
                  hero-description
                  mt-10
                  max-w-2xl
                  text-sm
                  md:text-base
                  leading-7
                  text-white/55
                  font-light
                ">
                  {conference?.name ||
                    "International Conference on Applied Science, Engineering, Education, Business, Management and Social Science & Humanities"}
                </p>

                {/* ACTIONS */}

                <div className="hero-actions mt-10 flex flex-wrap gap-4">

                  <button
                    onClick={() => jumpTo("cta")}
                    className="
                      magnetic
                      group
                      relative
                      overflow-hidden
                      px-7
                      py-4
                      bg-[#F4B942]
                      text-[#050A12]
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      rounded-full
                    "
                  >

                    <span className="relative z-10">
                      Submit Your Paper
                    </span>

                    <span
                      className="
                        absolute
                        inset-0
                        translate-y-full
                        group-hover:translate-y-0
                        bg-white
                        transition-transform
                        duration-500
                      "
                    />

                  </button>

                  <button
                    onClick={() => jumpTo("about")}
                    className="
                      magnetic
                      group
                      flex
                      items-center
                      gap-3
                      px-7
                      py-4
                      rounded-full
                      border
                      border-white/20
                      bg-white/[0.04]
                      backdrop-blur-md
                      text-xs
                      uppercase
                      tracking-[0.15em]
                      text-white/80
                    "
                  >

                    Explore Conference

                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>

                  </button>

                </div>

              </div>

              {/* =============================================
                  RIGHT VISUAL
              ============================================= */}

              <div className="lg:col-span-4 flex justify-center lg:justify-end">

                <div
                  ref={orbitalRef}
                  className="
                    hero-orbit
                    relative
                    w-[280px]
                    h-[280px]
                    md:w-[340px]
                    md:h-[340px]
                  "
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >

                  {/* central number */}

                  <div className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    items-center
                    justify-center
                    z-10
                  ">

                    <span className="
                      text-[7rem]
                      md:text-[9rem]
                      leading-none
                      font-black
                      tracking-[-0.08em]
                      text-white/[0.07]
                    ">
                      26
                    </span>

                    <div className="
                      absolute
                      flex
                      flex-col
                      items-center
                    ">

                      <span className="text-[#F4B942] text-[9px] tracking-[0.4em] uppercase">
                        Edition
                      </span>

                      <span className="text-2xl font-bold tracking-[0.2em]">
                        2026
                      </span>

                    </div>

                  </div>

                  {/* rings */}

                  <div className="
                    orbit-ring-one
                    absolute
                    inset-5
                    rounded-full
                    border
                    border-[#F4B942]/25
                  " />

                  <div className="
                    orbit-ring-two
                    absolute
                    inset-12
                    rounded-full
                    border
                    border-white/15
                  " />

                  <div className="
                    absolute
                    inset-[25%]
                    rounded-full
                    border
                    border-[#F4B942]/10
                  " />

                  {/* orbit labels */}

                  <div className="
                    absolute
                    -top-3
                    left-1/2
                    -translate-x-1/2
                    px-3
                    py-1
                    bg-[#050A12]
                    border
                    border-white/10
                    text-[9px]
                    uppercase
                    tracking-[0.3em]
                    text-white/50
                  ">
                    Bangkok
                  </div>

                  <div className="
                    absolute
                    bottom-3
                    left-0
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-white/40
                  ">
                    10—11 AUG
                  </div>

                  <div className="
                    absolute
                    right-0
                    top-1/2
                    translate-y-[-50%]
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-[#F4B942]
                    [writing-mode:vertical-rl]
                  ">
                    Thailand
                  </div>

                  <div className="
                    orbit-dot
                    absolute
                    top-[18%]
                    right-[14%]
                    w-3
                    h-3
                    rounded-full
                    bg-[#F4B942]
                    shadow-[0_0_25px_#F4B942]
                  " />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM INFORMATION RAIL
      ===================================================== */}

      <div className="
        absolute
        bottom-0
        left-0
        right-0
        z-20
        border-t
        border-white/10
        bg-[#050A12]/60
        backdrop-blur-xl
      ">

        <div className="
          grid
          grid-cols-2
          md:grid-cols-4
          max-w-[1500px]
          mx-auto
        ">

          <div className="px-6 md:px-10 py-5 border-r border-white/10">

            <span className="block text-[9px] uppercase tracking-[0.3em] text-white/35 mb-1">
              Date
            </span>

            <span className="text-xs md:text-sm font-semibold">
              {conference?.date || "10–11 Aug, 2026"}
            </span>

          </div>

          <div className="px-6 md:px-10 py-5 border-r border-white/10">

            <span className="block text-[9px] uppercase tracking-[0.3em] text-white/35 mb-1">
              Location
            </span>

            <span className="text-xs md:text-sm font-semibold">
              {conference?.location || "Bangkok, Thailand"}
            </span>

          </div>

          <div className="hidden md:block px-6 md:px-10 py-5 border-r border-white/10">

            <span className="block text-[9px] uppercase tracking-[0.3em] text-white/35 mb-1">
              Format
            </span>

            <span className="text-xs md:text-sm font-semibold">
              In-Person + Online
            </span>

          </div>

          <div className="px-6 md:px-10 py-5">

            <span className="block text-[9px] uppercase tracking-[0.3em] text-white/35 mb-1">
              Host
            </span>

            <span className="text-xs md:text-sm font-semibold">
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
          right-6
          md:right-10
          lg:right-14
          bottom-28
          z-30
          hidden
          md:flex
          flex-col
          items-center
          gap-4
        "
      >

        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.4em]
            text-white/35
            [writing-mode:vertical-rl]
          "
        >
          Scroll to discover
        </span>

        <div className="relative h-16 w-px overflow-hidden bg-white/10">

          <div className="
            absolute
            top-0
            left-0
            w-full
            h-1/2
            bg-[#F4B942]
            animate-[scrollLine_1.8s_ease-in-out_infinite]
          " />

        </div>

      </div>

    </section>
  );
}

