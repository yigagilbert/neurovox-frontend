import React, { useEffect, useState } from "react";

interface TimerProps {
  active: boolean;
}

export function Timer({ active }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: number | null = null;

    if (active) {
      setSeconds(0);
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [active]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  if (!active && seconds === 0) return null;

  return (
    <div className={`badge rounded-pill ${active ? 'bg-danger' : 'bg-secondary'} px-3 py-2 fs-6`}>
      {active ? (
        <><span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span> Recording</>
      ) : 'Recording Length'}: {formatTime(seconds)}
    </div>
  );
}