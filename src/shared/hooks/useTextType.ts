import { useEffect, useState } from "react";

const ERROR_MESSAGE = "На данный момент рекомендация недоступна..."

export const useTextType = (
  text: string,
  speed = 20,
  isError?: boolean,
  clearFunc?: () => void): { displayed: string } => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        if (clearFunc) clearFunc()
      }

      return () => {
        clearInterval(interval);
      };
    }, speed);
  }, [text, clearFunc, speed]);

  useEffect(() => {
    if (isError) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < ERROR_MESSAGE.length) {
          setDisplayed(ERROR_MESSAGE.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }

        return () => clearInterval(interval);
      }, speed);
    }
  }, [isError, speed]);

  return { displayed }
}