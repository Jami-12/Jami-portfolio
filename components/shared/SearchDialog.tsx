"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LucideIcon, ArrowRight, CornerDownLeft } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  items: NavItem[];
  onSelectItem: (name: string) => void;
}

export default function SearchDialog({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  items,
  onSelectItem,
}: SearchDialogProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-16 sm:pt-24">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity"
          />

          {/* Dialog Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", duration: 0.25, bounce: 0.05 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border/60 bg-card/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Search Input Header */}
            <div className="relative flex items-center border-b border-border/50 px-4 py-3">
              <Search className="mr-3 size-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search menu or jump to section..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-6 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
                autoFocus
              />
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                ESC
              </button>
            </div>

            {/* Content Body */}
            <div className="max-h-[320px] overflow-y-auto p-2">
              <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80">
                Navigation Options
              </div>

              {filteredItems.length > 0 ? (
                <div className="space-y-1">
                  {filteredItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => {
                          onSelectItem(item.name);
                          onClose();
                          setSearchQuery("");
                        }}
                        className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/40 transition-colors group-hover:border-primary/20 group-hover:bg-primary/10">
                            <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                          </div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <ArrowRight className="size-4 opacity-0 transition-all -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    No matching navigation links found.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/60">
                    Try searching for terms like "Projects" or "Stacks".
                  </p>
                </div>
              )}
            </div>

            {/* Footer Quick Info */}
            <div className="flex items-center justify-between border-t border-border/50 bg-muted/20 px-4 py-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                Press <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] border border-border/60">↵</kbd> to select
              </span>
              <span className="flex items-center gap-1">
                Quick Command Dialog
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}