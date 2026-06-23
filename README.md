# Retail Market — HotPocket React Frontend

A modern, production-grade retail marketplace frontend built with TypeScript, React, Vite, Tailwind CSS, Zustand, and React Router v7. Includes HotPocket/Evernode integration scaffolding with robust mock mode for local development.

## Features
- Responsive, accessible UI with Tailwind and gradient/glass design
- Pages: Home, Catalog, Product Detail, Cart, Checkout, Account, Search, Success
- Catalog filters (category, price, rating, stock), sort, pagination, grid/list views
- Product detail with gallery, specs, reviews preview, related products
- Cart drawer + Cart page, discount placeholder, subtotal/taxes/shipping
- Checkout with client-side validation (mock payment)
- Account wishlist and orders (mock), localStorage profile (no real auth)
- HotPocket scaffolding: BSON protocol, mock mode, promise correlation
- SEO metadata and product JSON-LD
- Tests with Vitest + React Testing Library
- ESLint + Prettier

## Getting Started

```bash
npm install
npm run dev
```
Open http://localhost:5173

Build & Preview:
```bash
npm run build
npm run preview
```

Run tests:
```bash
npm run test
```

Format:
```bash
npm run format
```

## Environment

This project ships with mock mode enabled by default. To connect to real HotPocket nodes later:

1. Set `VITE_MOCK_MODE=false` in `.env`
2. Set `VITE_CONTRACT_URLS` to comma-separated wss:// URLs of your HotPocket servers

Example:
```
VITE_MOCK_MODE=false
VITE_CONTRACT_URLS=wss://node1.example/ws,wss://node2.example/ws
```

If you do not have servers ready, leave `VITE_MOCK_MODE=true` and the app will use mock data.

## HotPocket / Evernode Integration

- Contract message protocol (default):
```json
{ "Service": "Product", "Action": "ListProducts", "Data": null, "promiseId": "..." }
```
- Responses:
```json
{ "success": [/*...*/], "promiseId": "..." }
```
- Read operations: `ContractService.submitContractReadRequest`
- Write operations: `ContractService.submitInputToContract`

Where to add real calls:
- `src/services/contract-service.ts` — Replace mock handlers with real server calls
- `src/services/hpClient.ts` — High-level typed methods (connect, getProducts, createOrder, etc.)
- `src/services/api-service.ts` — App-facing methods wrapping hpClient

Ensure index.html includes HP CDN and sodium:
```html
<script src="https://cdn.jsdelivr.net/npm/hotpocket-js-client@0.5.3/browser.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/libsodium-wrappers/0.5.4/sodium.min.js"></script>
```

## Accessibility
- Keyboard accessible navigation, focus-visible styles
- ARIA labels for drawers, modals, and search autocomplete suggestions
- Sufficient contrast in both light/dark modes

## Project Structure
```
src/
  components/   # Layout, UI, catalog, cart, checkout
  data/         # Mock products
  services/     # HotPocket ContractService, hpClient, ApiService
  state/        # Zustand stores (cart, user, catalog)
  views/        # Pages
  app/          # Redux store for toast notifications
```

## Notes
- This app uses MemoryRouter to support iframe/sandbox environments reliably
- Uses BSON for contract payloads and implements promise mapping by promiseId
- Tailwind palette is configurable via tailwind.config.js

Enjoy building with Retail Market!
