"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Projects Data
const projects = [
  {
    id: 1,
    category: "SCHOOL MANAGEMENT PLATFORM",
    title: "School Management System",
    description:
      "A comprehensive school portal featuring automated attendance tracking, fee management, exam portals, and real-time notices.",
    role: "Team Leader & Full Stack Developer",
    image: "/project1.jpg",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    caseStudyUrl: "#",
    liveUrl: "https://example.com",
  },
  {
    id: 2,
    category: "RESTAURANT SERVICE MANAGEMENT",
    title: "Digital Restaurant",
    description:
      "A multi-role platform for restaurant owners to manage digital services, subscriptions, designer assignments, content workflows, payments, and service delivery.",
    role: "Team Leader & Full Stack Developer",
    image: "/project2.jpg",
    tags: ["Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Clerk"],
    caseStudyUrl: "#",
    liveUrl: "https://example.com",
  },
];

export default function Project() {
  return (
    <section id="project" className="mx-auto max-w-4xl px-4 py-12">
      {/* Section Header */}
      <div className="mb-10">
        <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
          SELECTED
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-0.5">
          Projects
        </h2>
      </div>

      {/* Projects List */}
      <div className="space-y-16 sm:space-y-20">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={project.id}
              className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10"
            >
              {/* Image Box */}
              <div
                className={`w-full lg:w-1/2 overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-md ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div
                className={`w-full lg:w-1/2 flex flex-col justify-center ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                  {project.category}
                </span>

                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mt-1">
                  {project.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* Role Badge */}
                <div className="mt-4">
                  <span className="inline-block rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[11px] font-medium text-foreground">
                    {project.role}
                  </span>
                </div>

                {/* Tech Stack Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={project.caseStudyUrl}
                    className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-transform active:scale-95"
                  >
                    <span>Case study</span>
                    <ArrowUpRight className="size-3" />
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted active:scale-95"
                  >
                    <span>Live site</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Projects Button */}
      <div className="mt-16 text-center">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <span>View all projects</span>
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </section>
  );
}