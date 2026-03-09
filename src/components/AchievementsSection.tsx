import { motion } from "framer-motion";
import { Trophy, Star, Award, Medal, Code, Flame, Target, Zap } from "lucide-react";

const hackathons = [
  { title: "1st Prize - AI for Social Good", org: "CMR NextGenHack 2025", year: "2025", icon: Trophy, color: "text-yellow-400" },
  { title: "2nd Place - Campus Automation", org: "Convergence 2025", year: "2025", icon: Star, color: "text-blue-400" },
  { title: "Finalist - Technovista", org: "National Hackathon", year: "2025", icon: Award, color: "text-purple-400" },
];

const cp = [
  { title: "1st Place - GDGC Coding Competition", detail: "127+ participants", icon: Medal, color: "text-yellow-400" },
  { title: "Top 100 Coders of the College", detail: "Krithomedh Club Contest", icon: Flame, color: "text-orange-400" },
  { title: "Global Rank 2843 - IICPC CodeFest 2026", detail: "13,000+ participants", icon: Target, color: "text-emerald-400" },
  { title: "Global Rank 504 - Smart Interviews", detail: "50,742 participants", icon: Zap, color: "text-cyan-400" },
];

const profiles = [
  { name: "LeetCode", rating: "1841", badge: "Top 8.11%", detail: "220+ problems · 33 contests", href: "https://leetcode.com/u/bhanu1716" },
  { name: "CodeChef", rating: "1584", badge: "2★ Max", detail: "400 problems · 56 contests", href: "https://www.codechef.com/users/bhanu1708" },
  { name: "Codeforces", rating: "1187", badge: "Max Rating", detail: "189 problems · 23 contests", href: "https://codeforces.com/profile/bhanu.prakash1708" },
];

const AchievementsSection = () => {
  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-heading mb-14"
        >
          Honors & <span className="gradient-text">Achievements</span>
        </motion.h2>

        {/* Hackathons */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={16} className="text-primary" />
            <p className="text-xs font-mono tracking-widest uppercase text-primary">Hackathons</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hackathons.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                className="border border-border rounded-2xl p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group flex flex-col justify-between min-h-[160px]"
              >
                <div className="flex items-start gap-3">
                  <div className="card-icon-float w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                    <h.icon size={20} className={h.color} />
                  </div>
                  <div>
                    <h3 className="font-semibold font-heading text-base md:text-lg leading-snug">{h.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{h.org}</p>
                  </div>
                </div>
                <p className="text-sm text-primary font-mono text-right mt-4">{h.year}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CP Rankings */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Code size={16} className="text-primary" />
            <p className="text-xs font-mono tracking-widest uppercase text-primary">Competitive Programming</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {cp.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                className="border border-border rounded-2xl p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group flex flex-col justify-between min-h-[140px]"
              >
                <div className="flex items-start gap-3">
                  <div className="card-icon-float w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                    <c.icon size={20} className={c.color} />
                  </div>
                  <div>
                    <h3 className="font-semibold font-heading text-sm md:text-base leading-snug">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coding Profiles */}
        <div>
          <p className="section-label">Coding Profiles</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {profiles.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                className="border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 block group"
              >
                <h4 className="font-bold font-heading text-lg md:text-xl mb-1">{p.name}</h4>
                <div className="text-3xl md:text-4xl font-bold font-heading text-primary mb-1">{p.rating}</div>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">{p.badge}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-mono">{p.detail}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
