import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "../components/Button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    icon: "/icons/jessico.svg",
    label: "Passo 1",
    title: "Scarica Jessico",
    desc: "L'app ufficiale per tornei, squadre e statistiche live. Disponibile su App Store e Google Play.",
    bg: "var(--color-green-400)",
    text: "var(--color-white)",
  },
  {
    num: "02",
    icon: "/icons/app-registration.svg",
    label: "Passo 2",
    title: "Crea il profilo",
    desc: "Registrati in pochi secondi e accedi alla sezione Tornei dell'app.",
    bg: "var(--color-green-600)",
    text: "var(--color-white)",
  },
  {
    num: "03",
    icon: "/icons/login.svg",
    label: "Passo 3",
    title: "CHAM2026",
    desc: "Inserisci il codice torneo o cerca \u201CChampagne League\u201D direttamente nell'app.",
    bg: "var(--color-green-700)",
    text: "var(--color-white)",
  },
  {
    num: "04",
    icon: "/icons/person-add.svg",
    label: "Passo 4",
    title: "Forma la squadra",
    desc: "250\u20AC a squadra + 5\u20AC a giocatore. Iscrizioni aperte fino al 27 giugno 2026.",
    bg: "var(--color-green-800)",
    text: "var(--color-white)",
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
        y: "-40%", // slightly below centre
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
    <section id="iscriviti" className="overflow-hidden bg-white">
      {/* Fan-wheel scroll effect — pin-height drives the scroll distance */}
      <div ref={pinHeightRef} className="h-[300vh]">
        {/* This 100vh container gets pinned by GSAP */}
        <div ref={containerRef} className="relative h-screen">
          {/* Title — sticky so it only appears when section is in viewport */}
          <div className="pointer-events-none absolute top-0 left-0 z-10 flex h-full w-full flex-col justify-between py-24 md:py-12">
            <h2 className="text-center text-blue-900">
              <span>Come </span>
              <span className="font-playfair italic">iscriversi</span>
            </h2>
            {/* Store badges at the bottom of the pinned viewport */}
            {/* <div className="pointer-events-auto flex w-full justify-center gap-4">
              <a href="/jessico" aria-label="Scarica su App Store">
                <img src="/app-store.svg" alt="App Store" className="h-12" />
              </a>
              <a href="/jessico" aria-label="Scarica su Google Play">
                <img
                  src="/google-play.svg"
                  alt="Google Play"
                  className="h-12"
                />
              </a>
            </div> */}
            <div className="pointer-events-auto flex w-full justify-center">
              <Button
                onClick={() => window.open("https://jessico.app/", "_blank")}
                className="bg-blue-900 text-white"
              >
                Scarica l'app
              </Button>
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
                  className="absolute top-0 left-1/2 flex aspect-3/4 w-[60vw] flex-col justify-between rounded-2xl p-4 will-change-transform md:w-[24vw] md:p-8"
                  style={{
                    backgroundColor: step.bg,
                    color: step.text,
                  }}
                >
                  {step.icon && (
                    <div>
                      <img
                        src={step.icon}
                        alt=""
                        draggable={false}
                        className="h-18 w-auto md:h-24"
                      />
                    </div>
                  )}
                  <div>
                    <p
                      className="text-sm tracking-widest uppercase opacity-60"
                      style={{ color: step.text }}
                    >
                      {step.label}
                    </p>
                    <p
                      className="font-playfair mt-2 text-4xl italic md:text-5xl"
                      style={{ color: step.text }}
                    >
                      {step.title}
                    </p>
                    <p
                      className="mt-4 text-sm font-extralight md:text-base"
                      style={{ color: step.text }}
                    >
                      {step.desc}
                    </p>
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
