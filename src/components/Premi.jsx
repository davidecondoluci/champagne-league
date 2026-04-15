import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prizes = [
  {
    icon: "/icons/trophy-1.svg",
    title: "Primo Posto",
    desc: "Trofeo + Champagne + 1 tessera per 20 ingressi in piscina in Pinetina (dal valore di 320€) + Iscrizione gratuita alla prossima edizione",
    bg: "color-mix(in srgb, var(--color-cyan-600) 60%, var(--color-blue-900))",
    border: "var(--color-cyan-100)",
    text: "var(--color-white)",
  },
  {
    icon: "/icons/trophy-2.svg",
    title: "Secondo Posto",
    desc: "Trofeo + Sconto 200€ presso il ristorante La Pinetina",
    bg: "color-mix(in srgb, var(--color-cyan-600) 40%, var(--color-blue-900))",
    border: "var(--color-cyan-200)",
    text: "var(--color-white)",
  },
  {
    icon: "/icons/trophy-3.svg",
    title: "Terzo Posto",
    desc: "Trofeo + Un'ora di calcetto con aperitivo post calcetto in Pinetina (E-Bar)",
    bg: "color-mix(in srgb, var(--color-cyan-600) 20%, var(--color-blue-900))",
    border: "var(--color-cyan-300)",
    text: "var(--color-white)",
  },
  {
    icon: "/icons/crown.svg",
    title: "Miglior Giocatore",
    desc: "Trofeo + Maglia miglior giocatore",
    bg: "color-mix(in srgb, var(--color-grape-900) 60%, var(--color-blue-900))",
    border: "var(--color-grape-200)",
    text: "var(--color-white)",
  },
  {
    icon: "/icons/sports-handball.svg",
    title: "Miglior Portiere",
    desc: "Trofeo + Maglia miglior portiere + Guanti da portiere",
    bg: "color-mix(in srgb, var(--color-grape-900) 40%, var(--color-blue-900))",
    border: "var(--color-grape-300)",
    text: "var(--color-white)",
  },
  // {
  //   icon: "/icons/shoe-cleats.svg",
  //   title: "Capocannoniere",
  //   desc: "Coming soon!",
  //   bg: "color-mix(in srgb, var(--color-grape-900) 20%, var(--color-blue-900))",
  //   border: "var(--color-grape-400)",
  //   text: "var(--color-white)",
  // },
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
          <span>2024</span>
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
              className="flex aspect-3/4 w-[80vw] min-w-65 shrink-0 flex-col justify-between overflow-hidden rounded-2xl border-6 p-4 whitespace-normal md:w-[28vw] md:p-8"
              style={{
                backgroundColor: prize.bg,
                borderColor: prize.border,
                color: prize.text,
              }}
            >
              <div>
                <img
                  src={prize.icon}
                  alt=""
                  draggable={false}
                  className="h-24"
                />
              </div>
              <div>
                <h3 style={{ color: prize.text }}>{prize.title}</h3>
                <p className="mt-2 md:text-xl" style={{ color: prize.text }}>
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
