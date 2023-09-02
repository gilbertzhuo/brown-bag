import { TextCursor } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  content: string;
  className?: string;
};

const TypingAnimation = ({ content, ...props }: Props) => {
  const [displayedText, setDisplayedText] = useState("");
  const [completedTyping, setCompletedTyping] = useState(false);

  useEffect(() => {
    setCompletedTyping(false);
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(content.slice(0, i));
      i++;
      if (i > content.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 20);
    return () => clearInterval(intervalId);
  }, [content]);

  useEffect(() => {
    // Reset the animation when content prop changes
    setDisplayedText("");
    setCompletedTyping(false);
  }, [content]);

  return (
    <p {...props}>
      {displayedText}
      {!completedTyping}
    </p>
  );
};

export default TypingAnimation;
