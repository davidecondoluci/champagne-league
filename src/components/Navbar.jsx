import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const links = [
  { label: "Dettagli", href: "#dettagli" },
  { label: "Programma", href: "#programma" },
  { label: "Premi", href: "#premi" },
  { label: "Partner", href: "#partner" },
  { label: "Gallery", href: "#gallery" },
  { label: "Divise", href: "#divise" },
  { label: "Iscriviti", href: "#iscriviti" },
  { label: "Contatti", href: "#contatti" },
];

function NavLink({ label, href, onClick, dark, large }) {
  const itemRef = useRef(null);

  const handleMouseOver = useCallback((e) => {
    const item = itemRef.current;
    if (!item) return;

    const visibleSpans = item.querySelectorAll("[data-nav='visible'] span");
    const hiddenSpans = item.querySelectorAll("[data-nav='hidden'] span");

    if (!gsap.isTweening(visibleSpans) && item.classList.contains("hovered")) {
      item.classList.remove("hovered");
    }

    if (e.target.classList.contains("letter")) {
      item.classList.add("hovered");
      const indexHover = Array.from(e.target.parentNode.children).indexOf(
        e.target,
      );

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
    <li className="overflow-hidden">
      <a
        ref={itemRef}
        href={href}
        className={`relative block cursor-pointer overflow-hidden leading-tight ${large ? "text-2xl md:text-4xl" : "text-sm"} ${dark ? "text-penn-blue" : "text-white"}`}
        onMouseOver={handleMouseOver}
        onClick={onClick}
      >
        <span
          data-nav="hidden"
          className="pointer-events-none absolute bottom-full left-0"
        >
          {letters}
        </span>
        <span data-nav="visible" className="block">
          {letters}
        </span>
      </a>
    </li>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
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

  useEffect(() => {
    const sections = document.querySelectorAll("[data-navbar-theme]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-navbar-theme");
            setDark(theme === "light");
          }
        });
      },
      { rootMargin: "-1px 0px -95% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navTextColor = open
    ? "text-penn-blue"
    : dark
      ? "text-penn-blue"
      : "text-white";

  return (
    <>
      {/* Navbar bar — always on top */}
      <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-4 md:absolute md:px-8 md:py-5">
        {/* Logo */}
        <a href="#">
          <img
            src={dark || open ? "/logo.svg" : "/logo-white.svg"}
            alt="Champagne League"
            className="h-10 w-auto transition-all duration-300 md:h-12"
          />
        </a>

        {/* Right side: menu toggle icon */}
        <a
          className={`padding-0 cursor-pointer transition-opacity hover:opacity-60 ${navTextColor}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "close" : "menu"}
        >
          <span className="material-symbols-outlined text-6xl">
            {open ? "close" : "menu"}
          </span>
        </a>
      </nav>

      {/* Full-page overlay menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 flex flex-col items-end justify-center bg-white pr-4 md:pr-8"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <ul className="flex flex-col items-end gap-4 md:gap-6">
          {links.map((link) => (
            <NavLink
              key={link.href}
              label={link.label}
              href={link.href}
              dark
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
