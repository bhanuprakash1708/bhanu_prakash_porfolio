import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certs = [
  { title: "MERN Stack Development Certification", status: "Completed" },
  { title: "DSA Training – Smart Interviews", status: "Diamond Certificate" },
  { title: "C++ Programming: Beginner to Advanced", status: "GeeksforGeeks" },
  { title: "Machine Learning Specialization – DeepLearning.AI", status: "Coursera – In Progress" },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Award size={16} className="text-primary" />
          <p className="text-xs font-mono tracking-widest uppercase text-primary">Certifications</p>
        </div>

        <div className="space-y-0 border border-border rounded-2xl overflow-hidden">
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-primary/[0.04] hover:pl-8 transition-all duration-300 ${i < certs.length - 1 ? "border-b border-border" : ""}`}
            >
              <h3 className="font-semibold font-heading text-sm md:text-base">{c.title}</h3>
              <span className="text-sm md:text-base text-primary font-mono mt-1 sm:mt-0">{c.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
