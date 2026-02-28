import { useEffect, useState } from "react";

// Funzione per calcolare quanto manca all'evento
const TARGET_DATE = new Date("2026-06-27T00:00:00");

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
    <div className="bg-penn-blue/5 flex flex-col items-center justify-center rounded-2xl p-4">
      <span className="text-penn-blue text-6xl font-bold md:text-8xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-penn-blue mt-1 text-xs font-medium md:mt-2 md:text-sm">
        {label}
      </span>
    </div>
  );
}

// FUNZIONE PER GENERARE E SCARICARE IL FILE .ICS
function downloadICS() {
  // Orario evento UTC (modifica se vuoi altro orario)
  const start = "20260627T080000Z"; // 27 giugno 2026, ore 10:00 italiane (08:00 UTC), cambia se serve!
  const end = "20260627T200000Z"; // 27 giugno 2026, ore 22:00 italiane (20:00 UTC)
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

function Hero() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      data-navbar-theme="light"
      className="text-penn-blue relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-8 text-center"
    >
      {/* Date badge → BUTTON per download ICS */}
      <button
        onClick={downloadICS}
        className="bg-penn-blue/5 text-penn-blue mb-10 cursor-pointer"
      >
        <span className="material-symbols-outlined">calendar_month</span>
        Sabato, 27 giugno 2026
      </button>

      {/* Resto invariato */}
      <h1>
        <span className="font-playfair text-grape italic">Il Torneo</span>
        <br />
        <span className="text-penn-blue">di calcio a 5</span>
      </h1>
      <p className="text-penn-blue mt-6 text-lg md:text-2xl">
        12 ore, 32 squadre
        <br />
        La Pinetina: Centro Sportivo Appiano Gentile
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
