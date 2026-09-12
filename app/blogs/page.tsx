"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Clock,
  ArrowUpRight,
  BookOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
  icon: React.ReactNode;
  coverClass: string;
  glow: string;
}

const blogsData: BlogPost[] = [
  {
    id: "1",
    slug: "building-scalable-nextjs-apps",
    title: "Building Scalable Web Applications with Next.js 15 & App Router",
    description:
      "A comprehensive guide on structuring Next.js projects for performance, smooth audio persistence, and optimized route caching.",
    date: "Sep 02, 2026",
    readTime: "6 min read",
    category: "Next.js",
    featured: true,
    icon: <SiNextdotjs className="size-7 text-white" />,
    coverClass: "from-zinc-900 via-zinc-800 to-zinc-950",
    glow: "hover:border-zinc-400/40",
  },
  {
    id: "2",
    slug: "state-management-react-audio-players",
    title: "Global State Management for Persistent Audio Players in React",
    description:
      "How to design an uninterrupted audio context in Next.js that retains playback state during client-side route transitions.",
    date: "Aug 24, 2026",
    readTime: "4 min read",
    category: "React",
    icon: <SiReact className="size-7 text-[#61DAFB]" />,
    coverClass: "from-cyan-900 via-cyan-950 to-slate-950",
    glow: "hover:border-cyan-400/40",
  },
  {
    id: "3",
    slug: "mastering-tailwind-dark-mode",
    title: "Designing Sophisticated Dark Interfaces with Tailwind CSS",
    description:
      "Best practices for choosing background tones, subtle borders, and color contrasts to build high-end dark mode aesthetics.",
    date: "Aug 10, 2026",
    readTime: "5 min read",
    category: "UI/UX",
    icon: <SiTailwindcss className="size-7 text-[#06B6D4]" />,
    coverClass: "from-teal-900 via-cyan-950 to-slate-950",
    glow: "hover:border-teal-400/40",
  },
  {
    id: "4",
    slug: "typescript-best-practices-2026",
    title: "TypeScript Patterns Every Full-Stack Developer Should Know",
    description:
      "Explore advanced generic types, utility patterns, and type guards to make your codebase cleaner and less prone to runtime bugs.",
    date: "Jul 28, 2026",
    readTime: "8 min read",
    category: "TypeScript",
    icon: <SiTypescript className="size-7 text-[#3178C6]" />,
    coverClass: "from-blue-900 via-indigo-950 to-slate-950",
    glow: "hover:border-blue-400/40",
  },
];

const categories = ["All", "Next.js", "React", "UI/UX", "TypeScript"];

function CoverArt({ post, className = "" }: { post: BlogPost; className?: string }) {
  return (
    <div
      className={`relative flex min-h-[180px] items-center justify-center overflow-hidden bg-gradient-to-br ${post.coverClass} ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:26px_26px] opacity-[0.05]" />
      <div className="absolute -bottom-6 hidden select-none font-mono text-[96px] font-bold leading-none text-white/5 lg:block">
        {"</>"}
      </div>
      <div className="relative flex size-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        {post.icon}
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 26 },
  },
};

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = blogsData.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredBlogs.find((post) => post.featured) ?? null;
  const gridPosts = filteredBlogs.filter((post) => post.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-background py-12 text-foreground md:py-16">
      <div className="mx-auto w-full max-w-4xl space-y-10 px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="flex items-center gap-2.5 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Blogs
              <Sparkles className="size-5 text-amber-500" />
            </h1>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm">
              Thoughts, tutorials, and engineering notes on web development.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span>&rsaquo;</span>
            <span className="text-foreground">Blogs</span>
          </div>
        </motion.header>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-border/70 bg-card/60 py-3 pl-11 pr-4 text-xs text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 md:text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200 ${
                    active
                      ? "text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="blogs-filter-pill"
                      className="absolute inset-0 rounded-full bg-foreground shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Featured Hero Post */}
        <AnimatePresence>
          {featuredPost && (
            <motion.article
              key={featuredPost.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 shadow-xl shadow-black/5 backdrop-blur-xl"
            >
              <div className="grid lg:grid-cols-2">
                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                      <Sparkles className="size-3" />
                      Featured
                    </span>
                    <span className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      {featuredPost.category}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-extrabold leading-snug tracking-tight text-foreground sm:text-2xl lg:text-[26px]">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {featuredPost.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-primary" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-primary" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <Link
                    href={`/blogs/${featuredPost.slug}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                  >
                    <BookOpen className="size-3.5" />
                    <span>Read article</span>
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <CoverArt
                  post={featuredPost}
                  className="min-h-[220px] lg:min-h-full"
                />
              </div>
            </motion.article>
          )}
        </AnimatePresence>

        {/* Post Grid */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-5 sm:grid-cols-2"
        >
          {gridPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              layout
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/50 shadow-md shadow-black/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${post.glow}`}
            >
              <div className="relative overflow-hidden">
                <CoverArt post={post} className="aspect-[16/9] min-h-0" />
              </div>
              <div className="relative z-10 flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blogs/${post.slug}`} className="mt-3 block">
                  <h3 className="text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                </Link>

                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {post.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {post.category}
                  </span>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    Read more
                    <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.main>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-dashed border-border py-16 text-center"
          >
            <BookOpen className="mx-auto mb-3 size-10 text-muted-foreground/50" />
            <p className="text-sm font-medium text-foreground">
              No articles found
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a different keyword or category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}