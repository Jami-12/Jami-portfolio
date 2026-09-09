"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Download,
  Code2,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Terminal,
  Layers,
  Server,
} from "lucide-react";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header / Actions Bar */}
        <div className="flex justify-between items-center print:hidden">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Interactive Resume
            </h1>
            <p className="text-sm text-muted-foreground">
              Mujaddid Ahmed Jami — Full-Stack Developer
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-foreground text-background hover:opacity-90 transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download / Print PDF
          </button>
        </div>

        {/* Resume Card Container */}
        <div className="bg-card text-card-foreground border border-border/60 rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden backdrop-blur-sm print:shadow-none print:border-none print:p-0">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 print:hidden" />

          {/* 1. Header Section */}
          <header className="border-b border-border/60 pb-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground uppercase">
                  Mujaddid Ahmed Jami
                </h1>
                <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mt-1">
                  Full-Stack Web Developer
                </p>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-foreground/70 shrink-0" />
                  <span>Moulvibazar, Bangladesh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-foreground/70 shrink-0" />
                  <a
                    href="tel:+8801703768306"
                    className="hover:text-foreground transition-colors"
                  >
                    +880 1703-768306
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-foreground/70 shrink-0" />
                  <a
                    href="mailto:mujaddidahmedjami2025@gmail.com"
                    className="hover:text-foreground transition-colors"
                  >
                    mujaddidahmedjami2025@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social / Portfolio Links (SVG Embedded for zero pnpm build errors) */}
            <div className="flex flex-wrap gap-3 mt-6 print:mt-4">
              <Link
                href="https://github.com/Jami-12"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/60 border border-border/50 hover:bg-muted transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </Link>

              <Link
                href="https://www.linkedin.com/in/mujaddid-ahmed-jami-ab1491386/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BHFw3y0BoQoGxdqOB3uVDNg%3D%3Dhttps://www.linkedin.com/in/mujaddid-ahmed-jami-ab1491386/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BHFw3y0BoQoGxdqOB3uVDNg%3D%3D"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/60 border border-border/50 hover:bg-muted transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/60 border border-border/50 hover:bg-muted transition-colors"
              >
                <Globe className="w-3.5 h-3.5" /> Portfolio
              </Link>
            </div>
          </header>

          {/* 2. Professional Summary */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-500" /> Professional
              Summary
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Results-driven Full-Stack Web Developer skilled in{" "}
              <strong className="text-foreground font-semibold">
                React, Next.js, Node.js, TypeScript, and PostgreSQL
              </strong>
              . Experienced in building high-performance web applications,
              persistent background systems, and responsive dark-themed UIs with{" "}
              <strong className="text-foreground font-semibold">
                Tailwind CSS and shadcn/ui
              </strong>
              .
            </p>
          </section>

          {/* 3. Technical Skills */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-500" /> Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm mb-2">
                  <Layers className="w-4 h-4 text-blue-500" /> Languages &
                  Frontend
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
                  <span className="font-medium text-foreground">
                    Languages:
                  </span>{" "}
                  TypeScript, JavaScript (ES6+), HTML5, CSS3
                  <br />
                  <span className="font-medium text-foreground">
                    Frontend:
                  </span>{" "}
                  React.js, Next.js (App Router), Tailwind CSS, Redux Toolkit,
                  Framer Motion
                </p>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm mb-2">
                  <Server className="w-4 h-4 text-purple-500" /> Backend, DB &
                  Tools
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
                  <span className="font-medium text-foreground">
                    Backend & DB:
                  </span>{" "}
                  Node.js, Express.js, REST APIs, JWT, OAuth, MongoDB,
                  PostgreSQL, Redis
                  <br />
                  <span className="font-medium text-foreground">
                    Tools & DevOps:
                  </span>{" "}
                  Git, GitHub Actions, Postman, Vercel, VS Code
                </p>
              </div>
            </div>
          </section>

          {/* 4. Technical & Community Activities */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-500" /> Technical &
              Community Activities
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Open Source & Independent Development
                </h3>
                <p className="text-xs text-muted-foreground">
                  Moulvibazar, Bangladesh
                </p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Built and maintained open-source web templates and
                    full-stack utilities on GitHub.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Active contributor to web development communities, focusing
                    on Next.js 16 performance and UI optimizations.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* 5. Education */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-orange-500" /> Education
            </h2>
            <div className="space-y-3">
              <div className="p-3 sm:p-4 rounded-xl border border-border/40 bg-muted/20 flex justify-between items-center">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">
                    HSC (Higher Secondary Certificate)
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Moulvibazar Govt College
                  </p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  Inter First Year (Present)
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-xl border border-border/40 bg-muted/20 flex justify-between items-center">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">
                    SSC (Secondary School Certificate)
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Moulvibazar Govt High School, Moulvibazar
                  </p>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  Completed
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
