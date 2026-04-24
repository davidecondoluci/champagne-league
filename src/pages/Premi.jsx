import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prizes = [
  {
    icon: "emoji_events",
    title: "Primo Posto",
    value: "1.500\u20AC",
    desc: "Coppa + iscrizione gratuita alla prossima edizione",
    bg: "color-mix(in srgb, var(--color-cyan-600) 60%, var(--color-blue-900))",
    border: "var(--color-cyan-100)",
    text: "var(--color-white)",
  },
  {
    icon: "emoji_events",
    title: "Secondo Posto",
    value: "Cena",
    desc: "Coppa + cena per la squadra offerta dai partner",
    bg: "color-mix(in srgb, var(--color-cyan-600) 40%, var(--color-blue-900))",
    border: "var(--color-cyan-200)",
    text: "var(--color-white)",
  },
  {
    icon: "emoji_events",
    title: "Terzo Posto",
    value: "Aperitivo",
    desc: "Coppa + aperitivo per la squadra offerto dai partner",
    bg: "color-mix(in srgb, var(--color-cyan-600) 20%, var(--color-blue-900))",
    border: "var(--color-cyan-300)",
    text: "var(--color-white)",
  },
  {
    icon: "crown",
    title: "Miglior Giocatore",
    value: "Soon",
    desc: "Coppa + Buono WSE da 2.700\u20AC (3 livelli Full Access) + premi extra TBA",
    bg: "color-mix(in srgb, var(--color-grape-900) 60%, var(--color-blue-900))",
    border: "var(--color-grape-200)",
    text: "var(--color-white)",
  },
  {
    icon: "shoe_cleats",
    title: "Capocannoniere",
    value: "Soon",
    desc: "Coppa + Buono WSE da 1.700\u20AC (3 livelli in sede) + premi extra TBA",
    bg: "color-mix(in srgb, var(--color-grape-900) 40%, var(--color-blue-900))",
    border: "var(--color-grape-300)",
    text: "var(--color-white)",
  },
  {
    icon: "sports_handball",
    title: "Miglior Portiere",
    value: "Soon",
    desc: "Coppa + Buono WSE da 1.700\u20AC (3 livelli in sede) + premi extra TBA",
    bg: "color-mix(in srgb, var(--color-grape-900) 20%, var(--color-blue-900))",
    border: "var(--color-grape-400)",
    text: "var(--color-white)",
  },
];

function Premi() {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  // Horizontal scroll effect (all screens)
  useEffect(() => {
    const container = containerRef.current;
    const cardsContainer = cardsContainerRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!container || !cardsContainer || cards.length === 0) return;

    const distance = cardsContainer.scrollWidth - window.innerWidth;

    const scrollTween = gsap.to(cardsContainer, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: true,
        start: "top top",
        end: "+=" + distance,
      },
    });

    cards.forEach((card) => {
      const values = {
        x: (Math.random() * 20 + 30) * (Math.random() < 0.5 ? 1 : -1),
        y: (Math.random() * 6 + 10) * (Math.random() < 0.5 ? 1 : -1),
        rotation: (Math.random() * 10 + 10) * (Math.random() < 0.5 ? 1 : -1),
      };

      gsap.fromTo(
        card,
        {
          rotation: values.rotation,
          xPercent: values.x,
          yPercent: values.y,
        },
        {
          rotation: -values.rotation,
          xPercent: -values.x,
          yPercent: -values.y,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left 120%",
            end: "right -20%",
            scrub: true,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="premi" className="bg-blue-900 md:py-24">
      {/* Title */}
      <div className="flex items-center py-16 md:py-0">
        <h2 className="w-full text-center text-white">
          <span className="font-playfair italic">Premi </span>
          <span>2026</span>
        </h2>
      </div>

      {/* Horizontal scroll pinned effect (all screens) */}
      <div
        ref={containerRef}
        className="flex h-screen flex-col justify-center overflow-hidden"
      >
        <div
          ref={cardsContainerRef}
          className="flex w-max gap-4 px-[120vw] will-change-transform"
        >
          {prizes.map((prize, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="flex aspect-3/4 w-[80vw] min-w-64 shrink-0 flex-col justify-between overflow-hidden rounded-2xl border p-4 whitespace-normal md:w-[28vw] md:p-8"
              style={{
                backgroundColor: prize.bg,
                borderColor: prize.border,
                color: prize.text,
              }}
            >
              <div>
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: "clamp(9rem, 22vw, 6rem)" }}
                >
                  {prize.icon}
                </span>
              </div>
              <div>
                <p
                  className="text-sm tracking-widest uppercase opacity-60"
                  style={{ color: prize.text }}
                >
                  {prize.title}
                </p>
                <h3
                  className="mt-2 text-4xl font-medium md:text-6xl"
                  style={{ color: prize.text }}
                >
                  {prize.value}
                </h3>
                <p
                  className="mt-4 text-base font-extralight md:text-lg"
                  style={{ color: prize.text }}
                >
                  {prize.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Premi;
