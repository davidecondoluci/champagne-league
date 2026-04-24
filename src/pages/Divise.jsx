import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Button from "../components/Button";

const jerseys = [
  {
    front: "/divise/purple-front.webp",
    back: "/divise/purple-back.webp",
    label: "Home",
  },
  {
    front: "/divise/cyan-front.webp",
    back: "/divise/cyan-back.webp",
    label: "Away",
  },
  {
    front: "/divise/green-front.webp",
    back: "/divise/green-back.webp",
    label: "Goalkeeper",
  },
];

function Divise() {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [flippedMobile, setFlippedMobile] = useState([false, false, false]);

  // front image refs: [mobile[0..2], desktop[0..2]]
  const mobileFrontRefs = useRef([]);
  const desktopFrontRefs = useRef([]);

  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveSlide(Math.min(index, jerseys.length - 1));
  };

  useEffect(() => {
    // Pre-decode all jersey images
    jerseys.forEach(({ front, back }) => {
      [front, back].forEach((src) => {
        const img = new window.Image();
        img.src = src;
        img.decode().catch(() => {});
      });
    });
  }, []);

  const handleMobileToggle = (i) => {
    const next = !flippedMobile[i];
    setFlippedMobile((prev) => prev.map((v, idx) => (idx === i ? next : v)));
    gsap.to(mobileFrontRefs.current[i], {
      autoAlpha: next ? 0 : 1,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  const handleEnter = (i) => {
    gsap.to(desktopFrontRefs.current[i], {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  const handleLeave = (i) => {
    gsap.to(desktopFrontRefs.current[i], {
      autoAlpha: 1,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  return (
    <section
      id="divise"
      className="relative flex h-screen flex-col items-center justify-center gap-8 bg-white px-4 py-4 md:gap-16"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <img
          src="/partner/brancostore.svg"
          alt="Brancostore"
          className="h-8 w-auto"
        />
        <h3 className="text-center text-blue-900">
          <span className="font-playfair italic">Home</span>,{" "}
          <span className="font-playfair italic">Away</span> e{" "}
          <span className="font-playfair italic">Goalkeeper</span> Kit
          personalizzabili
        </h3>
      </div>

      {/* Mobile: snap scroll */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex w-full snap-x snap-mandatory gap-0 overflow-x-auto pb-2 md:hidden"
      >
        {jerseys.map((jersey, i) => (
          <div
            key={i}
            className="flex shrink-0 snap-start items-center justify-center"
            style={{ width: "100%" }}
            onClick={() => handleMobileToggle(i)}
          >
            <div
              style={{
                width: "70vw",
                maxWidth: "280px",
                position: "relative",
              }}
            >
              {/* Back — base layer */}
              <img
                src={jersey.back}
                alt={`${jersey.label} retro`}
                draggable={false}
                decoding="async"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              {/* Front — fades out on click */}
              <img
                ref={(el) => (mobileFrontRefs.current[i] = el)}
                src={jersey.front}
                alt={`${jersey.label} fronte`}
                draggable={false}
                decoding="async"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators — mobile only */}
      <div className="flex gap-2 md:hidden">
        {jerseys.map((_, i) => (
          <span
            key={i}
            className={`block h-1.5 rounded-full transition-all duration-300 ${
              i === activeSlide ? "w-6 bg-blue-900" : "w-2 bg-blue-900/25"
            }`}
          />
        ))}
      </div>

      {/* Desktop: hover fade */}
      <div className="hidden w-full items-center justify-center gap-24 md:flex">
        {jerseys.map((jersey, i) => (
          <div
            key={i}
            style={{
              width: "20vw",
              maxWidth: 300,
              position: "relative",
              cursor: "default",
            }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
          >
            {/* Back — base layer */}
            <img
              src={jersey.back}
              alt={`${jersey.label} retro`}
              draggable={false}
              decoding="async"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            {/* Front — fades out on hover */}
            <img
              ref={(el) => (desktopFrontRefs.current[i] = el)}
              src={jersey.front}
              alt={`${jersey.label} fronte`}
              draggable={false}
              decoding="async"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </div>
        ))}
      </div>

      {/* Store button */}
      <Button
        onClick={() =>
          window.open("https://www.brancostore.it/champagneleague/", "_blank")
        }
        className="bg-blue-900 text-white"
      >
        Visita lo store
      </Button>
    </section>
  );
}

export default Divise;
