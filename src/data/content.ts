/**
 * Site copy. Facts come from Talha Arshad's GitHub profile and LinkedIn
 * profile only. Do not add employers, projects, metrics, testimonials, or dates.
 */

export const profile = {
  name: "Talha Arshad",
  monogram: "TA",
  title: "Software Engineer",
  location: "Pakistan",
  github: "https://github.com/talha-81",
  linkedin: "https://www.linkedin.com/in/talha-arshad81",
  repos: "https://github.com/talha-81?tab=repositories",
  nayel: "https://www.nayelsolutions.com/",
} as const;

export const skills = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React.js",
  "FastAPI",
  ".NET Core",
  "SQL",
  "PostgreSQL",
  "Oracle",
  "Docker",
  "Git",
  "REST APIs",
  "Machine Learning",
  "Pandas",
  "scikit-learn",
  "TensorFlow",
  "OpenCV",
  "NLP",
  "n8n",
  "Streamlit",
  "Tableau",
  "Jupyter",
  "Tailwind CSS",
] as const;

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  category: string;
  title: string;
  description: string;
  tags: readonly string[];
  cover: string;
  links: readonly ProjectLink[];
  note?: string;
};

export const projects: readonly Project[] = [
  {
    category: "University · 2026",
    title: "Automated Data Insights",
    description:
      "Final-year project at Hazara University. Upload CSV, Excel, or SQL data and ask questions in natural language. The app generates charts, runs automated EDA (a data-quality score, correlations, and KPIs), and exports PDF executive reports. It includes JWT with role-based access and audit logging.",
    tags: [
      "React",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Plotly",
      "Redis",
      "Celery",
      "Docker",
    ],
    cover: "/covers/insights.jpg",
    links: [],
    note: "Repository is private.",
  },
  {
    category: "Generative tools",
    title: "Story to Image Generator",
    description:
      "Splits a script or story into scenes and generates a preview image for each scene through image-generation APIs, with a Streamlit front end. The repository includes the project documentation.",
    tags: ["FastAPI", "Streamlit", "Pydantic", "Pillow"],
    cover: "/covers/story.jpg",
    links: [
      {
        label: "Explore Project",
        href: "https://github.com/talha-81/image_video_generation",
      },
    ],
  },
  {
    category: "Automation",
    title: "n8n Workflows & WhatsApp API",
    description:
      "Exported n8n workflows for WhatsApp automation, a chatbot for Petalnex, and a WooCommerce flow (pakdeals). A companion FastAPI service reads that chatbot's conversation history for petalnex.com from Supabase, grouped by sender.",
    tags: ["n8n", "FastAPI", "Supabase"],
    cover: "/covers/automation.jpg",
    links: [
      { label: "n8n workflows", href: "https://github.com/talha-81/n8n" },
      { label: "WhatsApp API", href: "https://github.com/talha-81/fast-api" },
    ],
  },
  {
    category: "Forage · Jan 2025",
    title: "British Airways Data Science Simulation",
    description:
      "Scraped about 4,000 Skytrax reviews with BeautifulSoup, cleaned them with NLTK, and scored sentiment with TextBlob, including word clouds. Trained a Random Forest on about 50,000 booking records to predict booking completion, at 85% accuracy. The same repository includes the Accenture North America data-analytics simulation and the Standard Bank data-science simulation (both Aug 2024).",
    tags: ["Python", "NLTK", "scikit-learn", "pandas", "BeautifulSoup"],
    cover: "/covers/sentiment.jpg",
    links: [
      { label: "Explore Project", href: "https://github.com/talha-81/forage" },
    ],
  },
];

export type ListedWork = {
  title: string;
  meta: string;
  description: string;
  href?: string;
  hrefLabel?: string;
};

export const moreWork: readonly ListedWork[] = [
  {
    title: "Image Recognition Projects",
    meta: "Computer vision",
    description:
      "A collection of object-detection and image-classification projects. Stack: TensorFlow, Keras, Flask, and OpenCV.",
    href: "https://github.com/talha-81/image_recognition_projects",
    hrefLabel: "Repository",
  },
  {
    title: "Machine Learning Projects",
    meta: "Classical ML",
    description:
      "Stock-price prediction, bird detection, and breast-cancer prediction with logistic regression. Stack: Python, scikit-learn, and Jupyter.",
    href: "https://github.com/talha-81/machine_learning_projects",
    hrefLabel: "Repository",
  },
  {
    title: "Statistical Analysis",
    meta: "Notebooks",
    description:
      "ETL, A/B testing, Tesla stock, and Boston housing. Cookie Cats covered 90,189 players with chi-square, bootstrap, and logistic regression, and recommended keeping the gate at level 30 (7-day retention 19% vs 18.2%). Tesla (Aug 2023) covers volatility, Sharpe ratio, beta, and an ARIMA 30-day forecast, at about 60% annualized volatility. Boston housing (Nov 2023) covers EDA, a t-test, ANOVA, Pearson correlation, and OLS regression on median home values.",
    href: "https://github.com/talha-81/statistical_analysis",
    hrefLabel: "Repository",
  },
];

export const coursework: readonly ListedWork[] = [
  {
    title: "Data Science Capstone",
    meta: "Coursework",
    description:
      "Weekly notebooks from a data-science capstone (IBM-style), using Python, Pandas, NumPy, Matplotlib, Seaborn, and scikit-learn.",
    href: "https://github.com/talha-81/capstone-project",
    hrefLabel: "Repository",
  },
  {
    title: "AICP Internship Notebooks",
    meta: "Mar 2024 – Apr 2024",
    description:
      "EDA and machine-learning tasks from the Artificial Intelligence Community of Pakistan internship.",
    href: "https://github.com/talha-81/AICP",
    hrefLabel: "Repository",
  },
  {
    title: "DataStory Dashboard",
    meta: "Tableau · Feb 2024",
    description:
      "A Tableau dashboard of profit and sales. Profit was independent of region, higher discounts reduced profit, and sales did not track profit. No public repository.",
  },
];

export type Role = {
  title: string;
  summary: string;
  org: string;
  orgHref?: string;
  meta: string;
  note?: string;
  points: readonly string[];
};

export const roles: readonly Role[] = [
  {
    title: "Software Engineer",
    summary: "Nayel Solutions · Part-time · May 2021 – Present",
    org: "Nayel Solutions",
    orgHref: profile.nayel,
    meta: "Part-time · Islamabad, Pakistan · Remote",
    note: "Part-time alongside university studies and Petalnex.",
    points: [
      "Architected and developed scalable full-stack applications using React.js and .NET Core, implementing RESTful APIs, modular architecture, and secure backend services.",
      "Designed and integrated AI-driven features and automation systems into enterprise web applications.",
      "Contributed to system design, performance optimization, and deployment pipelines while collaborating in Agile environments to deliver production-grade software solutions.",
    ],
  },
  {
    title: "Junior Web & AI Developer",
    summary: "Petalnex Pvt Ltd · Full-time · Nov 2025 – Apr 2026",
    org: "Petalnex Pvt Ltd",
    meta: "Full-time · Hybrid",
    points: [
      "Developed and maintained web applications using React.js and FastAPI, including REST APIs for frontend, third-party, and enterprise integrations.",
      "Integrated AI features into applications, such as AI assistants, generative AI tools, and intelligent data processing to enhance user experience.",
      "Built end-to-end automation workflows using n8n and collaborated in Agile teams using Git/GitHub to deliver scalable web and AI solutions.",
    ],
  },
  {
    title: "Web & AI Developer",
    summary: "Petalnex Pvt Ltd · Internship · Feb 2025 – Nov 2025",
    org: "Petalnex Pvt Ltd",
    meta: "Internship · Pakistan · On-site",
    points: [
      "Developed web applications and backend services using FastAPI, SQL, and REST APIs for secure and scalable systems.",
      "Integrated AI capabilities including chatbots, automation workflows, and AI-powered features to improve application functionality.",
      "Built and optimized n8n automation workflows and collaborated with remote teams using GitHub, Slack, and Agile practices.",
    ],
  },
  {
    title: "Data Analyst",
    summary: "AICP · Internship · Mar 2024 – Apr 2024",
    org: "Artificial Intelligence Community of Pakistan",
    meta: "Internship · Remote",
    points: [
      "Conducted data analysis, developed predictive models, optimized data pipelines, and delivered actionable insights using Python, Excel, and visualization tools for AI-driven projects.",
    ],
  },
];

export const certifications = [
  {
    name: "Data Science Job Simulation",
    issuer: "British Airways · Forage",
    date: "Jan 2025",
  },
  {
    name: "Data Analytics and Visualization Job Simulation",
    issuer: "Accenture North America · Forage",
    date: "Aug 2024",
  },
  {
    name: "Data Science Job Simulation",
    issuer: "Standard Bank · Forage",
    date: "Aug 2024",
  },
  {
    name: "Data Visualization with Tableau Specialization",
    issuer: "University of California, Davis · Coursera",
    date: "Feb 2024",
  },
  {
    name: "Statistics for Data Science with Python",
    issuer: "Coursera · IBM",
    date: "Feb 2024",
  },
  {
    name: "IBM Data Science Specialization",
    issuer: "IBM",
    date: "Nov 2023",
  },
  {
    name: "Databases and SQL for Data Science with Python",
    issuer: "IBM",
    date: "Sep 2023",
  },
] as const;

export const services = [
  "IT consulting",
  "Custom software development",
  "Business analytics",
  "Web development",
] as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
] as const;

export const menuLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
] as const;
