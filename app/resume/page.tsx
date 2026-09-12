"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Download,
  FileText,
  ArrowLeft,
  Briefcase,
  Code2,
  GraduationCap,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const CONTACT = [
  {
    label: "Email",
    value: "mujaddidahmedjami2025@gmail.com",
    href: "mailto:mujaddidahmedjami2025@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+880 1703-768306",
    href: "tel:+8801703768306",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Moulvibazar, Bangladesh",
    href: null,
    icon: MapPin,
  },
  {
    label: "Portfolio",
    value: "mujaddid-portfolio.vercel.app",
    href: "/",
    icon: Globe,
  },
  {
    label: "GitHub",
    value: "github.com/Jami-12",
    href: "https://github.com/Jami-12",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "Mujaddid Ahmed Jami",
    href: "https://www.linkedin.com/in/mujaddid-ahmed-jami-ab1491386/",
    icon: FaLinkedin,
  },
];

const SKILL_GROUPS = [
  {
    title: "Languages & Frontend",
    icon: Code2,
    items: "Languages: TypeScript · JavaScript (ES6+) · HTML5 · CSS3",
    sub: "Frontend: React.js · Next.js (App Router) · Tailwind CSS · Redux Toolkit · Framer Motion",
  },
  {
    title: "Backend, Database & Tools",
    icon: FileText,
    items:
      "Backend & DB: Node.js · Express.js · REST APIs · JWT · OAuth · MongoDB · PostgreSQL · Redis",
    sub: "Tools & DevOps: Git · GitHub Actions · Postman · Vercel · Linux",
  },
];

const EXPERIENCE = {
  role: "Full-Stack Web Developer",
  organization: "Independent · Open Source",
  period: "2026 — Present",
  location: "Moulvibazar, Bangladesh",
  bullets: [
    "Build end-to-end production web applications — from database modeling and REST APIs to polished, responsive interfaces.",
    "Led development teams on full-stack systems (School Management, Fitness Platform, Rental Marketplace) from planning to deployment.",
    "Maintained open-source templates and utilities on GitHub; active contributor to web development communities.",
    "Focus on performance, maintainable code, and clean UI with Next.js 16, TypeScript, and modern styling tooling.",
  ],
};

const EDUCATION = [
  {
    title: "HSC (Higher Secondary Certificate)",
    school: "Moulvibazar Govt College",
    status: "Inter First Year (Present)",
  },
  {
    title: "SSC (Secondary School Certificate)",
    school: "Moulvibazar Govt High School",
    status: "Completed",
  },
];

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: typeof Briefcase;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-2 dark:border-slate-800">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700 resume-accent dark:bg-blue-400/10 dark:text-blue-400">
        <Icon className="size-4" />
      </span>
      <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-slate-100">
        {title}
      </h2>
    </div>
  );
}

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-10 print:bg-white print:p-0 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Sticky Action Bar */}
        <div className="sticky top-5 z-40 mb-6 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-background/90 px-3 py-2.5 shadow-lg shadow-black/5 backdrop-blur-xl dark:bg-slate-900/90">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              <span className="hidden sm:inline">Back to portfolio</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 text-xs text-muted-foreground/60 md:flex">
                <FileText className="size-3.5" />
                mujaddid-ahmed-jami-resume.pdf
              </span>
              <motion.button
                type="button"
                onClick={handlePrint}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-700/25 transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                <Download className="size-3.5" />
                <span>Download PDF</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Resume Document */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="resume-canvas rounded-2xl border border-border bg-white p-6 text-slate-800 shadow-2xl shadow-black/10 transition-colors sm:p-8 dark:bg-slate-900 dark:text-slate-100 dark:shadow-black/40 md:p-12 print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none"
        >
          {/* Header */}
          <div className="flex flex-col gap-8 border-b-2 border-slate-200 pb-8 dark:border-slate-800 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-50">
                Mujaddid Ahmed Jami
              </h1>
              <p className="mt-1.5 text-sm font-semibold text-blue-700 resume-accent dark:text-blue-400">
                Full-Stack Web Developer
              </p>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Building responsive, maintainable full-stack web applications
                with a focus on clean interfaces, reliable APIs, and real
                product value.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 text-xs text-slate-600 sm:grid-cols-2 dark:text-slate-300">
              {CONTACT.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Icon className="size-3.5 shrink-0 text-slate-400 dark:text-slate-500" />
                    <span className="truncate">{item.value}</span>
                  </span>
                );
                return (
                  <div key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="transition-colors hover:text-blue-700 dark:hover:text-blue-400"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Executive Summary */}
          <section className="mt-8">
            <SectionTitle icon={FileText} title="Executive Summary" />
            <p className="mt-4 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
              Results-driven Full-Stack Web Developer skilled in{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-50">
                React, Next.js, Node.js, TypeScript, and PostgreSQL
              </span>
              . Experienced in building high-performance web applications,
              persistent background systems, and premium dark-themed UIs with{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-50">
                Tailwind CSS and shadcn/ui
              </span>
              . Led teams across the full lifecycle of production projects —
              from clean database modeling and REST APIs to polished, responsive
              front-ends.
            </p>
          </section>

          {/* Work Experience */}
          <section className="mt-9">
            <SectionTitle icon={Briefcase} title="Work Experience" />
            <div className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {EXPERIENCE.role}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {EXPERIENCE.organization} · {EXPERIENCE.location}
                  </p>
                </div>
                <span className="rounded-full bg-blue-600/10 px-3 py-1 text-[11px] font-medium text-blue-700 resume-accent dark:bg-blue-400/10 dark:text-blue-400">
                  {EXPERIENCE.period}
                </span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {EXPERIENCE.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mt-9">
            <SectionTitle icon={Code2} title="Technical Skills" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {SKILL_GROUPS.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.title}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60"
                  >
                    <div className="flex items-center gap-2 text-[13px] font-bold text-slate-900 dark:text-slate-100">
                      <Icon className="size-4 text-blue-600 resume-accent dark:text-blue-400" />
                      {group.title}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {group.items.split(":")[0]}:
                      </span>{" "}
                      <span className="block">{group.items.split(":")[1]}</span>
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {group.sub.split(":")[0]}:
                      </span>{" "}
                      <span className="block">{group.sub.split(":")[1]}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Education */}
          <section className="mt-9">
            <SectionTitle icon={GraduationCap} title="Education" />
            <div className="mt-4 space-y-3">
              {EDUCATION.map((item) => (
                <div
                  key={item.title}
                  className="flex w-full flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/60"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.school}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-600/10 px-3 py-1 text-[11px] font-medium text-blue-700 resume-accent dark:bg-blue-400/10 dark:text-blue-400">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Footer note */}
          <p className="mt-10 border-t border-slate-200 pt-4 text-center text-[11px] text-slate-400 dark:border-slate-800 dark:text-slate-500">
            References available upon request · Mujaddid Ahmed Jami · 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}
