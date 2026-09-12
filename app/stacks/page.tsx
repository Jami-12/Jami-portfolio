"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layout,
  Server,
  Database,
  Wrench,
  Search,
  Sparkles,
  Terminal,
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
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiClerk,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiLinux,
  SiCloudflare,
  SiVercel,
  SiPostman,
} from "react-icons/si";

interface Skill {
  name: string;
  icon: React.ReactNode;
  tag: string;
  borderHover: string;
}

interface StackCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const stackData: StackCategory[] = [
  {
    id: "frontend",
    title: "Frontend Architecture",
    description: "Languages, UI frameworks, and reactive systems.",
    icon: <Layout className="size-4 text-sky-400" />,
    skills: [
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" />, tag: "Language", borderHover: "hover:border-[#3178C6]/60" },
      { name: "React", icon: <SiReact className="text-[#61DAFB]" />, tag: "UI Library", borderHover: "hover:border-[#61DAFB]/60" },
      { name: "Next.js 15", icon: <SiNextdotjs className="text-foreground" />, tag: "Framework", borderHover: "hover:border-sky-500/50" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" />, tag: "Styling", borderHover: "hover:border-[#06B6D4]/60" },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" />, tag: "Language", borderHover: "hover:border-[#F7DF1E]/60" },
      { name: "Redux Toolkit", icon: <SiRedux className="text-[#764ABC]" />, tag: "State", borderHover: "hover:border-[#764ABC]/60" },
      { name: "Framer Motion", icon: <SiFramer className="text-pink-500" />, tag: "Animation", borderHover: "hover:border-pink-500/60" },
      { name: "shadcn/ui", icon: <SiShadcnui className="text-foreground" />, tag: "Components", borderHover: "hover:border-foreground/40" },
      { name: "HTML5", icon: <SiHtml5 className="text-[#E34F26]" />, tag: "Markup", borderHover: "hover:border-[#E34F26]/60" },
      { name: "CSS3", icon: <SiCss className="text-[#1572B6]" />, tag: "Styling", borderHover: "hover:border-[#1572B6]/60" },
    ],
  },
  {
    id: "backend",
    title: "Backend Services",
    description: "Scalable runtime, RESTful APIs, and auth solutions.",
    icon: <Server className="size-4 text-emerald-400" />,
    skills: [
      { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" />, tag: "Runtime", borderHover: "hover:border-[#339933]/60" },
      { name: "Express.js", icon: <SiExpress className="text-foreground" />, tag: "Framework", borderHover: "hover:border-foreground/40" },
      { name: "RESTful APIs", icon: <Terminal className="text-emerald-500" />, tag: "Architecture", borderHover: "hover:border-emerald-500/60" },
      { name: "JWT Auth", icon: <SiJsonwebtokens className="text-[#FB015B]" />, tag: "Security", borderHover: "hover:border-[#FB015B]/60" },
      { name: "Clerk Auth", icon: <SiClerk className="text-[#6C47FF]" />, tag: "Authentication", borderHover: "hover:border-[#6C47FF]/60" },
    ],
  },
  {
    id: "database",
    title: "Databases & Storage",
    description: "Relational, document, and memory data caching.",
    icon: <Database className="size-4 text-purple-400" />,
    skills: [
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, tag: "NoSQL", borderHover: "hover:border-[#47A248]/60" },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" />, tag: "Relational", borderHover: "hover:border-[#4169E1]/60" },
      { name: "Redis", icon: <SiRedis className="text-[#DC382D]" />, tag: "In-Memory", borderHover: "hover:border-[#DC382D]/60" },
    ],
  },
  {
    id: "tools",
    title: "DevOps & Tooling",
    description: "Version control, continuous integration, and cloud hosting.",
    icon: <Wrench className="size-4 text-amber-400" />,
    skills: [
      { name: "Git", icon: <SiGit className="text-[#F05032]" />, tag: "VCS", borderHover: "hover:border-[#F05032]/60" },
      { name: "GitHub", icon: <SiGithub className="text-foreground" />, tag: "Repository", borderHover: "hover:border-foreground/40" },
      { name: "Vercel", icon: <SiVercel className="text-foreground" />, tag: "Deployment", borderHover: "hover:border-foreground/40" },
      { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" />, tag: "API Testing", borderHover: "hover:border-[#FF6C37]/60" },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" />, tag: "CI/CD", borderHover: "hover:border-[#2088FF]/60" },
      { name: "Linux", icon: <SiLinux className="text-[#FCC624]" />, tag: "OS", borderHover: "hover:border-[#FCC624]/60" },
      { name: "Cloudflare", icon: <SiCloudflare className="text-[#F38020]" />, tag: "CDN & Security", borderHover: "hover:border-[#F38020]/60" },
    ],
  },
];

export default function StacksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredCategories = stackData
    .map((cat) => {
      if (activeTab !== "all" && cat.id !== activeTab) return null;
      const skills = cat.skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (skills.length === 0) return null;
      return { ...cat, skills };
    })
    .filter(Boolean) as StackCategory[];

  return (
    <div className="min-h-screen bg-background px-4 py-12 text-foreground md:py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        
        {/* Clean Static Header */}
        <header className="relative rounded-3xl border border-border/70 bg-card/50 p-6 md:p-8 backdrop-blur-md">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400">
                <Sparkles className="size-3.5" />
                <span>Tech Stack</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Engineering Tools & Technologies
              </h1>
              <p className="max-w-xl text-xs text-muted-foreground md:text-sm">
                A clean overview of frameworks, libraries, and infrastructure tools I work with daily.
              </p>
            </div>
          </div>

          {/* Search & Tabs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Filter stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border/80 bg-background/80 pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1 bg-muted/30 p-1 rounded-xl border border-border/50">
              {[{ id: "all", label: "All" }, { id: "frontend", label: "Frontend" }, { id: "backend", label: "Backend" }, { id: "database", label: "Database" }, { id: "tools", label: "Tools" }].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-sky-500 text-white font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content Section */}
        <main className="space-y-10">
          {filteredCategories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-xs text-muted-foreground">No matching technology found.</p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <section key={category.id} className="space-y-4">
                {/* Section Header */}
                <div className="flex items-center gap-2.5 border-b border-border/40 pb-3">
                  <div className="rounded-lg border border-border/80 bg-muted/60 p-2">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground">
                      {category.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Minimalist Cards Grid */}
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-3.5 backdrop-blur-sm transition-all duration-200 ${skill.borderHover}`}
                    >
                      <span className="text-2xl shrink-0">
                        {skill.icon}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="truncate text-xs font-semibold text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {skill.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </main>
      </div>
    </div>
  );
}