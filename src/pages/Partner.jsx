import { useEffect, useRef } from "react";
import gsap from "gsap";

// padding: V H — wide logos need less H to fill the card; square logos need more.
const partners = [
  {
    src: "/partner/mc.svg",
    alt: "McDonald's",
    href: "https://www.mcdonalds.it",
  },
  {
    src: "/partner/orgoglio-comasco.svg",
    alt: "Orgoglio Comasco",
    href: "https://www.instagram.com/orgoglio_comasco/",
  },
  {
    src: "/partner/brancostore.svg",
    alt: "Branco Store",
    href: "https://www.brancostore.it",
  },
  {
    src: "/partner/bak-pasticceria.svg",
    alt: "BAK Pasticceria",
    href: "https://www.pasticceriabak.com/",
  },
  {
    src: "/partner/fk-pizzeria.svg",
    alt: "FK Pizzeria",
    href: "https://fkpizza.com/laterrazza/",
  },
  {
    src: "/partner/jessico.svg",
    alt: "Jessico",
    href: "http://www.jessico.app/",
  },
  {
    src: "/partner/lariosport.svg",
    alt: "Lario Sport",
    href: "http://www.lariosport.it/",
  },
  {
    src: "/partner/sydney-pasticceria.svg",
    alt: "Sydney Pasticceria",
    href: "https://www.instagram.com/sydney2000.pasticceria.gelato/",
  },
  {
    src: "/partner/wall-street-english.svg",
    alt: "Wall Street English",
    href: "https://www.wallstreetenglish.it/scuola-inglese/como/",
  },
  {
    src: "/partner/le-noir.svg",
    alt: "Le Noir Studio",
    href: "https://www.instagram.com/le_noir_studio_",
  },
  {
    src: "/partner/powsh.svg",
    alt: "Powsh",
    href: "https://powshpet.com/",
  },
];

const row1 = partners.slice(0, 6);
const row2 = partners.slice(6);

/* Single partner card */
function PartnerCard({ src, alt, padding, href }) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 0.92,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  return (
    <a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mx-2 flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-6 md:mx-4 md:h-56 md:w-56"
      style={{ padding }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        className="pointer-events-none h-full w-full object-contain opacity-50 grayscale transition-all duration-500 select-none group-hover:opacity-100 group-hover:grayscale-0 group-active:opacity-100 group-active:grayscale-0"
        draggable={false}
      />
    </a>
  );
}

/* Infinite marquee — GSAP modifiers: anima verso un numero enorme, il modifier
   wrappa matematicamente il valore ogni frame → zero reset, zero scatto. */
function MarqueeRow({ items, direction = "left", speed = 32 }) {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const raf = requestAnimationFrame(() => {
      const oneSetWidth = track.scrollWidth / 5;
      // 500 set-widths di distanza = ~16.000 secondi a speed=32 → mai si ferma
      const bigDist = oneSetWidth * 500;

      gsap.set(track, { x: 0 });
      tweenRef.current = gsap.to(track, {
        x: direction === "left" ? -bigDist : bigDist,
        duration: (bigDist / oneSetWidth) * speed,
        ease: "none",
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const v = parseFloat(x);
            // left: 0 → -oneSetWidth → 0 → … (wrapping negativo)
            // right: 0 → -oneSetWidth (partenza visiva) → 0 → … (wrapping positivo)
            return direction === "left"
              ? -(Math.abs(v) % oneSetWidth)
              : (v % oneSetWidth) - oneSetWidth;
          }),
        },
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      tweenRef.current?.kill();
    };
  }, [direction, speed]);

  const slowDown = () => tweenRef.current?.timeScale(0.15);
  const speedUp = () => tweenRef.current?.timeScale(1);

  const quintupled = [...items, ...items, ...items, ...items, ...items];

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={slowDown}
      onMouseLeave={speedUp}
    >
      <div
        ref={trackRef}
        className="flex w-max py-2"
        style={{ willChange: "transform" }}
      >
        {quintupled.map((p, i) => (
          <PartnerCard key={`${p.alt}-${i}`} {...p} />
        ))}
      </div>
    </div>
  );
}

/* Section */
function Partner() {
  return (
    <section
      id="partner"
      className="flex h-screen flex-col items-center justify-center overflow-hidden bg-blue-900 pb-16 md:pb-0"
    >
      <h2 className="mb-12 px-4 text-center text-white">
        <span className="font-playfair italic">Partner </span>
        <span>2026</span>
      </h2>

      <div
        className="flex flex-col gap-2"
        style={{ transform: "rotate(-2deg)", margin: "0 -8%" }}
      >
        <MarqueeRow items={row1} direction="left" speed={32} />
        <MarqueeRow items={row2} direction="right" speed={32} />
      </div>
    </section>
  );
}

export default Partner;
