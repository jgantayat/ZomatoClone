# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                           # dev server at http://localhost:4200
npm run build                       # production build → dist/
npm test                            # run unit tests with Vitest
npm run watch                       # build in watch mode (development)
node dist/ZomatoClone/server/server.mjs  # run SSR server after build
```

To run a single test file:
```bash
npx ng test --include="src/app/path/to/file.spec.ts"
```

## Architecture

This is an Angular 21 **standalone component** app — no `NgModule` anywhere. All components declare their own `imports` array.

**SSR is enabled** via `@angular/ssr` + Express. There are two bootstrap entry points:
- `src/main.ts` — browser bootstrap
- `src/main.server.ts` + `src/server.ts` — SSR Express server

**State management uses Angular Signals** (`signal()`, `computed()`, `effect()`) rather than NgRx or a service+BehaviorSubject pattern. Services expose readonly signals and mutate them internally via `.set()` / `.update()`.

**Routing** is defined in `src/app/app.routes.ts` (client) and `src/app/app.routes.server.ts` (SSR route config). Features should use lazy-loaded routes.

**App config** (`src/app/app.config.ts`) is where global providers go — `provideHttpClient()`, interceptors via `withInterceptors([...])`, etc. The server-side config extends this in `app.config.server.ts`.

## Planned feature structure (from roadmap)

```
src/app/
├── core/
│   ├── models/         # interfaces (e.g. Post, User)
│   ├── services/       # injectable services with signal-based state
│   └── interceptors/   # HttpInterceptorFn functions
├── shared/
│   └── components/     # reusable UI components
└── features/           # lazy-loaded feature modules (one folder per route)
```

## Key conventions

- **No manual `.subscribe()`** in components for read-only data — use the `async` pipe or signals.
- **Dual-model pattern** for HTTP responses: define a raw API shape (e.g. `UserApiResponse`) and a trimmed app model (e.g. `User`); do the mapping in the service layer with `map()`.
- **`HttpInterceptorFn`** (functional style) — not class-based interceptors.
- Mutation HTTP methods (`POST`/`PUT`/`DELETE`) still return `Observable<T>` from services; use `tap()` inside the service to update the signal state so components never need to manage list updates.

## Formatting

Prettier is configured (`.prettierrc`): `printWidth: 100`, `singleQuote: true`, Angular HTML parser for `.html` files.

## Testing

Tests use **Vitest** (not Karma/Jasmine). Test files are `.spec.ts` co-located with their source. Use `TestBed` from `@angular/core/testing` as normal — the Angular test utilities are compatible.
