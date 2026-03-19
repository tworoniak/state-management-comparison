export interface ActionLogEntry {
  id: string;
  library: 'zustand' | 'jotai' | 'redux';
  action: string;
  payload?: unknown;
  timestamp: number;
}

type Listener = (entry: ActionLogEntry) => void;

const listeners = new Set<Listener>();
const log: ActionLogEntry[] = [];

export const actionLog = {
  dispatch(entry: Omit<ActionLogEntry, 'id' | 'timestamp'>) {
    const full: ActionLogEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    log.push(full);
    listeners.forEach((l) => l(full));
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getAll() {
    return [...log];
  },

  clear() {
    log.length = 0;
    listeners.forEach((l) =>
      l({
        id: '',
        library: 'zustand',
        action: '@@CLEAR',
        timestamp: Date.now(),
      }),
    );
  },
};
