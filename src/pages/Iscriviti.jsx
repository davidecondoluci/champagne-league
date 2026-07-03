import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "../components/Button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    icon: "/jessico.svg",
    label: "Passo 1",
    title: "Scarica Jessico",
    desc: "L'app ufficiale per tornei, squadre e statistiche live. Disponibile su App Store e Google Play.",
    bg: "var(--color-green-400)",
    text: "var(--color-white)",
  },
  {
    num: "02",
    icon: "app_registration",
    label: "Passo 2",
    title: "Crea il profilo",
    desc: "Registrati in pochi secondi e accedi alla sezione Tornei dell'app.",
    bg: "var(--color-green-600)",
    text: "var(--color-white)",
  },
  {
    num: "03",
    icon: "login",
    label: "Passo 3",
    title: "CHAM2026",
    desc: "Inserisci il codice torneo o cerca “Champagne League” direttamente nell'app.",
    bg: "var(--color-green-700)",
    text: "var(--color-white)",
  },
  {
    num: "04",
    icon: "person_add",
    label: "Passo 4",
    title: "Forma la squadra",
    desc: "250€ a squadra + 5€ a giocatore. Iscrizioni aperte fino al 27 giugno 2026.",
    bg: "var(--color-green-800)",
    text: "var(--color-white)",
  },
];

function Iscriviti() {
  const pinHeightRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const pinHeight = pinHeightRef.current;
    const container = containerRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!pinHeight || !container || !cards.length) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        pin: container,
      });

      const gap = 30;
      const distPerCard =
        (pinHeight.clientHeight - window.innerHeight) / cards.length;

      gsap.set(cards, {
        y: gap * (cards.length - 1),
        z: -gap * (cards.length - 1),
      });

      cards.forEach((card, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinHeight,
            start: "top top+=" + distPerCard * index,
            end: "bottom bottom+=" + distPerCard * index,
            scrub: 0.5,
          },
        });

        for (let i = 0; i < cards.length - 1; i++) {
          tl.to(card, {
            y: "-=" + gap,
            z: "+=" + gap,
            ease: "back.inOut(3)",
          });
        }

        tl.to(card, {
          yPercent: -80,
          y: "-50vh",
          scale: 1.2,
          rotation: (Math.random() - 0.5) * 50,
          ease: "power4.in",
        });
      });
    }, pinHeightRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="iscriviti" className="relative bg-white">
      <div ref={pinHeightRef} className="h-[500vh]">
        <div
          ref={containerRef}
          className="relative flex h-dvh items-center justify-center bg-white"
        >
          {/* Title */}
          <div className="pointer-events-none absolute top-0 left-0 z-10 flex h-full w-full flex-col justify-between pt-12 pb-6 md:py-12">
            <h2 className="text-center text-blue-900">
              <span>Come </span>
              <span className="font-playfair italic">iscriversi</span>
            </h2>
            <div className="pointer-events-auto flex w-full justify-center">
              <Button
                onClick={() => window.open("https://jessico.app/", "_blank")}
                className="bg-blue-900 text-white"
              >
                Scarica l'app
              </Button>
            </div>
          </div>

          {/* Cards stack with perspective */}
          <div
            className="relative"
            style={{
              width: "clamp(280px, 22vw, 380px)",
              aspectRatio: "0.75",
              perspective: "25vw",
            }}
          >
            {[...steps].reverse().map((step, i) => (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                className="absolute top-0 left-0 flex h-full w-full flex-col justify-between rounded-2xl p-6 will-change-transform md:p-8"
                style={{
                  backgroundColor: step.bg,
                  color: step.text,
                }}
              >
                {step.icon && (
                  <div>
                    {step.icon.startsWith("/") ? (
                      <img
                        src={step.icon}
                        alt=""
                        draggable={false}
                        style={{
                          height: "clamp(4.5rem, 5vw, 6rem)",
                          width: "auto",
                        }}
                      />
                    ) : (
                      <span
                        className="material-symbols-rounded"
                        style={{ fontSize: "clamp(6rem, 7vw, 9rem)" }}
                      >
                        {step.icon}
                      </span>
                    )}
                  </div>
                )}
                <div>
                  <p
                    className="text-sm tracking-widest uppercase opacity-60"
                    style={{ color: step.text }}
                  >
                    {step.label}
                  </p>
                  <h3
                    className="mt-2 text-2xl font-medium md:text-4xl"
                    style={{ color: step.text }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-4 text-sm font-extralight md:text-base"
                    style={{ color: step.text }}
                  >
                    {step.desc}
                  </p>
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
