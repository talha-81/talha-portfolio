import { MotionConfig } from "framer-motion";
import { About } from "./components/About.tsx";
import { Credentials } from "./components/Credentials.tsx";
import { Experience } from "./components/Experience.tsx";
import { Footer } from "./components/Footer.tsx";
import { Hero } from "./components/Hero.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { RecentWorks } from "./components/RecentWorks.tsx";
import { ZoruMascot } from "./components/ZoruMascot.tsx";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0d1116] font-sans text-white">
        <a href="#about" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main>
          <Hero />
          <About />
          <RecentWorks />
          <Experience />
          <Credentials />
        </main>
        <Footer />
        <ZoruMascot />
      </div>
    </MotionConfig>
  );
}
