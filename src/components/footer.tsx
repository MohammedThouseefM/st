"use client";
import { useState, useEffect } from 'react';

const Prompt = () => (
  <span className="text-green-400 text-xs sm:text-base whitespace-nowrap">gatere@portfolio:~$ </span>
);

export function Footer() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 w-full p-4 border-t-2 border-primary flex justify-between items-center bg-background text-green-400">
      <Prompt />
      <span className="text-green-400 text-xs sm:text-base whitespace-nowrap">{currentTime}</span>
    </footer>
  );
}
