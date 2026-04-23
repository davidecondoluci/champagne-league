import { useState } from "react";
import { lenis } from "../lenis.js";
import Button from "../components/Button";

const FORMSPREE_ID = "xlgpgnnw"; // ← sostituisci con il tuo ID da formspree.io

const social = [
  { label: "Instagram", href: "https://www.instagram.com/champagneleague_" },
  { label: "Tik Tok", href: "https://www.tiktok.com/@champagneleague_" },
];

const links = [
  { label: "Home", href: "#home" },
  { label: "Dettagli", href: "#dettagli" },
  { label: "Premi", href: "#premi" },
  { label: "Pacchetti", href: "#pacchetti" },
  { label: "Partner", href: "#partner" },
  { label: "Gallery", href: "#gallery" },
  { label: "Storico", href: "#storico" },
  { label: "Divise", href: "#divise" },
  { label: "Iscriviti", href: "#iscriviti" },
  { label: "Contatti", href: "#contatti" },
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
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, message }),
      });
      if (res.ok) {
        setSubmitted(true);
        setEmail("");
        setMessage("");
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };

  return (
    <section
      id="contatti"
      className="bg-eerie-black flex min-h-screen flex-col justify-between gap-12 p-4 text-white md:h-screen md:gap-0 md:px-8 md:pt-20 md:pb-6"
    >
      {/* Main grid */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        {/* Left — headline + CTA */}
        <div className="flex flex-col gap-6">
          <h2>Vuoi saperne di più?</h2>
          <div className="flex flex-col gap-3">
            {submitted ? (
              <p className="mt-2 text-white">
                Grazie! Ti risponderemo al più presto.
              </p>
            ) : error ? (
              <p className="mt-2 text-red-400">
                Qualcosa è andato storto. Riprova.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-2 flex max-w-md flex-col gap-4"
              >
                <div className="flex items-end gap-4 border-b border-white/40 pb-2 transition-colors duration-300 focus-within:border-white">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="La tua email..."
                    className="flex-1 bg-transparent text-base text-white placeholder-white/40 outline-none"
                  />
                </div>
                <div className="flex items-end gap-4 border-b border-white/40 pb-2 transition-colors duration-300 focus-within:border-white">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Il tuo messaggio..."
                    rows={3}
                    className="flex-1 resize-none bg-transparent text-base text-white placeholder-white/40 outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="group/btn flex w-fit items-center gap-1 p-0 text-sm text-white/60 transition-colors duration-300 hover:text-white"
                  withHover={false}
                >
                  <img
                    src="/icons/subdirectory-arrow-right.svg"
                    alt=""
                    className="h-4 w-auto opacity-60 transition-opacity duration-300 group-hover/btn:opacity-100"
                  />
                  Invia
                </Button>
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
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      lenis.scrollTo(l.href);
                    }}
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
