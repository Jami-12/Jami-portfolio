"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  ListMusic,
  Music,
} from "lucide-react";
import { useAudio } from "@/components/Context/AudioContext";

export default function Playlist() {
  const {
    tracks,
    currentIndex,
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    showPlaylist,
    togglePlay,
    handleNext,
    handlePrev,
    handleVolumeChange,
    toggleMute,
    handleSeek,
    setShowPlaylist,
    formatTime,
    playTrackByIndex,
  } = useAudio();

  return (
    <section className="mx-auto max-w-4xl px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-4 sm:p-5 shadow-xl backdrop-blur-md"
      >
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-foreground/10 text-foreground">
              <Music className="size-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                CULTURES
              </p>
              <h3 className="text-sm leading-none font-bold text-foreground sm:text-base">
                Music Playlist
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPlaylist((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-xl border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95"
          >
            <ListMusic className="size-3.5" />
            <span>{showPlaylist ? "Hide Queue" : "Show Queue"}</span>
          </button>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-muted shadow-sm sm:size-14">
              {currentTrack ? (
                <Image
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <Music className="size-5 text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0">
              {currentTrack ? (
                <>
                  <h4 className="truncate text-sm font-bold text-foreground sm:text-base">
                    {currentTrack.title}
                  </h4>
                  <p className="truncate text-xs text-muted-foreground">
                    {currentTrack.artist}
                  </p>
                </>
              ) : (
                <>
                  <h4 className="truncate text-sm font-bold text-foreground sm:text-base">
                    Nothing playing yet
                  </h4>
                  <p className="truncate text-xs text-muted-foreground">
                    Pick a track from the queue below to start listening
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-5">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                aria-label="Previous track"
                onClick={handlePrev}
                className="p-1.5 text-muted-foreground transition-colors hover:text-foreground active:scale-90"
              >
                <SkipBack className="size-4 sm:size-5" />
              </button>

              <button
                type="button"
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={togglePlay}
                className="flex size-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-md transition-transform active:scale-90 sm:size-11"
              >
                {isPlaying ? (
                  <Pause className="size-4 fill-current sm:size-5" />
                ) : (
                  <Play className="ml-0.5 size-4 fill-current sm:size-5" />
                )}
              </button>

              <button
                type="button"
                aria-label="Next track"
                onClick={handleNext}
                className="p-1.5 text-muted-foreground transition-colors hover:text-foreground active:scale-90"
              >
                <SkipForward className="size-4 sm:size-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 border-l border-border/50 pl-3 sm:pl-5">
              <button
                type="button"
                aria-label={isMuted ? "Unmute" : "Mute"}
                onClick={toggleMute}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="size-4" />
                ) : (
                  <Volume2 className="size-4" />
                )}
              </button>

              <input
                type="range"
                aria-label="Volume"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="h-1.5 w-16 cursor-pointer rounded-lg bg-muted accent-foreground sm:w-20"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2.5 font-mono text-[10px] text-muted-foreground sm:text-xs">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            aria-label="Seek"
            min="0"
            max={duration || 0}
            step="0.05"
            value={Math.min(currentTime, duration || currentTime)}
            onChange={handleSeek}
            className="h-1.5 w-full cursor-pointer rounded-lg bg-muted accent-foreground"
          />
          <span>{formatTime(duration)}</span>
        </div>

        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 max-h-52 space-y-1 overflow-y-auto border-t border-border/40 pr-1 pt-3">
                {tracks.map((song, index) => {
                  const isSelected = index === currentIndex;
                  const isSelectedPlaying = isSelected && isPlaying;

                  return (
                    <div
                      key={song.id}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onClick={() => playTrackByIndex(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          playTrackByIndex(index);
                        }
                      }}
                      className={`flex cursor-pointer items-center justify-between rounded-xl p-2 transition-all sm:p-2.5 ${
                        isSelected
                          ? "bg-muted/80 font-semibold text-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-2.5 pr-2">
                        <span className="w-4 shrink-0 text-center font-mono text-xs">
                          {index + 1}
                        </span>
                        <div className="relative size-7 shrink-0 overflow-hidden rounded-lg border border-border/40">
                          <Image
                            src={song.cover}
                            alt={song.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="truncate text-xs">
                          <span className="truncate font-medium">
                            {song.title}
                          </span>
                          <span className="ml-1.5 truncate text-[11px] opacity-60">
                            — {song.artist}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="flex shrink-0 items-center gap-1">
                          {isSelectedPlaying ? (
                            <>
                              <span className="flex h-3 items-end gap-0.5">
                                <span className="h-full w-0.5 animate-pulse bg-emerald-500" />
                                <span className="h-2/3 w-0.5 animate-pulse bg-emerald-500 delay-75" />
                                <span className="h-4/5 w-0.5 animate-pulse bg-emerald-500 delay-150" />
                              </span>
                              <span className="ml-1 text-[10px] font-bold text-emerald-500 uppercase">
                                Playing
                              </span>
                            </>
                          ) : (
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">
                              Paused
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}