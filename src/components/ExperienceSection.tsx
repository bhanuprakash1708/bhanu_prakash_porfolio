import { motion } from "framer-motion";

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Built with Passion
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-heading mb-14"
        >
          Professional <span className="gradient-text">Journey</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line with gradient */}
          <div className="absolute left-0 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ x: 4 }}
            className="relative pl-8 md:pl-16"
          >
            {/* Timeline dot with glow */}
            <div className="absolute left-0 md:left-6 top-2 -translate-x-1">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary/50 animate-ping" />
            </div>
            
            <div className="border border-border rounded-2xl p-8 md:p-10 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/3 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2 relative">
                <h3 className="text-xl md:text-2xl font-bold font-heading">Software Design Engineer Intern</h3>
                <span className="text-sm md:text-base text-primary font-mono whitespace-nowrap">(Nov 2025 – Dec 2025)</span>
              </div>
              <p className="text-muted-foreground mb-6 text-sm md:text-base relative">Exelvision IT Labs LLP, Hyderabad</p>
              
              <ul className="space-y-3 mb-6 relative">
                <li className="text-muted-foreground leading-relaxed text-sm md:text-base flex gap-3">
                  <span className="text-primary mt-1.5 shrink-0">▸</span>
                  Contributed to backend development of a B2B application building APIs and secure data pipelines.
                </li>
                <li className="text-muted-foreground leading-relaxed text-sm md:text-base flex gap-3">
                  <span className="text-primary mt-1.5 shrink-0">▸</span>
                  Implemented Redis caching and optimized connection pooling to improve performance and reduce server load.
                </li>
                <li className="text-muted-foreground leading-relaxed text-sm md:text-base flex gap-3">
                  <span className="text-primary mt-1.5 shrink-0">▸</span>
                  Improved response times and scalability of the backend services.
                </li>
              </ul>
              
              <div className="flex flex-wrap gap-2 relative">
                {["Node.js", "Redis", "REST APIs", "Backend"].map((t) => (
                  <span key={t} className="tech-tag text-xs px-3 py-1 rounded-full border border-primary/20 text-primary/80 font-mono cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
