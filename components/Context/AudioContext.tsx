"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string;
}

interface AudioContextType {
  tracks: Track[];
  currentIndex: number | null;
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  showPlaylist: boolean;
  togglePlay: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleMute: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPlaylist: React.Dispatch<React.SetStateAction<boolean>>;
  formatTime: (time: number) => string;
  playTrackByIndex: (index: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({
  children,
  tracks,
}: {
  children: React.ReactNode;
  tracks: Track[];
}) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const volumeRef = useRef(volume);
  const isMutedRef = useRef(isMuted);

  const currentTrack = useMemo(
    () => (currentIndex !== null ? tracks[currentIndex] ?? null : null),
    [currentIndex, tracks]
  );
  const currentAudioUrl = currentTrack?.audioUrl;

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (tracks.length === 0) return;
      setCurrentIndex((prev) => (prev === null ? 0 : (prev + 1) % tracks.length));
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, [tracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentAudioUrl) return;

    audio.src = currentAudioUrl;
    audio.volume = isMutedRef.current ? 0 : volumeRef.current;
    setCurrentTime(0);
    setDuration(0);

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.error("Audio playback error:", err);
        setIsPlaying(false);
      });
  }, [currentAudioUrl]);

  const playTrackByIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= tracks.length) return;

      if (index === currentIndex) {
        const audio = audioRef.current;
        if (audio) {
          void audio.play().catch((err) => console.error("Audio play error:", err));
        }
        return;
      }

      setCurrentIndex(index);
    },
    [currentIndex, tracks.length]
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentIndex === null) {
      if (tracks.length === 0) return;
      setCurrentIndex(0);
      return;
    }

    if (audio.paused) {
      void audio.play().catch((err) => console.error("Audio play error:", err));
    } else {
      audio.pause();
    }
  }, [currentIndex, tracks.length]);

  const handleNext = useCallback(() => {
    if (tracks.length === 0) return;
    setCurrentIndex((prev) => (prev === null ? 0 : (prev + 1) % tracks.length));
  }, [tracks.length]);

  const handlePrev = useCallback(() => {
    if (tracks.length === 0) return;
    setCurrentIndex((prev) =>
      prev === null ? 0 : (prev - 1 + tracks.length) % tracks.length
    );
  }, [tracks.length]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = parseFloat(e.target.value);
      setVolume(next);
      setIsMuted(next === 0);
      if (audioRef.current) audioRef.current.volume = next;
    },
    []
  );

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      const restored = volume || 0.8;
      setVolume(restored);
      setIsMuted(false);
      audio.volume = restored;
    } else {
      setIsMuted(true);
      audio.volume = 0;
    }
  }, [isMuted, volume]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) audioRef.current.currentTime = seekTime;
  }, []);

  const formatTime = useCallback((time: number) => {
    if (isNaN(time) || !isFinite(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }, []);

  return (
    <AudioContext.Provider
      value={{
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
        setCurrentIndex,
        setIsPlaying,
        setShowPlaylist,
        formatTime,
        playTrackByIndex,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}