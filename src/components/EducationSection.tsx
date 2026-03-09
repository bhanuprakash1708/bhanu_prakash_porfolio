import { motion } from "framer-motion";
import { GraduationCap, BookOpen, School } from "lucide-react";

const education = [
  { degree: "BTech - CSE (IoT)", school: "VNR VJIET, Hyderabad", grade: "9.40", metric: "CGPA", period: "2023 - 2027", icon: GraduationCap },
  { degree: "Intermediate", school: "Narayana Junior College", grade: "97.6%", metric: "Percentage", period: "2021 - 2023", icon: BookOpen },
  { degree: "SSC", school: "Vaishnavi High School", grade: "10.0", metric: "CGPA", period: "2020 - 2021", icon: School },
];

const EducationSection = () => {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Education
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-heading mb-14"
        >
          Academic <span className="gradient-text">Journey</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-5">
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="border border-border rounded-2xl p-6 md:p-8 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-primary/3 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="card-icon-float w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <e.icon size={18} className="text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{e.period}</span>
                </div>
                <h3 className="font-semibold font-heading text-base md:text-lg mb-1">{e.degree}</h3>
                <p className="text-sm text-muted-foreground mb-3">{e.school}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold font-heading text-primary">{e.grade}</span>
                  <span className="text-xs text-muted-foreground">{e.metric}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
