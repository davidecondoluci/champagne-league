import { useEffect, useRef } from "react";
import gsap from "gsap";

// padding: V H — wide logos need less H to fill the card; square logos need more.
const partners = [
  {
    src: "/partner/aixam.svg",
    alt: "Aixam",
    href: "https://www.aixam.com",
  },
  {
    src: "/partner/archivio.svg",
    alt: "Archivio",
    href: "https://archivio.bar/",
  },
  {
    src: "/partner/autentiko.svg",
    alt: "Autentiko",
    href: "https://www.autentiko.it",
  },
  {
    src: "/partner/autovittani.svg",
    alt: "Autovittani",
    href: "https://www.autovittani.it",
  },
  {
    src: "/partner/brancostore.svg",
    alt: "Branco Store",
    href: "https://www.brancostore.it",
  },
  {
    src: "/partner/colombo-cafe.svg",
    alt: "Colombo Café",
    href: "https://www.instagram.com/colombo_cafe/",
  },
  {
    src: "/partner/easy-driver.svg",
    alt: "Easy Driver",
    href: "https://www.autoscuolacatelli.it/",
  },
  {
    src: "/partner/ferramenta.svg",
    alt: "Ferramenta Crippa Daniele",
    href: "https://www.ferramentacrippa.it/",
  },
  {
    src: "/partner/la-pinetina.svg",
    alt: "La Pinetina",
    href: "https://www.pinetina.it/",
  },
  {
    src: "/partner/lam.svg",
    alt: "LAM",
    href: "https://www.lamautoricambi.it/",
  },
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
    src: "/partner/ox.svg",
    alt: "OX",
    href: "https://www.oxpubandgrill.it/vertemate/",
  },
  {
    src: "/partner/stampa-la-tua-tshirt.svg",
    alt: "Stampa la tua T-shirt",
    href: "https://stampalatuatshirt.it/",
  },
  {
    src: "/partner/il-bussolotto.svg",
    alt: "Tabaccheria Il Bussolotto",
  },
  {
    src: "/partner/upcotech.svg",
    alt: "Upcotech",
    href: "https://www.upcotech.it/",
  },
  {
    src: "/partner/wehere.svg",
    alt: "WeHere",
    href: "https://www.instagram.com/wehere.it/",
  },
];

const row1 = partners.slice(0, 8);
const row2 = partners.slice(8);

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
      className="group mx-2 flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-6 md:mx-3 md:h-56 md:w-56"
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

    if (direction === "left") {
      gsap.set(track, { xPercent: 0 });
      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    } else {
      gsap.set(track, { xPercent: -50 });
      tweenRef.current = gsap.to(track, {
        xPercent: 0,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    }

    return () => tweenRef.current?.kill();
  }, [direction, speed]);

  const slowDown = () => {
    if (tweenRef.current)
      gsap.to(tweenRef.current, {
        timeScale: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
  };

  const speedUp = () => {
    if (tweenRef.current)
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.9,
        ease: "power2.inOut",
      });
  };

  // Duplicate items to create the seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max py-2"
        onMouseEnter={slowDown}
        onMouseLeave={speedUp}
      >
        {doubled.map((partner, i) => (
          <PartnerCard key={`${partner.alt}-${i}`} {...partner} />
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
      data-navbar-theme="dark"
      className="bg-penn-blue overflow-hidden py-20 md:mt-[-50vh]"
    >
      <h2 className="mb-14 px-6 text-center text-white md:mb-16">
        <span className="font-playfair italic">Partner </span>
        <span>2024</span>
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
