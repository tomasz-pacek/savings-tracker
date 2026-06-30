import { RefObject, useEffect } from "react";

export const useFocusShortcut = (
  ref: RefObject<HTMLInputElement | null>,
  key: string,
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        ref.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, key]);
};
