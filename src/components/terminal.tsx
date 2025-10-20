
"use client";

import { useEffect, useRef } from 'react';
import { useTerminal } from '@/hooks/use-terminal.tsx';
import type { HistoryItem } from '@/hooks/use-terminal.tsx';
import { TypewriterOutput } from './typewriter-output';

const Prompt = ({ command }: { command?: string }) => (
  <div className="flex items-center">
    <span className="text-blue-400">thouseef@portfolio:~$</span>
    {command !== undefined && <span className="text-green-400 ml-2">{command}</span>}
  </div>
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
  
  return (
    <div 
      className="h-full w-full bg-background p-4 font-code text-base flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-grow overflow-y-auto pr-2 mt-4 text-white">
        {history.map((item: HistoryItem, index) => (
          <div key={item.id} className="mb-2">
            <Prompt command={item.command} />
            <div className="text-white">
                {/* We only want to animate the last item in the history */}
                {index === history.length - 1 ? (
                  <TypewriterOutput>{item.output}</TypewriterOutput>
                ) : (
                  item.output
                )}
            </div>
          </div>
        ))}
        <div className="flex items-center pt-2">
            <span className="text-blue-400">thouseef@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-green-400 ml-2"
              autoFocus
            />
        </div>
      </div>
    </div>
  );
}
