import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Funzione per calcolare quanto manca all'evento
const TARGET_DATE = new Date("2026-07-04T00:00:00");

function getTimeLeft() {
  const diff = TARGET_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-blue-900/5 p-4">
      <span className="text-6xl font-medium text-blue-900 md:text-8xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs font-medium text-blue-900 md:text-sm">
        {label}
      </span>
    </div>
  );
}

// FUNZIONE PER GENERARE E SCARICARE IL FILE .ICS
function downloadICS() {
  // Orario evento UTC (modifica se vuoi altro orario)
  const start = "20260704T080000Z"; // 4 luglio 2026, ore 10:00 italiane (08:00 UTC)
  const end = "20260704T200000Z"; // 4 luglio 2026, ore 22:00 italiane (20:00 UTC)
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Il Torneo di calcio a 5//IT
BEGIN:VEVENT
UID:torneo-calcetto-2026@example.com
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:Torneo di calcio a 5 - La Pinetina
DESCRIPTION:Torneo amatoriale da 12 ore a 32 squadre presso il Centro Sportivo La Pinetina Appiano Gentile
LOCATION:Centro Sportivo La Pinetina, Appiano Gentile
END:VEVENT
END:VCALENDAR
  `.trim();

  const blob = new Blob([icsContent], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "torneo-calcetto-2026.ics";
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 0);
}

function wrapLetters(text, extraClass = "") {
  return text.split("").map((char, i) =>
    char === " " ? (
      <span key={i}>&nbsp;</span>
    ) : (
      <span
        key={i}
        className={`hero-letter relative inline-block ${extraClass}`}
      >
        <span className="inline-block">{char}</span>
        <span className="pointer-events-none absolute bottom-full left-0 inline-block">
          {char}
        </span>
      </span>
    ),
  );
}

function Hero() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const h1Ref = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const h1 = h1Ref.current;
    if (!h1) return;
    const letters = h1.querySelectorAll(".hero-letter span:first-child");
    const ctx = gsap.context(() => {
      gsap.from(letters, {
        yPercent: 100,
        ease: "power3.out",
        duration: 1,
        stagger: { each: 0.04, from: "random" },
        delay: 0.2,
      });
    }, h1);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center text-blue-900">
      {/* Date badge → BUTTON per download ICS */}
      <button
        onClick={downloadICS}
        className="mb-6 cursor-pointer bg-blue-900/5 text-blue-900"
      >
        <span className="material-symbols-rounded">calendar_month</span>
        Sabato, 4 luglio 2026
      </button>

      {/* Resto invariato */}
      <h1 ref={h1Ref}>
        <span className="font-playfair text-grape-800 flex justify-center overflow-hidden italic">
          {wrapLetters("Il Torneo")}
        </span>
        <span className="flex justify-center overflow-hidden text-blue-900">
          {wrapLetters("di calcio a 5")}
        </span>
      </h1>
      <p className="mt-6 text-lg text-blue-900 md:text-2xl">
        Centro Sportivo La Pinetina di Appiano Gentile
      </p>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <CountdownUnit value={timeLeft.days} label="Giorni" />
        <CountdownUnit value={timeLeft.hours} label="Ore" />
        <CountdownUnit value={timeLeft.minutes} label="Minuti" />
        <CountdownUnit value={timeLeft.seconds} label="Secondi" />
      </div>
    </section>
  );
}

export default Hero;
