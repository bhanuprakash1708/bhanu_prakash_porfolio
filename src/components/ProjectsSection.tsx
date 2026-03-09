import { Github } from "lucide-react";
import { motion } from "framer-motion";

import imgMockmate from "@/assets/project-mockmate.jpg";
import imgEmergency from "@/assets/project-emergency.jpg";
import imgHirescore from "@/assets/project-hirescore.jpg";
import imgUnicode from "@/assets/project-unicode.jpg";
import imgQuickstore from "@/assets/project-quickstore.jpg";
import imgLms from "@/assets/project-lms.jpg";

const projects = [
  {
    title: "MockMate",
    subtitle: "AI Interview Preparation Platform",
    desc: "AI-powered interview preparation system with coding challenges, automated testing, AI-driven soft skills analysis, resume analyzer, and chat assistance using Google Generative AI.",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/bhanuprakash1708/MockMate",
    image: imgMockmate,
  },
  {
    title: "Emergency Management System",
    subtitle: "AI-assisted real-time event safety monitoring platform",
    desc: "A scalable emergency management platform for large events and venues. Detects fire, crowd density, and abnormal behavior risks, manages incidents and emergency resources, and powers real-time safety dashboards for security teams.",
    tech: ["FastAPI", "SQLAlchemy", "Python", "Real-time Monitoring"],
    github: "https://github.com/bhanuprakash1708/Emergency-Management-System",
    image: imgEmergency,
  },
  {
    title: "GitHub HireScore",
    subtitle: "AI-powered GitHub portfolio evaluator for developers",
    desc: "An AI-powered GitHub portfolio analyzer that evaluates developer profiles and generates a HireScore (0–100) along with recruiter-style insights, professional PDF reports including strengths, red flags, and repository-level analysis.",
    tech: ["Python", "AI Analysis", "GitHub API", "Data Processing"],
    github: "https://github.com/bhanuprakash1708/GitHub-HireScore",
    image: imgHirescore,
  },
  {
    title: "Unicode",
    subtitle: "Unified Coding Profile Tracker",
    desc: "Aggregates coding profiles from LeetCode, CodeChef, and Codeforces with visual analytics, contest calendar integration with Google Calendar, activity heatmaps, and performance tracking.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "Supabase"],
    github: "https://github.com/bhanuprakash1708/Unicode",
    image: imgUnicode,
  },
  {
    title: "QuickStore",
    subtitle: "Stationery Management System",
    desc: "MERN stack application supporting 100+ concurrent users with inventory and order management, Razorpay payments, 60% reduction in manual work, and 30% faster checkout.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/bhanuprakash1708/stationary-mern",
    image: imgQuickstore,
  },
  {
    title: "Learning Management System",
    subtitle: "Full-stack scalable e-learning platform",
    desc: "A full-stack LMS featuring student and educator dashboards, secure authentication with Clerk, seamless course browsing and playback, with Express and MongoDB backend using webhook-based user synchronization.",
    tech: ["Node.js", "Express", "MongoDB", "Clerk Auth"],
    github: "https://github.com/bhanuprakash1708/Learning-Management-System",
    image: imgLms,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Projects Showcase
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-heading mb-4"
        >
          Featured <span className="gradient-text">Creations</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground mb-14 text-lg"
        >
          A selection of high-impact digital solutions, built with focus on scalability and performance.
        </motion.p>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="border border-border rounded-2xl overflow-hidden group hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-48 md:h-56 overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.title} preview`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 pt-4 md:pt-5">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl md:text-3xl font-bold font-heading">{p.title}</h3>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="icon-circle w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 ml-auto">
                      <Github size={16} />
                    </a>
                  )}
                </div>
                <p className="text-sm md:text-base text-primary/70 mb-4">{p.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-tag text-xs md:text-sm px-3 py-1 rounded-full border border-primary/15 text-primary/70 font-mono cursor-default">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
