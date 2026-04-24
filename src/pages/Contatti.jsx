const social = [
  { label: "Instagram", href: "https://www.instagram.com/champagneleague_" },
  { label: "Tik Tok", href: "https://www.tiktok.com/@champagneleague_" },
];

const contatti = [
  {
    label: "info@champagneleague.it",
    href: "https://mail.google.com/mail/?view=cm&to=info@champagneleague.it",
  },
  { label: "+39 331 468 7907", href: "https://wa.me/393476415786" },
];

function Contatti() {
  return (
    <section
      id="contatti"
      className="bg-eerie-black flex flex-col justify-between gap-12 px-4 pt-12 pb-6 text-white md:gap-16 md:px-8 md:pt-24 md:pb-8"
    >
      {/* Main grid */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        {/* Left — headline + testo */}
        <div className="flex flex-col gap-6">
          <h2>Vuoi saperne di più?</h2>
          <p className="text-lg text-white">
            Contattaci per qualsiasi informazione sul torneo, sull'iscrizione o
            per diventare partner dell'evento.
          </p>
        </div>

        {/* Right — Social + Contatti + freccia */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-8 md:gap-8">
            {/* Social */}
            <div className="flex flex-col gap-4">
              <p className="text-xs tracking-widest text-white/40 uppercase">
                Social
              </p>
              <ul className="flex flex-col gap-2">
                {social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-bottom-left bg-no-repeat transition-[background-size] duration-300 hover:bg-size-[100%_1px]"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contatti */}
            <div className="flex min-w-0 flex-col gap-4">
              <p className="text-xs tracking-widest text-white/40 uppercase">
                Contatti
              </p>
              <ul className="flex flex-col gap-2">
                {contatti.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-bottom-left bg-no-repeat break-all transition-[background-size] duration-300 hover:bg-size-[100%_1px]"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="gap-1">
        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Champagne League</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.iubenda.com/privacy-policy/70871278"
              className="iubenda-nostyle iubenda-noiframe iubenda-embed transition-colors hover:text-white/80"
              title="Privacy Policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.iubenda.com/privacy-policy/70871278/cookie-policy"
              className="iubenda-nostyle iubenda-noiframe iubenda-embed transition-colors hover:text-white/80"
              title="Cookie Policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Informativa sulla raccolta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contatti;
