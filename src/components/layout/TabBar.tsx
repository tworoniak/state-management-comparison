import type { Library } from '../../types';

interface Props {
  active: Library;
  onChange: (lib: Library) => void;
}

const tabs: {
  id: Library;
  label: string;
  color: string;
  activeClass: string;
}[] = [
  {
    id: 'zustand',
    label: 'Zustand',
    color: 'text-orange-600',
    activeClass: 'border-orange-500 text-orange-600 bg-orange-50',
  },
  {
    id: 'jotai',
    label: 'Jotai',
    color: 'text-violet-600',
    activeClass: 'border-violet-500 text-violet-600 bg-violet-50',
  },
  {
    id: 'redux',
    label: 'Redux Toolkit',
    color: 'text-blue-600',
    activeClass: 'border-blue-500 text-blue-600 bg-blue-50',
  },
];

export function TabBar({ active, onChange }: Props) {
  return (
    <div className='flex gap-1 border-b border-zinc-200 px-6 bg-white'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-all duration-150 cursor-pointer
            ${
              active === tab.id
                ? tab.activeClass
                : 'border-transparent text-zinc-400 hover:text-zinc-600 hover:border-zinc-300'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
