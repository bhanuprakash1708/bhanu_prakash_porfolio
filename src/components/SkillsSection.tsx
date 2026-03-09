import { motion } from "framer-motion";
import { Code2, Layout, Server, Database, Brain, Wrench } from "lucide-react";

const categories = [
  { title: "Programming Languages", icon: Code2, skills: ["C++", "Python", "JavaScript", "TypeScript", "Java", "C"] },
  { title: "Frontend", icon: Layout, skills: ["React.js", "Tailwind CSS", "HTML/CSS", "Bootstrap"] },
  { title: "Backend", icon: Server, skills: ["Node.js", "Express.js", "FastAPI", "Flask"] },
  { title: "Databases", icon: Database, skills: ["MySQL", "MongoDB", "Firebase", "Supabase"] },
  { title: "Data Science & ML", icon: Brain, skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "ML Fundamentals"] },
  { title: "Tools", icon: Wrench, skills: ["Git", "GitHub", "VS Code", "Postman", "Jupyter", "DevTools"] },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Inventory
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-heading mb-14"
        >
          The <span className="gradient-text">Tech Stack</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="border border-border rounded-2xl p-6 hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="card-icon-float w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <cat.icon size={18} className="text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-foreground font-heading">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-tag text-xs md:text-sm px-3 py-1.5 rounded-full bg-secondary text-muted-foreground font-mono cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
