import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1500,
  className = "",
}) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    setIndex(0);
    setSubIndex(0);
    setReverse(false);
  }, [phrases]);

  // Blinking cursor effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index >= phrases.length) {
        // Reset to first phrase to loop infinitely
        setIndex(0);
        return;
    }

    if (subIndex === phrases[index].length + 1 && !reverse) {
      // Finished typing the word, wait before deleting
      const timeout = setTimeout(() => {
        setReverse(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      // Finished deleting, move to next word
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`${className} font-mono`}>
      {phrases[index].substring(0, subIndex)}
      <span className={`ml-1 inline-block w-2 h-[1em] bg-white align-middle ${blink ? 'opacity-100' : 'opacity-0'}`}>&nbsp;</span>
    </span>
  );
};

export default Typewriter;
