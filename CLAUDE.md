# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This is a **structured 10-day NGXS learning project** — a Zomato-like food delivery app built incrementally. Each day's branch adds specific NGXS concepts. Don't add features or abstractions beyond what the current day's scope requires; the project intentionally starts minimal and grows.

## Commands

```bash
npm start                        # dev server at http://localhost:4200
npm run build                    # production build → dist/
npm test                         # run unit tests with Vitest
npm run watch                    # build in watch mode (development)
npm run api                      # mock REST API via json-server at http://localhost:3000
npm run serve:ssr:ZomatoClone    # run SSR server after build
```

To run a single test file:
```bash
npx ng test --include="src/app/path/to/file.spec.ts"
```

There is no `npm run lint` script defined.

## Architecture

This is an Angular 21 **standalone component** app — no `NgModule` anywhere. All components declare their own `imports` array.

**Zoneless change detection** is enabled via `provideZonelessChangeDetection()` — do not rely on Zone.js-based triggering.

**SSR is enabled** via `@angular/ssr` + Express. Two bootstrap entry points:
- `src/main.ts` — browser bootstrap
- `src/main.server.ts` + `src/server.ts` — SSR Express server

**State management uses NGXS** (`@ngxs/store`), not NgRx or signals services. The store is registered in `app.config.ts` via `provideStore([...states])`. NGXS plugins available: `@ngxs/devtools-plugin`, `@ngxs/logger-plugin`, `@ngxs/storage-plugin`.

`developmentMode: true` is set in `provideStore()`, which deep-freezes state objects — any direct mutation will throw at runtime.

**UI components** use `ng-zorro-antd` (Ant Design for Angular). Import `Nz*Module`s in the component's `imports` array as needed.

**Mock API** — `db.json` in the project root is served by `json-server` on port 3000 (`npm run api`). Services should point to `http://localhost:3000` during development. The db has these top-level resources: `restaurants`, `menuItems`, `cart`, `orders`, `users`, `addresses`, `favorites`.

**Routing** is defined in `src/app/app.routes.ts` (client) and `src/app/app.routes.server.ts` (SSR). Features use lazy-loaded routes.

## Feature structure

Planned final structure (built up day by day):

```
src/app/
├── core/
│   ├── models/          # Restaurant, MenuItem, Cart, Order, User
│   └── services/        # HTTP services (one per resource)
├── shared/state/        # Global states: auth, cart
└── features/
    ├── restaurants/state/
    ├── menu/state/
    ├── cart/state/
    ├── orders/state/
    └── user/state/
```

Each feature lives under `src/app/features/<feature>/` and has a `state/` subfolder:

```
features/restaurants/
├── state/
│   ├── restaurants.actions.ts   # action classes in a namespace
│   └── restaurants.state.ts     # @State class + selectors
├── components/                  # feature-specific components
└── restaurants.routes.ts        # lazy route config
```

## NGXS conventions

**Actions** — group in a namespace, use descriptive `type` strings:
```ts
export namespace RestaurantActions {
  export class LoadAll {
    static readonly type = '[Restaurants API] Load All';
  }
}
```

**State** — typed with a `StateModel` interface, decorated with `@State<T>` and `@Injectable()`:
```ts
@State<RestaurantStateModel>({ name: 'restaurant', defaults: { ... } })
@Injectable()
export class RestaurantState {}
```

**Selectors** — use `@Selector()` inside the state class; access via `store.select(RestaurantState.someSelector)` or the `@Select()` decorator in components.

**Dispatch** — inject `Store` and call `store.dispatch(new RestaurantActions.LoadAll())`. Action side-effects go in `@Action` handlers in the state class, not in components.

**State operators** — import from `@ngxs/store` (`patch`, `append`, `updateItem`, `removeItem`, `compose`) and use inside `StateContext.setState()` to produce new state immutably.

## Key conventions

- **Dual-model pattern** for HTTP responses: define a raw API shape (e.g. `RestaurantApiResponse`) and a trimmed app model (e.g. `Restaurant`); map in the service layer.
- **`HttpInterceptorFn`** (functional style) — not class-based interceptors. Register in `app.config.ts` via `withInterceptors([...])`.
- Models go in `src/app/core/models/`, services in `src/app/core/services/`.

## Formatting

Prettier is configured (`.prettierrc`): `printWidth: 100`, `singleQuote: true`, Angular HTML parser for `.html` files.

## Testing

Tests use **Vitest** (not Karma/Jasmine). Test files are `.spec.ts` co-located with their source. Use `TestBed` from `@angular/core/testing` as normal.
