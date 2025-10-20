
"use client";

import React, { useState, useEffect, useMemo } from 'react';

// A simple function to recursively extract text from React nodes.
const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string') {
    return node;
  }
  if (React.isValidElement(node) && node.props.children) {
    return React.Children.toArray(node.props.children).map(child => extractText(child)).join('');
  }
  if (Array.isArray(node)) {
    return node.map(child => extractText(child)).join('');
  }
  return '';
};


// A component to display a React node with a typewriter effect.
export const TypewriterOutput = ({ children }: { children: React.ReactNode }) => {
  const originalText = useMemo(() => extractText(children), [children]);
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let i = 0;
    setDisplayedText(''); // Reset on new children
    setIsAnimating(true);
    const interval = setInterval(() => {
      if (i < originalText.length) {
        setDisplayedText(prev => prev + originalText.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 10); // Adjust speed here

    return () => {
        clearInterval(interval);
        setIsAnimating(false);
    };
  }, [originalText]);

  // This is a trick to preserve the original structure and styling.
  // We find the text nodes and replace them with the animated version.
  const cloneWithAnimatedText = (node: React.ReactNode, text: string): React.ReactNode => {
    let currentText = text;
    
    const recursiveClone = (n: React.ReactNode): React.ReactNode => {
        if (typeof n === 'string') {
            if (currentText.length === 0) return '';
            const len = n.length;
            const part = currentText.substring(0, len);
            currentText = currentText.substring(len);
            return part;
        }

        if (React.isValidElement(n) && n.props.children) {
            return React.cloneElement(n, {
                ...n.props,
                children: React.Children.map(n.props.children, recursiveClone),
            });
        }
        
        if (Array.isArray(n)) {
            return n.map(recursiveClone);
        }

        return n;
    }

    return recursiveClone(node);
  };

  if (isAnimating) {
    return <>{cloneWithAnimatedText(children, displayedText)}</>;
  }

  return <>{children}</>;
};
