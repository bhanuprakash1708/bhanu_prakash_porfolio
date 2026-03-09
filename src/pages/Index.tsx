import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import LeadershipSection from "@/components/LeadershipSection";
import CertificationsSection from "@/components/CertificationsSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";

const SectionDivider = () => (
  <div className="max-w-6xl mx-auto px-6 md:px-8">
    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  </div>
);

const AnimatedSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
);

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleComplete} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <ScrollProgress />
          <Navbar />
           <HeroSection />
            <SectionDivider />
            <AnimatedSection><AboutSection /></AnimatedSection>
            <SectionDivider />
            <AnimatedSection><EducationSection /></AnimatedSection>
            <SectionDivider />
            <AnimatedSection><ExperienceSection /></AnimatedSection>
            <SectionDivider />
            <AnimatedSection><SkillsSection /></AnimatedSection>
            <SectionDivider />
            <AnimatedSection><ProjectsSection /></AnimatedSection>
            <SectionDivider />
            <AnimatedSection><AchievementsSection /></AnimatedSection>
            <SectionDivider />
            <AnimatedSection><LeadershipSection /></AnimatedSection>
            <SectionDivider />
            <AnimatedSection><CertificationsSection /></AnimatedSection>
            <SectionDivider />
            <AnimatedSection><ResumeSection /></AnimatedSection>
            <SectionDivider />
            <AnimatedSection><ContactSection /></AnimatedSection>
            <Footer />
        </motion.div>
      )}
    </>
  );
};

export default Index;
