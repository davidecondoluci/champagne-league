import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINE1 = [
  { text: "I", playfair: false },
  { text: "Premi", playfair: true },
];
const LINE2 = [
  { text: "che", playfair: false },
  { text: "ti", playfair: false },
  { text: "aspettano", playfair: false },
];

function wrapLetters(words) {
  return words.map(({ text, playfair }, wi) => (
    <span
      key={wi}
      className={`mr-4 inline-block ${playfair ? "font-playfair italic" : ""}`}
    >
      {text.split("").map((char, ci) => (
        <span
          key={ci}
          className="premi-letter inline-block overflow-hidden"
          style={{ verticalAlign: "bottom" }}
        >
          <span className="inline-block">{char}</span>
        </span>
      ))}
    </span>
  ));
}

const prizes = [
  {
    icon: "trophy",
    title: "Primo Posto",
    desc: "Coming soon!",
    bg: "color-mix(in srgb, var(--color-cyan-600) 60%, var(--color-blue-900))",
    border: "var(--color-cyan-100)",
    text: "var(--color-white)",
  },
  {
    icon: "workspace_premium",
    title: "Secondo Posto",
    desc: "Coming soon!",
    bg: "color-mix(in srgb, var(--color-cyan-600) 40%, var(--color-blue-900))",
    border: "var(--color-cyan-200)",
    text: "var(--color-white)",
  },
  {
    icon: "military_tech",
    title: "Terzo Posto",
    desc: "Coming soon!",
    bg: "color-mix(in srgb, var(--color-cyan-600) 20%, var(--color-blue-900))",
    border: "var(--color-cyan-300)",
    text: "var(--color-white)",
  },
  {
    icon: "shoe_cleats",
    title: "Miglior Giocatore",
    desc: "Coming soon!",
    bg: "color-mix(in srgb, var(--color-grape-900) 60%, var(--color-blue-900))",
    border: "var(--color-grape-200)",
    text: "var(--color-white)",
  },
  {
    icon: "sports_handball",
    title: "Miglior Portiere",
    desc: "Coming soon!",
    bg: "color-mix(in srgb, var(--color-grape-900) 40%, var(--color-blue-900))",
    border: "var(--color-grape-300)",
    text: "var(--color-white)",
  },
];

function Premi() {
  const titleSectionRef = useRef(null);
  const titleContainerRef = useRef(null);
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  // Title reveal animation
  useEffect(() => {
    const titleSection = titleSectionRef.current;
    const titleContainer = titleContainerRef.current;
    if (!titleSection || !titleContainer) return;

    const letters = titleContainer.querySelectorAll(".premi-letter span");
    const shuffled = Array.from(letters).sort(() => Math.random() - 0.5);
    gsap.set(shuffled, { y: "110%" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleSection,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      });
      shuffled.forEach((span, i) => {
        tl.to(
          span,
          { y: "0%", ease: "power3.out", duration: 0.5 },
          i * (0.6 / shuffled.length),
        );
      });
    }, titleSection);

    return () => ctx.revert();
  }, []);

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
    <section id="premi" className="bg-blue-900">
      {/* Title */}
      <div ref={titleSectionRef} className="flex items-center py-24 md:py-32">
        <h2 ref={titleContainerRef} className="w-full text-center text-white">
          <span className="block">{wrapLetters(LINE1)}</span>
          <span className="block">{wrapLetters(LINE2)}</span>
        </h2>
      </div>

      {/* Horizontal scroll pinned effect (all screens) */}
      <div
        ref={containerRef}
        className="-mt-[110vh] flex h-screen flex-col justify-center overflow-hidden"
      >
        <div
          ref={cardsContainerRef}
          className="flex w-max gap-4 px-[120vw] will-change-transform"
        >
          {prizes.map((prize, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="flex aspect-3/4 w-[80vw] min-w-65 shrink-0 flex-col justify-between overflow-hidden rounded-2xl border-6 p-4 whitespace-normal md:w-[25vw]"
              style={{
                backgroundColor: prize.bg,
                borderColor: prize.border,
                color: prize.text,
              }}
            >
              <div>
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: "8rem", color: prize.text }}
                >
                  {prize.icon}
                </span>
              </div>
              <div>
                <h3 style={{ color: prize.text }}>{prize.title}</h3>
                <p className="mt-2" style={{ color: prize.text }}>
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
