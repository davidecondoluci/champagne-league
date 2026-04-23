import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { lenis } from "../lenis.js";

const links = [
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

function NavLink({ label, href, onClick, large }) {
  const itemRef = useRef(null);

  const handleMouseOver = useCallback((e) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const item = itemRef.current;
    if (!item) return;

    const visibleSpans = item.querySelectorAll("[data-nav='visible'] span");
    const hiddenSpans = item.querySelectorAll("[data-nav='hidden'] span");
    const hiddenContainer = item.querySelector("[data-nav='hidden']");

    if (!gsap.isTweening(visibleSpans) && item.classList.contains("hovered")) {
      item.classList.remove("hovered");
    }

    if (e.target.classList.contains("letter")) {
      item.classList.add("hovered");
      const indexHover = Array.from(e.target.parentNode.children).indexOf(
        e.target,
      );

      gsap.set(hiddenContainer, { opacity: 1 });
      gsap.to(visibleSpans, {
        yPercent: 100,
        ease: "back.out(2)",
        duration: 0.6,
        stagger: { each: 0.023, from: indexHover },
      });
      gsap.set([visibleSpans, hiddenSpans], { pointerEvents: "none" });
      gsap.to(hiddenSpans, {
        yPercent: 100,
        ease: "back.out(2)",
        duration: 0.6,
        stagger: { each: 0.023, from: indexHover },
        onComplete: () => {
          gsap.set(visibleSpans, { clearProps: "all" });
          gsap.set(hiddenSpans, { clearProps: "all" });
          gsap.set(hiddenContainer, { clearProps: "opacity" });
          item.classList.remove("hovered");
        },
      });
    }
  }, []);

  const letters = label.split("").map((char, i) =>
    char === " " ? (
      <span key={i}>&nbsp;</span>
    ) : (
      <span key={i} className="letter inline-block will-change-transform">
        {char}
      </span>
    ),
  );

  return (
    <li>
      <a
        ref={itemRef}
        href={href}
        className={`block cursor-pointer ${large ? "text-4xl" : "text-base"} text-blue-900`}
        onMouseOver={handleMouseOver}
        onClick={(e) => {
          if (href.startsWith("#")) {
            e.preventDefault();
            lenis.scrollTo(href);
          }
          onClick?.();
        }}
      >
        <span className="relative -mb-[0.2em] block overflow-hidden pb-[0.2em]">
          <span
            data-nav="hidden"
            className="pointer-events-none absolute bottom-full left-0 opacity-0"
          >
            {letters}
          </span>
          <span data-nav="visible" className="block">
            {letters}
          </span>
        </span>
      </a>
    </li>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Animate overlay open/close
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (open) {
      gsap.fromTo(
        overlay,
        { autoAlpha: 0, y: -20 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );
    } else {
      gsap.to(overlay, {
        autoAlpha: 0,
        y: -20,
        duration: 0.25,
        ease: "power3.in",
      });
    }
  }, [open]);

  const navTextColor = "text-blue-900";

  return (
    <>
      <nav className="absolute top-0 right-0 left-0 z-50 flex items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <a href="#">
          <img src="/logo.svg" alt="Champagne League" className="h-12 w-auto" />
        </a>

        {/* Desktop links — hidden on mobile */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink key={link.href} label={link.label} href={link.href} />
          ))}
        </ul>

        {/* Hamburger — mobile only */}
        <a
          className={`cursor-pointer transition-opacity hover:opacity-60 md:hidden ${navTextColor}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "close" : "menu"}
        >
          <img
            src={open ? "/icons/close.svg" : "/icons/menu.svg"}
            alt={open ? "Chiudi menu" : "Apri menu"}
            className="h-4 w-auto"
          />
        </a>
      </nav>

      {/* Full-page overlay menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-10 flex flex-col items-end justify-center bg-white pr-4"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <ul className="flex flex-col items-end gap-4">
          {links.map((link) => (
            <NavLink
              key={link.href}
              label={link.label}
              href={link.href}
              large
              onClick={() => setOpen(false)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
