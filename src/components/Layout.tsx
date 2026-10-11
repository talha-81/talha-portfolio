import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { lazy, Suspense, useEffect, type ComponentType } from "react";
import { Route, Routes, useLocation } from "react-router";
import { EASE } from "../lib/motion.ts";
import { scrollToContactFormWhenReady } from "../lib/scrollToContactForm.ts";
import { Footer } from "./Footer.tsx";
import { Mascot } from "./Mascot.tsx";
import { Navbar } from "./Navbar.tsx";
import { useStructuredData } from "./StructuredData.tsx";
import { WhatsAppButton } from "./WhatsAppButton.tsx";

function load<T extends Record<string, ComponentType>>(importer: () => Promise<T>, name: keyof T & string) {
  return lazy(() => importer().then((module) => ({ default: module[name] })));
}

const HomePage = load(() => import("../pages/HomePage.tsx"), "HomePage");
const AboutPage = load(() => import("../pages/AboutPage.tsx"), "AboutPage");
const ServicesPage = load(() => import("../pages/ServicesPage.tsx"), "ServicesPage");
const ProjectsPage = load(() => import("../pages/ProjectsPage.tsx"), "ProjectsPage");
const ProjectPage = load(() => import("../pages/ProjectPage.tsx"), "ProjectPage");
const AiPage = load(() => import("../pages/AiPage.tsx"), "AiPage");
const SkillsPage = load(() => import("../pages/SkillsPage.tsx"), "SkillsPage");
const ContactPage = load(() => import("../pages/ContactPage.tsx"), "ContactPage");
const FaqPage = load(() => import("../pages/FaqPage.tsx"), "FaqPage");
const NotFoundPage = load(() => import("../pages/NotFoundPage.tsx"), "NotFoundPage");

let allowRouteMotion = false;

export function Layout() {
  const location = useLocation();
  const reduce = useReducedMotion();
  useStructuredData();

  useEffect(() => {
    allowRouteMotion = true;
  }, []);

  useEffect(() => {
    if (location.hash === "#contact-form") {
      return scrollToContactFormWhenReady(Boolean(reduce));
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash, reduce]);

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
            initial={allowRouteMotion && !reduce ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={allowRouteMotion && !reduce ? { opacity: 0, y: -10 } : undefined}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <Suspense fallback={null}>
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
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
      <Mascot />
    </div>
  );
}
