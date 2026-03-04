import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HoverText from "./HoverText";

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
  const flipRefs = useRef([]);
  const flipMobileRefs = useRef([]);
  const sliderRef = useRef(null);
  const [flippedMobile, setFlippedMobile] = useState([false, false, false]);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveSlide(Math.min(index, jerseys.length - 1));
  };

  useEffect(() => {
    // Set perspective on mobile flip refs
    flipMobileRefs.current.forEach((el) => {
      if (el) gsap.set(el, { transformStyle: "preserve-3d" });
    });
  }, []);

  const handleEnter = (i) => {
    gsap.to(flipRefs.current[i], {
      rotationY: 180,
      duration: 0.55,
      ease: "power3.inOut",
    });
  };

  const handleLeave = (i) => {
    gsap.to(flipRefs.current[i], {
      rotationY: 0,
      duration: 0.55,
      ease: "power3.inOut",
    });
  };

  const handleMobileToggle = (i) => {
    const next = !flippedMobile[i];
    setFlippedMobile((prev) => prev.map((v, idx) => (idx === i ? next : v)));
    gsap.to(flipMobileRefs.current[i], {
      rotationY: next ? 180 : 0,
      duration: 0.55,
      ease: "power3.inOut",
    });
  };

  return (
    <section
      id="divise"
      className="relative mb-16 flex h-screen flex-col items-center justify-center gap-8 px-4 py-4 md:mb-24 md:gap-16 md:px-8"
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

      {/* GPU primer: back images rendered off-screen with opacity 0.001 so the browser
           uploads textures before the first flip — avoids first-flip lag */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          pointerEvents: "none",
        }}
      >
        {jerseys.map((jersey, i) => (
          <img
            key={i}
            src={jersey.back}
            alt=""
            style={{
              opacity: 0.001,
              willChange: "transform",
              transform: "translate3d(0,0,0)",
            }}
          />
        ))}
      </div>

      {/* Cards */}
      {/* Mobile: snap scroll, 80vw cards so next card peeks */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex w-full snap-x snap-mandatory gap-0 overflow-x-auto pb-2 md:hidden"
      >
        {jerseys.map((jersey, i) => (
          <div
            key={i}
            className="flex shrink-0 snap-start items-center justify-center"
            style={{ width: "100%" }}
            onClick={() => handleMobileToggle(i)}
          >
            <div
              ref={(el) => (flipMobileRefs.current[i] = el)}
              style={{
                width: "70vw",
                maxWidth: "280px",
                position: "relative",
                transformStyle: "preserve-3d",
                perspective: "600px",
                willChange: "transform",
              }}
            >
              <img
                src={jersey.front}
                alt={`${jersey.label} fronte`}
                draggable={false}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              />
              <img
                src={jersey.back}
                alt={`${jersey.label} retro`}
                draggable={false}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  willChange: "transform",
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
              i === activeSlide ? "w-6 bg-blue-900" : "w-1.5 bg-blue-900/25"
            }`}
          />
        ))}
      </div>

      {/* Desktop: flip row */}
      <div className="hidden w-full items-center justify-center gap-24 md:flex">
        {jerseys.map((jersey, i) => (
          <div
            key={i}
            style={{ width: "20vw", maxWidth: 300 }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
          >
            <div
              ref={(el) => (flipRefs.current[i] = el)}
              style={{
                width: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <img
                src={jersey.front}
                alt={`${jersey.label} fronte`}
                draggable={false}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              />
              <img
                src={jersey.back}
                alt={`${jersey.label} retro`}
                draggable={false}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  willChange: "transform",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Store button */}
      <button
        onClick={() =>
          window.open("https://www.brancostore.it/champagneleague/", "_blank")
        }
        className="cursor-pointer bg-blue-900 text-white"
      >
        <HoverText>Visita lo store</HoverText>
      </button>
    </section>
  );
}

export default Divise;
