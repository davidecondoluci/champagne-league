import { useState } from "react";

const social = [
  { label: "Instagram", href: "https://www.instagram.com/champagneleague_" },
  { label: "Tik Tok", href: "https://www.tiktok.com/@champagneleague_" },
];

const navLinks = [
  { label: "Dettagli", href: "#dettagli" },
  { label: "Premi", href: "#premi" },
  { label: "Partner", href: "#partner" },
  { label: "Gallery", href: "#gallery" },
  { label: "Divise", href: "#divise" },
  { label: "Iscriviti", href: "#iscriviti" },
];

const contatti = [
  {
    label: "info@champagneleague.it",
    href: "https://mail.google.com/mail/?view=cm&to=info@champagneleague.it",
  },
  { label: "+39 331 468 7907", href: "https://wa.me/393476415786" },
];

function Contatti() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      id="contatti"
      className="bg-eerie-black flex min-h-screen flex-col justify-between px-4 pt-20 pb-4 text-white md:px-8"
    >
      {/* Main grid */}
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        {/* Left — headline + CTA */}
        <div className="flex flex-col gap-8">
          <h2>Vuoi saperne di più?</h2>
          <div className="flex flex-col gap-3">
            {submitted ? (
              <p className="mt-2 text-white/60">
                Grazie! Ti risponderemo al più presto.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="group mt-2 flex max-w-md items-end gap-3 border-b-[0.5px] border-white/30 pb-2 transition-colors duration-300 focus-within:border-white"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email..."
                  className="flex-1 bg-transparent text-base text-white placeholder-white/30 outline-none"
                />
                <button
                  type="submit"
                  className="flex shrink-0 cursor-pointer items-center gap-1 p-0 text-sm text-white/50 transition-colors duration-300 hover:text-white"
                >
                  <span class="material-symbols-rounded">
                    subdirectory_arrow_right
                  </span>
                  Invia
                </button>
              </form>
            )}
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/40">
            Contattaci per qualsiasi informazione sul torneo, sull'iscrizione o
            per diventare partner dell'evento.
          </p>
        </div>

        {/* Right — three columns */}
        <div className="flex justify-between gap-4 md:grid md:grid-cols-3 md:gap-8">
          {/* Pagine */}
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-widest text-white/40 uppercase">
              Menu
            </p>
            <ul className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-bottom-left bg-no-repeat transition-[background-size] duration-300 hover:bg-size-[100%_1px]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Contatti — stacked on mobile, separate columns on desktop */}
          <div className="flex flex-col gap-6 md:contents">
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
            <div className="flex flex-col gap-4">
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
                      className="bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-bottom-left bg-no-repeat transition-[background-size] duration-300 hover:bg-size-[100%_1px]"
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
      <div>
        {/* Bottom bar */}
        <div className="flex flex-col gap-3 pt-4 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
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
