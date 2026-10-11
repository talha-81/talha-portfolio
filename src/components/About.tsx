import { motion, useReducedMotion } from "framer-motion";
import { profile, skills } from "../data/content.ts";
import { Reveal } from "./Reveal.tsx";

const education = [
  {
    school: "Hazara University",
    credential: "BS Software Engineering",
    meta: "Sep 2022 – Jul 2026",
  },
  {
    school: "The Dreams Academy Mansehra",
    credential: "Diploma of Information Technology",
    meta: "Aug 2021 – Aug 2022 · Grade 80%",
  },
];

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.28em] text-[#00df8f] uppercase">
            About
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[0.9] font-bold tracking-tighter text-white sm:text-5xl lg:text-6xl">
            ENGINEERING
            <span className="block">
              WITH <span className="text-stroke">PURPOSE</span>
              <span className="text-[#00df8f]">.</span>
            </span>
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[#9ca3af]">
            <p>
              I&apos;m a software engineer with 5+ years of experience
              specializing in scalable web applications and software solutions.
              My experience spans full-stack development, backend API
              development, databases, AI, and data-driven applications.
            </p>
            <p>
              I work part-time at{" "}
              <a
                href={profile.nayel}
                target="_blank"
                rel="noreferrer noopener"
                className="text-white underline decoration-white/20 underline-offset-4 hover:text-[#00df8f] hover:decoration-[#00df8f]"
              >
                Nayel Solutions
              </a>{" "}
              (remote, Islamabad, Pakistan), using React.js, .NET Core, SQL, and
              Python for interfaces, backend services, databases, and AI-driven
              features. The role runs alongside my studies and my time at
              Petalnex. I also have a foundation in data science, machine
              learning, and data analysis.
            </p>
          </div>

          <dl className="mt-8 space-y-4 border-t border-white/10 pt-6">
            {education.map((item) => (
              <div key={item.school}>
                <dt className="font-medium text-white">{item.school}</dt>
                <dd className="text-sm leading-relaxed text-[#9ca3af]">
                  {item.credential}
                  <span className="mt-0.5 block text-xs tracking-wide text-white/50 uppercase">
                    {item.meta}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex items-stretch gap-6 sm:gap-10">
            <div>
              <p className="font-display text-5xl font-semibold tracking-tighter text-white sm:text-6xl">
                5+
              </p>
              <p className="mt-2 max-w-[10rem] text-sm text-[#9ca3af]">
                Years of experience
              </p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="font-display text-5xl font-semibold tracking-tighter text-white sm:text-6xl">
                2021
              </p>
              <p className="mt-2 max-w-[12rem] text-sm text-[#9ca3af]">
                Nayel Solutions, part-time
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
            <p className="text-xs font-semibold tracking-[0.28em] text-[#9ca3af] uppercase">
              My Toolkit
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {skills.map((skill, index) => (
                <motion.li
                  key={skill}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-[#00df8f] hover:text-[#00df8f] hover:shadow-[0_0_15px_rgba(0,223,143,0.3)]"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
