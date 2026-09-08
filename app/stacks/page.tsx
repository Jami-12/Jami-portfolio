"use client";

import React from "react";
import Link from "next/link";
import {
  Code2,
  Layout,
  Server,
  Database,
  ShieldCheck,
  Cloud,
  Wrench,
} from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiShadcnui,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiJsonwebtokens,
  SiClerk,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiLinux,
  SiCloudflare,
  SiVercel,
  SiPostman,
} from "react-icons/si";

interface StackItem {
  name: string;
  icon: React.ReactNode;
}

interface StackCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  items: StackItem[];
}

const stackData: StackCategory[] = [
  {
    id: "languages",
    title: "Languages",
    description: "Core languages used across frontend and full-stack work.",
    icon: <Code2 className="size-4 text-muted-foreground" />,
    items: [
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "HTML", icon: <SiHtml5 className="text-[#E34F26]" /> },
      { name: "CSS", icon: <SiCss className="text-[#1572B6]" /> },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description:
      "UI development, application routing, styling, and client state.",
    icon: <Layout className="size-4 text-muted-foreground" />,
    items: [
      { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
      {
        name: "Next.js",
        icon: <SiNextdotjs className="text-neutral-900 dark:text-white" />,
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-[#06B6D4]" />,
      },
      { name: "Redux Toolkit", icon: <SiRedux className="text-[#764ABC]" /> },
      {
        name: "shadcn/ui",
        icon: <SiShadcnui className="text-neutral-900 dark:text-white" />,
      },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Application services and API development.",
    icon: <Server className="size-4 text-muted-foreground" />,
    items: [
      { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
      {
        name: "Express.js",
        icon: <SiExpress className="text-neutral-600 dark:text-neutral-300" />,
      },
      { name: "REST APIs", icon: <Code2 className="text-emerald-500" /> },
    ],
  },
  {
    id: "data",
    title: "Data",
    description: "Databases and caching used in full-stack applications.",
    icon: <Database className="size-4 text-muted-foreground" />,
    items: [
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
      { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
    ],
  },
  {
    id: "authentication",
    title: "Authentication",
    description: "Authentication and identity patterns used across projects.",
    icon: <ShieldCheck className="size-4 text-muted-foreground" />,
    items: [
      { name: "JWT", icon: <SiJsonwebtokens className="text-[#FB015B]" /> },
      { name: "OAuth", icon: <ShieldCheck className="text-amber-400" /> },
      { name: "Clerk", icon: <SiClerk className="text-[#6C47FF]" /> },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Version control, CI, deployment, and infrastructure tooling.",
    icon: <Cloud className="size-4 text-muted-foreground" />,
    items: [
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      {
        name: "GitHub",
        icon: <SiGithub className="text-neutral-900 dark:text-white" />,
      },
      {
        name: "GitHub Actions",
        icon: <SiGithubactions className="text-[#2088FF]" />,
      },
      { name: "Linux", icon: <SiLinux className="text-[#FCC624]" /> },
      { name: "Cloudflare", icon: <SiCloudflare className="text-[#F38020]" /> },
      {
        name: "Vercel",
        icon: <SiVercel className="text-neutral-900 dark:text-white" />,
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "Daily development and API tooling.",
    icon: <Wrench className="size-4 text-muted-foreground" />,
    items: [
      { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
    ],
  },
];

export default function StacksPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12 text-foreground md:py-16">
      <div className="mx-auto max-w-3xl space-y-10">
        {/* Header Section */}
        <header className="flex items-center justify-between border-b border-border/60 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Stacks
            </h1>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm">
              Technologies and tools I use
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <span>&rsaquo;</span>
            <span className="text-foreground">Stacks</span>
          </div>
        </header>

        {/* Categories Stack List */}
        <main className="space-y-8">
          {stackData.map((category) => (
            <section
              key={category.id}
              className="space-y-3 border-b border-border/50 pb-6 last:border-0"
            >
              {/* Category Header */}
              <div className="flex items-start gap-3">
                <div className="shrink-0 rounded-xl border border-border/70 bg-muted/60 p-2 shadow-inner">
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    {category.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex cursor-default items-center gap-2.5 rounded-xl border border-border/70 bg-card/70 px-3.5 py-2 text-xs font-medium text-foreground shadow-sm transition-all hover:border-border hover:bg-muted/60 hover:shadow"
                  >
                    <span className="text-sm transition-transform group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Mujaddid Ahmed Jami. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 font-medium">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href="mailto:mujaddidahmedjami2025@gmail.com"
              className="transition-colors hover:text-foreground"
            >
              Email
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}