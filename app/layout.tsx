import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navber";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AudioProvider, Track } from "@/components/Context/AudioContext";
import FloatingPlayer from "@/components/Context/FloatingPlayer";
import CustomCursor from "@/components/cursor/CustomCursor";
import AiAssistant from "@/components/assistant/AiAssistant";

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

const playlistTracks: Track[] = [
  { id: 7, title: "Alfaz", artist: "Hamza Malik", cover: "/song cover/alfaz.jpeg", audioUrl: "/songs/song7.mpeg" },
  { id: 2, title: "Har Baar", artist: "Murtaza Qizilbash", cover: "/song cover/haar baar.jpeg", audioUrl: "/songs/song2.mpeg" },
  { id: 3, title: "Hoor", artist: "Samar Jafri", cover: "/song cover/hoor.jpeg", audioUrl: "/songs/song3.mpeg" },
  { id: 4, title: "Sadi Sun", artist: "Harsh Nussi", cover: "/song cover/sadi sun.jpeg", audioUrl: "/songs/song4.mpeg" },
  { id: 5, title: "Khasara", artist: "Abdul Hannan", cover: "/song cover/khasar.jpeg", audioUrl: "/songs/song5.mpeg" },
  { id: 6, title: "Bairan", artist: "Banjaare", cover: "/song cover/pic.jpeg", audioUrl: "/songs/song6.mpeg" },
  { id: 8, title: "Waalian", artist: "Harnoor", cover: "/song cover/wallian.jpeg", audioUrl: "/songs/song8.mpeg" },
  { id: 9, title: "Hum", artist: "Murtaza Qizilbash", cover: "/song cover/hum.jpeg", audioUrl: "/songs/song9.mpeg" },
  { id: 10, title: "Barsaat", artist: "Banjaare", cover: "/song cover/bairhan.jpeg", audioUrl: "/songs/song10.mpeg" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground transition-colors duration-300 relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AudioProvider tracks={playlistTracks}>
            <Navbar />
            {children}
            <Footer />
            <FloatingPlayer />
            <AiAssistant />
            <CustomCursor />
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}