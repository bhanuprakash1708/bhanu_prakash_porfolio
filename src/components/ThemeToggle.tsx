import { useState, useEffect, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return !document.documentElement.classList.contains("light");
    }
    return true;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setIsDark(true);
      return;
    }
    setIsDark(false);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleToggle = useCallback(() => {
    setIsTransitioning(true);
    setIsDark((prev) => !prev);
    setTimeout(() => setIsTransitioning(false), 600);
  }, []);

  return (
    <>
      {/* Full-screen flash overlay for smooth theme transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="theme-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[150] pointer-events-none bg-primary"
          />
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleToggle}
        className="icon-circle w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 relative overflow-hidden"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        whileTap={{ scale: 0.85, rotate: 15 }}
        transition={{ duration: 0.15 }}
      >
        {/* Ripple effect on click */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.span
              key="ripple"
              className="absolute inset-0 rounded-full bg-primary/20"
              initial={{ scale: 0 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10"
            >
              <Sun size={15} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10"
            >
              <Moon size={15} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ThemeToggle;
