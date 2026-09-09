"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";

const techStack = [
  {
    name: "TypeScript",
    icon: "TS",
    color: "text-blue-500",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "React",
    icon: "⚛",
    color: "text-cyan-400",
    url: "https://react.dev/",
  },
  {
    name: "Next.js",
    icon: "N",
    color: "text-foreground font-bold",
    url: "https://nextjs.org/",
  },
  {
    name: "Node.js",
    icon: "JS",
    color: "text-green-500",
    url: "https://nodejs.org/",
  },
  {
    name: "PostgreSQL",
    icon: "🐘",
    color: "text-sky-500",
    url: "https://www.postgresql.org/",
  },
];

export default function HeroBanner() {
  return (
    <section className="mx-auto max-w-4xl px-4 mt-6 pt-2">
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xl"
      >
        <div className="relative h-52 sm:h-58 w-full bg-muted overflow-hidden">
          <video
            src="/white.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Profile Content Section */}
        <div className="relative px-6 pb-6 pt-0">
          {/* Avatar & Action Button Row */}
          <div className="flex items-end justify-between gap-3 -mt-16 sm:-mt-20 mb-5">
            <div className="relative size-32 sm:size-40 rounded-full border-4 border-card bg-card shadow-lg overflow-hidden shrink-0">
              <Image
                src="/avatar.png"
                alt="Mujaddid Ahmed Jami"
                fill
                className="object-cover"
                priority
              />
            </div>

            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-xs sm:text-sm font-medium text-background transition-transform active:scale-95 shadow-sm"
            >
              <Send className="size-3.5" />
              <span>Get in touch</span>
            </Link>
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Mujaddid Ahmed Jami
            </h1>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">
              Full Stack Developer
            </p>
          </div>

          {/* Tech Stack Links & Social Icons */}
          <div className="mt-5">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-3">
              I build full-stack web applications using
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {techStack.map((tech) => (
                  <a
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-muted active:scale-95"
                  >
                    <span className={`font-bold ${tech.color}`}>
                      {tech.icon}
                    </span>
                    <span>{tech.name}</span>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 text-muted-foreground">
                <Link
                  href="https://github.com/Jami-12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                  aria-label="GitHub"
                >
                  <svg className="size-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/mujaddid-ahmed-jami-ab1491386/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BHFw3y0BoQoGxdqOB3uVDNg%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <svg className="size-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
                <Link
                  href="mujaddidahmedjami2025@gmail.com"
                  className="transition-colors hover:text-foreground"
                  aria-label="Email"
                >
                  <Mail className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bio Description */}
          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            I build responsive full-stack web applications with a focus on
            practical product problems, clean interfaces, reliable APIs, and
            maintainable systems. I learn by building, experimenting, and
            solving real problems—then improving the solution through each
            challenge.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
