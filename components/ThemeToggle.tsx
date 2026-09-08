"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const THEME_CLASSES = ["light", "dark"];

const emptySubscribe = () => () => {};

function applyThemeClass(theme: string) {
  document.documentElement.classList.remove(...THEME_CLASSES);
  document.documentElement.classList.add(theme);
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = resolvedTheme === "dark";

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      applyThemeClass(nextTheme);
      setTheme(nextTheme);
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        applyThemeClass(nextTheme);
      });
  };

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="flex items-center justify-center rounded-full border border-border/40 p-2 text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground active:scale-90"
    >
      {isHydrated && isDark ? (
        <Sun className="size-3.5 text-amber-400 transition-transform" />
      ) : isHydrated && !isDark ? (
        <Moon className="size-3.5 text-slate-700 transition-transform" />
      ) : (
        <span className="size-3.5" />
      )}
    </button>
  );
}