"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Moon,
  Sun,
  X,
  Search,
  FileText,
  Command,
  Folder,
  Layers,
  BookOpen,
} from "lucide-react";
import SearchDialog from "./SearchDialog";

const navItems = [
  { name: "Home", href: "/", icon: Command },
  { name: "Project", href: "#project", icon: Folder },
  { name: "Stacks", href: "#stacks", icon: Layers },
  { name: "Blogs", href: "#blogs", icon: BookOpen },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-4 z-40 mx-auto max-w-4xl px-4 transition-all">
      <div className="flex items-center justify-between rounded-full border border-border/60 bg-background/80 p-1.5 backdrop-blur-xl shadow-md">
        
        {/* Left Side: Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1 pl-1">
          {navItems.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveItem(item.name)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-muted/80 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Left Side (Mobile View Placeholder/Logo) */}
        <div className="flex md:hidden items-center pl-3">
          <Link href="/" className="font-bold text-xs tracking-tight text-foreground">
            Portfolio
          </Link>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Search Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <Search className="size-3.5" />
            <span className="hidden sm:inline-block">Search...</span>
            <kbd className="hidden sm:inline-flex h-4 items-center rounded border bg-background px-1 text-[10px] font-mono text-muted-foreground">
              ⌘K
            </kbd>
          </button>

          {/* Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1 text-xs font-semibold text-background transition-transform active:scale-95 hover:opacity-90 shadow-sm"
          >
            <FileText className="size-3.5" />
            <span>Resume</span>
          </a>

          {/* Theme Toggle Button */}
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full p-1.5 border border-border/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="size-3.5 text-amber-400" />
            ) : (
              <Moon className="size-3.5 text-slate-700" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label="Toggle mobile menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="rounded-full p-1.5 border border-border/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden active:scale-95"
          >
            {isMobileMenuOpen ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl p-3 md:hidden shadow-xl"
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeItem === item.name;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setActiveItem(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-3.5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors sm:hidden"
              >
                <FileText className="size-3.5 text-primary" />
                <span>Resume</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Dialog */}
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        items={navItems}
        onSelectItem={setActiveItem}
      />
    </header>
  );
}