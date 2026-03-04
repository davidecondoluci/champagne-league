import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverText from "./HoverText";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "1. Scarica Jessico",
    desc: "Jessico è l'app dedicata ai calcetti: squadre, valutazioni, marcatori, assist e tornei — tutto in un posto.",
    bg: "color-mix(in srgb, var(--color-grape-600) 80%, var(--color-blue-900))",
  },
  {
    title: "2. Iscriviti all'app",
    desc: "Crea il tuo profilo su Jessico e accedi alla sezione tornei.",
    bg: "color-mix(in srgb, var(--color-grape-600) 60%, var(--color-blue-900))",
  },
  {
    title: "3. Entra nel torneo",
    desc: "Inserisci il codice XXXX nella sezione torneo, oppure cerca 'Champagne League' direttamente nell'app.",
    bg: "color-mix(in srgb, var(--color-grape-600) 40%, var(--color-blue-900))",
  },
  {
    title: "4. Unisciti",
    desc: "Iscriviti come capitano, crea la tua squadra e invita i tuoi amici — oppure partecipa ad una squadra già esistente.",
    bg: "color-mix(in srgb, var(--color-grape-600) 20%, var(--color-blue-900))",
  },
];

function Iscriviti() {
  const pinHeightRef = useRef(null);
  const containerRef = useRef(null);
  const circlesWrapRef = useRef(null);
  const circleRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const pinHeight = pinHeightRef.current;
    const container = containerRef.current;
    const circlesWrap = circlesWrapRef.current;
    const circles = circleRefs.current.filter(Boolean);
    const cards = cardRefs.current.filter(Boolean);
    if (!pinHeight || !container || !circlesWrap || !circles.length) return;

    // Center circles horizontally via GSAP (prevents conflict with CSS transform)
    gsap.set(circles, { xPercent: -50 });

    // Set initial card position: centred horizontally, pushed below viewport
    gsap.set(cards, { xPercent: -50, y: "55vh" });

    // Parallax on circles wrapper + pin the container
    gsap.fromTo(
      circlesWrap,
      { y: "5%" },
      {
        y: "-5%",
        ease: "none",
        scrollTrigger: {
          trigger: pinHeight,
          start: "top top",
          end: "bottom bottom",
          pin: container,
          scrub: true,
        },
      },
    );

    const angle = 3;
    const halfRange = ((circles.length - 1) * angle) / 2;
    let rot = -halfRange;
    const distPerCard =
      (pinHeight.clientHeight - window.innerHeight) / circles.length;

    circles.forEach((circle, i) => {
      const targetRot = rot;

      // Rotate the wheel spoke
      gsap.to(circle, {
        rotation: targetRot,
        ease: "power1.out",
        scrollTrigger: {
          trigger: pinHeight,
          start: "top top-=" + distPerCard * i,
          end: "+=" + distPerCard,
          scrub: true,
        },
      });

      // Move card up to centre + apply same rotation
      gsap.to(cards[i], {
        rotation: targetRot,
        y: "-50%", // override the initial y: "55vh" → centres card in viewport
        ease: "power1.out",
        scrollTrigger: {
          trigger: pinHeight,
          start: "top top-=" + distPerCard * i,
          end: "+=" + distPerCard,
          scrub: true,
        },
      });

      rot += angle;
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="iscriviti" className="overflow-hidden pb-16 md:pb-24">
      {/* Fan-wheel scroll effect — pin-height drives the scroll distance */}
      <div ref={pinHeightRef} className="h-[300vh]">
        {/* This 100vh container gets pinned by GSAP */}
        <div ref={containerRef} className="relative h-screen">
          {/* Title — sticky so it only appears when section is in viewport */}
          <div className="pointer-events-none absolute top-0 left-0 z-10 flex h-full w-full flex-col justify-between py-8">
            <h2 className="w-full text-center text-blue-900">
              <span>Come </span>
              <span className="font-playfair italic">iscriversi</span>
            </h2>
            {/* Button at the bottom of the pinned viewport */}
            <div className="pointer-events-auto flex w-full justify-center">
              <button className="bg-blue-900 text-white">
                <HoverText>Visita l'app</HoverText>
              </button>
            </div>
          </div>

          {/* Circles wrapper — subtle y parallax */}
          <div ref={circlesWrapRef} className="h-full">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => (circleRefs.current[i] = el)}
                className="absolute top-1/2 left-1/2 size-[250vw] rounded-full will-change-transform"
              >
                {/* Card at the top of the circle; GSAP moves it up on scroll */}
                <div
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="absolute top-0 left-1/2 flex w-[55vw] flex-col justify-end rounded-2xl p-4 will-change-transform md:w-[24vw] md:p-4"
                  style={{ aspectRatio: "0.75", backgroundColor: step.bg }}
                >
                  <div>
                    <h3 className="text-white">{step.title}</h3>
                    <p className="mt-2 text-white">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Iscriviti;
