"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Play, Pause, SkipForward, SkipBack, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "./AudioContext";

export default function FloatingPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    handleNext,
    handlePrev,
  } = useAudio();

  const pathname = usePathname();

  const isVisible = Boolean(currentTrack) && pathname !== "/";

  const progressPercent =
    currentTrack && duration ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {isVisible && currentTrack && (
        <motion.div
          key={currentTrack.id}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          role="region"
          aria-label="Now playing"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-border/60 bg-background/80 p-2 pl-3 shadow-2xl backdrop-blur-xl transition-colors hover:border-border print:hidden"
        >
          <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-muted">
            {currentTrack.cover ? (
              <Image
                src={currentTrack.cover}
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
            ) : (
              <Music className="size-4 text-muted-foreground" />
            )}
          </div>

          <div className="flex max-w-[120px] flex-col pr-1 sm:max-w-[150px]">
            <span className="truncate text-xs font-semibold text-foreground">
              {currentTrack.title}
            </span>
            <span className="truncate text-[10px] text-muted-foreground">
              {currentTrack.artist}
            </span>

            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-foreground transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous track"
              onClick={handlePrev}
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-90"
            >
              <SkipBack className="size-3.5" />
            </button>

            <button
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={togglePlay}
              className="flex size-8 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-all hover:opacity-90 active:scale-90"
            >
              {isPlaying ? (
                <Pause className="size-3.5 fill-current" />
              ) : (
                <Play className="ml-0.5 size-3.5 fill-current" />
              )}
            </button>

            <button
              type="button"
              aria-label="Next track"
              onClick={handleNext}
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-90"
            >
              <SkipForward className="size-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}