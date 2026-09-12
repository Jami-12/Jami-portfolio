"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  ArrowUpRight,
  Target,
  Layers,
  Network,
  Sparkles,
  Check,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/lib/projects";

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 md:py-12">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="relative mb-12 overflow-hidden rounded-3xl border border-border/50 shadow-xl shadow-black/5"
        >
          <div className="relative aspect-[2.4/1] min-h-[240px] w-full overflow-hidden bg-muted sm:aspect-[3/1]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 72rem"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            <div
              className={`absolute inset-0 bg-gradient-to-tr opacity-50 ${project.accent}`}
            />
          </div>

          <div className="relative z-10 -mt-20 p-6 sm:-mt-28 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-white/80 backdrop-blur">
                {project.role}
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {project.title}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-neutral-900 shadow-md transition-colors hover:bg-white/90"
              >
                <Globe className="size-4" />
                <span>Live demo</span>
                <ArrowUpRight className="size-3.5 opacity-60" />
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <FaGithub className="size-4" />
                <span>View source</span>
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* Problem Statement */}
        {/* Problem Statement */}
        {project.problem && (
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <SectionHeading icon={Target} title="Problem Statement" />
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </motion.section>
        )}

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-12"
          >
            <SectionHeading icon={Layers} title="Key Features" />
            <ul className="mt-5 space-y-3">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Architecture */}
        {project.architecture && project.architecture.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <SectionHeading icon={Network} title="Architecture" />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {project.architecture.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-[10px] font-bold text-muted-foreground">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-16"
        >
          <SectionHeading icon={Sparkles} title="Tech Stack" />
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/70 bg-muted/50 px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-border hover:bg-muted/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Bottom Back */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-border/50 pt-8"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
}: {
  icon: typeof Target;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </span>
      <h2 className="text-lg font-bold tracking-tight text-foreground">
        {title}
      </h2>
    </div>
  );
}