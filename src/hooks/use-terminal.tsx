"use client";

import { useState, useCallback } from 'react';
import { handleCommand } from '@/lib/command-handler';

export type HistoryItem = {
  id: number;
  command?: string;
  output: React.ReactNode;
};

const welcomeMessage = (
  <div>
    <p>Welcome to Thouseef's interactive portfolio.</p>
    <p>Type 'help' for a list of commands.</p>
  </div>
);

export const useTerminal = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 0, output: welcomeMessage }
  ]);
  const [input, setInput] = useState('');

  const submitCommand = useCallback(() => {
    const trimmedInput = input.trim();
    if (trimmedInput.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const output = handleCommand(trimmedInput);

    const commandHistoryItem: HistoryItem = {
      id: history.length + 1,
      command: input,
      output
    };
    
    setHistory(prev => [...prev, commandHistoryItem]);
    setInput('');
  }, [input, history]);

  return { history, input, setInput, submitCommand };
};
