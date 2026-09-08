import HeroBanner from "@/components/hero/HeroBanner";
import Playlist from "@/components/playlist/Playlist";
import ProjectsPage from "./projects/page";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen space-y-8 pb-20">
      <HeroBanner />
      <Playlist />
      <ProjectsPage />
      <ContactSection />
    </main>
  );
}