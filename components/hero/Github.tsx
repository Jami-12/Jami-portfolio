"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Terminal, ArrowUpRight, Activity } from "lucide-react";

interface GithubActivityProps {
  username?: string;
  isOnline?: boolean;
}

// GitHub Event interface for strict TypeScript checking
interface GithubEvent {
  type: string;
  created_at: string;
}

export default function GithubActivity({
  username = "Jami-12",
  isOnline = true,
}: GithubActivityProps) {
  const [userData, setUserData] = useState<{
    avatarUrl: string;
  } | null>(null);

  const [lastWorkedTime, setLastWorkedTime] =
    useState<string>("Calculating...");
  const [loading, setLoading] = useState(true);

  // Dynamic Time Difference Calculator
  const calculateTimeAgo = (eventDateStr: string) => {
    const lastDate = new Date(eventDateStr).getTime();
    const now = new Date().getTime();
    const diffInSeconds = Math.floor((now - lastDate) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) {
      const remainingSeconds = diffInSeconds % 60;
      return `${minutes}m ${remainingSeconds}s ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m ago`;
    }

    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h ago`;
  };

  useEffect(() => {
    async function fetchGithubData() {
      try {
        setLoading(true);

        // 1. GitHub User Profile Fetching
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("User not found");
        const userJson = await userRes.json();

        setUserData({
          avatarUrl: userJson.avatar_url || "",
        });

        // 2. Dynamic Last Worked Time Calculation
        try {
          const eventsRes = await fetch(
            `https://api.github.com/users/${username}/events?per_page=10`,
          );
          if (eventsRes.ok) {
            const eventsJson: GithubEvent[] = await eventsRes.json();
            const pushEvent = eventsJson.find(
              (event) =>
                event.type === "PushEvent" || event.type === "CreateEvent",
            );

            if (pushEvent && pushEvent.created_at) {
              setLastWorkedTime(calculateTimeAgo(pushEvent.created_at));
            } else if (eventsJson.length > 0 && eventsJson[0].created_at) {
              setLastWorkedTime(calculateTimeAgo(eventsJson[0].created_at));
            } else {
              setLastWorkedTime("Recently");
            }
          } else {
            setLastWorkedTime("Recently");
          }
        } catch (eventError) {
          console.warn("Error fetching recent events:", eventError);
          setLastWorkedTime("Recently");
        }
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchGithubData();
    }
  }, [username]);

  return (
    <section className="mx-auto mt-14 max-w-4xl px-4 sm:px-6">
      {/* Dynamic Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/50 pb-6">
        <div className="flex items-center gap-3.5">
          {userData?.avatarUrl ? (
            <div className="relative size-11 overflow-hidden rounded-full border border-border/80 shadow-sm shrink-0">
              <Image
                src={userData.avatarUrl}
                alt={username}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="size-11 animate-pulse rounded-full bg-muted border border-border/50" />
          )}
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="size-3 text-amber-500" />
              <span>Developer Metrics</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              GitHub Contributions
            </h2>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-2.5 text-xs font-medium">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-foreground shadow-2xs backdrop-blur-md">
            <span
              className={`size-2 rounded-full ${
                isOnline
                  ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                  : "bg-muted-foreground/50"
              }`}
            />
            {isOnline ? "Active Now" : "Offline"}
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-muted-foreground shadow-2xs backdrop-blur-md">
            <Terminal className="size-3.5 text-primary" />
            <span>Last push:</span>
            <strong className="text-foreground font-semibold">
              {loading ? "..." : lastWorkedTime}
            </strong>
          </span>
        </div>
      </div>

      {/* Activity Heatmap Card */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-5 shadow-lg backdrop-blur-md transition-all sm:p-6 hover:border-border">
        <div className="flex items-center justify-between pb-4 text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-2 text-foreground">
            <Activity className="size-4 text-primary" />
            Contribution Matrix
          </span>
          <span className="font-mono text-[11px] text-muted-foreground/80">
            @{username}
          </span>
        </div>

        {/* Dynamic Theme Heatmap Chart */}
        <div className="mt-1 flex justify-center overflow-x-auto pb-2 scrollbar-none">
          <img
            src={`https://ghchart.rshah.org/2563eb/${username}`}
            alt={`${username}'s Github Activity Graph`}
            className="w-full min-w-[650px] block dark:hidden"
          />
          <img
            src={`https://ghchart.rshah.org/38bdf8/${username}`}
            alt={`${username}'s Github Activity Graph`}
            className="w-full min-w-[650px] hidden dark:block filter contrast-125 brightness-110"
          />
        </div>

        {/* Footer Info & External Link */}
        <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
          <span className="text-[11px]">
            Real-time commits synced via GitHub API
          </span>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary transition-colors"
          >
            <span>View Profile</span>
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
