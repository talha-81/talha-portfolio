export const groups = [
  {
    id: "web",
    title: "Web systems",
    lede: "Ticketing, contracts, and training-center workshops.",
  },
  {
    id: "ai",
    title: "AI products",
    lede: "Chatbots, voice agents, MCP data access, and automation.",
  },
  {
    id: "ml",
    title: "Machine learning and deep learning",
    lede: "Computer vision, Keras and TensorFlow models, and classical machine learning from public repositories.",
  },
  {
    id: "data",
    title: "Data and analysis",
    lede: "Reporting, simulations, and statistical notebooks.",
  },
] as const;

export type GroupId = (typeof groups)[number]["id"];

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  group: GroupId;
  title: string;
  summary: string;
  description: string;
  tags: readonly string[];
  links: readonly ProjectLink[];
  cover?: string;
  coverAlt?: string;
  note?: string;
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "ticketing-management-system",
    group: "web",
    title: "Ticketing Management System",
    summary: "Manages all of a company's tickets.",
    description: "Manages all of a company's tickets.",
    tags: ["Management system"],
    links: [],
    featured: true,
  },
  {
    slug: "contract-management-system",
    group: "web",
    title: "Contract Management System",
    summary: "Manages contacts and companies, and handles contracts with those companies.",
    description:
      "Manages contacts and companies, and handles contracts with those companies. It tracks contract expiry, sends expiry notifications, and has an approver route for approvals.",
    tags: ["Management system"],
    links: [],
    featured: true,
  },
  {
    slug: "training-center-system",
    group: "web",
    title: "Training Center System",
    summary: "Manages the different workshops a training center runs.",
    description: "Manages the different workshops a training center runs.",
    tags: ["Management system"],
    links: [],
    featured: true,
  },
  {
    slug: "ai-chatbot-with-mcp",
    group: "ai",
    title: "AI chatbot with MCP",
    summary: "A chatbot connected via MCP servers that pulls live data from a database.",
    description:
      "A chatbot connected via MCP (Model Context Protocol) servers that pulls live data from a database.",
    tags: ["Chatbot", "MCP"],
    links: [],
  },
  {
    slug: "appointment-booking-call-agent",
    group: "ai",
    title: "AI appointment-booking call agent",
    summary: "A voice and call agent that books appointments.",
    description: "A voice/call agent that books appointments for you.",
    tags: ["Voice agent", "Appointments"],
    links: [],
  },
  {
    slug: "appointment-booking-chatbot",
    group: "ai",
    title: "Appointment-booking chatbot",
    summary: "A chatbot that books appointments.",
    description: "A chatbot that books appointments.",
    tags: ["Chatbot", "Appointments"],
    links: [],
  },
  {
    slug: "university-information-call-agent",
    group: "ai",
    title: "University information call agent",
    summary: "A voice and call agent that answers callers' questions about a university.",
    description: "A voice/call agent that answers callers' questions about a university.",
    tags: ["Voice agent"],
    links: [],
  },
  {
    slug: "automated-lead-generator",
    group: "ai",
    title: "Automated lead generator",
    summary: "AI automation that finds and generates leads automatically.",
    description: "AI automation that finds and generates leads automatically.",
    tags: ["Automation"],
    links: [],
  },
  {
    slug: "whatsapp-automation",
    group: "ai",
    title: "WhatsApp automation",
    summary:
      "Automated WhatsApp messaging flows, with exported n8n workflows and a FastAPI conversation API.",
    description:
      "Automated WhatsApp messaging flows. The public work includes exported n8n workflows and a FastAPI service that reads a chatbot's conversation history from Supabase, grouped by sender.",
    tags: ["n8n", "FastAPI", "Supabase", "WhatsApp"],
    cover: "/covers/automation.webp",
    coverAlt: "Abstract cover art for the WhatsApp automation project.",
    links: [
      { label: "n8n workflows", href: "https://github.com/talha-81/n8n" },
      { label: "WhatsApp API", href: "https://github.com/talha-81/fast-api" },
    ],
  },
  {
    slug: "customer-service-chatbot",
    group: "ai",
    title: "Customer service chatbot",
    summary: "An AI chatbot that handles customer support queries.",
    description: "An AI chatbot that handles customer support queries.",
    tags: ["Chatbot"],
    links: [],
  },
  {
    slug: "vehicle-detection",
    group: "ml",
    title: "Vehicle detection",
    summary: "Detects and counts cars and buses in a road image.",
    description:
      "Detects and counts the vehicles on a road. The vehicle-detect-count app uses OpenCV Haar cascades, one for cars and one for the front of a bus, draws a box around each detection, and reports how many cars and buses it found. Flask serves the app. Sample images are in the repository's sample_data folder.",
    tags: ["OpenCV", "Flask", "NumPy", "Pillow", "Computer vision"],
    cover: "/covers/vehicle.webp",
    coverAlt: "Cars marked in a road image from the public vehicle-detection sample set.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/talha-81/image_recognition_projects",
      },
    ],
    featured: true,
  },
  {
    slug: "image-recognition-projects",
    group: "ml",
    title: "Image recognition projects",
    summary: "Object detection and image classification with TensorFlow, Keras, Flask, and OpenCV.",
    description:
      "A collection of object-detection and image-classification projects using TensorFlow, Keras, Flask, and OpenCV. A Streamlit app classifies cat and dog photos with a Keras model: 64×64 RGB input, normalized by 1/255. A Flask app loads a Keras model and classifies a photo as one of six bird species: American goldfinch, barn owl, carmine bee-eater, downy woodpecker, emperor penguin, and flamingo. Vehicle detection is in the same repository and is listed on its own.",
    tags: ["TensorFlow", "Keras", "Flask", "OpenCV", "Streamlit"],
    cover: "/covers/birds.webp",
    coverAlt: "A bird photo from the public image-recognition sample set.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/talha-81/image_recognition_projects",
      },
    ],
  },
  {
    slug: "machine-learning-projects",
    group: "ml",
    title: "Machine learning projects",
    summary: "Stock-price prediction, bird detection, and breast-cancer prediction.",
    description:
      "Stock-price prediction with an LSTM notebook on Tesla price data, bird detection, and breast-cancer prediction with logistic regression. Stack: Python, scikit-learn, and Jupyter.",
    tags: ["Python", "scikit-learn", "Jupyter", "LSTM"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/talha-81/machine_learning_projects",
      },
    ],
  },
  {
    slug: "story-to-image-generator",
    group: "ml",
    title: "Story to Image Generator",
    summary: "Splits a script or story into scenes and generates a preview image for each scene.",
    description:
      "Splits a script or story into scenes and generates a preview image for each scene through image-generation APIs, with a Streamlit front end. The repository includes the project documentation. Stack: FastAPI, Streamlit, Pydantic, Pillow, and aiohttp.",
    tags: ["FastAPI", "Streamlit", "Pydantic", "Pillow", "aiohttp"],
    cover: "/covers/story.webp",
    coverAlt: "Cover art for the story-to-image project.",
    links: [
      {
        label: "Explore Project",
        href: "https://github.com/talha-81/image_video_generation",
      },
    ],
    featured: true,
  },
  {
    slug: "automated-data-insights",
    group: "data",
    title: "Automated Data Insights",
    summary: "Ask questions of uploaded CSV, Excel, or SQL data, then export charts and PDF reports.",
    description:
      "Upload CSV, Excel, or SQL data and ask questions in natural language. The app generates charts, runs automated EDA (a data-quality score, correlations, and KPIs), and exports PDF executive reports. It includes JWT with role-based access and audit logging.",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Plotly", "Redis", "Celery", "Docker"],
    cover: "/covers/insights.webp",
    coverAlt: "Cover art for Automated Data Insights.",
    links: [],
    note: "No public repository.",
    featured: true,
  },
  {
    slug: "british-airways-data-science",
    group: "data",
    title: "British Airways Data Science Simulation",
    summary: "Review sentiment and a booking-completion model, plus two other simulations in the same repository.",
    description:
      "Scraped about 4,000 Skytrax reviews with BeautifulSoup, cleaned them with NLTK, and scored sentiment with TextBlob, including word clouds. Trained a Random Forest on about 50,000 booking records to predict booking completion, at 85% accuracy. The same repository includes the Accenture North America data-analytics simulation and the Standard Bank data-science simulation (both Aug 2024).",
    tags: ["Python", "NLTK", "scikit-learn", "pandas", "BeautifulSoup"],
    cover: "/covers/sentiment.webp",
    coverAlt: "Cover art for the data-science simulation repository.",
    links: [
      { label: "Explore Project", href: "https://github.com/talha-81/forage" },
    ],
  },
  {
    slug: "statistical-analysis",
    group: "data",
    title: "Statistical Analysis",
    summary: "ETL, A/B testing, Tesla stock, and Boston housing notebooks.",
    description:
      "ETL, A/B testing, Tesla stock, and Boston housing. Cookie Cats covered 90,189 players with chi-square, bootstrap, and logistic regression, and recommended keeping the gate at level 30 (7-day retention 19% vs 18.2%). Tesla (Aug 2023) covers volatility, Sharpe ratio, beta, and an ARIMA 30-day forecast, at about 60% annualized volatility. Boston housing (Nov 2023) covers EDA, a t-test, ANOVA, Pearson correlation, and OLS regression on median home values.",
    tags: ["Python", "Pandas", "Jupyter"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/talha-81/statistical_analysis",
      },
    ],
  },
  {
    slug: "datastory-dashboard",
    group: "data",
    title: "DataStory Dashboard",
    summary: "A Tableau dashboard of profit and sales.",
    description:
      "A Tableau dashboard of profit and sales. Profit was independent of region, higher discounts reduced profit, and sales did not track profit. No public repository.",
    tags: ["Tableau"],
    links: [],
    note: "No public repository.",
  },
];

export function groupById(id: GroupId) {
  const group = groups.find((item) => item.id === id);
  if (!group) throw new Error(`Unknown group: ${id}`);
  return group;
}

export function projectsInGroup(id: GroupId) {
  return projects.filter((project) => project.group === id);
}

export function projectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}

const homeSlugs = [
  "ticketing-management-system",
  "ai-chatbot-with-mcp",
  "vehicle-detection",
] as const;

export function homeProjects() {
  return homeSlugs.map((slug) => {
    const project = projectBySlug(slug);
    if (!project) throw new Error(`Missing home project: ${slug}`);
    return project;
  });
}

export function featuredProjects() {
  return projects.filter((project) => project.featured);
}
