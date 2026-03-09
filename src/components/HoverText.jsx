import { useRef, useCallback } from "react";
import gsap from "gsap";

// Reusable letter-by-letter hover effect (same as NavLink in Navbar)
// Wrap it inside an <a> or <button> to animate only the text
export default function HoverText({ children }) {
  const itemRef = useRef(null);

  const handleMouseOver = useCallback((e) => {
    const item = itemRef.current;
    if (!item) return;

    const visibleSpans = item.querySelectorAll(".nav-link-visible span");
    const hiddenSpans = item.querySelectorAll(".nav-link-hidden span");
    const hiddenContainer = item.querySelector(".nav-link-hidden");

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

  const text = String(children);
  const letters = text.split("").map((char, i) =>
    char === " " ? (
      <span key={i}>&nbsp;</span>
    ) : (
      <span key={i} className="letter inline-block will-change-transform">
        {char}
      </span>
    ),
  );

  return (
    <span
      ref={itemRef}
      className="relative block cursor-pointer overflow-hidden"
      onMouseOver={handleMouseOver}
    >
      <span className="nav-link-hidden pointer-events-none absolute bottom-full left-0 opacity-0">
        {letters}
      </span>
      <span className="nav-link-visible block">{letters}</span>
    </span>
  );
}
