import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 21.webp is missing from the folder
const images = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
].map((n) => `/gallery/${n}.webp`);

const containerStyle = {
  height: "100%",
  whiteSpace: "nowrap",
  width: "max-content",
  padding: "0 110vw",
  willChange: "transform",
  display: "flex",
  alignItems: "center",
};

const gridStyle = {
  display: "grid",
  gridTemplateRows: "repeat(3, auto)",
  gridAutoFlow: "column",
  alignItems: "center",
  gap: "3vw",
};

const getMediaSize = () =>
  typeof window !== "undefined" && window.innerWidth < 768 ? "38vw" : "15vw";

const getGridGap = () =>
  typeof window !== "undefined" && window.innerWidth < 768 ? "5vw" : "3vw";

function Gallery() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const mediaSize = getMediaSize();
    const gap = getGridGap();
    const medias = container.querySelectorAll(".gallery-media");
    const W = window.innerWidth;

    medias.forEach((media) => {
      media.style.width = mediaSize;
      media.style.height = "auto";
    });
    container.querySelector(".gallery-grid").style.gap = gap;

    medias.forEach((media) => {
      gsap.set(media, {
        x: (Math.random() - 0.5) * 0.16 * W,
        y: (Math.random() - 0.5) * 0.1 * W,
      });
    });

    const distance = container.clientWidth - document.body.clientWidth;

    const scrollTween = gsap.to(container, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: true,
        end: "+=" + distance,
      },
    });

    medias.forEach((media) => {
      gsap.from(media, {
        rotation: (Math.random() - 0.5) * 80,
        yPercent: (Math.random() - 0.5) * 300,
        xPercent: Math.random() * 400,
        ease: "power1.out",
        scrollTrigger: {
          trigger: media,
          containerAnimation: scrollTween,
          start: "left 110%",
          end: "left 65%",
          scrub: true,
        },
      });

      gsap.fromTo(
        media,
        { rotation: 0, yPercent: 0, xPercent: 0 },
        {
          rotation: (Math.random() - 0.5) * 80,
          yPercent: (Math.random() - 0.5) * 300,
          xPercent: -Math.random() * 400,
          ease: "power1.in",
          scrollTrigger: {
            trigger: media,
            containerAnimation: scrollTween,
            start: "right 35%",
            end: "right -10%",
            scrub: true,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      data-navbar-theme="light"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {/* Background title */}
      <h2 className="font-playfair text-penn-blue/5 pointer-events-none absolute inset-0 flex items-center justify-center text-[20vw] whitespace-nowrap italic select-none">
        Gallery
      </h2>

      {/* Horizontal scroll — all screens */}
      <div ref={containerRef} className="flex" style={containerStyle}>
        <div className="gallery-grid" style={gridStyle}>
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Foto ${i + 1}`}
              className="gallery-media"
              style={{
                willChange: "transform",
                borderRadius: "8px",
                display: "block",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
