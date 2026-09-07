import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navber";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Mujaddid Ahmed Jami | Full Stack Developer",
  description: "Personal portfolio and project showcase of Mujaddid Ahmed Jami.",
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}