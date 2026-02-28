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
  const sectionRef = useRef(null);
  const tiltRefs = useRef([]);
  const flipRefs = useRef([]);
  const flipMobileRefs = useRef([]);
  const rotToX = useRef([]);
  const rotToY = useRef([]);
  const [flippedMobile, setFlippedMobile] = useState([false, false, false]);

  useEffect(() => {
    const tilts = tiltRefs.current;

    // GSAP quickTo for smooth tilt on each card
    tilts.forEach((el, i) => {
      rotToX.current[i] = gsap.quickTo(el, "rotationX", {
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      });
      rotToY.current[i] = gsap.quickTo(el, "rotationY", {
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      });
      gsap.set(el, { transformPerspective: 600 });
    });

    // Set perspective on mobile flip refs too
    flipMobileRefs.current.forEach((el) => {
      if (el) gsap.set(el, { transformStyle: "preserve-3d" });
    });

    const onMouseMove = (e) => {
      tilts.forEach((el, i) => {
        const bound = el.getBoundingClientRect();
        const midX = bound.left + bound.width / 2;
        const midY = bound.top + bound.height / 2;
        const rotX = gsap.utils.clamp(-25, 25, (e.clientY - midY) / 10) * -1;
        const rotY = gsap.utils.clamp(-25, 25, (e.clientX - midX) / 10);
        rotToX.current[i](rotX);
        rotToY.current[i](rotY);
      });
    };

    const onMouseLeave = () => {
      tilts.forEach((el, i) => {
        rotToX.current[i](0);
        rotToY.current[i](0);
      });
    };

    const section = sectionRef.current;
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
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
      ref={sectionRef}
      data-navbar-theme="light"
      className="relative flex flex-col items-center justify-center gap-12 bg-white px-8 py-16"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <img
          src="/partner/brancostore.svg"
          alt="Brancostore"
          className="h-8 w-auto"
        />
        <h3 className="text-penn-blue text-center">
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
      <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:hidden">
        {jerseys.map((jersey, i) => (
          <div
            key={i}
            className="shrink-0 snap-start"
            style={{ width: "80vw" }}
            onClick={() => handleMobileToggle(i)}
          >
            <div
              ref={(el) => (flipMobileRefs.current[i] = el)}
              style={{
                width: "100%",
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

      {/* Desktop: tilt + flip row */}
      <div className="hidden w-full items-center justify-center gap-24 md:flex">
        {jerseys.map((jersey, i) => (
          <div
            key={i}
            ref={(el) => (tiltRefs.current[i] = el)}
            style={{
              width: "20vw",
              maxWidth: 300,
              perspective: "600px",
              willChange: "transform",
            }}
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
        href="https://www.brancostore.it/champagneleague/"
        target="_blank"
        className="bg-penn-blue text-white"
      >
        <HoverText>Visita lo store</HoverText>
      </button>
    </section>
  );
}

export default Divise;
