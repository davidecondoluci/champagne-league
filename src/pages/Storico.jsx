import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3", label: "Edizioni" },
  { value: "32", label: "Squadre nel 2024" },
  { value: "500+", label: "Persone in giornata" },
  { value: "1.200+", label: "All'After Party" },
  { value: "200K", label: "Copertura social" },
  { value: "10K+", label: "Volantini distribuiti" },
];

const timeline = [
  {
    year: "2022",
    title: "Prima edizione",
    text: "Nasce la Champagne League: l'idea di trattare ogni giocatore come un professionista prende forma alla Pinetina.",
  },
  {
    year: "2024",
    title: "L'evento esplode",
    text: "32 squadre, 500 persone tra giocatori e pubblico, oltre 1.200 partecipanti all'After Party. La Champagne League diventa l'evento di riferimento del calcetto amatoriale comasco.",
  },
  {
    year: "2026",
    title: "Terza edizione",
    text: "Nuovi campi sintetici, premi più grandi, app Jessico per gestione live, pacchetti extra e after party con ingresso libero. Il livello sale ancora.",
  },
];

function Storico() {
  const numberRefs = useRef([]);

  useEffect(() => {
    const numbers = numberRefs.current.filter(Boolean);
    numbers.forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });
    return () => ScrollTrigger.getAll().forEach((s) => s.kill());
  }, []);

  return (
    <section
      id="storico"
      className="bg-eerie-black flex min-h-screen flex-col justify-center gap-16 px-4 py-20 text-white md:gap-24 md:px-8 md:py-24"
    >
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <h2 className="max-w-2xl">
          <span>Tre </span>
          <span className="font-playfair italic">edizioni</span>
          <span>, una sola </span>
          <span className="font-playfair italic">storia</span>
        </h2>
        <p className="max-w-md text-white/60 md:text-lg">
          Dal 2022 al 2026, la Champagne League è cresciuta fino a diventare
          il torneo amatoriale più atteso del comasco.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 border-y border-white/15 py-12 md:grid-cols-6 md:gap-x-8 md:py-16">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            ref={(el) => (numberRefs.current[i] = el)}
            className="flex flex-col items-start gap-2"
          >
            <p className="font-playfair text-5xl italic md:text-7xl">
              {stat.value}
            </p>
            <p className="text-xs tracking-widest text-white/50 uppercase md:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {timeline.map((item) => (
          <div
            key={item.year}
            className="flex flex-col gap-4 border-t border-white/15 pt-6"
          >
            <p className="font-playfair text-3xl italic text-white/40 md:text-4xl">
              {item.year}
            </p>
            <h3>{item.title}</h3>
            <p className="font-extralight text-white/70 md:text-lg">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Storico;
