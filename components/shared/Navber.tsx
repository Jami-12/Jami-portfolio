"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Menu,
  X,
  Search,
  Command,
  Folder,
  Layers,
  BookOpen,
  Sparkles,
  Terminal,
} from "lucide-react";
import SearchDialog from "./SearchDialog";
import TerminalModal from "@/components/terminal/TerminalModal";

const navItems = [
  { name: "Home", href: "/", icon: Command },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Stacks", href: "/stacks", icon: Layers },
  { name: "Blogs", href: "/blogs", icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  // SearchDialog-এর onSelectItem হ্যান্ডলার (নাম গ্রহণ করে রুট চেঞ্জ করবে)
  const handleSelectItem = (name: string) => {
    setIsSearchOpen(false);
    const selectedItem = navItems.find((item) => item.name === name);
    if (selectedItem) {
      router.push(selectedItem.href);
    }
  };

  return (
    <header className="sticky top-5 z-50 mx-auto max-w-4xl px-4 transition-all duration-300 print:hidden">
      {/* Floating Glass Container */}
      <div className="flex items-center justify-between rounded-full border border-white/10 dark:border-white/10 bg-background/60 p-1.5 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]">
        {/* Left Side: Desktop Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1 pl-1"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center gap-2 px-4 py-1.5 text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-secondary/80 dark:bg-zinc-800/80 rounded-full -z-10 border border-border/50 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  className={`size-3.5 ${isActive ? "text-foreground" : "opacity-70"}`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile View Logo */}
        <div className="flex md:hidden items-center pl-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-bold text-xs tracking-wide text-foreground"
          >
            <Sparkles className="size-3.5 text-amber-500" />
            <span>PORTFOLIO</span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1.5">
          {/* Search Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground active:scale-95"
          >
            <Search className="size-3.5" />
            <span className="hidden sm:inline-block font-normal">
              Search...
            </span>
            <kbd className="hidden sm:inline-flex h-4 items-center rounded border border-border/60 bg-background/80 px-1.5 text-[9px] font-mono font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </button>

          {/* Terminal Shell Button */}
          <button
            type="button"
            onClick={() => setIsTerminalOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground hover:border-emerald-500/40 active:scale-95"
            aria-label="Open interactive terminal"
          >
            <Terminal className="size-3.5 text-emerald-500" />
            <span className="hidden sm:inline-block">&gt;_ Shell</span>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label="Toggle mobile menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="rounded-full p-2 border border-border/40 text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground md:hidden active:scale-90"
          >
            {isMobileMenuOpen ? (
              <X className="size-3.5" />
            ) : (
              <Menu className="size-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mt-2.5 rounded-3xl border border-border/50 bg-background/90 backdrop-blur-2xl p-3 md:hidden shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-foreground text-background font-semibold"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Shell Modal */}
      <TerminalModal
        open={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Search Dialog */}
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        items={navItems}
        onSelectItem={(name: string) => handleSelectItem(name)}
      />
    </header>
  );
}
