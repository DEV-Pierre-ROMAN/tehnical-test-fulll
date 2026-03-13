import { useEffect, useState } from "react";

export function useDelayedUnmount(visible: boolean, delayMs: number) {
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
    } else {
      const timeout = setTimeout(() => setMounted(false), delayMs);
      return () => clearTimeout(timeout);
    }
  }, [visible, delayMs]);

  return { mounted, visible };
}
