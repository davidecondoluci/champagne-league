import { useEffect, useRef } from "react";
import gsap from "gsap";
import HoverText from "./HoverText";

const steps = [
  {
    icon: "groups",
    title: "1. Squadra",
    desc: "Crea una squadra con i tuoi amici di massimo 10 giocatori",
    bg: "var(--color-pacific-cyan)",
    text: "var(--color-white)",
    subtext: "var(--color-white)",
  },
  {
    icon: "copyright",
    title: "2. Capitano",
    desc: "Una volta creata la tua squadra dovrete scegliere il vostro capitano, fondamentale per l'iscrizione",
    bg: "var(--color-grape)",
    text: "var(--color-white)",
    subtext: "var(--color-white)",
  },
  {
    icon: "signature",
    title: "3. Iscrizione",
    desc: "Successivamente il capitano dovrà versare la quota e compilare il modulo di iscrizione della squadra",
    bg: "var(--color-penn-blue)",
    text: "var(--color-white)",
    subtext: "var(--color-white)",
  },
  {
    icon: "handshake",
    title: "4. Incontro",
    desc: "Il capitano dovrà raccogliere la quota di iscrizione della squadra per poi incontrarsi con un organizzatore dell'evento",
    bg: "var(--color-eerie-black)",
    text: "var(--color-white)",
    subtext: "var(--color-white)",
  },
];

const Z_INDICES = [3, 2, 4, 1];

function Iscriviti() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const cards = container.querySelectorAll(".step-card");

    // Apply desktop sizing and overlap via GSAP
    if (!isMobile) {
      gsap.set(cards, {
        width: "22vw",
        minWidth: 180,
        maxWidth: 280,
        aspectRatio: "0.85",
      });
      // Overlap cards: skip first
      cards.forEach((card, i) => {
        if (i > 0) gsap.set(card, { marginLeft: "-4vw" });
      });
    }

    // Disable mouse effect on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const contents = container.querySelectorAll(".step-content");
    const cardsLength = cards.length;
    let currentPortion = 0;

    // Random initial offset
    cards.forEach((card) => {
      gsap.set(card, {
        xPercent: (Math.random() - 0.5) * 10,
        yPercent: (Math.random() - 0.5) * 10,
        rotation: (Math.random() - 0.5) * 15,
      });
    });

    const handleMouseMove = (e) => {
      const mouseX = e.clientX - container.getBoundingClientRect().left;
      const percentage = mouseX / container.clientWidth;
      const activePortion = Math.ceil(percentage * cardsLength);

      if (
        currentPortion !== activePortion &&
        activePortion > 0 &&
        activePortion <= cardsLength
      ) {
        if (currentPortion !== 0) resetPortion(currentPortion - 1);
        currentPortion = activePortion;
        newPortion(currentPortion - 1);
      }
    };

    const handleMouseLeave = () => {
      resetPortion(currentPortion - 1);
      currentPortion = 0;
      gsap.to(contents, {
        xPercent: 0,
        ease: "elastic.out(1, 0.75)",
        duration: 0.8,
      });
    };

    function resetPortion(index) {
      if (index < 0 || index >= cardsLength) return;
      gsap.to(cards[index], {
        xPercent: (Math.random() - 0.5) * 10,
        yPercent: (Math.random() - 0.5) * 10,
        rotation: (Math.random() - 0.5) * 15,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.75)",
      });
    }

    function newPortion(i) {
      gsap.to(cards[i], {
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        scale: 1.05,
        duration: 0.8,
        ease: "elastic.out(1, 0.75)",
      });

      contents.forEach((content, index) => {
        if (index !== i) {
          gsap.to(content, {
            xPercent: 80 / (index - i),
            ease: "elastic.out(1, 0.75)",
            duration: 0.8,
          });
        } else {
          gsap.to(content, {
            xPercent: 0,
            ease: "elastic.out(1, 0.75)",
            duration: 0.8,
          });
        }
      });
    }

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="iscriviti"
      data-navbar-theme="light"
      className="flex flex-col items-center justify-center bg-white px-6 py-24 md:min-h-screen md:px-12"
    >
      <h2 className="text-penn-blue mb-10 text-center md:mb-16">
        <span>Come </span>
        <span className="font-playfair italic">iscriversi</span>
      </h2>

      {/* Cards container */}
      <div
        ref={containerRef}
        className="flex w-full max-w-5xl flex-col items-center gap-6 md:flex-row md:justify-center md:gap-0"
      >
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="step-card w-full max-w-sm shrink-0 will-change-transform"
            style={{
              zIndex: Z_INDICES[i],
            }}
          >
            <div
              className="step-content flex h-full w-full flex-col rounded-2xl p-6 text-left"
              style={{
                backgroundColor: step.bg,
                color: step.text,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "4rem",
                  color: step.text,
                }}
              >
                {step.icon}
              </span>
              <h3 className="mt-4">{step.title}</h3>
              <p className="mt-3 text-white">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button href="#" className="bg-penn-blue mt-12 text-white">
        <HoverText>Vai al modulo di iscrizione</HoverText>
      </button>
    </section>
  );
}

export default Iscriviti;
