import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './stores/redux/store';
import type { Library } from './types';
import { TabBar } from './components/layout/TabBar';
import { MetricsPanel } from './components/metrics/MetricsPanel';
import { ZustandCart } from './components/implementations/ZustandCart';
import { JotaiCart } from './components/implementations/JotaiCart';
import { ReduxCart } from './components/implementations/ReduxCart';
import { ActionLog } from './components/log/ActionLog';
import { StoreCodeDrawer } from './components/drawer/StoreCodeDrawer';

export default function App() {
  const [activeLib, setActiveLib] = useState<Library>('zustand');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(true);

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
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setLogOpen((v) => !v)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer
                ${
                  logOpen
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300'
                }`}
            >
              Action Log
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              className='px-3 py-1.5 text-xs font-medium rounded-lg border bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300 transition-all cursor-pointer'
            >
              View Store Code
            </button>
          </div>
        </header>

        {/* Tab Bar */}
        <TabBar active={activeLib} onChange={setActiveLib} />

        {/* Main Content */}
        <div className='flex flex-1 overflow-hidden'>
          <main className='flex-1 overflow-auto p-6'>
            {activeLib === 'zustand' && <ZustandCart />}
            {activeLib === 'jotai' && <JotaiCart />}
            {activeLib === 'redux' && <ReduxCart />}
          </main>

          {/* Action Log Panel */}
          {logOpen && (
            <aside className='w-72 shrink-0 border-l border-zinc-200 bg-white overflow-hidden flex flex-col'>
              <ActionLog />
            </aside>
          )}
        </div>

        {/* Metrics Panel */}
        <MetricsPanel />

        {/* Store Code Drawer */}
        <StoreCodeDrawer
          open={drawerOpen}
          activeLib={activeLib}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    </Provider>
  );
}
