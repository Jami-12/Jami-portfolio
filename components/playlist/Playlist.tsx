"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  ListMusic,
} from "lucide-react";

// Types
interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string;
}

// Playlist Tracks Configuration
const playlistTracks: Track[] = [
  {
    id: 7,
    title: "Alfaz",
    artist: "Hamza_Malik__Zain_Zohaib",
    cover: "/song cover/alfaz.jpeg",
    audioUrl: "/songs/song7.mpeg",
  },
  {
    id: 2,
    title: "Har_Baar",
    artist: "Murtaza_Qizilbash__Samar_Jafri",
    cover: "/song cover/haar baar.jpeg",
    audioUrl: "/songs/song2.mpeg",
  },
  {
    id: 3,
    title: "Hoor",
    artist: "Samar_Jafri",
    cover: "/song cover/hoor.jpeg",
    audioUrl: "/songs/song3.mpeg",
  },
  {
    id: 4,
    title: "Sadi_Sun",
    artist: "Harsh_Nussi",
    cover: "/song cover/sadi sun.jpeg",
    audioUrl: "/songs/song4.mpeg",
  },
  {
    id: 5,
    title: "Khasara",
    artist: "Abdul_Hannan__Samar_Jafri",
    cover: "/song cover/khasar.jpeg",
    audioUrl: "/songs/song5.mpeg",
  },
  {
    id: 6,
    title: "Bairan",
    artist: "Banjaare",
    cover: "/song cover/pic.jpeg",
    audioUrl: "/songs/song6.mpeg",
  },

  {
    id: 8,
    title: "Waalian",
    artist: "Harnoor",
    cover: "/song cover/wallian.jpeg",
    audioUrl: "/songs/song8.mpeg",
  },
  {
    id: 9,
    title: "Hum",
    artist: "Murtaza_Qizilbash",
    cover: "/song cover/hum.jpeg",
    audioUrl: "/songs/song9.mpeg",
  },
  {
    id: 10,
    title: "Barsaat",
    artist: "Banjaare",
    cover: "/song cover/bairhan.jpeg",
    audioUrl: "/songs/song10.mpeg",
  },
];

export default function CustomPlaylist() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = playlistTracks[currentIndex];

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Next Track
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlistTracks.length);
    setIsPlaying(true);
  };

  // Previous Track
  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + playlistTracks.length) % playlistTracks.length,
    );
    setIsPlaying(true);
  };

  // Auto-play when changing song
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  // Volume Control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  // Format Time (MM:SS)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* HTML5 Audio Player */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={handleNext}
      />

      {/* Header Section */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            CULTURES
          </span>
          <h3 className="text-xl font-bold text-foreground">Playlist</h3>
        </div>

        {/* Playlist Toggle Icon Button */}
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className={`p-2 rounded-lg transition-colors ${
            showPlaylist
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title="Show Playlist"
        >
          <ListMusic className="size-5" />
        </button>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-border/70 bg-card/80 p-4 backdrop-blur-md shadow-xl transition-all">
        <div className="flex items-center justify-between gap-4">
          {/* Song Cover & Info */}
          <div className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-zinc-800 border border-border/50">
              <Image
                src={currentTrack.cover}
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-foreground truncate">
                {currentTrack.title}
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Controls & Volume */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Playback Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <SkipBack className="size-4" />
              </button>

              <button
                onClick={togglePlay}
                className="flex size-9 items-center justify-center rounded-full bg-foreground text-background transition-transform active:scale-90"
              >
                {isPlaying ? (
                  <Pause className="size-4 fill-current" />
                ) : (
                  <Play className="size-4 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <SkipForward className="size-4" />
              </button>
            </div>

            {/* Volume Controls */}
            <div className="hidden sm:flex items-center gap-2 border-l border-border/60 pl-3">
              <button
                onClick={toggleMute}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="size-4" />
                ) : (
                  <Volume2 className="size-4" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="h-1 w-16 cursor-pointer accent-foreground bg-zinc-800 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Progress Bar & Dynamic Time Track */}
        <div className="mt-4 flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="h-1 w-full cursor-pointer accent-foreground bg-zinc-800 rounded-lg"
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Collapsible Playlist Songs List */}
        {showPlaylist && (
          <div className="mt-4 pt-3 border-t border-border/60 space-y-1 max-h-48 overflow-y-auto">
            {playlistTracks.map((song, index) => (
              <div
                key={song.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPlaying(true);
                }}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  index === currentIndex
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono">{index + 1}.</span>
                  <span className="text-xs truncate">
                    {song.title} -{" "}
                    <span className="opacity-70">{song.artist}</span>
                  </span>
                </div>
                {index === currentIndex && (
                  <span className="text-[10px] font-mono text-emerald-500 uppercase">
                    Playing
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
