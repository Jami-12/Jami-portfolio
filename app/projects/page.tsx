"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Terminal,
  FolderGit2,
  Globe,
  ArrowRight,
  Command,
  CheckCircle2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects, type Project } from "@/lib/projects";

function CodeTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-[#2C4561]/20 border border-[#2C4561]/50 px-2 py-0.5 font-mono text-[11px] text-sky-300">
      {children}
    </span>
  );
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "featured">("all");

  const displayedProjects =
    activeTab === "featured"
      ? projects.filter((p) => p.layout === "tall" || p.layout === "row")
      : projects;

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground md:py-16">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        
        {/* Minimalist Terminal Header */}
        <header className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-sky-400">
                <Terminal className="size-4" />
                <span>~/portfolio/projects</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                Source Repositories & Systems
              </h1>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1 rounded-xl border border-border/70 bg-muted/50 p-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "all"
                    ? "bg-[#2C4561] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Works ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab("featured")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "featured"
                    ? "bg-[#2C4561] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Featured
              </button>
            </div>
          </div>
        </header>

        {/* Minimal Stacked Project Rows */}
        <section className="space-y-4">
          {displayedProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-5 transition-all hover:border-[#2C4561] hover:bg-card/80 sm:p-6"
            >
              <div className="grid gap-6 md:grid-cols-12 md:items-center">
                
                {/* Image Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/60 md:col-span-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#2C4561]/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                {/* Content Details */}
                <div className="flex flex-col justify-between space-y-4 md:col-span-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400">
                        {project.role}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground/50">
                        0{index + 1}
                      </span>
                    </div>

                    <Link href={`/projects/${project.id}`}>
                      <h2 className="text-lg font-bold text-foreground transition-colors group-hover:text-sky-400 sm:text-xl">
                        {project.title}
                      </h2>
                    </Link>

                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <CodeTag key={tag}>{tag}</CodeTag>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between border-t border-border/40 pt-3">
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors hover:text-sky-400"
                    >
                      <span>Read Documentation</span>
                      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-all hover:bg-foreground/90 active:scale-95"
                      >
                        <Globe className="size-3.5" />
                        <span>Live Preview</span>
                      </a>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:text-foreground active:scale-95"
                        >
                          <FaGithub className="size-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </motion.article>
          ))}
        </section>

        {/* Console Bottom Banner */}
        <footer className="rounded-2xl border border-border/70 bg-card/30 p-6 font-mono backdrop-blur-md">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-foreground sm:justify-start">
                <Command className="size-4 text-sky-400" />
                <span>GITHUB_ARCHIVE</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Looking for open-source repositories and utility tools?
              </p>
            </div>

            <a
              href="https://github.com/Jami-12"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2C4561] px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-[#2C4561]/80 active:scale-95"
            >
              <FaGithub className="size-4" />
              <span>@Jami-12</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </footer>

      </div>
    </main>
  );
}