"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  Clock,
  ArrowUpRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
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
  },
];

const categories = ["All", "Next.js", "React", "UI/UX", "TypeScript"];

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

  return (
    <div className="min-h-screen bg-background px-4 py-12 text-foreground md:py-16">
      <div className="mx-auto max-w-3xl space-y-10">
        {/* Header Section */}
        <header className="flex items-center justify-between border-b border-border/60 pb-6">
          <div>
            <h1 className="flex items-center gap-2.5 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Blogs
              <Sparkles className="size-5 text-amber-500" />
            </h1>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm">
              Thoughts, tutorials, and insights on web development.
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
            <span className="text-foreground">Blogs</span>
          </div>
        </header>

        {/* Search & Category Filter */}
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border/70 bg-card/60 py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 md:text-sm"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-foreground text-background font-semibold shadow-sm"
                    : "border border-border/70 bg-card/60 text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post List */}
        <main className="space-y-4">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((post) => (
              <article
                key={post.id}
                className="group relative rounded-xl border border-border/70 bg-card/60 p-5 transition-all duration-200 hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/40 md:p-6"
              >
                <Link href={`/blogs/${post.slug}`} className="block space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md border border-border/70 bg-muted/40 px-2.5 py-0.5 font-medium text-foreground">
                        {post.category}
                      </span>
                      {post.featured && (
                        <span className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-medium text-amber-500">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary md:text-lg">
                      {post.title}
                    </h2>
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>

                  <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {post.description}
                  </p>
                </Link>
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-border py-12 text-center">
              <BookOpen className="mx-auto mb-2 size-8 text-muted-foreground/60" />
              <p className="text-sm text-muted-foreground">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}