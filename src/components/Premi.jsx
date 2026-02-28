import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

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
      style={{ display: "inline-block", marginRight: "0.25em" }}
      className={playfair ? "font-playfair italic" : ""}
    >
      {text.split("").map((char, ci) => (
        <span
          key={ci}
          className="premi-letter"
          style={{
            display: "inline-block",
            clipPath: "polygon(-10% -40%, -10% 140%, 110% 140%, 110% -40%)",
          }}
        >
          <span style={{ display: "inline-block" }}>{char}</span>
        </span>
      ))}
    </span>
  ));
}

const prizes = [
  {
    icon: "trophy",
    title: "Primo Posto",
    desc: "Trofeo, Champagne, 1 tessera da 20 ingressi in piscina in Pinetina (dal valore di 320€) e iscrizione gratuita alla prossima edizione",
    bg: "color-mix(in srgb, var(--color-pacific-cyan) 20%, transparent)",
    border: "var(--color-pacific-cyan)",
  },
  {
    icon: "workspace_premium",
    title: "Secondo Posto",
    desc: "Trofeo e sconto di 200€ presso il ristorante La Pinetina",
    bg: "color-mix(in srgb, var(--color-pacific-cyan) 20%, transparent)",
    border: "var(--color-pacific-cyan)",
  },
  {
    icon: "military_tech",
    title: "Terzo Posto",
    desc: "Trofeo e un'ora di calcetto con aperitivo post calcetto in Pinetina",
    bg: "color-mix(in srgb, var(--color-pacific-cyan) 20%, transparent)",
    border: "var(--color-pacific-cyan)",
  },
  {
    icon: "shoe_cleats",
    title: "Miglior Giocatore",
    desc: "Trofeo e maglia",
    bg: "color-mix(in srgb, var(--color-grape) 20%, transparent)",
    border: "var(--color-grape)",
  },
  {
    icon: "sports_handball",
    title: "Miglior Portiere",
    desc: "Trofeo, maglia e guanti da portiere",
    bg: "color-mix(in srgb, var(--color-grape) 20%, transparent)",
    border: "var(--color-grape)",
  },
];

function Premi() {
  const pinHeightRef = useRef(null);
  const containerRef = useRef(null);
  const titleSectionRef = useRef(null);
  const titleContainerRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const titleSection = titleSectionRef.current;
    const titleContainer = titleContainerRef.current;
    if (titleSection && titleContainer) {
      const letters = titleContainer.querySelectorAll(".premi-letter span");
      const shuffled = Array.from(letters).sort(() => Math.random() - 0.5);
      gsap.set(shuffled, { y: "110%" });
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: titleSection,
            start: "top 70%",
            end: "top -10%",
            scrub: 1.5,
          },
        });
        shuffled.forEach((span, i) => {
          tl.to(
            span,
            { y: "0%", ease: "power3.out", duration: 1 },
            i * (1.2 / shuffled.length),
          );
        });
      }, titleSection);
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    if (isMobile) return; // No scroll effect on mobile

    const pinHeight = pinHeightRef.current;
    const container = containerRef.current;
    if (!pinHeight || !container) return;

    const cards = container.querySelectorAll(".prize-card");

    // Pin the container while scrolling the pinHeight div
    ScrollTrigger.create({
      trigger: pinHeight,
      start: "top top",
      end: "bottom bottom",
      pin: container,
      pinSpacing: false,
      scrub: true,
    });

    // Initial position: cards centered below viewport
    gsap.set(cards, {
      yPercent: 50,
      y: 0.5 * window.innerHeight,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Move cards from bottom to top
    tl.to(
      cards,
      {
        yPercent: -50,
        y: -0.5 * window.innerHeight,
        duration: 1,
        stagger: 0.12,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0,0 0.098,0.613 0.5,0.5 0.899,0.386 1,1 1,1",
        ),
      },
      "step",
    );
    // Rotate in during first half
    tl.to(
      cards,
      {
        rotation: () => (Math.random() - 0.5) * 20,
        stagger: 0.12,
        duration: 0.5,
        ease: "power3.out",
      },
      "step",
    );
    // Rotate back during second half
    tl.to(
      cards,
      {
        rotation: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: "power3.in",
      },
      "step+=0.5",
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="premi" data-navbar-theme="dark" className="bg-penn-blue">
      {/* Title */}
      <div ref={titleSectionRef} className="py-10 md:h-[60vh] md:py-0">
        <div className="sticky top-0 flex items-center md:h-[60vh]">
          <h2
            ref={titleContainerRef}
            className="w-full text-center leading-tight text-white"
          >
            <span className="block">{wrapLetters(LINE1)}</span>
            <span className="block">{wrapLetters(LINE2)}</span>
          </h2>
        </div>
      </div>

      {/* Desktop: tall div for scroll pin effect */}
      <div ref={pinHeightRef} className="md:mt-[-60vh] md:h-[200vh]">
        {/* Desktop: pinned container */}
        <div
          ref={containerRef}
          className="hidden h-screen items-center justify-center pl-[6vw] md:flex"
        >
          {prizes.map((prize, i) => (
            <div
              key={i}
              className="prize-card -ml-[2vw] flex aspect-3/4 w-[18vw] flex-col justify-between rounded-[1vw] p-[0.8vw] text-white backdrop-blur-[6px]"
              style={{
                backgroundColor: prize.bg,
                border: `1.5px solid ${prize.border}`,
              }}
            >
              <div className="flex items-start justify-start">
                <span
                  className="material-symbols-outlined text-white"
                  style={{ fontSize: "6vw" }}
                >
                  {prize.icon}
                </span>
              </div>
              <div>
                <h3 className="text-white">{prize.title}</h3>
                <p className="mt-1 text-base text-white">{prize.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <div className="px-4 py-6 md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
          {prizes.map((prize, i) => (
            <div
              key={i}
              className="flex h-[70vw] w-[85vw] shrink-0 snap-start flex-col justify-between rounded-2xl p-4 text-white backdrop-blur-[6px]"
              style={{
                backgroundColor: prize.bg,
                border: `1.5px solid ${prize.border}`,
              }}
            >
              <div className="flex items-start justify-start">
                <span
                  className="material-symbols-outlined text-white"
                  style={{
                    fontSize: "6rem",
                  }}
                >
                  {prize.icon}
                </span>
              </div>
              <div>
                <h3 className="text-4xl font-medium text-white">
                  {prize.title}
                </h3>
                <p className="mt-1 text-base text-white">{prize.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Premi;
