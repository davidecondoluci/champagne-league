import { useEffect, useRef } from "react";
import HoverText from "./HoverText";

const navLinks = [
  { label: "Dettagli", href: "#dettagli" },
  { label: "Programma", href: "#programma" },
  { label: "Premi", href: "#premi" },
  { label: "Partner", href: "#partner" },
  { label: "Gallery", href: "#gallery" },
  { label: "Divise", href: "#divise" },
  { label: "Iscriviti", href: "#iscriviti" },
  { label: "Contatti", href: "#contatti" },
];

function Contatti() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const fit = () => {
      section.querySelectorAll("[data-fit]").forEach((el) => {
        el.style.fontSize = "600px";
        const ratio = el.parentElement.offsetWidth / el.scrollWidth;
        el.style.fontSize = `${600 * ratio}px`;
      });
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contatti"
      data-navbar-theme="dark"
      className="bg-eerie-black flex min-h-screen flex-col justify-end px-4 text-white sm:px-6 md:px-10"
    >
      {/* Contacts + back to top */}
      <div className="flex items-end justify-between py-8">
        {/* Left: nav links */}
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-4xl">
              <HoverText>{link.label}</HoverText>
            </a>
          ))}
        </div>

        {/* Center: contact links */}
        <div className="flex flex-col items-end gap-3 md:items-start">
          <a
            href="https://mail.google.com/mail/?view=cm&to=info@champagneleague.it"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HoverText>info@champagneleague.it</HoverText>
          </a>
          <a
            href="https://www.instagram.com/champagneleague_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HoverText>Instagram</HoverText>
          </a>
          <a
            href="https://www.tiktok.com/@champagneleague_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HoverText>Tik Tok</HoverText>
          </a>
          <a
            href="https://wa.me/393476415786"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HoverText>+39 331 468 7907</HoverText>
          </a>
        </div>

        {/* Right: back to top */}
        <a
          href="#"
          aria-label="Torna in cima"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-opacity hover:opacity-70"
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </a>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-between border-t border-white/10 py-4">
        <p className="text-sm text-white/50">© 2026 Champagne League</p>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-white/50 hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-white/50 hover:underline">
            Preferenze Privacy
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contatti;
