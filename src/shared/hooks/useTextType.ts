import { useEffect, useRef, useState } from "react";

const ERROR_MESSAGE = "На данный момент рекомендация недоступна..."

export const useTextType = (
  text: string,
  speed = 20,
  isError?: boolean,
  clearFunc?: () => void): { displayed: string } => {
  const [displayed, setDisplayed] = useState("");
  const intervalRef = useRef<number | null>(null);

  const startTyping = (fullText: string, onFinish?: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let i = 0;
    setDisplayed("");

    intervalRef.current = setInterval(() => {
      if (i < fullText.length) {
        setDisplayed(fullText.slice(0, i + 1));
        i++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (onFinish) onFinish();
      }
    }, speed);
  };

  useEffect(() => {
    if (isError) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      startTyping(ERROR_MESSAGE, clearFunc);
    } else if (text && text.length > 0) {
      startTyping(text);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayed("");
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, isError, speed]);

  return { displayed };
}