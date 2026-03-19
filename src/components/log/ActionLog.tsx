import { useActionLog } from '../../hooks/useActionLog';
import type { Library } from '../../types';

const libColors: Record<Library, string> = {
  zustand: 'text-orange-500 bg-orange-50 border-orange-200',
  jotai: 'text-violet-500 bg-violet-50 border-violet-200',
  redux: 'text-blue-500 bg-blue-50 border-blue-200',
};

const libLabels: Record<Library, string> = {
  zustand: 'ZST',
  jotai: 'JTI',
  redux: 'RDX',
};

function formatPayload(payload: unknown): string {
  if (payload === undefined || payload === null) return '';
  if (typeof payload === 'string') return payload;
  return JSON.stringify(payload);
}

function formatTime(timestamp: number): string {
  const d = new Date(timestamp);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}.${String(d.getMilliseconds()).padStart(3, '0')}`;
}

export function ActionLog() {
  const { entries, clear } = useActionLog();

  return (
    <div className='flex flex-col h-full'>
      <div className='flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 shrink-0'>
        <div className='flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
          <span className='text-xs font-semibold text-zinc-600 uppercase tracking-wider'>
            Action Log
          </span>
          {entries.length > 0 && (
            <span className='text-xs font-mono text-zinc-400'>
              {entries.length}
            </span>
          )}
        </div>
        {entries.length > 0 && (
          <button
            onClick={clear}
            className='text-xs text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer'
          >
            Clear
          </button>
        )}
      </div>

      <div className='flex-1 overflow-y-auto font-mono text-xs'>
        {entries.length === 0 ? (
          <div className='flex items-center justify-center h-full text-zinc-400 text-xs'>
            Interact with the cart to see actions
          </div>
        ) : (
          <div className='divide-y divide-zinc-100'>
            {entries.map((entry) => (
              <div
                key={entry.id}
                className='flex items-start gap-2 px-4 py-2 hover:bg-zinc-50'
              >
                <span className='text-zinc-300 shrink-0 pt-px'>
                  {formatTime(entry.timestamp)}
                </span>
                <span
                  className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded border ${libColors[entry.library]}`}
                >
                  {libLabels[entry.library]}
                </span>
                <div className='flex flex-col gap-0.5 min-w-0'>
                  <span className='text-zinc-700 font-semibold'>
                    {entry.action}
                  </span>
                  {entry.payload !== undefined && (
                    <span className='text-zinc-400 truncate'>
                      {formatPayload(entry.payload)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
