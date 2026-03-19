# State Management Comparison

A portfolio experiment comparing **Zustand**, **Jotai**, and **Redux Toolkit** using the same shopping cart application — same UI, same data, three different state engines under the hood.

Built with React, TypeScript, Tailwind CSS, and Vite.

---

## Purpose

Most state management comparisons are theoretical. This project runs all three libraries against an identical real-world scenario so you can observe the differences that actually matter in practice:

- How many re-renders does each trigger?
- How much does each add to your bundle?
- How much boilerplate does each require?
- What does the developer experience feel like day-to-day?

---

## Features

### Three Live Implementations

Switch between Zustand, Jotai, and Redux Toolkit using the tab bar. Each tab runs a fully independent store powering the same shopping cart UI — add items, update quantities, clear the cart — and observe how each library behaves under identical conditions.

### Per-Component Render Counters

Every component displays a live render count in its corner. No DevTools required — re-render behaviour is visible at a glance as you interact with the cart.

### Action Log

A live feed panel shows every state action dispatched across all three libraries in real time. Each entry shows:

- Timestamp (HH:MM:SS.ms)
- Library badge (ZST / JTI / RDX)
- Action name and payload

The log persists across tab switches, so you can compare action histories between libraries. A clear button resets it for clean measurements.

### Store Code Drawer

Click **View Store Code** in the header to open a slide-in panel showing the full syntax-highlighted source for whichever library is currently active. Includes a copy-to-clipboard button. Close with `Escape` or by clicking the backdrop.

### Metrics Panel

A persistent panel at the bottom of the page shows a side-by-side breakdown for all three libraries:

- **Bundle size** — minified and gzip
- **Boilerplate** — lines of code and number of files required for the store
- **DX notes** — practical pros and cons based on the implementation experience

### Bundle Analyzer

Run `npm run build` to generate a `bundle-analysis.html` file that opens automatically, showing the size contribution of each library to the final bundle.

---

## Tech Stack

| Tool                                    | Purpose                  |
| --------------------------------------- | ------------------------ |
| React 18 + TypeScript                   | UI and type safety       |
| Vite                                    | Dev server and bundler   |
| Tailwind CSS v4                         | Styling                  |
| Zustand                                 | Store implementation #1  |
| Jotai                                   | Store implementation #2  |
| Redux Toolkit + React-Redux             | Store implementation #3  |
| `@welldone-software/why-did-you-render` | Re-render detection      |
| `react-scan`                            | Visual re-render overlay |
| `rollup-plugin-visualizer`              | Bundle size analysis     |

---

## Getting Started

```bash
# Clone and install
git clone https://github.com/your-username/state-management-comparison
cd state-management-comparison
npm install

# Start dev server
npm run dev

# Build and analyze bundle
npm run build
# Opens bundle-analysis.html automatically after build
```

---

## Project Structure

```
src/
├── main.tsx                          # App entry point
├── App.tsx                           # Root layout, tab switching, Redux Provider
├── types/
│   └── index.ts                      # Shared types: Product, CartItem, CartState, Library
├── data/
│   ├── products.ts                   # Mock product catalogue (8 items)
│   └── storeSource.ts                # Raw store source strings for the code drawer
├── lib/
│   └── actionLog.ts                  # Shared pub/sub event bus for all three stores
├── stores/
│   ├── zustand/
│   │   └── useCartStore.ts           # Single-hook store with create()
│   ├── jotai/
│   │   └── cartAtoms.ts              # Primitive + derived + write atoms
│   └── redux/
│       ├── store.ts                  # configureStore + action logger middleware
│       ├── cartSlice.ts              # createSlice with Immer reducers
│       └── hooks.ts                  # Typed useAppDispatch / useAppSelector
├── components/
│   ├── layout/
│   │   ├── TabBar.tsx                # Zustand / Jotai / Redux tab switcher
│   │   └── MetricsPanel.tsx          # Always-visible comparison panel
│   ├── cart/
│   │   ├── ProductGrid.tsx           # Grid of ProductCards
│   │   ├── ProductCard.tsx           # Single product with render counter
│   │   ├── CartSidebar.tsx           # Cart panel with totals and actions
│   │   └── CartItemRow.tsx           # Individual cart line item
│   ├── implementations/
│   │   ├── ZustandCart.tsx           # Connects Zustand store → shared cart UI
│   │   ├── JotaiCart.tsx             # Connects Jotai atoms → shared cart UI
│   │   └── ReduxCart.tsx             # Connects Redux slice → shared cart UI
│   ├── log/
│   │   └── ActionLog.tsx             # Live action feed with timestamps and badges
│   └── drawer/
│       └── StoreCodeDrawer.tsx       # Slide-in syntax-highlighted source viewer
└── hooks/
    ├── useRenderCount.ts             # Tracks and returns render count per component
    └── useActionLog.ts               # Subscribes to the action log event bus
```

---

## Architecture

### Shared UI, Swappable Stores

The cart UI — `ProductGrid`, `ProductCard`, `CartSidebar`, `CartItemRow` — is completely library-agnostic. It accepts plain props. Each implementation file (`ZustandCart`, `JotaiCart`, `ReduxCart`) acts as a thin adapter that connects its respective store to the shared components.

Switching tabs mounts a different adapter while keeping the same UI tree, making the comparison genuinely apples-to-apples.

### Action Log Event Bus

`src/lib/actionLog.ts` is a tiny framework-agnostic pub/sub module that lives outside React. All three stores call `actionLog.dispatch()` on every mutation — Zustand and Jotai call it directly inside their actions, while Redux hooks into it via a custom middleware. The `useActionLog` hook subscribes to the bus and feeds the live panel.

### Store Code Drawer

`src/data/storeSource.ts` holds the raw source strings for each library's store. The drawer reads the active library from the tab state and renders the corresponding source with lightweight regex-based syntax highlighting — no external highlighting library required.

---

## Library Comparison Summary

### Zustand

- **Model:** Single hook, closure-based store
- **Boilerplate:** Minimal — one file, one `create()` call
- **Re-renders:** Only components that subscribe to changed slices re-render
- **Bundle:** ~1.5 kB gzip
- **Best for:** Small-to-medium apps, teams who want simplicity, prototypes

### Jotai

- **Model:** Atomic — state lives in individual atoms, composed bottom-up
- **Boilerplate:** Low — atoms are just variables, write atoms handle actions
- **Re-renders:** Surgically precise — only atoms that change trigger updates
- **Bundle:** ~3.2 kB gzip
- **Best for:** Apps with lots of independent state slices, React Suspense-heavy apps

### Redux Toolkit

- **Model:** Single store, action → reducer → state
- **Boilerplate:** Highest — slice, store, typed hooks, dispatch calls
- **Re-renders:** Selector-based — components re-render when selected state changes
- **Bundle:** ~15.1 kB gzip
- **Best for:** Large teams, complex domain logic, apps where auditability matters

---

## Scripts

```bash
npm run dev        # Start Vite dev server
npm run build      # Production build + opens bundle-analysis.html
npm run preview    # Preview production build locally
npm run lint       # ESLint
```

---

## What I Learned

**Zustand** genuinely feels like `useState` with superpowers. The absence of a required Provider and the single-hook API make it the fastest to be productive with. One gotcha: JavaScript getters defined on the state object don't trigger reactivity — derived values need to be computed in the component or via middleware, not as store getters.

**Jotai's** atomic model is conceptually elegant — derived state via `atom(get => ...)` is cleaner than Zustand's approach or Redux selectors. The write-atom pattern takes some getting used to but pays off in composability. Atomic granularity also means re-renders are more surgical than either alternative.

**Redux Toolkit** has come a long way. Immer-powered reducers eliminate the immutability ceremony, and the middleware system is genuinely powerful — the action logger in this project hooks into it with just a few lines. The DevTools experience is unmatched. But even RTK requires significantly more files and concepts than the alternatives — justified for large teams, overkill for most side projects.

**Building the action log** as a framework-agnostic event bus was the most interesting architectural decision. Keeping it outside React meant it could be a neutral observer across all three libraries without any of them knowing about each other.

---

## Related Projects

This is part of a series of frontend experiment projects exploring real tradeoffs in the React ecosystem:

- **State Management Comparison** ← you are here
- UI Design Systems Comparison — shadcn/ui vs. Radix vs. Material UI
