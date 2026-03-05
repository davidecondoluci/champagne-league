import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverText from "./HoverText";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    num: "01",
    title: "Torneo",
    text: "Calcio a 5 per 32 squadre da massimo 10 giocatori, con partite da 20 minuti. Le fasi garantite: gironi, ottavi, quarti, semifinale, finalina & finale.",
  },
  {
    num: "02",
    title: "Iscrizione",
    text: "250€ a squadra. Include statistiche complete con marcatori e risultati, foto e video dell'evento e dei giocatori. Assicurazione infortuni a 5€ per giocatore, fuori dall'iscrizione.",
  },
  {
    num: "03",
    title: "Giornata",
    text: "Bar aperto tutto il giorno, DJ Set e uno sconto in piscina riservato a tutti i partecipanti.",
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

    // Tutti i testi partono nascosti
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
      tl.to(words, { y: "0%", duration: 1, stagger: 0.2, ease: "power4.out" });
      if (i < paras.length - 1) {
        tl.to({}, { duration: 0.8 }); // pausa tra un testo e il successivo
      }
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section id="dettagli" className="bg-blue-900 text-white">
      <div ref={pinHeightRef} className="h-[200vh] md:h-[300vh]">
        <div
          ref={containerRef}
          className="flex h-screen flex-col justify-between p-4 md:px-8 md:py-24"
        >
          {/* Titolo sezione */}
          <div className="flex flex-row items-end justify-between gap-6 border-b border-white/20 pb-8">
            <h2 className="font-playfair text-white italic">Dettagli</h2>
            <button
              onClick={() =>
                window.open("/Regolamento_Champagne_League_2026.pdf", "_blank")
              }
              className="shrink-0 bg-white text-blue-900"
            >
              <HoverText>Regolamento</HoverText>
            </button>
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
