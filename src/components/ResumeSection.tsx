import { Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const ResumeSection = () => {
  return (
    <section id="resume" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto border border-border rounded-2xl p-10 md:p-14 text-center relative overflow-hidden group hover:border-primary/20 transition-all duration-500"
      >
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-primary/3 rounded-full blur-[80px] group-hover:bg-primary/8 transition-all duration-700" />
        
        {/* Gradient border glow on hover */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-primary mb-6">
            <Sparkles size={14} />
            Get to know me better
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Download my resume to learn more about my experience, skills, and education.
          </p>
          <a
            href="/bhanu_prakash_kanakamedala_resume.pdf"
            download="bhanu_prakash_kanakamedala_resume.pdf"
            className="btn-animated inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider"
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ResumeSection;
