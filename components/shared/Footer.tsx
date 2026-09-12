import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Jami-12",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mujaddid-ahmed-jami-ab1491386/",
    icon: FaLinkedin,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com",
    icon: FaXTwitter,
  },
  {
    name: "Email",
    href: "mailto:mujaddidahmedjami2025@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-4xl px-4 pb-24 pt-16 md:pb-28 print:hidden">
      <div className="flex flex-col items-center justify-between gap-5 border-t border-border/40 pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>&copy; 2026 Mujaddid Ahmed Jami. All rights reserved.</p>

        <div className="flex items-center gap-2">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            const isExternal = link.href.startsWith("http");

            return (
              <Link
                key={link.name}
                href={link.href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={link.name}
                className="flex size-8 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-all hover:border-border hover:bg-muted/50 hover:text-foreground active:scale-90"
              >
                <Icon className="size-3.5" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}