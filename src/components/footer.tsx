"use client";
import { useState, useEffect } from 'react';

const Prompt = () => (
  <span className="text-green-400 text-xs sm:text-base whitespace-nowrap">thouseef@portfolio:~$ </span>
);

const commands = [
  'help', 'about', 'projects', 'skills', 'experience', 'contact', 'education', 'certifications', 'leadership', 'sudo', 'clear'
];

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
    <footer className="fixed bottom-0 left-0 right-0 z-10 w-full p-4 border-t-2 border-primary flex flex-col md:flex-row justify-between items-center bg-background text-green-400 gap-4">
      <div className="flex-none w-full md:w-auto flex justify-between items-center">
          <Prompt />
          <span className="md:hidden text-green-400 text-xs sm:text-base whitespace-nowrap">{currentTime}</span>
      </div>

      <div className="flex-grow text-center md:text-left">
          <p className="text-green-400 flex flex-wrap items-center justify-center md:justify-start gap-x-2 text-xs sm:text-sm">
              {commands.map((cmd, i) => <span key={cmd}>{cmd}{i < commands.length - 1 ? <span className="text-primary mx-1">|</span> : ''}</span>)}
          </p>
      </div>
      
      <span className="hidden md:block text-green-400 text-xs sm:text-base whitespace-nowrap">{currentTime}</span>
    </footer>
  );
}
