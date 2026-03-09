import { motion } from "framer-motion";

const stats = [
  { value: "9.40", label: "CGPA" },
  { value: "797+", label: "Problems Solved" },
  { value: "107+", label: "Contests" },
  { value: "5+", label: "Hackathons Won" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Discovery
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-heading mb-12"
        >
          About <span className="gradient-text">The Architect</span>
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="md:col-span-3"
          >
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
              I'm a passionate Computer Science (IoT) undergraduate who thrives at the intersection of complex systems and clean design. Driven by curiosity, I build scalable solutions that solve real-world problems.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              My journey isn't just about writing code; it's about understanding the "why" behind every feature. From competitive programming to full-stack development, I obsess over the details that matter.
            </p>
          </motion.div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="border border-border rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="text-2xl md:text-3xl font-bold font-heading text-primary mb-1 group-hover:scale-105 transition-transform">{s.value}</div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
