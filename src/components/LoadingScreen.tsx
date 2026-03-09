import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [isDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      const isLight = saved === "light";
      // Apply theme class immediately so the page behind matches
      if (isLight) {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      return !isLight;
    }
    return true;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setExiting(true), 400);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 140);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (exiting) {
      const timer = setTimeout(onComplete, 1400);
      return () => clearTimeout(timer);
    }
  }, [exiting, onComplete]);

  const displayProgress = Math.min(Math.round(progress), 100);

  // Theme-aware colors
  const bgClass = isDark ? "bg-[hsl(0,20%,5%)]" : "bg-[hsl(0,0%,98%)]";
  const textClass = isDark ? "text-[hsl(0,0%,93%)]" : "text-[hsl(0,0%,10%)]";
  const mutedClass = isDark ? "text-[hsl(0,0%,50%)]" : "text-[hsl(0,0%,40%)]";
  const borderBg = isDark ? "bg-[hsl(0,20%,16%)]/50" : "bg-[hsl(0,0%,85%)]/50";
  const particleClass = isDark ? "bg-primary/30" : "bg-primary/20";
  const glowOpacity = isDark ? 0.08 : 0.05;
  const panelClass = isDark ? "bg-[hsl(0,20%,5%)]" : "bg-[hsl(0,0%,98%)]";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed inset-0 z-[200] ${bgClass} flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* Split curtain panels */}
      <motion.div
        className={`absolute inset-0 ${panelClass} z-[1]`}
        style={{ clipPath: "inset(0 50% 0 0)" }}
        animate={exiting ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />
      <motion.div
        className={`absolute inset-0 ${panelClass} z-[1]`}
        style={{ clipPath: "inset(0 0 0 50%)" }}
        animate={exiting ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />

      {/* Accent line */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] bg-primary z-[2]"
        animate={exiting ? { width: "200vw", opacity: [1, 1, 0] } : { width: "0px" }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(0 72% 51% / ${glowOpacity}) 0%, transparent 70%)`,
          }}
          animate={
            exiting
              ? { scale: 3, opacity: 0 }
              : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }
          }
          transition={
            exiting
              ? { duration: 1.0, ease: "easeIn" }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        />
        {/* Light mode: subtle geometric grid pattern */}
        {!isDark && (
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(0 72% 51% / 0.06) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
            animate={exiting ? { opacity: 0 } : { opacity: [0.3, 0.6, 0.3] }}
            transition={exiting ? { duration: 0.5 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {/* Dark mode: subtle scanline effect */}
        {isDark && (
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(0 72% 51% / 0.015) 2px, hsl(0 72% 51% / 0.015) 4px)`,
            }}
            animate={exiting ? { opacity: 0 } : { opacity: [0.5, 1, 0.5] }}
            transition={exiting ? { duration: 0.5 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      {/* Floating particles */}
      {[...Array(isDark ? 6 : 8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${particleClass} z-0`}
          style={{
            width: isDark ? 4 : (i % 2 === 0 ? 6 : 3),
            height: isDark ? 4 : (i % 2 === 0 ? 6 : 3),
          }}
          initial={{
            x: Math.random() * 300 - 150,
            y: Math.random() * 300 - 150,
            opacity: 0,
          }}
          animate={
            exiting
              ? { opacity: 0, scale: 0, y: -200 }
              : isDark
                ? { y: [0, -80, 0], opacity: [0, 0.6, 0], scale: [0.5, 1.2, 0.5] }
                : { y: [0, -60, 0], x: [0, (i % 2 === 0 ? 20 : -20), 0], opacity: [0, 0.8, 0], scale: [0.8, 1.3, 0.8] }
          }
          transition={
            exiting
              ? { duration: 0.6, ease: "easeIn" }
              : { duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }
          }
        />
      ))}

      {/* Light mode: orbiting rings */}
      {!isDark && (
        <>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-primary/10 z-0"
            animate={exiting ? { scale: 3, opacity: 0 } : { rotate: 360 }}
            transition={exiting ? { duration: 0.8 } : { duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary/5 z-0"
            animate={exiting ? { scale: 3, opacity: 0 } : { rotate: -360 }}
            transition={exiting ? { duration: 0.8 } : { duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={
          exiting
            ? { opacity: 0, y: -60, scale: 0.8 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={
          exiting
            ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0.6, ease: "easeOut" }
        }
        className="text-center relative z-10"
      >
        {/* Logo */}
        <motion.h1
          className={`text-5xl md:text-6xl font-bold font-heading mb-1 tracking-tight ${textClass}`}
          animate={
            exiting
              ? { letterSpacing: "0.15em" }
              : { letterSpacing: ["0em", "0.05em", "0em"] }
          }
          transition={
            exiting
              ? { duration: 0.8 }
              : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          BPK<motion.span
            className="text-primary inline-block"
            animate={
              exiting
                ? { opacity: 0, scale: 2 }
                : isDark
                  ? { opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }
                  : { opacity: [1, 0.6, 1], scale: [1, 1.2, 1], rotate: [0, 10, 0] }
            }
            transition={
              exiting
                ? { duration: 0.6 }
                : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }
          >.</motion.span>
        </motion.h1>

        <motion.p
          className={`text-[10px] font-mono tracking-[0.3em] uppercase mb-12 ${mutedClass}`}
          initial={{ opacity: 0 }}
          animate={exiting ? { opacity: 0 } : { opacity: 1 }}
          transition={exiting ? { duration: 0.4 } : { delay: 0.3 }}
        >
          Loading Portfolio
        </motion.p>

        {/* Progress bar */}
        <div className={`w-56 h-[3px] ${borderBg} rounded-full overflow-hidden mx-auto backdrop-blur-sm`}>
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{
              width: `${displayProgress}%`,
              background: isDark
                ? "linear-gradient(90deg, hsl(0 72% 51%), hsl(0 72% 51% / 0.6), hsl(0 72% 51%))"
                : "linear-gradient(90deg, hsl(0 72% 51%), hsl(0 60% 60%), hsl(0 72% 51%))",
              boxShadow: isDark
                ? "0 0 12px hsl(0 72% 51% / 0.5)"
                : "0 0 8px hsl(0 72% 51% / 0.3)",
            }}
            animate={exiting ? { width: "100%", opacity: 0 } : {}}
            transition={{ ease: "easeOut", duration: 0.15 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: isDark
                  ? "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.4) 50%, transparent 100%)"
                  : "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.6) 50%, transparent 100%)",
                width: "50%",
              }}
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
            />
          </motion.div>
        </div>

        {/* Percentage */}
        <motion.p
          className="text-sm font-mono text-primary mt-5 tabular-nums"
          style={{ textShadow: isDark ? "0 0 10px hsl(0 72% 51% / 0.3)" : "none" }}
          animate={exiting ? { opacity: 0 } : {}}
        >
          {displayProgress}%
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
