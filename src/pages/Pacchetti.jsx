import Button from "../components/Button";

const packages = [
  {
    num: "01",
    name: "Esperto",
    price: "+15\u20AC",
    perks: [
      "Pranzo con bibita o birra",
      "Free entry con drink all\u2019After Party",
    ],
    bg: "var(--color-blue-700)",
    border: "var(--color-blue-300)",
    text: "var(--color-white)",
  },
  {
    num: "02",
    name: "Campione",
    price: "+30\u20AC",
    recommended: true,
    perks: [
      "Pranzo con bibita o birra",
      "Free entry con drink all\u2019After Party",
      "Ingresso piscina dalle 15:00",
      "50% di sconto per un accompagnatore",
    ],
    bg: "var(--color-grape-700)",
    border: "var(--color-grape-200)",
    text: "var(--color-white)",
  },
  {
    num: "03",
    name: "Leggenda",
    price: "+45\u20AC",
    perks: [
      "Tutto ci\u00f2 incluso nel Campione",
      "Maglia personalizzata Champagne League",
    ],
    bg: "var(--color-cyan-700)",
    border: "var(--color-cyan-200)",
    text: "var(--color-white)",
  },
];

function Pacchetti() {
  return (
    <section
      id="pacchetti"
      className="flex min-h-screen flex-col items-center justify-center gap-12 bg-white px-4 py-16 md:gap-16 md:py-24"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-blue-900">
          <span>Pacchetti </span>
          <span className="font-playfair italic">extra</span>
        </h2>
        <p className="max-w-xl text-blue-900/70 md:text-lg">
          Personalizza la tua esperienza. Acquistabili in fase di iscrizione
          sull&apos;app Jessico a un prezzo migliore rispetto alla giornata.
        </p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="flex aspect-3/4 flex-col justify-between overflow-hidden rounded-2xl border-6 p-6 md:p-8"
            style={{
              backgroundColor: pkg.bg,
              borderColor: pkg.border,
              color: pkg.text,
            }}
          >
            {/* Top: numero decorativo + badge consigliato */}
            <div className="flex items-start justify-between">
              <p
                className="font-playfair text-7xl font-black italic opacity-20 md:text-9xl"
                style={{ color: pkg.text }}
              >
                {pkg.num}
              </p>
              {pkg.recommended && (
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium tracking-wider uppercase">
                  Consigliato
                </span>
              )}
            </div>

            {/* Bottom: label + prezzo + perks */}
            <div className="flex flex-col gap-3">
              <p
                className="text-xs tracking-widest uppercase opacity-60"
                style={{ color: pkg.text }}
              >
                {pkg.name}
              </p>
              <p
                className="font-playfair text-5xl italic md:text-6xl"
                style={{ color: pkg.text }}
              >
                {pkg.price}
              </p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {pkg.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2 text-sm font-extralight md:text-base"
                    style={{ color: pkg.text }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-current opacity-50"
                    />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => window.open("https://jessico.app/", "_blank")}
        className="bg-blue-900 text-white"
      >
        Acquista su Jessico
      </Button>
    </section>
  );
}

export default Pacchetti;
