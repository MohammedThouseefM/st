"use client";

import { useEffect, useRef } from 'react';
import { useTerminal } from '@/hooks/use-terminal.tsx';
import type { HistoryItem } from '@/hooks/use-terminal.tsx';

const Prompt = () => (
  <span className="text-primary">gatere@portfolio:~$ </span>
);

export function Terminal() {
  const { history, input, setInput, submitCommand } = useTerminal();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitCommand();
    }
  };
  
  const commands = [
    'help', 'about', 'projects', 'skills', 'experience', 'contact', 'education', 'certifications', 'leadership', 'sudo'
  ];

  return (
    <div 
      className="h-full w-full bg-background p-4 font-code text-base text-foreground overflow-hidden flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
        <div className="flex-none">
            <p className="flex flex-wrap items-center">
                <span className="text-primary">{commands.join(' | ')}</span>
                <span className="text-primary mx-2">|</span>
                <span className="text-primary">clear</span>
            </p>
        </div>
      <div ref={scrollRef} className="flex-grow overflow-y-auto pr-2 mt-4">
        {history.map((item: HistoryItem) => (
          <div key={item.id} className="mb-2">
            {item.command !== undefined && (
              <div className="flex items-center">
                <Prompt />
                <span>{item.command}</span>
              </div>
            )}
            <div className="text-accent">{item.output}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center pt-2 mt-auto">
        <Prompt />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-foreground"
          autoFocus
        />
      </div>
    </div>
  );
}
