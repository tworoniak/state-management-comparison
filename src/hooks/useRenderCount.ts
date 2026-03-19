import { useRef } from 'react';

export function useRenderCount(componentName: string): number {
  const count = useRef(0);
  count.current += 1;

  if (import.meta.env.DEV) {
    console.log(`[render] ${componentName} → #${count.current}`);
  }

  return count.current;
}
