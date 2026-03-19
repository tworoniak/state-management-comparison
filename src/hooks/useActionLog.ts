import { useEffect, useState } from 'react';
import { actionLog, type ActionLogEntry } from '../lib/actionLog';

export function useActionLog() {
  const [entries, setEntries] = useState<ActionLogEntry[]>(() =>
    actionLog.getAll(),
  );

  useEffect(() => {
    const unsub = actionLog.subscribe((entry) => {
      if (entry.action === '@@CLEAR') {
        setEntries([]);
      } else {
        setEntries((prev) => [entry, ...prev].slice(0, 50));
      }
    });
    return () => {
      unsub();
    };
  }, []);

  return { entries, clear: actionLog.clear };
}
