import { useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

// Reusable letter-by-letter hover effect
// Wrap it inside an <a> or <button> to animate only the text
const HoverText = forwardRef(function HoverText({ children }, ref) {
  const itemRef = useRef(null);

  const triggerHover = useCallback((e) => {
    const item = itemRef.current;
    if (!item) return;

    const visibleSpans = item.querySelectorAll(".nav-link-visible span");
    const hiddenSpans = item.querySelectorAll(".nav-link-hidden span");
    const hiddenContainer = item.querySelector(".nav-link-hidden");

    // Evita sovrapposizioni di animazione
    if (gsap.isTweening(visibleSpans)) return;

    let indexHover = 0;
    if (e && e.target && e.target.classList && e.target.classList.contains("letter")) {
      const idx = Array.from(e.target.parentNode.children).indexOf(e.target);
      if (idx !== -1) indexHover = idx;
    }

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
      },
    });
  }, []);

  useImperativeHandle(ref, () => ({
    triggerHover
  }));

  const text = String(children);
  const letters = text.split("").map((char, i) =>
    char === " " ? (
      <span key={i}>&nbsp;</span>
    ) : (
      <span key={i} className="letter inline-block will-change-transform pointer-events-none">
        {char}
      </span>
    ),
  );

  return (
    <span
      ref={itemRef}
      className="relative block pointer-events-none overflow-hidden"
    >
      <span className="nav-link-hidden pointer-events-none absolute bottom-full left-0 opacity-0">
        {letters}
      </span>
      <span className="nav-link-visible block pointer-events-none">{letters}</span>
    </span>
  );
});

export default HoverText;
