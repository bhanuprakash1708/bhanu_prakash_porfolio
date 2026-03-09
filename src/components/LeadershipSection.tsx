import { motion } from "framer-motion";
import { Users, Trophy, Code } from "lucide-react";

const activities = [
  {
    title: "GDG Campus CP Coordinator",
    org: "Google Developer Groups",
    period: "2024 - Present",
    desc: "Led competitive programming initiatives. Organized TechSprint Hackathon with 320+ participants. Problem setter for AlgoChallenge. Conducted CP training for 100+ students.",
    icon: Trophy,
  },
  {
    title: "Technical Volunteer",
    org: "Krithomedh Club",
    period: "2024",
    desc: "Evaluated Round 1 PPT submissions for Krithoathon 3.0. Managed technical coordination during the 24-hour hackathon.",
    icon: Code,
  },
  {
    title: "Member",
    org: "Computer Society of India (CSI)",
    period: "2023 - Present",
    desc: "Participated in technical workshops. Volunteered in Navigator career guidance event.",
    icon: Users,
  },
];

const LeadershipSection = () => {
  return (
    <section id="leadership" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-heading mb-4"
        >
          Leadership & <span className="gradient-text">Community</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground mb-14 text-lg"
        >
          Giving back to the developer ecosystem.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-5">
          {activities.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="border border-border rounded-2xl p-6 md:p-8 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-primary/3 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="card-icon-float w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <a.icon size={18} className="text-primary" />
                  </div>
                  <span className="text-xs text-primary font-mono">{a.period}</span>
                </div>
                <h3 className="font-semibold font-heading text-base md:text-lg mb-1">{a.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{a.org}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
