import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

const codeLines = [
  { num: "01", content: <><span className="code-keyword">const</span> developer = {"{"}</> },
  { num: "02", content: <>  name: <span className="code-string">'Bhanu Prakash'</span>,</> },
  { num: "03", content: <>  focus: <span className="code-string">'Full Stack Dev'</span>,</> },
  { num: "04", content: <>  skills: [<span className="code-string">'React'</span>, <span className="code-string">'Node'</span>, <span className="code-string">'AI'</span>],</> },
  { num: "05", content: <>  passionate: <span className="code-bool">true</span>,</> },
  { num: "06", content: <>  motto: <span className="code-string">"Build with Purpose"</span></> },
  { num: "07", content: <>{"}"}</> },
  { num: "08", content: <><span className="code-keyword">developer</span>.showcase();</> },
];

const roles = ["Full Stack Developer", "Competitive Programmer", "ML Enthusiast"];

const socialLinks = [
  { icon: Github, href: "https://github.com/bhanuprakash1708", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/bhanu-prakash-kanakamedala/", label: "LinkedIn" },
];

const TypingText = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setDeleting(true), 2000);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      deleting ? 50 : 90
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <span className="text-primary font-semibold">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const CodeCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scanLine, setScanLine] = useState(-1);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setScanLine(-1);
  }, [mouseX, mouseY]);

  // Scan line animation
  useEffect(() => {
    if (!isHovered) return;
    setScanLine(0);
    const interval = setInterval(() => {
      setScanLine((prev) => {
        if (prev >= codeLines.length - 1) {
          clearInterval(interval);
          return -1;
        }
        return prev + 1;
      });
    }, 250);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      animate={{
        y: isHovered ? 0 : [0, -6, 0],
        scale: isHovered ? 1.04 : 1,
      }}
      transition={{
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.3 },
      }}
      className="will-change-transform"
    >
      <div
        className={`
          rounded-2xl border bg-card overflow-hidden relative transition-all duration-500
          ${isHovered
            ? "border-primary/50 shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)]"
            : "border-border shadow-2xl shadow-primary/5"
          }
        `}
      >
        {/* Animated gradient border glow */}
        <div
          className={`
            absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-500
            bg-[conic-gradient(from_var(--glow-angle),hsl(var(--primary)/0.4),hsl(270_80%_60%/0.3),hsl(220_80%_60%/0.3),hsl(var(--primary)/0.4))]
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
          style={{ "--glow-angle": "0deg" } as React.CSSProperties}
        />
        {/* Inner bg to mask the conic gradient except edges */}
        <div className="absolute inset-[1px] rounded-2xl bg-card pointer-events-none z-[1]" />

        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border relative z-[2]">
          <div className="flex items-center gap-2">
            {["bg-primary/80", "bg-amber-400/70", "bg-emerald-400/70"].map((color, i) => (
              <motion.span
                key={i}
                className={`w-3 h-3 rounded-full ${color} cursor-pointer`}
                whileHover={{
                  scale: 1.4,
                  boxShadow: "0 0 8px 2px currentColor",
                  y: [0, -3, 0],
                }}
                transition={{ y: { duration: 0.3 } }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full transition-all duration-300 ${isHovered ? "bg-emerald-400 shadow-[0_0_8px_hsl(142_70%_50%/0.6)]" : "bg-emerald-500 animate-pulse"}`} />
            <span className="text-xs text-muted-foreground font-mono">Portfolio.ts</span>
          </div>
        </div>

        {/* Code content */}
        <div className="p-6 font-mono text-sm leading-7 relative z-[2]">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.4 }}
              className={`
                flex gap-4 -mx-2 px-2 rounded transition-all duration-300 relative
                ${scanLine === i ? "bg-primary/[0.08]" : "hover:bg-primary/[0.03]"}
              `}
            >
              <span
                className={`select-none w-5 text-right transition-all duration-300 ${
                  scanLine === i ? "text-primary/70" : "text-muted-foreground/40"
                }`}
              >
                {line.num}
              </span>
              <span className={`text-muted-foreground transition-all duration-300 ${isHovered ? "code-glow-active" : ""}`}>
                {line.content}
              </span>

              {/* Typing cursor at end of scan line */}
              {scanLine === i && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="text-primary font-bold"
                >
                  |
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-24 md:pt-28 pb-16 md:pb-24">
      {/* Enhanced ambient glows */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[180px] -translate-x-1/3 -translate-y-1/3 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-primary">Ready to Collaborate</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading leading-[1.05] mb-6"
            >
              Crafting
              <br />
              <span className="gradient-text">Digital</span>
              <br />
              <span className="gradient-text">Masterpieces</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md"
            >
              <p>
                I'm <span className="text-foreground font-semibold">Bhanu Prakash</span>, a
              </p>
              <p className="h-7">
                <TypingText />
              </p>
              <p className="mt-2">
                dedicated to building high-performance, user-centric web applications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-circle w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50"
                  aria-label={s.label}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="btn-animated inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-semibold uppercase tracking-wider hover:bg-zinc-100 [.light_&]:bg-primary [.light_&]:text-primary-foreground [.light_&]:hover:bg-primary"
              >
                Let's Collaborate <ArrowRight size={16} />
              </a>
              <a
                href="#resume"
                className="btn-animated inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-muted-foreground/30 text-foreground text-sm font-semibold uppercase tracking-wider hover:border-primary/50 hover:text-primary bg-background"
              >
                Get Resume <FileText size={16} />
              </a>
            </motion.div>
          </motion.div>

          {/* Code card - mobile/tablet (below text) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="block lg:hidden mt-8"
          >
            <CodeCard />
          </motion.div>

          {/* Code card - desktop (right column) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:block"
          >
            <CodeCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
