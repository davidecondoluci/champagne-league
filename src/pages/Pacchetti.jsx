import Button from "../components/Button";

const packages = [
  {
    name: "Esperto",
    price: "+15€",
    unit: "a giocatore",
    perks: [
      "Pranzo con bibita o birra",
      "Free entry con drink all'After Party",
    ],
    recommended: false,
  },
  {
    name: "Campione",
    price: "+30€",
    unit: "a giocatore",
    perks: [
      "Pranzo con bibita o birra",
      "Free entry con drink all'After Party",
      "Ingresso piscina dalle 15:00",
      "50% di sconto per un accompagnatore",
    ],
    recommended: true,
  },
  {
    name: "Leggenda",
    price: "+45€",
    unit: "a giocatore",
    perks: [
      "Tutto ciò incluso nel Campione",
      "Maglia personalizzata Champagne League",
    ],
    recommended: false,
  },
];

function Pacchetti() {
  return (
    <section
      id="pacchetti"
      className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-blue-900 px-4 py-16 md:h-dvh md:gap-8 md:py-0"
    >
      <div className="flex flex-col items-center gap-4 text-center text-white">
        <h2>
          <span>Pacchetti </span>
          <span className="font-playfair italic">extra</span>
        </h2>
        <p className="max-w-xl md:text-lg">
          Personalizza la tua esperienza. Acquistabili in fase di iscrizione
          sull'app Jessico a un prezzo migliore rispetto alla giornata.
        </p>
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3 md:items-start md:gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative flex flex-col rounded-2xl p-6 md:p-8 ${
              pkg.recommended
                ? "text-white md:scale-105 md:shadow-2xl"
                : "border border-white/10 bg-white/5 text-white"
            }`}
            style={
              pkg.recommended
                ? {
                    backgroundColor:
                      "color-mix(in srgb, var(--color-grape-800) 80%, transparent)",
                    border: "1px solid var(--color-grape-600)",
                  }
                : {}
            }
          >
            {/* Nome + badge */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-medium text-white">{pkg.name}</p>
                {pkg.recommended && (
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium tracking-widest whitespace-nowrap text-white uppercase"
                    style={{ backgroundColor: "var(--color-grape-500)" }}
                  >
                    Consigliato
                  </span>
                )}
              </div>
            </div>

            {/* Prezzo */}
            <div className="my-6 flex flex-col">
              <span className="text-6xl font-medium md:text-7xl">
                {pkg.price}
              </span>
              <span className="text-sm text-white/60">{pkg.unit}</span>
            </div>

            {/* Perks */}
            <ul className="mb-6 flex flex-1 list-disc flex-col gap-1.5 pl-4">
              {pkg.perks.map((perk) => (
                <li
                  key={perk}
                  className={`text-sm md:text-base ${
                    pkg.recommended ? "text-white/60" : "text-white/60"
                  }`}
                >
                  {perk}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              onClick={() => window.open("https://jessico.app/", "_blank")}
              className={`w-full justify-center ${
                pkg.recommended ? "text-white" : "bg-white/10 text-white"
              }`}
              style={
                pkg.recommended
                  ? { backgroundColor: "var(--color-grape-500)" }
                  : {}
              }
            >
              Acquista su Jessico
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pacchetti;
