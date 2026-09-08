"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

interface FormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}

const initialForm: FormInputs = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export default function ContactSection() {
  const [form, setForm] = useState<FormInputs>(initialForm);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ kind: "loading" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await res.json();

      if (res.ok && payload.ok) {
        setStatus({
          kind: "success",
          message: "Your message has been sent. I'll get back to you soon!",
        });
        setForm(initialForm);
      } else if (payload.errors?.length) {
        setStatus({ kind: "error", message: payload.errors.join(" ") });
      } else {
        setStatus({
          kind: "error",
          message: payload.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "mujaddidahmedjami2025@gmail.com",
      href: "mailto:mujaddidahmedjami2025@gmail.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Sylhet, Bangladesh",
    },
    {
      icon: MessageSquare,
      label: "Response",
      value: "Usually within 24 hours",
    },
  ];

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        {/* Section Heading */}
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            <MessageSquare className="size-3" />
            Contact
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Get in Touch
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-muted-foreground sm:text-sm">
            Have a project in mind, a collaboration in the works, or just want
            to say hello? Fill out the form below and I&apos;ll reply as soon
            as I can.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-border/50 bg-card/60 p-5 shadow-xl backdrop-blur-md">
              <h3 className="text-sm font-bold text-foreground">
                Direct Contact
              </h3>

              <ul className="mt-5 space-y-4">
                {contactDetails.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/50 text-muted-foreground">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="truncate text-sm font-semibold text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex items-center gap-3 transition-colors hover:text-primary"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-3xl border border-border/50 bg-card/60 p-5 shadow-xl backdrop-blur-md">
              <h3 className="text-sm font-bold text-foreground">Social Links</h3>

              <div className="mt-4 flex gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-muted/40 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground active:scale-95"
                >
                  <FaGithub className="size-4" />                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-muted/40 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground active:scale-95"
                >
                  <FaLinkedin className="size-4" />
                </a>
                <a
                  href="mailto:mujaddidahmedjami2025@gmail.com"
                  aria-label="Email"
                  className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-muted/40 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground active:scale-95"
                >
                  <Mail className="size-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-border/50 bg-card/60 p-5 shadow-xl backdrop-blur-md sm:p-6 lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-muted-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border/70 bg-background/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border/70 bg-background/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border/70 bg-background/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-y rounded-xl border border-border/70 bg-background/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Honeypot field (hidden from humans, bots will fill it) */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={handleChange}
                className="hidden"
                aria-hidden="true"
              />

              {status.kind === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 className="size-4 shrink-0" />
                  {status.message}
                </motion.p>
              )}

              {status.kind === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive"
                >
                  <AlertCircle className="size-4 shrink-0" />
                  {status.message}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={status.kind === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status.kind === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}