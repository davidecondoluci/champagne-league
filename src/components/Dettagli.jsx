import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

const details = [
  {
    icon: "description",
    title: "Iscrizione di 250€ a squadra",
  },
  { icon: "groups", title: "32 Squadre con massimo 10 giocatori" },
  {
    icon: "photo_camera",
    title: "Foto e Video dell'evento e dei giocatori",
  },
  {
    icon: "restaurant",
    title: "Bar aperto tutto il giorno",
  },
  { icon: "personal_injury", title: "Assicurazione di 5€ sugli infortuni" },
  { icon: "leaderboard", title: "Statistiche con marcatori e risultati" },
  { icon: "directions_run", title: "Durata partita di 20 min" },
  { icon: "pool", title: "Sconto piscina per i giocatori" },
  { icon: "album", title: "Dj Set tutto il giorno" },
];

// Duplicate for infinite loop
const allCards = [...details, ...details];

function Dettagli() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let total = 0;

    const half = container.scrollWidth / 2;
    const wrap = gsap.utils.wrap(-half, 0);

    const xTo = gsap.quickTo(container, "x", {
      duration: 0.5,
      ease: "power3",
      modifiers: {
        x: gsap.utils.unitize(wrap),
      },
    });

    // Precompute random scatter values (one per original card)
    const itemValues = details.map(() => (Math.random() - 0.5) * 20);

    const cards = container.querySelectorAll(".detail-card");
    const tl = gsap.timeline({ paused: true });
    tl.to(cards, {
      rotate: (i) => itemValues[i % details.length],
      xPercent: (i) => itemValues[i % details.length],
      yPercent: (i) => itemValues[i % details.length],
      scale: 0.9,
      duration: 0.5,
      ease: "back.inOut(3)",
    });

    const observer = Observer.create({
      target: container,
      type: "pointer,touch",
      onPress: () => tl.play(),
      onDrag: (self) => {
        total += self.deltaX;
        xTo(total);
      },
      onRelease: () => tl.reverse(),
      onStop: () => tl.reverse(),
    });

    const tick = (_time, deltaTime) => {
      total -= deltaTime / 10;
      xTo(total);
    };

    gsap.ticker.add(tick);

    return () => {
      observer.kill();
      gsap.ticker.remove(tick);
      tl.kill();
    };
  }, []);

  return (
    <section
      id="dettagli"
      data-navbar-theme="dark"
      className="bg-penn-blue flex h-screen items-center overflow-hidden"
    >
      <div
        ref={containerRef}
        className="flex w-max cursor-grab gap-[1vw] px-[1vw] active:cursor-grabbing"
        style={{ willChange: "transform" }}
      >
        {allCards.map((item, i) => (
          <div
            key={i}
            className="detail-card flex h-[28vw] max-h-80 w-[24vw] max-w-xs shrink-0 flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-sm"
            style={{ willChange: "transform" }}
          >
            <span
              className="material-symbols-outlined text-pacific-cyan"
              style={{ fontSize: "2.5rem" }}
            >
              {item.icon}
            </span>
            <div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-white/50">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dettagli;
