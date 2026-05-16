const items = [
  {
    type: "img",
    src: "/ping-pong.svg",
    title: "Ping-Pong",
    desc: "disponibile per tutti i giocatori",
  },
  {
    type: "icon",
    icon: "sports_and_outdoors",
    title: "Calcio tennis",
    desc: "disponibile per tutti i giocatori",
  },
  {
    type: "icon",
    icon: "pool",
    title: "Piscina",
    desc: "disponibile dalle 15:00",
  },
  {
    type: "icon",
    icon: "massage",
    title: "Fisioterapista",
    desc: "disponibile per tutti i giocatori",
  },
  {
    type: "icon",
    icon: "photo_camera",
    title: "Foto, video e interviste",
    desc: "ai giocatori",
  },
  {
    type: "icon",
    icon: "monitoring",
    title: "Statistiche live",
    desc: "orari e risultati in tempo reale",
  },
  {
    type: "img",
    src: "/partner/mc.svg",
    title: "McDonald's",
    desc: "regalerà melette ai giocatori",
  },
  {
    type: "icon",
    icon: "restaurant",
    title: "Bar e ristoro",
    desc: "per pranzo, aperitivo e cena",
  },
  {
    type: "icon",
    icon: "headphones",
    title: "Dj set",
    desc: "tutto il giorno by DJ Crippo",
  },
  {
    type: "icon",
    icon: "celebration",
    title: "After Party",
    desc: "con Free Entry dalle 22:00",
  },
];

function Giornata() {
  return (
    <section
      id="giornata"
      className="flex min-h-screen flex-col items-center justify-center gap-12 bg-white px-4 py-16 md:py-24"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-blue-900">
          <span>La </span>
          <span className="font-playfair italic">Giornata</span>
        </h2>
        <p className="md:text-lg">
          Tutto quello che troverai il giorno del torneo.
        </p>
      </div>

      {/* Grid */}
      <div className="grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center gap-4 p-4 text-center md:p-6"
          >
            {/* Icon or logo */}
            {item.type === "img" ? (
              <img
                src={item.src}
                alt={item.title}
                className="h-16 w-auto object-contain"
              />
            ) : (
              <span
                className="material-symbols-rounded text-grape-700"
                style={{ fontSize: "4rem" }}
              >
                {item.icon}
              </span>
            )}

            {/* Text */}
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium text-blue-900">
                {item.title}
              </p>
              <p className="text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Giornata;
