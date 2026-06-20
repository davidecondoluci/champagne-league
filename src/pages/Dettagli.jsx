import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../components/Button";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    num: "01",
    title: "Torneo",
    text: "32 squadre da massimo 10 giocatori, 4 campi sintetici nuovi e 4-8 arbitri di gara. Partite da 2 tempi di 10 minuti. Fasi: gironi, ottavi, quarti, semifinali, finalina e finale.",
  },
  {
    num: "02",
    title: "Iscrizione",
    text: "250\u20AC a squadra + 5\u20AC a giocatore di assicurazione sportiva. Iscrizioni aperte fino al 27 giugno 2026 sull'app Jessico con il codice CHAM2026.",
  },
  {
    num: "03",
    title: "Giornata",
    text: "Bar e ristoro tutto il giorno, DJ set, piscina dalle 15:00, calcio-tennis, ping pong e calcetto balilla. After party con ingresso libero dalle 22:00 Al Patio presso La Pinetina.",
    hasButton: true,
  },
];

function wrapWords(el) {
  const text = el.textContent;
  el.innerHTML = text
    .split(" ")
    .map(
      (word) =>
        `<span style="position:relative;overflow:hidden;display:inline-block;margin:-0.12em 0;"><span style="display:block;padding:0.12em 0;">${word}</span></span>`,
    )
    .join(" ");
}

function Dettagli() {
  const pinHeightRef = useRef(null);
  const containerRef = useRef(null);
  const paraRefs = useRef([]);

  useEffect(() => {
    const pinHeight = pinHeightRef.current;
    const container = containerRef.current;
    const paras = paraRefs.current.filter(Boolean);
    if (!pinHeight || !container || paras.length < 3) return;

    paras.forEach((para) => wrapWords(para));

    let ctx = gsap.context(() => {
      // Desktop: Animazione pinned (tutti nascosti e svelati scubbing)
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        paras.forEach((para) => {
          gsap.set(para.querySelectorAll("span > span"), { y: "110%" });
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

        paras.forEach((para, i) => {
          const words = para.querySelectorAll("span > span");
          tl.to(words, {
            y: "0%",
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
          });
          if (i < paras.length - 1) {
            tl.to({}, { duration: 0.8 }); // pausa tra un testo e il successivo
          }
        });
      });

      // Mobile: Pin + scrub come desktop
      mm.add("(max-width: 767px)", () => {
        paras.forEach((para) => {
          gsap.set(para.querySelectorAll("span > span"), { y: "110%" });
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

        paras.forEach((para, i) => {
          const words = para.querySelectorAll("span > span");
          tl.to(words, {
            y: "0%",
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
          });
          if (i < paras.length - 1) {
            tl.to({}, { duration: 0.8 });
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dettagli"
      className="relative overflow-hidden bg-blue-900 text-white"
    >
      <div ref={pinHeightRef} className="h-[250vh] md:h-[300vh]">
        <div
          ref={containerRef}
          className="flex h-screen flex-col justify-between p-4 py-8 md:px-8 md:py-24"
        >
          {/* Titolo sezione */}
          <div className="flex flex-row justify-between gap-6 border-b border-white/20 pb-8">
            <h2 className="text-white">
              <span>I </span>
              <span className="font-playfair italic">Dettagli</span>
            </h2>
            <Button
              onClick={() =>
                window.open("/Regolamento_Champagne_League_2026.pdf", "_blank")
              }
              className="shrink-0 self-end bg-white text-blue-900 md:self-start"
            >
              Regolamento
            </Button>
          </div>

          {/* 3 colonne */}
          <div className="grid h-full grid-cols-1 md:grid-cols-3">
            {panels.map((panel, i) => (
              <div
                key={i}
                className={`flex flex-col gap-4 px-0 py-4 md:justify-between md:p-8 ${i < 2 ? "border-b border-white/20 md:border-r md:border-b-0" : ""}`}
              >
                {/* Titolo colonna */}
                <div className="flex items-start justify-between">
                  <h3 className="text-white">{panel.title}</h3>
                  <span className="text-white/20">({panel.num})</span>
                </div>

                {/* Testo */}
                <p
                  className="md:text-2xl"
                  ref={(el) => (paraRefs.current[i] = el)}
                >
                  {panel.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dettagli;
