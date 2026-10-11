import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { EASE } from "../lib/motion.ts";
import { AboutPage } from "../pages/AboutPage.tsx";
import { AiPage } from "../pages/AiPage.tsx";
import { ContactPage } from "../pages/ContactPage.tsx";
import { FaqPage } from "../pages/FaqPage.tsx";
import { HomePage } from "../pages/HomePage.tsx";
import { NotFoundPage } from "../pages/NotFoundPage.tsx";
import { ProjectPage } from "../pages/ProjectPage.tsx";
import { ProjectsPage } from "../pages/ProjectsPage.tsx";
import { ServicesPage } from "../pages/ServicesPage.tsx";
import { SkillsPage } from "../pages/SkillsPage.tsx";
import { Footer } from "./Footer.tsx";
import { Navbar } from "./Navbar.tsx";
import { WhatsAppButton } from "./WhatsAppButton.tsx";
import { Mascot } from "./Mascot.tsx";

export function Layout() {
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-ink font-sans text-fg">
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="content" className="pt-16 md:pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectPage />} />
              <Route path="/ai" element={<AiPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
      <Mascot />
    </div>
  );
}
