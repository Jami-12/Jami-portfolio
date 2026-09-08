"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    id: 1,
    category: "SCHOOL MANAGEMENT PLATFORM",
    title: "School Management System",
    description:
      "A comprehensive school portal featuring automated attendance tracking, fee management, exam portals, and real-time notices.",
    role: "Team Leader & Full Stack Developer",
    image: "/school-system.jpg",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    caseStudyUrl: "#",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 2,
    category: "RESTAURANT SERVICE MANAGEMENT",
    title: "Digital Restaurant",
    description:
      "A multi-role platform for restaurant owners to manage digital services, subscriptions, designer assignments, content workflows, payments, and service delivery.",
    role: "Team Leader & Full Stack Developer",
    image: "/restaurant-app.jpg", // public ফোল্ডারের সঠিক ইমেজের ফাইল নেম দিন
    tags: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Clerk",
    ],
    caseStudyUrl: "#",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];

export default function ProjectsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center sm:text-left border-b border-border/40 pb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            <Sparkles className="size-3 text-amber-500" />
            <span>Portfolio Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Featured Projects
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl">
            A curated collection of production-ready web apps, enterprise
            solutions, and full-stack systems built with modern architectures.
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-16 sm:space-y-24">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:bg-muted/20 border border-transparent hover:border-border/50"
              >
                {/* Image Box with Glow Effect */}
                <div
                  className={`w-full lg:w-1/2 overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-lg relative ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-foreground/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div
                  className={`w-full lg:w-1/2 flex flex-col justify-center ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/80">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground/60">
                      0{index + 1}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground mt-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Role Badge */}
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1 text-[11px] font-medium text-foreground shadow-2xs">
                      <Layers className="size-3 text-primary" />
                      {project.role}
                    </span>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-border/40 bg-muted/30 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex items-center gap-3 pt-2">
                    <a
                      href={project.caseStudyUrl}
                      className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-transform active:scale-95 shadow-sm hover:opacity-90"
                    >
                      <span>Case study</span>
                      <ArrowUpRight className="size-3.5" />
                    </a>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all hover:bg-muted active:scale-95 shadow-2xs"
                    >
                      <span>Live site</span>
                      <ArrowUpRight className="size-3.5" />
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Repository"
                      className="rounded-full border border-border/80 bg-background p-2 text-foreground transition-all hover:bg-muted active:scale-90"
                    >
                      <FaGithub className="size-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA / View GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center rounded-3xl border border-border/40 bg-muted/20 p-8 backdrop-blur-md"
        >
          <h3 className="text-base font-bold text-foreground">
            Want to see more code?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Explore open-source contributions, experiments, and minor repos
            directly on GitHub.
          </p>
          <div className="mt-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground px-5 py-2.5 text-xs font-semibold text-background transition-all hover:opacity-90 active:scale-95 shadow-md"
            >
              <FaGithub className="size-4" />
              <span>Explore GitHub profile</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
