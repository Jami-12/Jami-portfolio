"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type LineKind = "cmd" | "out" | "err" | "dim";

interface Line {
  id: number;
  kind: LineKind;
  text: string;
}

interface TerminalModalProps {
  open: boolean;
  onClose: () => void;
}

let lineSequence = 0;
const makeLine = (kind: LineKind, text: string): Line => ({
  id: lineSequence++,
  kind,
  text,
});

const COMMAND_LIST = [
  { name: "help", desc: "Show available commands" },
  { name: "skills", desc: "Technologies and tools" },
  { name: "projects", desc: "Featured projects" },
  { name: "about", desc: "About Mujaddid" },
  { name: "contact", desc: "Contact & availability" },
  { name: "social", desc: "GitHub & LinkedIn links" },
  { name: "resume", desc: "Path to the resume" },
  { name: "whoami", desc: "Print current user" },
  { name: "ls", desc: "List portfolio sections" },
  { name: "pwd", desc: "Print working directory" },
  { name: "date", desc: "Current date & time" },
  { name: "echo", desc: "Print a message" },
  { name: "clear", desc: "Clear the terminal" },
];

function bootLines(): Line[] {
  return [
    makeLine("dim", "mujaddid@portfolio: ~"),
    makeLine("out", "Welcome to the interactive portfolio shell."),
    makeLine("out", "Type 'help' to see all available commands."),
  ];
}

function runCommand(raw: string): Line[] {
  const parts = raw.trim().split(/\s+/);
  const command = parts[0]?.toLowerCase() ?? "";
  const args = parts.slice(1);

  switch (command) {
    case "help":
      return [
        makeLine("dim", "Available commands:"),
        ...COMMAND_LIST.map((item) =>
          makeLine("out", `  ${item.name.padEnd(10)} ${item.desc}`)
        ),
      ];

    case "skills":
      return [
        makeLine("dim", "Languages:  TypeScript, JavaScript, HTML, CSS"),
        makeLine(
          "out",
          "Frontend:   React, Next.js, Tailwind CSS, Redux Toolkit, shadcn/ui"
        ),
        makeLine("out", "Backend:    Node.js, Express.js, REST APIs"),
        makeLine("out", "Data:       MongoDB, PostgreSQL, Redis"),
        makeLine("out", "Auth:       JWT, OAuth, Clerk"),
        makeLine("dim", "DevOps:     Git, GitHub Actions, Linux, Cloudflare, Vercel"),
        makeLine("out", "Tools:      Postman"),
      ];

    case "projects":
      return [
        makeLine("out", "[1] School Management System"),
        makeLine(
          "dim",
          "    Next.js · Node.js · MongoDB · https://sms-client-gules.vercel.app"
        ),
        makeLine("out", "[2] Gear UP (Gym / Fitness platform)"),
        makeLine(
          "dim",
          "    Next.js · Express · PostgreSQL · Clerk · https://gearupfrontend.vercel.app"
        ),
        makeLine("out", "[3] Nestora (House / Rental marketplace)"),
        makeLine(
          "dim",
          "    Next.js · Express · PostgreSQL · Clerk · https://nestoraclient.vercel.app"
        ),
      ];

    case "about":
      return [
        makeLine("out", "Mujaddid Ahmed Jami — Full Stack Developer"),
        makeLine("dim", "Sylhet, Bangladesh"),
        makeLine("out", "Builds responsive full-stack web apps with clean"),
        makeLine("out", "interfaces, reliable APIs, and maintainable systems."),
      ];

    case "contact":
      return [
        makeLine("out", "Email:    mujaddidahmedjami2025@gmail.com"),
        makeLine("out", "GitHub:   https://github.com/Jami-12"),
        makeLine(
          "out",
          "LinkedIn: https://www.linkedin.com/in/mujaddid-ahmed-jami-ab1491386/"
        ),
        makeLine("dim", "Usually replies within 24 hours."),
      ];

    case "social":
      return [
        makeLine("out", "GitHub:   https://github.com/Jami-12"),
        makeLine(
          "out",
          "LinkedIn: https://www.linkedin.com/in/mujaddid-ahmed-jami-ab1491386/"
        ),
      ];

    case "resume":
      return [
        makeLine("out", "Resume is served at /resume"),
        makeLine("dim", "Tip: use the Resume button in the navbar to open it."),
      ];

    case "whoami":
      return [
        makeLine("out", "uid=1000(guest) gid=100(users) groups=100(users)"),
        makeLine("dim", "session: mujaddid@portfolio — interactive shell"),
      ];

    case "ls":
      return [
        makeLine(
          "out",
          "home/  projects/  stacks/  blogs/  resume/  contact/"
        ),
      ];

    case "pwd":
      return [makeLine("out", "/home/mujaddid/portfolio")];

    case "date": {
      const now = new Date();
      return [
        makeLine("out", `${now.toDateString()} · ${now.toLocaleTimeString()}`),
      ];
    }

    case "echo":
      return args.length ? [makeLine("out", args.join(" "))] : [];

    case "theme":
      return [
        makeLine("err", "theme: command not found"),
        makeLine("dim", "But hey — dark mode is on and it looks great."),
      ];

    default:
      return [
        makeLine("err", `zsh: command not found: ${command}`),
        makeLine("dim", "Type 'help' to see available commands."),
      ];
  }
}

function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(/(https?:\/\/\S+)/g).map((part, index) =>
        /^https?:\/\//.test(part) ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 underline decoration-sky-500/40 underline-offset-2 transition-colors hover:bg-sky-400/10"
          >
            {part}
          </a>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

export default function TerminalModal({ open, onClose }: TerminalModalProps) {
  const [lines, setLines] = useState<Line[]>(() => bootLines());
  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<string[]>([]);
  const navIndex = useRef(-1);

  useEffect(() => {
    if (!open) return;
    const resetFrame = window.requestAnimationFrame(() => {
      setLines(bootLines());
      setInput("");
    });
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      window.cancelAnimationFrame(resetFrame);
      window.clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (historyRef.current.length === 0) return;
      navIndex.current = Math.min(
        navIndex.current + 1,
        historyRef.current.length - 1
      );
      setInput(
        historyRef.current[historyRef.current.length - 1 - navIndex.current]
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (navIndex.current <= 0) {
        navIndex.current = -1;
        setInput("");
        return;
      }
      navIndex.current -= 1;
      setInput(
        historyRef.current[historyRef.current.length - 1 - navIndex.current]
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = input;
    navIndex.current = -1;
    if (!raw.trim()) return;
    setInput("");

    if (raw.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    historyRef.current = [...historyRef.current, raw.trim()];
    setLines((prev) => [
      ...prev,
      makeLine("cmd", raw.trim()),
      ...runCommand(raw),
    ]);
  };

  const lineClass: Record<LineKind, string> = {
    cmd: "text-zinc-100",
    out: "text-zinc-300",
    err: "text-rose-400",
    dim: "text-zinc-500",
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[10vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -16 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Interactive developer terminal"
            className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] font-mono text-[13px] text-zinc-100 shadow-2xl shadow-black/50"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
              <span className="size-3 rounded-full bg-[#ff5f56]" />
              <span className="size-3 rounded-full bg-[#ffbd2e]" />
              <span className="size-3 rounded-full bg-[#27c93f]" />
              <p className="ml-3 flex-1 truncate text-center text-xs text-zinc-400">
                mujaddid@portfolio: ~
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close terminal"
                className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-200"
              >
                <X className="size-4" />
              </button>
            </div>

            <div
              ref={outputRef}
              aria-live="polite"
              className="thin-scroll h-[min(28rem,calc(100vh-16rem))] overflow-y-auto px-4 py-3 text-[12.5px] leading-6"
            >
              {lines.map((line) => (
                <div key={line.id} className={lineClass[line.kind]}>
                  {line.kind === "cmd" ? (
                    <span className="whitespace-pre-wrap break-words">
                      <span className="font-semibold text-emerald-400">
                        &gt;{" "}
                      </span>
                      <Linkified text={line.text} />
                    </span>
                  ) : (
                    <span className="whitespace-pre-wrap break-words">
                      <Linkified text={line.text} />
                    </span>
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-1.5 border-t border-white/10 bg-white/[0.02] px-4 py-3"
            >
              <span className="shrink-0 text-zinc-400">
                <span className="text-emerald-400">guest</span>
                <span className="text-zinc-600">@</span>
                <span className="text-sky-400">portfolio</span>
                <span className="text-zinc-600">:</span>
                <span className="text-sky-400">~</span>
                <span className="text-zinc-400">$</span>
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal command input"
                className="h-6 min-w-0 flex-1 bg-transparent text-zinc-100 caret-emerald-400 outline-none placeholder:text-zinc-600"
                placeholder="type 'help'..."
              />
              <span className="terminal-caret h-4 text-emerald-400" />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}