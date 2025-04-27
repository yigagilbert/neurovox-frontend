import React from "react";
import { useEffect, useState } from "react";

export const Timer = ({ active, maxSeconds = 60 }: { active: boolean; maxSeconds?: number }) => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (seconds >= maxSeconds) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1_000);
    return () => clearInterval(id);
  }, [active, seconds, maxSeconds]);
  useEffect(() => {
    if (!active) setSeconds(0);
  }, [active]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return (
    <span className={`font-mono text-lg ${active ? "text-red-600 animate-pulse" : "text-gray-600"}`}>{mm}:{ss}</span>
  );
};