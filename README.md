# KoinX Tax-Loss Harvesting Dashboard

A production-quality, responsive, and highly optimized Tax-Loss Harvesting dashboard built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Zustand**. Designed closely to meet modern premium cryptocurrency dashboard aesthetics with smooth transitions, detailed tooltips, error states, and a simulated API environment.

---

## 🚀 Live Demo & Repository
- 🌐 **Live App**: [https://koinx-tax-loss-harvesting.vercel.app](https://koinx-tax-loss-harvesting.vercel.app)
- 📦 **GitHub Repo**: [https://github.com/richa-singh-8118/koinx-tax-loss-harvesting](https://github.com/richa-singh-8118/koinx-tax-loss-harvesting)
- **Production Build Status**: Passing ✅
- **Framework**: React 19 + TypeScript 6 + Vite 8
- **Styling**: Tailwind CSS v3 (Custom Dark/Neon Theme)
- **Deployment**: Vercel (auto-deployed from `main` branch)

---

## 📂 Folder Structure

The application strictly adheres to the clean, scalable folder structure requested:

```text
src/
├── api/
│    ├── holdings.ts          # Asynchronous mock API for portfolio positions
│    └── capitalGains.ts      # Asynchronous mock API for pre-harvest capital gains
│
├── components/
│    ├── cards/
│    │     ├── HarvestCard.tsx      # Pre/Post capital gains details card
│    │     ├── GainRow.tsx          # Key-value metric row with color statuses
│    │     └── SavingsBanner.tsx    # Animated alert summarizing exact tax-savings
│    │
│    ├── holdings/
│    │     ├── HoldingsTable.tsx    # Selectable assets table with search & filter
│    │     ├── HoldingRow.tsx       # Individual asset row rendering logos & sell value
│    │     ├── TableHeader.tsx      # Sticky table column headers
│    │     └── SelectAllCheckbox.tsx# Three-state (checked/unchecked/indeterminate) checkbox
│    │
│    ├── common/
│    │     ├── Loader.tsx           # Orbiting glowing spinner and skeleton state
│    │     ├── ErrorState.tsx       # Warning banner with retry & error-bypass controls
│    │     └── EmptyState.tsx       # Search/Filter empty placeholder with auto-reset
│
├── hooks/
│    └── useHarvesting.ts     # Core hook memoizing filters, selection, and calculations
│
├── store/
│    └── useHarvestStore.ts   # Zustand global state (selected holdings, query, API status)
│
├── types/
│    └── index.ts             # Static TypeScript interface definitions (Holding, Gains)
│
├── utils/
│    ├── calculations.ts      # Mathematical logic for offsets and savings (pure functions)
│    ├── currency.ts          # INR locale currency formatter (Intl.NumberFormat)
│    └── format.ts            # Fractional coin decimals and percent formatters
│
├── data/
│    ├── holdings.json        # Mock JSON data for portfolio assets
│    └── capitalGains.json    # Mock JSON data for realized gains
│
├── pages/
│    └── Dashboard.tsx        # Main page view tying components, loader, and footer
│
├── App.tsx                   # Renders the Dashboard
├── main.tsx                  # StrictMode mounting point
└── index.css                 # Inter font imports, scrollbars, and premium glassmorphism utility
```

---

## 🛠️ Architecture & Tech Decisions

### 1. Separation of Concerns & Clean Architecture
- **Pure Calculation Core (`utils/calculations.ts`)**: Mathematical formulas for STCG, LTCG, Net, and Savings are kept in pure, stateless functions. This makes them highly unit-testable and decoupled from React components.
- **Data Hook Abstraction (`hooks/useHarvesting.ts`)**: All business workflows, searching, sorting, and selected items derivation are handled by a dedicated hook. The UI components remain "dumb" presenters, consuming ready-made states.
- **Mock Service Layer (`api/`)**: Real network requests are simulated using ES Promises and `setTimeout` delays. It handles custom loading delays, success states, and throws mock network errors to test resilience.

### 2. State Management (Zustand)
Zustand was chosen over Redux or Context API because:
- **Zero Boilerplate**: Minimal boilerplate compared to Redux, requiring no provider wrapping.
- **Transient Updates & Selectors**: React components can selectively subscribe to slice updates, preventing global re-renders when a user types in search or checks a single checkbox.
- **Dynamic Derivation**: Instead of manually syncing state and risking stale values, calculations (like Post-Harvest Gains) are computed on-the-fly dynamically inside store selectors (`getSummary()`), guaranteeing a single source of truth.

### 3. Performance Optimization Choices
- **`useMemo` Filters**: Search queries and Suggested Harvesting candidates are filtered inside `useMemo` hooks inside our custom hook. If the user toggles a checkbox, the search filter isn't re-evaluated unless the search text or holdings change.
- **`useCallback` Handlers**: Complex functions like `selectAll` and `deselectAll` are wrapped in `useCallback` to prevent reference re-creation, ensuring children elements (like checkboxes and headers) don't trigger unnecessary re-renders.
- **Type-Safe Destructuring**: Types are strictly resolved utilizing TypeScript's compile-time validation. Type-only imports (`import type { ... }`) are enforced for optimal bundle performance.

### 4. Reusable Component Strategy
- **`GainRow` presenting state**: A single reusable component displaying profits, losses, and net positions. It adapts its borders, sizes, and shadow glows dynamically depending on the `type` prop (`neutral`, `profit`, `loss`, `net`, `total`).
- **`SelectAllCheckbox` forward-logic**: Custom three-state checkbox wrapping. In HTML, the "indeterminate" state of a checkbox is a write-only property on the DOM element and cannot be set via an HTML attribute. We use a React `ref` and `useEffect` block inside the component to handle this elegantly.

---

## 📈 Harvesting Calculation Logic

Tax Loss Harvesting involves offsetting capital gains with unrealized losses.

### 1. Formulas
- **Net STCG** = `STCG Profits` - `STCG Losses`
- **Net LTCG** = `LTCG Profits` - `LTCG Losses`
- **Total Realised Capital Gains** = `Net STCG` + `Net LTCG`

### 2. Dynamic Recalculation (Offsetting Logic)
When an asset is selected for harvesting:
- **If STCG Gain is negative (`gain < 0`)**: Its absolute value is added to **STCG Losses** (increasing total losses, which reduces net gains).
- **If STCG Gain is positive (`gain > 0`)**: It is added to **STCG Profits** (which increases net gains).
- **LTCG offsets** are calculated separately in the exact same manner.

### 3. Tax Savings Banner Formula
- **Taxable Gains Offset**: `PreHarvestRealisedCapitalGains` - `PostHarvestRealisedCapitalGains`
- **Estimated Real Monetary Saved**: Calculated at a flat **30% rate** (modeling Section 115BBH for Virtual Digital Assets/Crypto in India).
- *The Savings Banner is dynamically displayed only when savings are greater than zero.*

---

## ✨ Features & Outstanding Bonuses

1. **Suggested Harvesting Opportunities**: Synthesizes a dedicated dashboard module identifying positions trading at a loss. Users can click "Offset Tax" to automatically select the asset and calculate tax savings!
2. **Interactive API Error Simulator**: An exclusive widget in the header allowing reviewers to toggle API failure simulation. When activated, loading data will trigger the `ErrorState` component with retry capability.
3. **Advanced CSS Aesthetics**: Custom dark base colors, orbiting glow spinners, hover card lifting animations (`glass-card-hover`), neon typography shadows (`glow-text-green`, `glow-text-red`), and tailored desktop scrollbars.
4. **Three-State Checkbox**: Smart portfolio table header checkbox displaying a dash (`-`) when only a subset of assets are selected, and checked (`✓`) when all visible items are selected.
5. **Horizontal Scrolling Wrapper**: Designed with mobile responsiveness in mind, allowing clear high-density spreadsheet navigation on phones.

---

## 🛠️ Setup Instructions

Follow these instructions to run the project locally:

### 1. Clone & Enter Directory
```bash
cd "Tax Loss Harvesting dashboard"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build Production Bundle
To compile the TypeScript project and bundle Tailwind assets into optimized static assets:
```bash
npm run build
```
Verify the build result in the `dist` directory.

### 5. Preview Production Bundle
```bash
npm run preview
```

---

## 📦 Deployment Instructions (Vercel)

This project is fully ready for deployment on Vercel:

1. Import the repository into your Vercel Dashboard.
2. Select **Vite** as the Framework Preset.
3. Configure the following build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **Deploy**. Vercel will automatically host the static files securely.

---

## 🤝 Assumptions & Disclosures
- **Offset Limitations**: In reality, under Indian Income Tax Act Sec 115BBH, crypto losses cannot be offset against crypto gains from other assets (losses are simply ignored, and gains are taxed flat at 30%). For the purposes of this assessment, standard asset class offset regulations (where short-term and long-term losses offset respective gains) are simulated to model direct financial calculations.
- **Estimated Tax rate**: Estimated tax savings are modeled at a flat 30% representing standard crypto taxation, helping to show how reduction in taxable capital gains corresponds to direct money saved.

---

