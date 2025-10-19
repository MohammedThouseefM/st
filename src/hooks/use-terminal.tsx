"use client";

import { useState, useCallback } from 'react';
import { handleCommand } from '@/lib/command-handler.tsx';

export type HistoryItem = {
  id: number;
  command: string;
  output: React.ReactNode;
};

const welcomeMessage = (
  <div>
    <p>Hi, I&apos;m Mark Gatere, a Software & AI Engineer.</p>
    <p>Welcome to my interactive &apos;AI powered&apos; portfolio terminal!</p>
    <p>Type &apos;help&apos; to see available commands.</p>
  </div>
);

const initialHistory: HistoryItem[] = [
  { id: 0, command: 'welcome', output: welcomeMessage }
];

export const useTerminal = () => {
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [input, setInput] = useState('');

  const submitCommand = useCallback(() => {
    const trimmedInput = input.trim();
    if (trimmedInput.toLowerCase() === 'clear') {
      setHistory(initialHistory);
      setInput('');
      return;
    }

    const output = handleCommand(trimmedInput);

    const commandHistoryItem: HistoryItem = {
      id: history.length + 1,
      command: trimmedInput,
      output
    };
    
    setHistory(prev => [...prev, commandHistoryItem]);
    setInput('');
  }, [input, history]);

  return { history, input, setInput, submitCommand };
};
