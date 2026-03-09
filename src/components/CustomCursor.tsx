import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const trailConfig = { damping: 20, stiffness: 200, mass: 0.8 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [cursorX, cursorY, visible]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", () => setClicking(true));
    window.addEventListener("mouseup", () => setClicking(false));
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter", () => setVisible(true));

    // Detect hoverable elements
    const handleHoverIn = () => setHovering(true);
    const handleHoverOut = () => setHovering(false);

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", handleHoverIn);
        el.addEventListener("mouseleave", handleHoverOut);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [handleMouseMove]);

  if (!visible) return null;

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Outer glow ring - trails behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: trailX, y: trailY }}
      >
        <motion.div
          animate={{
            width: hovering ? 48 : 36,
            height: hovering ? 48 : 36,
            opacity: clicking ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border border-primary/50 -translate-x-1/2 -translate-y-1/2"
          style={{
            boxShadow: "0 0 15px hsl(0 72% 51% / 0.15), 0 0 30px hsl(0 72% 51% / 0.05)",
          }}
        />
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.8 : hovering ? 1.4 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="-translate-x-1/2 -translate-y-1/2"
        >
          {/* Arrow cursor SVG */}
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
            style={{ transform: "translate(-2px, -2px)" }}
          >
            <path
              d="M1 1L1 19.5L5.5 15L10.5 22L14 20L9 13L15 12L1 1Z"
              fill="hsl(0, 0%, 90%)"
              stroke="hsl(0, 0%, 20%)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
