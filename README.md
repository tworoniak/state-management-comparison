# State Management Comparison

---

````txt

src/
├── main.tsx
├── App.tsx
├── wdyr.ts                          # why-did-you-render setup
├── types/
│   └── index.ts                     # shared Product, CartItem types
├── data/
│   └── products.ts                  # mock product catalogue
├── stores/
│   ├── zustand/
│   │   └── useCartStore.ts
│   ├── jotai/
│   │   └── cartAtoms.ts
│   └── redux/
│       ├── store.ts
│       ├── cartSlice.ts
│       └── hooks.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── TabBar.tsx
│   │   └── MetricsPanel.tsx
│   ├── cart/
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CartSidebar.tsx
│   │   └── CartItem.tsx
│   └── metrics/
│       ├── RenderCounter.tsx
│       ├── BundleSize.tsx
│       ├── BoilerplateViewer.tsx
│       └── DXNotes.tsx
└── hooks/
    └── useRenderCount.ts

    ```
````
