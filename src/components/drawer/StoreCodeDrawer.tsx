import { useEffect, useRef } from 'react';
import type { Library } from '../../types';
import { storeSource } from '../../data/storeSource';

interface Props {
  open: boolean;
  activeLib: Library;
  onClose: () => void;
}

const libColors: Record<Library, string> = {
  zustand: 'text-orange-500',
  jotai: 'text-violet-500',
  redux: 'text-blue-500',
};

const libLabels: Record<Library, string> = {
  zustand: 'Zustand',
  jotai: 'Jotai',
  redux: 'Redux Toolkit',
};

// Minimal syntax highlighting via regex — no external deps
function highlight(code: string): string {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(\/\/.*$)/gm, '<span class="text-zinc-500">$1</span>')
    .replace(/('.*?'|`.*?`)/g, '<span class="text-emerald-400">$1</span>')
    .replace(
      /\b(import|export|from|const|let|return|if|else|null)\b/g,
      '<span class="text-violet-400">$1</span>',
    )
    .replace(
      /\b(type|interface|extends|implements)\b/g,
      '<span class="text-blue-400">$1</span>',
    )
    .replace(
      /\b(atom|create|set|get|createSlice|configureStore|atom)\b/g,
      '<span class="text-orange-400">$1</span>',
    );
}

export function StoreCodeDrawer({ open, activeLib, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const source = storeSource[activeLib];

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Trap scroll behind drawer
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex'>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Drawer */}
      <div className='relative ml-auto w-full max-w-2xl h-full bg-zinc-950 flex flex-col shadow-2xl'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0'>
          <div className='flex flex-col gap-0.5'>
            <div className='flex items-center gap-2'>
              <span className={`text-sm font-bold ${libColors[activeLib]}`}>
                {libLabels[activeLib]}
              </span>
              <span className='text-zinc-600 text-sm'>
                store implementation
              </span>
            </div>
            <span className='text-zinc-500 text-xs font-mono'>
              {source.filename}
            </span>
          </div>
          <button
            onClick={onClose}
            className='text-zinc-500 hover:text-zinc-300 transition-colors text-xl leading-none cursor-pointer'
          >
            ×
          </button>
        </div>

        {/* Code */}
        <div className='flex-1 overflow-auto'>
          <pre className='p-6 text-xs leading-relaxed text-zinc-300 font-mono'>
            <code
              dangerouslySetInnerHTML={{ __html: highlight(source.code) }}
            />
          </pre>
        </div>

        {/* Footer */}
        <div className='px-6 py-3 border-t border-zinc-800 flex items-center justify-between shrink-0'>
          <span className='text-xs text-zinc-600 font-mono'>
            {source.code.split('\n').length} lines
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(source.code)}
            className='text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer'
          >
            Copy to clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
