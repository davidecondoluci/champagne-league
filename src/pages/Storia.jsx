import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 3, suffix: "", label: "Edizioni", color: "var(--color-grape-500)" },
  {
    num: 3,
    suffix: "",
    label: "Anni con McDonald's",
    color: "var(--color-cyan-500)",
  },
  { num: 40, suffix: "+", label: "Sponsor", color: "var(--color-grape-500)" },
  {
    num: 10,
    suffix: "K+",
    label: "Volantini distribuiti",
    color: "var(--color-cyan-500)",
  },
  {
    num: 300,
    suffix: "K+",
    label: "Copertura social",
    color: "var(--color-grape-500)",
  },
  {
    num: 32,
    suffix: "",
    label: "Squadre nel 2024",
    color: "var(--color-cyan-500)",
  },
  {
    num: 500,
    suffix: "+",
    label: "Persone in giornata",
    color: "var(--color-grape-500)",
  },
  {
    num: 1200,
    suffix: "+",
    label: "Persone all'After Party",
    thousands: true,
    color: "var(--color-cyan-500)",
  },
];

function Stat({ num, suffix, label, thousands, color }) {
  const ref = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const proxy = { val: 0 };
    const ctx = gsap.context(() => {
      const tween = gsap.to(proxy, {
        val: num,
        duration: 2.5,
        ease: "power2.out",
        paused: true,
        onUpdate() {
          if (!ref.current) return;
          const v = Math.round(proxy.val);
          ref.current.textContent = thousands ? v.toLocaleString("it-IT") : v;
        },
      });

      const restart = () => {
        proxy.val = 0;
        tween.restart();
      };

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        onEnter: restart,
        onEnterBack: restart,
      });
    });
    return () => ctx.revert();
  }, [num, thousands]);

  return (
    <div
      ref={containerRef}
      className="flex w-1/2 flex-col items-center gap-2 px-4 py-2 md:w-auto md:px-8 md:py-0"
    >
      <div
        className="relative text-5xl font-medium tabular-nums md:text-6xl lg:text-8xl"
        style={{ color }}
      >
        {/* ghost: riserva sempre lo spazio del valore finale */}
        <span className="invisible flex items-baseline">
          <span>{thousands ? num.toLocaleString("it-IT") : num}</span>
          <span>{suffix}</span>
        </span>
        {/* numero animato sovrapposto */}
        <span className="absolute inset-0 flex items-baseline">
          <span ref={ref}>0</span>
          <span>{suffix}</span>
        </span>
      </div>
      <p className="flex min-h-8 items-start justify-center text-center text-xs tracking-widest text-blue-900/60 uppercase sm:text-sm md:min-h-0 md:text-base">
        {label}
      </p>
    </div>
  );
}

function Storia() {
  return (
    <section
      id="storia"
      className="flex min-h-fit flex-col justify-center gap-10 bg-white px-4 py-16 text-blue-900 md:min-h-screen md:gap-24 md:px-8 md:py-12"
    >
      {/* Header */}
      <h2 className="text-center">
        <span>La </span>
        <span className="font-playfair italic">storia</span>
      </h2>

      {/* Stats — mobile: 2 per riga, desktop: 4 per riga */}
      <div className="flex flex-col items-center gap-4">
        {[
          stats.slice(0, 2),
          stats.slice(2, 4),
          stats.slice(4, 6),
          stats.slice(6),
        ].map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="flex w-full items-start justify-center md:hidden"
          >
            {row.map((stat, i) => (
              <>
                <Stat key={stat.label} {...stat} />
                {i < row.length - 1 && (
                  <div className="mt-4 h-12 w-px shrink-0 bg-blue-900/20" />
                )}
              </>
            ))}
          </div>
        ))}
        {[stats.slice(0, 4), stats.slice(4)].map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="hidden items-center justify-center md:flex"
          >
            {row.map((stat, i) => (
              <>
                <Stat key={stat.label} {...stat} />
                {i < row.length - 1 && (
                  <div className="h-16 w-px self-center bg-blue-900/20" />
                )}
              </>
            ))}
          </div>
        ))}
      </div>

      {/* Subtitle */}
      <p className="mx-auto max-w-2xl text-center md:text-lg">
        Nata alla Pinetina con un'idea semplice: trattare ogni giocatore come un
        professionista. Ogni edizione ha alzato l'asticella: campi sintetici,
        premi più grandi, gestione live con l'app Jessico e un after party con
        ingresso libero.
      </p>
    </section>
  );
}

export default Storia;
