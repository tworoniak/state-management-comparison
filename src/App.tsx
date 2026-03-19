import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './stores/redux/store';
import type { Library } from './types';
import { TabBar } from './components/layout/TabBar';
import { MetricsPanel } from './components/metrics/MetricsPanel';
import { ZustandCart } from './components/implementations/ZustandCart';
import { JotaiCart } from './components/implementations/JotaiCart';
import { ReduxCart } from './components/implementations/ReduxCart';

export default function App() {
  const [activeLib, setActiveLib] = useState<Library>('zustand');

  return (
    <Provider store={store}>
      <div className='min-h-screen bg-zinc-100 flex flex-col font-sans'>
        {/* Header */}
        <header className='bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between shrink-0'>
          <div>
            <h1 className='text-lg font-bold text-zinc-900 tracking-tight'>
              State Management Comparison
            </h1>
            <p className='text-xs text-zinc-400 mt-0.5'>
              Zustand · Jotai · Redux Toolkit — same app, three engines
            </p>
          </div>
          <span className='text-xs font-mono bg-zinc-100 text-zinc-500 px-3 py-1.5 rounded-lg'>
            React + TypeScript
          </span>
        </header>

        {/* Tab Bar */}
        <TabBar active={activeLib} onChange={setActiveLib} />

        {/* Main Content */}
        <main className='flex-1 overflow-hidden p-6'>
          {activeLib === 'zustand' && <ZustandCart />}
          {activeLib === 'jotai' && <JotaiCart />}
          {activeLib === 'redux' && <ReduxCart />}
        </main>

        {/* Metrics Panel */}
        <MetricsPanel />
      </div>
    </Provider>
  );
}
