export type ProjectLayout = "tall" | "stack" | "row";

export interface Project {
  id: number;
  layout: ProjectLayout;
  span: string;
  title: string;
  description: string;
  role: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  accent: string;
  problem?: string;
  features?: string[];
  architecture?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    layout: "tall",
    span: "sm:col-span-6 lg:col-span-4",
    title: "Developer Assessment Platform",
    description:
      "An interactive coding assessment & evaluation ecosystem featuring real-time code execution, automated test case grading, candidate performance tracking, and custom skill challenges.",
    problem:
      "Hiring teams struggled to evaluate developer candidates fairly at scale. Traditional resumes and generic MCQ tests failed to capture real coding ability, while manual code reviews did not scale. Teams needed a platform that could run candidate code in a sandbox, grade it against hidden test cases automatically, and surface objective performance metrics.",
    features: [
      "Real-time code execution in isolated sandboxes across multiple languages",
      "Automated grading against hidden test cases with instant feedback",
      "Custom skill challenges and multi-level difficulty assessments",
      "Candidate performance dashboards with score analytics and comparisons",
      "Interviewer review tools with side-by-side code history",
      "Role-based access for candidates, reviewers, and admins",
    ],
    architecture: [
      "Next.js App Router frontend with TypeScript for type-safe UI",
      "Node.js + Express REST API orchestrating submission lifecycle",
      "Sandboxed code-execution service queueing jobs to isolated workers",
      "PostgreSQL for challenge, submission, and result data with relational integrity",
      "Redis cache for live leaderboards and recent results",
      "JWT-based auth with role guards for portal separation",
    ],
    role: "Team Leader & Full Stack Developer",
    image: "/project/hop.jpg",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL"],
    liveUrl: "https://coding-platform-client-gamma.vercel.app/",
    githubUrl: "https://github.com/Jami-12",
    accent: "from-blue-600/40 via-indigo-500/15 to-transparent",
  },
  {
    id: 2,
    layout: "tall",
    span: "sm:col-span-6 lg:col-span-4",
    title: "School Management System",
    description:
      "An end-to-end digital campus ecosystem featuring automated attendance tracking, dynamic fee management & invoicing, exam portal, gradebooks, and real-time notice broadcasts.",
    problem:
      "Administrators at schools juggled paper attendance registers, manual fee collection, and scattered exam records. Data lived in disconnected spreadsheets, monthly invoicing was error-prone, and parents received notices late. The school needed one system to digitize the entire campus workflow under a single dashboard.",
    features: [
      "Automated attendance tracking with per-class reports",
      "Dynamic fee management and automated invoice generation",
      "Exam portal with result entry, gradebooks, and transcripts",
      "Real-time notice broadcasts to parents and students",
      "Role-based portals for admin, teachers, staff, and students",
      "Dashboard analytics for enrollment, fees, and attendance",
    ],
    architecture: [
      "Next.js frontend with role-based routing and layouts",
      "Node.js/Express API with modular controllers for each domain",
      "MongoDB document model for flexible student and exam records",
      "JWT auth with refresh rotation and role guards",
      "Cloud-hosted file storage for results and notices",
      "Responsive PWA-ready UI used on desktop and mobile",
    ],
    role: "Team Leader & Full Stack Developer",
    image: "/project/sms.png",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    liveUrl: "https://sms-client-gules.vercel.app",
    githubUrl: "https://github.com/Jami-12",
    accent: "from-blue-600/40 via-indigo-500/15 to-transparent",
  },
  {
    id: 3,
    layout: "stack",
    span: "sm:col-span-6 lg:col-span-2",
    title: "Gear UP",
    description:
      "A multi-role fitness platform for gym owners and members to manage subscriptions, trainer scheduling, automated payment collection, and fitness gear catalog.",
    problem:
      "Gym owners spent hours managing memberships, trainer schedules, and payments in disjointed tools. Members had no way to manage subscriptions or book trainers, and owners lacked a single dashboard to track revenue and attendance, hurting retention and day-to-day operations.",
    features: [
      "Role-based dashboards for owners, trainers, and members",
      "Subscription plans with automated payment collection",
      "Trainer scheduling and booking with availability slots",
      "Fitness gear catalog with product listing and purchase flow",
      "Revenue and membership analytics for owners",
      "Member profiles and session history",
    ],
    architecture: [
      "Next.js + TypeScript frontend with role-scoped pages",
      "Express.js REST API with clean controller and service layers",
      "PostgreSQL with relational schema for plans, bookings, and payments",
      "Clerk for authentication, user management, and role metadata",
      "Serverless-friendly API routes and protected client data fetching",
    ],
    role: "Team Leader & Full Stack Developer",
    image: "/project/gear.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Clerk",
    ],
    liveUrl: "https://gearupfrontend.vercel.app",
    githubUrl: "https://github.com/Jami-12",
    accent: "from-emerald-500/35 via-teal-500/10 to-transparent",
  },
  {
    id: 4,
    layout: "row",
    span: "sm:col-span-6",
    title: "Nestora",
    description:
      "A modern property and rental marketplace connecting landlords and tenants with real-time property listings, advanced search filters, direct booking, and contract management.",
    problem:
      "Finding reliable rental properties was fragmented — listings were scattered across social media, filters were weak, and bookings were manual and unverified. Landlords had no structured way to manage listings and contracts, and tenants had no trustworthy channel to search and book homes.",
    features: [
      "Real-time property listings with rich media and map context",
      "Advanced search filters: price, location, type, amenities",
      "Direct booking flow with availability tracking",
      "Contract management between landlords and tenants",
      "Protected dashboards for both listing owners and renters",
      "In-app messaging to connect parties securely",
    ],
    architecture: [
      "Next.js App Router website with optimized dynamic pages",
      "Express.js API with validation and paginated listing queries",
      "PostgreSQL for listings, bookings, contracts, and users",
      "Clerk auth guarding landlord and tenant surfaces",
      "Image and asset optimization for fast listing thumbnails",
    ],
    role: "Team Leader & Full Stack Developer",
    image: "/project/nestora.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Clerk",
    ],
    liveUrl: "https://nestoraclient.vercel.app",
    githubUrl: "https://github.com/Jami-12",
    accent: "from-violet-500/35 via-fuchsia-500/10 to-transparent",
  },
];

export function getProjectById(id: string | number): Project | undefined {
  return projects.find((project) => String(project.id) === String(id));
}