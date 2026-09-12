export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export interface QuickQuestion {
  id: string;
  label: string;
  query: string;
}

export interface QuickNavChip {
  id: string;
  label: string;
  query: string;
  route: string;
}

export const QUICK_QUESTIONS: QuickQuestion[] = [
  {
    id: "skills",
    label: "What technologies do you work with?",
    query: "What technologies do you work with?",
  },
  {
    id: "projects",
    label: "Tell me about your recent projects",
    query: "Tell me about your recent projects",
  },
  {
    id: "contact",
    label: "How can I contact you for work?",
    query: "How can I contact you for work?",
  },
];

export const ASSISTANT_NAME = "Jami AI";

export const GREETING_TEXT =
  "Hi there! I'm Jami AI, the assistant for Mujaddid Ahmed Jami's portfolio. Ask me about his skills, featured projects, or how to contact him for work. Pick a quick question below, or type your own.";

interface Rule {
  id: string;
  keywords: string[];
  weight?: number;
  reply: string;
}

const RULES: Rule[] = [
  {
    id: "skills",
    keywords: [
      "skills",
      "stack",
      "technolog",
      "language",
      "framework",
      "library",
      "tools",
      "tech",
      "what do you work with",
      "what does he use",
    ],
    weight: 1,
    reply:
      "Mujaddid works as a full-stack developer with:\n\nLanguages: TypeScript, JavaScript, HTML, CSS\nFrontend: React, Next.js, Tailwind CSS, Redux Toolkit, shadcn/ui\nBackend: Node.js, Express.js, REST APIs\nData: MongoDB, PostgreSQL, Redis\nAuth: JWT, OAuth, Clerk\nCloud & DevOps: Git, GitHub Actions, Linux, Cloudflare, Vercel\nTools: Postman\n\nHe builds products end-to-end, from UI to database.",
  },
  {
    id: "projects",
    keywords: [
      "project",
      "recent work",
      "featured",
      "showcase",
      "what do you build",
      "made",
      "built",
    ],
    weight: 2,
    reply:
      "He has 3 featured full-stack projects:\n\n[1] School Management System - attendance, fee management, exams and notice broadcasting (Next.js, Node.js, MongoDB).\n[2] Gear UP - a multi-role gym platform with subscriptions and trainer scheduling (Next.js, Express, PostgreSQL, Clerk).\n[3] Nestora - a property & rental marketplace with live listings and booking (Next.js, Express, PostgreSQL, Clerk).\n\nFull case studies live on the Projects page.",
  },
  {
    id: "project-sms",
    keywords: ["school", "sms", "management system", "attendance", "gradebook"],
    weight: 3,
    reply:
      "The School Management System is an end-to-end digital campus covering automated attendance tracking, fee management & invoicing, an exam portal, gradebooks and real-time notice broadcasts. Stack: React, Next.js, TypeScript, Node.js and MongoDB. He led the team as Full Stack Developer.",
  },
  {
    id: "project-gym",
    keywords: ["gym", "gear", "fitness", "gear up"],
    weight: 3,
    reply:
      "Gear UP is a multi-role fitness platform for gym owners and members - subscription management, trainer scheduling, automated payments and a gear catalog. Stack: Next.js, TypeScript, Express.js, PostgreSQL and Clerk.",
  },
  {
    id: "project-rental",
    keywords: ["nestora", "house", "rental", "property", "tenant"],
    weight: 3,
    reply:
      "Nestora is a modern property and rental marketplace connecting landlords and tenants with real-time listings, advanced filters, direct booking and contract management. Stack: Next.js, TypeScript, Express.js, PostgreSQL and Clerk.",
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "mail", "message", "get in touch"],
    weight: 1,
    reply:
      "You can reach Mujaddid through:\n\nEmail: mujaddidahmedjami2025@gmail.com\nGitHub: https://github.com/Jami-12\nLinkedIn: https://www.linkedin.com/in/mujaddid-ahmed-jami-ab1491386/\n\nHe usually replies within 24 hours.",
  },
  {
    id: "hire",
    keywords: [
      "hire",
      "freelance",
      "available",
      "work with",
      "job",
      "opportunit",
      "collaborat",
      "open to",
      "commission",
      "contract",
    ],
    weight: 2,
    reply:
      "Yes! Mujaddid is open to full-stack roles, freelance work and collaborations. The best way to start is an email to mujaddidahmedjami2025@gmail.com or the contact form on this site - he replies within 24 hours.",
  },
  {
    id: "about",
    keywords: [
      "who are you",
      "about",
      "introduce",
      "background",
      "experience",
      "yourself",
      "what can you do",
      "tell me about him",
    ],
    weight: 1,
    reply:
      "Mujaddid Ahmed Jami is a Full Stack Developer based in Sylhet, Bangladesh. He builds responsive full-stack web applications with a focus on clean interfaces, reliable APIs and maintainable systems, learning by building and solving real problems.",
  },
  {
    id: "social",
    keywords: ["github", "linkedin", "social", "profile", "accounts"],
    weight: 1,
    reply:
      "GitHub: https://github.com/Jami-12\nLinkedIn: https://www.linkedin.com/in/mujaddid-ahmed-jami-ab1491386/\n\nYou can explore his commit history and open-source work anytime.",
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "curriculum"],
    weight: 1,
    reply:
      "You can view or download Mujaddid's resume at /resume - there's also a Resume button in the top navbar.",
  },
  {
    id: "greeting",
    keywords: [
      "hi",
      "hello",
      "hey",
      "salam",
      "assalamu",
      "good morning",
      "good evening",
      "good afternoon",
      "yo",
    ],
    weight: 1,
    reply:
      "Hello there! What would you like to know about Mujaddid? His skills, projects, or how to get in touch - just ask.",
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "appreciat", "helpful"],
    weight: 1,
    reply:
      "You're welcome! Happy to help. Feel free to explore the portfolio and ask anything else that comes to mind.",
  },
  {
    id: "bye",
    keywords: ["bye", "goodbye", "see you", "later", "exit", "quit"],
    weight: 1,
    reply:
      "Goodbye! Thanks for visiting Mujaddid's portfolio. Open me again anytime you have more questions.",
  },
];

const FALLBACK =
  "I didn't quite catch that, but I can help with topics like skills, projects, or contacting Mujaddid. Try one of the quick questions below, or ask directly like 'What technologies do you work with?'.";

export function getAssistantReply(input: string): string {
  const query = input.toLowerCase().trim();
  if (!query) {
    return "Please type a question and I'll do my best to answer it.";
  }

  let best: { reply: string; score: number } | null = null;

  for (const rule of RULES) {
    let score = 0;
    for (const keyword of rule.keywords) {
      const pattern = keyword.includes(" ")
        ? keyword.replace(/[\s]+/g, "\\s+")
        : `\\b${keyword}\\b`;
      const matches = query.match(new RegExp(pattern, "g"));
      if (matches) {
        score += matches.length * (rule.weight ?? 1);
      }
    }
    if (score > 0 && (best === null || score > best.score)) {
      best = { reply: rule.reply, score };
    }
  }

  return best ? best.reply : FALLBACK;
}

export interface NavigationIntent {
  id: string;
  route: string | null;
  confirm: string;
}

interface NavRule {
  id: string;
  keywords: string[];
  route: string;
  confirm: string;
  weight?: number;
}

const NAV_RULES: NavRule[] = [
  {
    id: "nav-project-assessment",
    keywords: [
      "developer assessment",
      "assessment platform",
      "coding assessment",
      "assessment project",
      "project 1",
      "first project",
    ],
    route: "/projects/1",
    confirm:
      "Opening the Developer Assessment Platform case study now... 🚀",
    weight: 4,
  },
  {
    id: "nav-project-sms",
    keywords: [
      "school management",
      "management system",
      "sms",
      "school",
      "attendance",
      "gradebook",
      "project 2",
      "second project",
    ],
    route: "/projects/2",
    confirm: "Opening the School Management System case study now... 🚀",
    weight: 4,
  },
  {
    id: "nav-project-gear",
    keywords: [
      "gear up",
      "gearup",
      "fitness platform",
      "gym",
      "gear",
      "project 3",
      "third project",
    ],
    route: "/projects/3",
    confirm: "Opening the Gear UP case study now... 🚀",
    weight: 4,
  },
  {
    id: "nav-project-nestora",
    keywords: [
      "nestora",
      "rental marketplace",
      "property",
      "tenant",
      "project 4",
      "fourth project",
    ],
    route: "/projects/4",
    confirm: "Opening the Nestora case study now... 🚀",
    weight: 4,
  },
  {
    id: "nav-projects",
    keywords: [
      "projects",
      "show projects",
      "go to projects",
      "see work",
      "work page",
      "my work",
      "showcase",
    ],
    route: "/projects",
    confirm: "Navigating you to the Projects page now... 🚀",
    weight: 2,
  },
  {
    id: "nav-resume",
    keywords: [
      "resume",
      "cv",
      "curriculum",
      "experience",
      "show resume",
    ],
    route: "/resume",
    confirm: "Taking you to the Resume page now... 🚀",
    weight: 2,
  },
  {
    id: "nav-blogs",
    keywords: ["blogs", "articles", "read blogs", "blog posts", "posts"],
    route: "/blogs",
    confirm: "Navigating you to the Blogs page now... 🚀",
    weight: 2,
  },
  {
    id: "nav-home",
    keywords: ["home", "main page", "go back home", "home page", "landing"],
    route: "/",
    confirm: "Heading back to the Home page now... 🚀",
    weight: 2,
  },
  {
    id: "nav-contact",
    keywords: [
      "contact",
      "hire",
      "email",
      "reach out",
      "contact form",
      "reach",
      "message",
    ],
    route: "/#contact",
    confirm: "Opening the Contact section now... 🚀",
    weight: 2,
  },
];

const NAV_FALLBACK_INTENT: NavigationIntent = {
  id: "nav-fallback",
  route: null,
  confirm:
    "I couldn't find that page. Pages I can take you to: Home, Projects, Resume, Blogs, or the Contact section. I can also open a project case study like 'Developer Assessment', 'School Management System', 'Gear UP', or 'Nestora'.",
};

const INFO_MARKERS = [
  "tell me",
  "tell us",
  "tell about",
  "what is",
  "what are",
  "what's",
  "whats ",
  "what",
  "how can",
  "how do",
  "how",
  "can you",
  "explain",
  "describe",
  "more about",
  "details",
  "information",
  "info about",
  "i'd like",
  "i would like",
  "i want to know",
  "wanna know",
  "about",
  "list",
];

const NAV_HINTS = [
  "take me to",
  "take me",
  "go to",
  "go back",
  "navigate",
  "open",
  "jump to",
  "bring me",
  "head to",
  "lead me",
  "switch to",
  "visit",
  "page",
];

export function resolveNavigation(input: string): NavigationIntent | null {
  const query = input.toLowerCase().trim();
  if (!query) return null;

  if (hasInfoMarker(query)) return null;

  let best: NavigationIntent | null = null;
  let bestScore = 0;

  for (const rule of NAV_RULES) {
    let score = 0;
    for (const keyword of rule.keywords) {
      const pattern = keyword.includes(" ")
        ? keyword.replace(/[\s]+/g, "\\s+")
        : `\\b${keyword}\\b`;
      const matches = query.match(new RegExp(pattern, "g"));
      if (matches) {
        score += matches.length * (rule.weight ?? 1);
      }
    }
    if (score > 0 && score > bestScore) {
      bestScore = score;
      best = { id: rule.id, route: rule.route, confirm: rule.confirm };
    }
  }

  if (best) return best;

  if (NAV_HINTS.some((hint) => query.includes(hint))) {
    return NAV_FALLBACK_INTENT;
  }

  return null;
}

function hasInfoMarker(query: string): boolean {
  return INFO_MARKERS.some((marker) => {
    const pattern = marker.includes(" ")
      ? marker.replace(/[\s]+/g, "\\s+")
      : `\\b${marker}\\b`;
    return new RegExp(pattern).test(query);
  });
}

export const NAV_QUICK_ACTIONS: QuickQuestion[] = [
  { id: "nav-quick-home", label: "Back to Home", query: "Go back home" },
  {
    id: "nav-quick-projects",
    label: "Show Featured Projects",
    query: "Take me to the projects page",
  },
  {
    id: "nav-quick-resume",
    label: "Take me to Resume",
    query: "Go to my resume",
  },
  { id: "nav-quick-blogs", label: "Read my Blogs", query: "Open the blogs page" },
  {
    id: "nav-quick-contact",
    label: "Contact me",
    query: "Open the contact section",
  },
];

export const QUICK_NAV_ACTIONS: QuickNavChip[] = [
  {
    id: "chip-nav-projects",
    label: "🚀 View Projects",
    query: "Take me to projects",
    route: "/projects",
  },
  {
    id: "chip-nav-resume",
    label: "📄 Open Resume",
    query: "Show resume",
    route: "/resume",
  },
  {
    id: "chip-nav-contact",
    label: "📩 Get in Touch",
    query: "Open the contact section",
    route: "/#contact",
  },
];