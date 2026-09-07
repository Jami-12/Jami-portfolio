import HeroBanner from "@/components/hero/HeroBanner";
import Playlist from "@/components/playlist/Playlist";
import Project from "@/components/project/Project";

export default function Home() {
  return (
    <main className="min-h-screen space-y-8 pb-20">
      <HeroBanner />
      <Project />
      <Playlist />
    </main>
  );
}