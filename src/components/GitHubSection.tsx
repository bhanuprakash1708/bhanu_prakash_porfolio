import { motion } from "framer-motion";

const GitHubSection = () => {
  const username = "bhanuprakash1708";

  return (
    <section id="github" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Open Source
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-heading mb-14"
        >
          GitHub <span className="gradient-text">Activity</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-border rounded-2xl p-6 flex items-center justify-center hover:border-primary/20 transition-colors duration-300"
          >
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&title_color=dc2626&text_color=737373&icon_color=dc2626&hide_border=true&bg_color=00000000`}
              alt="GitHub Stats"
              className="w-full max-w-sm"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border border-border rounded-2xl p-6 flex items-center justify-center hover:border-primary/20 transition-colors duration-300"
          >
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&title_color=dc2626&text_color=737373&hide_border=true&bg_color=00000000`}
              alt="Top Languages"
              className="w-full max-w-sm"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
