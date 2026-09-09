"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12 text-foreground md:py-16">
      <div className="mx-auto max-w-3xl space-y-10">
        {/* Header Section */}
        <header className="flex items-center justify-between border-b border-border/60 pb-6">
          <div>
            <h1 className="flex items-center gap-2.5 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Contact
              <MessageSquare className="size-5 text-amber-500" />
            </h1>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm">
              Let&apos;s work together on your next project.
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
            <span className="text-foreground">Contact</span>
          </div>
        </header>

        {/* Contact Form */}
        <main>
          <ContactSection />
        </main>
      </div>
    </div>
  );
}
