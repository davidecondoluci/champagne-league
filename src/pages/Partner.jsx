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
];

const row1 = partners.slice(0, 4);
const row2 = partners.slice(4);

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

/* Infinite marquee row */
function MarqueeRow({ items, direction = "left", speed = 28 }) {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const updateTween = () => {
        if (tweenRef.current) tweenRef.current.kill();

        // 15 total sets. Width of one set is strictly total width / 15.
        // We use Math.floor or similar? getBoundingClientRect gives precision.
        const totalWidth = track.getBoundingClientRect().width;
        const oneSetWidth = totalWidth / 15;
        const duration = oneSetWidth / speed;

        if (direction === "left") {
          gsap.fromTo(
            track,
            { x: 0 },
            {
              x: -oneSetWidth,
              ease: "none",
              duration: duration,
              repeat: -1,
            }
          );
        } else {
          // For right direction, start shifted left by one set.
          // Because there are 14 more sets to the right, there will NEVER be a gap.
          gsap.fromTo(
            track,
            { x: -oneSetWidth },
            {
              x: 0,
              ease: "none",
              duration: duration,
              repeat: -1,
            }
          );
        }
        tweenRef.current = gsap.getTweensOf(track)[0];
      };

      // Ensure layout is finished
      requestAnimationFrame(updateTween);

      const observer = new ResizeObserver(updateTween);
      observer.observe(track);

      return () => observer.disconnect();
    });

    return () => ctx.revert();
  }, [direction, speed, items.length]);

  const slowDown = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.1, duration: 0.6, ease: "power2.out" });
    }
  };

  const speedUp = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.9, ease: "power2.inOut" });
    }
  };

  // Repeat items 15 times to guarantee that even shifting left by 1 set
  // leaves 14 sets to indefinitely cover the right side of any screen width.
  const multiplied = Array(15).fill(items).flat();

  return (
    <div className="flex w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max py-2"
        onMouseEnter={slowDown}
        onMouseLeave={speedUp}
      >
        {multiplied.map((p, i) => (
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
