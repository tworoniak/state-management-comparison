import type { Library } from '../../types';

const bundleSizes: Record<Library, { size: string; gzip: string }> = {
  zustand: { size: '3.2 kB', gzip: '1.5 kB' },
  jotai: { size: '8.1 kB', gzip: '3.2 kB' },
  redux: { size: '47.6 kB', gzip: '15.1 kB' },
};

const boilerplate: Record<Library, { lines: number; files: number }> = {
  zustand: { lines: 28, files: 1 },
  jotai: { lines: 38, files: 1 },
  redux: { lines: 72, files: 3 },
};

const dxNotes: Record<Library, { pros: string[]; cons: string[] }> = {
  zustand: {
    pros: [
      'Minimal boilerplate',
      'Feels like useState at scale',
      'No provider needed',
    ],
    cons: [
      'Less structured for large teams',
      'No built-in devtools (needs middleware)',
    ],
  },
  jotai: {
    pros: [
      'Atomic model scales well',
      'Derived state is elegant',
      'React Suspense friendly',
    ],
    cons: ['Mental model shift required', 'Write atoms feel unusual at first'],
  },
  redux: {
    pros: [
      'Excellent DevTools',
      'Best for complex domain logic',
      'Predictable & auditable',
    ],
    cons: ['Most boilerplate', 'Heaviest bundle', 'Overkill for most apps'],
  },
};

const colors: Record<Library, string> = {
  zustand: 'text-orange-600 bg-orange-50 border-orange-200',
  jotai: 'text-violet-600 bg-violet-50 border-violet-200',
  redux: 'text-blue-600 bg-blue-50 border-blue-200',
};

const labels: Record<Library, string> = {
  zustand: 'Zustand',
  jotai: 'Jotai',
  redux: 'Redux Toolkit',
};

export function MetricsPanel() {
  const libraries: Library[] = ['zustand', 'jotai', 'redux'];

  return (
    <div className='border-t border-zinc-200 bg-zinc-50 px-6 py-5'>
      <h2 className='text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4'>
        Metrics Comparison
      </h2>
      <div className='grid grid-cols-3 gap-4'>
        {libraries.map((lib) => (
          <div
            key={lib}
            className={`rounded-xl border p-4 flex flex-col gap-3 ${colors[lib]}`}
          >
            <h3 className='font-bold text-sm'>{labels[lib]}</h3>

            <div className='flex flex-col gap-1'>
              <span className='text-xs font-semibold uppercase tracking-wider opacity-60'>
                Bundle
              </span>
              <div className='flex gap-3'>
                <span className='font-mono text-sm font-bold'>
                  {bundleSizes[lib].size}
                </span>
                <span className='font-mono text-xs opacity-60 self-end'>
                  {bundleSizes[lib].gzip} gzip
                </span>
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <span className='text-xs font-semibold uppercase tracking-wider opacity-60'>
                Boilerplate
              </span>
              <span className='font-mono text-sm font-bold'>
                {boilerplate[lib].lines} lines · {boilerplate[lib].files}{' '}
                {boilerplate[lib].files === 1 ? 'file' : 'files'}
              </span>
            </div>

            <div className='flex flex-col gap-2'>
              <span className='text-xs font-semibold uppercase tracking-wider opacity-60'>
                DX Notes
              </span>
              <ul className='flex flex-col gap-1'>
                {dxNotes[lib].pros.map((p) => (
                  <li key={p} className='text-xs flex gap-1.5 items-start'>
                    <span className='mt-0.5 opacity-70'>✓</span>
                    {p}
                  </li>
                ))}
                {dxNotes[lib].cons.map((c) => (
                  <li
                    key={c}
                    className='text-xs flex gap-1.5 items-start opacity-60'
                  >
                    <span className='mt-0.5'>✗</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
