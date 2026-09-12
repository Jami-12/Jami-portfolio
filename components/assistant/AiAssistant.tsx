"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Send, X, RotateCcw } from "lucide-react";
import {
  QUICK_QUESTIONS,
  QUICK_NAV_ACTIONS,
  ASSISTANT_NAME,
  GREETING_TEXT,
  getAssistantReply,
  resolveNavigation,
  type AssistantMessage,
  type NavigationIntent,
  type QuickNavChip,
} from "./assistantBrain";

const NAV_DELAY_MS = 300;

const NAV_ROUTE_REPLIES: Record<string, string> = {
  "/projects": "Navigating you to the Projects page now... 🚀",
  "/resume": "Opening the Resume page now... 🚀",
  "/#contact": "Opening the Contact section now... 🚀",
  "/blogs": "Navigating you to the Blogs page now... 🚀",
  "/": "Heading back to the Home page now... 🚀",
};

function chipReply(route: string): string {
  return NAV_ROUTE_REPLIES[route] ?? "Navigating you there now... 🚀";
}

function RichText({ text, onAccent = false }: { text: string; onAccent?: boolean }) {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <p key={index} className="whitespace-pre-wrap text-[11px] leading-relaxed">
          {line.split(/(https?:\/\/\S+)/g).map((part, i) =>
            /^https?:\/\//.test(part) ? (
              <a
                key={i}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  onAccent
                    ? "font-medium text-white underline decoration-white/60 underline-offset-2 transition-colors duration-300 ease-in-out hover:text-white/90"
                    : "font-medium text-sky-600 underline decoration-sky-500/50 underline-offset-2 transition-colors duration-300 ease-in-out hover:text-sky-500 dark:text-sky-400"
                }
              >
                {part}
              </a>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      ))}
    </>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-end gap-2"
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-500">
        <Bot className="size-3.5" />
      </span>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border/50 bg-muted/80 px-3 py-2.5 transition-colors duration-300 ease-in-out">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-muted-foreground"
            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function randomReplyDelay(): number {
  return 900 + Math.random() * 700;
}

export default function AiAssistant() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [navPending, setNavPending] = useState(false);
  const [launcherHovered, setLauncherHovered] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const greetingSent = useRef(false);
  const navTimerRef = useRef<number | null>(null);

  const stackedAbovePlayer = pathname !== "/";

  useEffect(() => {
    if (!open || greetingSent.current) return;
    greetingSent.current = true;
    setTyping(true);

    const timer = window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `greet-${Date.now()}`,
          role: "assistant",
          text: GREETING_TEXT,
        },
      ]);
      setTyping(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, open]);

  useEffect(() => {
    return () => {
      if (navTimerRef.current !== null) {
        window.clearTimeout(navTimerRef.current);
      }
    };
  }, []);

  const handleNavigation = (intent: NavigationIntent) => {
    if (!intent.route) return;

    if (intent.route === "/#contact") {
      if (pathname === "/") {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push("/#contact");
      }
      return;
    }

    router.push(intent.route);
  };

  const scheduleNavigation = (intent: NavigationIntent) => {
    if (!intent.route || navTimerRef.current !== null) return;
    navTimerRef.current = window.setTimeout(() => {
      handleNavigation(intent);
      navTimerRef.current = null;
      setNavPending(false);
    }, NAV_DELAY_MS);
    setNavPending(true);
  };

  const send = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || typing) return;

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", text: value },
    ]);
    setInput("");
    setTyping(true);

    const navigation = resolveNavigation(value);
    const reply = navigation ? navigation.confirm : getAssistantReply(value);

    const delay =
      navigation && navigation.route ? 150 : randomReplyDelay();

    window.setTimeout(
      () => {
        setMessages((prev) => [
          ...prev,
          { id: `reply-${Date.now()}`, role: "assistant", text: reply },
        ]);
        setTyping(false);

        if (navigation && navigation.route) {
          scheduleNavigation(navigation);
        }
      },
      delay
    );
  };

  const handleQuickNav = (chip: QuickNavChip) => {
    if (navTimerRef.current !== null) return;

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", text: chip.label },
      {
        id: `nav-${Date.now()}`,
        role: "assistant",
        text: chipReply(chip.route),
      },
    ]);

    scheduleNavigation({ id: chip.id, route: chip.route, confirm: chipReply(chip.route) });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send();
  };

  const resetChat = () => {
    if (navTimerRef.current !== null) {
      window.clearTimeout(navTimerRef.current);
      navTimerRef.current = null;
    }
    setMessages([]);
    setTyping(false);
    setNavPending(false);
    greetingSent.current = false;
  };

  const canSend = input.trim().length > 0 && !typing;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6 print:hidden"
      style={stackedAbovePlayer ? { bottom: 96 } : undefined}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${ASSISTANT_NAME} chat assistant`}
            className="flex h-[500px] max-h-[85vh] w-[360px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/95 text-foreground shadow-2xl shadow-black/15 backdrop-blur-md transition-colors duration-300 ease-in-out sm:w-[400px] dark:bg-slate-900/95"
          >
            <div className="flex items-center justify-between border-b border-border/50 bg-muted/40 px-4 py-3 transition-colors duration-300 ease-in-out">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="size-10 overflow-hidden rounded-full border border-border/60">
                    <Image
                      src="/avatar.png"
                      alt="Assistant avatar"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex size-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
                    <span className="relative inline-flex size-3 rounded-full border-2 border-card bg-sky-500" />
                  </span>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors duration-300 ease-in-out">
                    {ASSISTANT_NAME}
                    <Sparkles className="size-3 text-amber-500" />
                  </p>
                  <p className="flex items-center gap-1.5 text-[10px] font-medium text-sky-600 transition-colors duration-300 ease-in-out dark:text-sky-400">
                    <span className="size-1.5 rounded-full bg-sky-500" />
                    Online
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={resetChat}
                aria-label="Clear conversation"
                className="rounded-full p-2 text-muted-foreground transition-colors duration-300 ease-in-out hover:bg-muted hover:text-foreground active:scale-90"
              >
                <RotateCcw className="size-3.5" />
              </button>
            </div>

            <div className="flex gap-1.5 border-b border-border/50 bg-muted/20 px-3 py-2.5 transition-colors duration-300 ease-in-out">
              {QUICK_NAV_ACTIONS.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  disabled={typing || navPending}
                  onClick={() => handleQuickNav(chip)}
                  className="inline-flex items-center gap-1 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 text-[11px] font-semibold text-sky-700 transition-colors duration-300 ease-in-out hover:border-sky-500/60 hover:bg-sky-500/15 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-sky-400 dark:hover:text-sky-300"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <div
              ref={scrollRef}
              className="thin-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((message) =>
                message.role === "assistant" ? (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="flex items-end justify-start gap-2"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-500">
                      <Bot className="size-3.5" />
                    </span>
                    <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-border/50 bg-muted/80 px-3 py-2 text-foreground shadow-sm transition-colors duration-300 ease-in-out">
                      <RichText text={message.text} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="flex items-end justify-end"
                  >
                    <div className="max-w-[80%] rounded-2xl rounded-br-md bg-sky-500 px-3 py-2 font-medium text-white shadow-sm transition-colors duration-300 ease-in-out">
                      <RichText text={message.text} onAccent />
                    </div>
                  </motion.div>
                )
              )}

              <AnimatePresence>{typing && <TypingIndicator />}</AnimatePresence>
            </div>

            <div className="border-t border-border/50 bg-muted/30 px-3 py-2.5 transition-colors duration-300 ease-in-out">
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    key={question.id}
                    type="button"
                    disabled={typing}
                    onClick={() => send(question.query)}
                    className="rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[10px] font-medium text-muted-foreground transition-colors duration-300 ease-in-out hover:border-sky-500/50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {question.label}
                  </button>
                ))}
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-2.5 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask me anything..."
                  aria-label="Ask the assistant"
                  className="h-9 flex-1 rounded-xl border border-border/70 bg-muted/50 px-3 text-xs text-foreground outline-none transition-colors duration-300 ease-in-out placeholder:text-muted-foreground focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  aria-label="Send message"
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow-md shadow-sky-500/25 transition-all duration-300 ease-in-out hover:brightness-110 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {launcherHovered && !open && (
            <motion.span
              key="tooltip"
              initial={{ opacity: 0, y: 4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute -top-9 right-0 z-50 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg dark:bg-white dark:text-slate-900"
            >
              AI Assistant
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          title={open ? "Close AI assistant" : "AI Assistant"}
          onMouseEnter={() => setLauncherHovered(true)}
          onMouseLeave={() => setLauncherHovered(false)}
          onClick={() => {
            setLauncherHovered(false);
            setOpen((prev) => !prev);
          }}
          aria-label="Toggle AI Assistant"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 520, damping: 32 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/25 transition-colors duration-300 ease-in-out hover:bg-sky-600 md:h-14 md:w-14"
        >
          {!open && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-sky-400/25"
              animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0.15, 0.7] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <span className="relative z-10 flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="icon-close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex"
                >
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="icon-sparkle"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex"
                >
                  <Sparkles className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>

          <span className="absolute -right-0.5 -top-0.5 z-10 flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex size-3 rounded-full border-2 border-card bg-emerald-500" />
          </span>
        </motion.button>
      </div>
    </div>
  );
}