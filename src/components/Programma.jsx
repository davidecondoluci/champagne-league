import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverText from "./HoverText";

gsap.registerPlugin(ScrollTrigger);

const scheduleGroups = [
  [
    {
      time: "09:00 – 16:00",
      desc: "8 gironi da 4 squadre, 3 partite per squadra",
    },
    { time: "17:00 – 18:00", desc: "Ottavi di finale*" },
    { time: "18:00 – 18:30", desc: "Quarti di finale*" },
  ],
  [
    { time: "19:00 – 19:30", desc: "Semifinale*" },
    { time: "19:30 – 20:00", desc: "Finale e Finalina" },
    { time: "20:00 – 21:00", desc: "Premiazioni" },
  ],
];

function wrapWordsInSpan(element) {
  const text = element.textContent;
  element.innerHTML = text
    .split(" ")
    .map((word) => `<span class="prog-word"><span>${word}</span></span>`)
    .join(" ");
}

function Programma() {
  const pinHeightRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const pinHeight = pinHeightRef.current;
    const container = containerRef.current;
    if (!pinHeight || !container) return;

    const paragraphs = container.querySelectorAll(".prog-paragraph");
    paragraphs.forEach((p) => {
      p.querySelectorAll(".prog-line > span").forEach((span) =>
        wrapWordsInSpan(span),
      );
    });

    ScrollTrigger.create({
      trigger: pinHeight,
      start: "top top",
      end: "bottom bottom",
      pin: container,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    paragraphs.forEach((paragraph, index) => {
      if (paragraphs[index + 1]) {
        tl.to(paragraph.querySelectorAll(".prog-word span"), {
          y: "100%",
          duration: 1,
          stagger: 0.2,
          ease: "power4.in",
        });
        tl.to(
          paragraphs[index + 1].querySelectorAll(".prog-word span"),
          {
            y: "0%",
            duration: 1,
            delay: 1,
            stagger: 0.2,
            ease: "power4.out",
          },
          "<",
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="programma" data-navbar-theme="dark">
      <div ref={pinHeightRef} className="h-[300vh]">
        <div ref={containerRef} className="bg-penn-blue flex h-screen flex-col">
          {/* Top title */}
          <div className="flex items-center border-b border-white/20 px-4 py-8 md:px-[2.5vw] md:py-[5vw]">
            <h2 className="text-white">
              Torneo dalle <span className="font-playfair italic">09:00</span>
              <br />
              alle
              <span className="font-playfair italic"> 21:00</span>
            </h2>
          </div>

          {/* Schedule paragraphs — animate on scroll */}
          <div className="flex flex-1 flex-col items-start gap-8 px-4 py-8 md:flex-row md:items-center md:gap-[2.5vw] md:px-[2.5vw] md:py-0">
            {scheduleGroups.map((group, i) => (
              <div key={i} className="prog-paragraph flex flex-col gap-3">
                {group.map((item, j) => (
                  <p
                    key={j}
                    className="prog-line text-xl text-white md:text-4xl"
                  >
                    <span className="font-medium">{item.time}</span>
                    <span> | {item.desc}</span>
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Note + Buttons — fixed at bottom */}
          <div className="px-4 pb-6 md:px-[2.5vw] md:pb-[3vw]">
            <p className="mb-4 text-xs text-white/60 italic md:text-sm">
              *Scontri ad eliminazione diretta
            </p>
            <div className="flex flex-wrap gap-3">
              <button href="#" className="text-penn-blue bg-white">
                <HoverText>Orari dettagliati</HoverText>
              </button>
              <button href="#" className="text-penn-blue bg-white">
                <HoverText>Regolamento</HoverText>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Programma;
