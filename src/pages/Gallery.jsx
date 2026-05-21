import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 21.webp is missing from the folder
const images = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23,
  24,
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

    const ctx = gsap.context(() => {
      const mediaSize = getMediaSize();
      const gap = getGridGap();
      const medias = container.querySelectorAll(".gallery-media");
      const W = window.innerWidth;

      medias.forEach((media) => {
        media.style.width = mediaSize;
        media.style.height = "auto";
      });
      container.querySelector(".gallery-grid").style.gap = gap;


      // Reset position/scale/opacity
      medias.forEach((media) => {
        gsap.set(media, {
          x: 0,
          y: 0,
          scale: 0.92,
          opacity: 0,
          force3D: true,
        });
      });

      const getDistance = () =>
        container.scrollWidth - document.body.clientWidth;

      const scrollTween = gsap.to(container, {
        x: () => -getDistance(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          fastScrollEnd: true,
          end: () => "+=" + getDistance(),
          invalidateOnRefresh: true,
        },
      });

      medias.forEach((media) => {
        gsap.to(media, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: media,
            containerAnimation: scrollTween,
            start: "left 90%",
            end: "left 60%",
            scrub: true,
          },
        });
      });

      // Refresh once all images have settled (fixes pin distance when images load late)
      const imgs = container.querySelectorAll("img");
      let pending = imgs.length;
      const onLoaded = () => {
        if (--pending <= 0) ScrollTrigger.refresh();
      };
      imgs.forEach((img) => {
        if (img.complete) onLoaded();
        else {
          img.addEventListener("load", onLoaded, { once: true });
          img.addEventListener("error", onLoaded, { once: true });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {/* Background title */}
      <h2
        className="font-playfair pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap text-blue-900/5 italic select-none"
        style={{ fontSize: "24vw" }}
      >
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
              className="gallery-media block rounded-2xl"
              decoding="async"
              style={{ willChange: "transform" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
