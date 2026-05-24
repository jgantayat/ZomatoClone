# 🍽️ Zomato Clone — NGXS Mastery Roadmap (10 Days)

A complete, day-by-day learning plan to master **NGXS state management** by building a Zomato-like food delivery app.

---

## 🎯 Tech Stack

- **Angular 21** (standalone components, signals, zoneless)
- **NGXS v21** (state management)
- **NG-ZORRO v21** (UI components)
- **TypeScript 5+**
- **json-server** (fake REST API)
- **HTML5 / CSS3 / LESS**

---

## 🗺️ The 10-Day Roadmap

| Day | Focus | File |
|-----|-------|------|
| 1 | Foundation: project setup, json-server, NG-ZORRO, first `@State` | [day-01-foundation.md](./day-01-foundation.md) |
| 2 | Actions, Dispatch, StateContext, async API calls | [day-02-actions-dispatch.md](./day-02-actions-dispatch.md) |
| 3 | Selectors deep-dive: `@Selector`, Signals, memoization, joining | [day-03-selectors.md](./day-03-selectors.md) |
| 4 | State Operators: `patch`, `append`, `updateItem`, `removeItem`, `compose` | [day-04-state-operators.md](./day-04-state-operators.md) |
| 5 | Plugins Part 1: Logger + Devtools + Storage | [day-05-plugins-part1.md](./day-05-plugins-part1.md) |
| 6 | Plugins Part 2: Router plugin + Forms plugin | [day-06-plugins-part2.md](./day-06-plugins-part2.md) |
| 7 | Action Life Cycle: cancellation, Actions Stream, side effects | [day-07-action-lifecycle.md](./day-07-action-lifecycle.md) |
| 8 | Life-cycle hooks, lazy loading, feature states | [day-08-lifecycle-lazy.md](./day-08-lifecycle-lazy.md) |
| 9 | Advanced: Meta selectors, custom plugins, error handling | [day-09-advanced.md](./day-09-advanced.md) |
| 10 | Unit testing, optimisation, production polish | [day-10-testing-polish.md](./day-10-testing-polish.md) |

---

## 📂 Final Project Structure

```
zomato-clone/
├── db.json                              # json-server database
├── src/app/
│   ├── core/
│   │   ├── models/                      # Restaurant, MenuItem, Cart, Order, User
│   │   └── services/                    # HTTP services
│   ├── shared/state/                    # Global states (auth, cart)
│   ├── features/
│   │   ├── restaurants/state/
│   │   ├── menu/state/
│   │   ├── cart/state/
│   │   ├── orders/state/
│   │   └── user/state/
│   └── app.config.ts                    # provideStore + plugins
```

---

## ✅ How to use these files

1. Open **one file per day** — each is self-contained.
2. Tick the **checkboxes** as you complete each task.
3. Copy the code blocks into your project.
4. Use the **Reflection** section at the bottom to lock in learning.
5. Don't skip days — concepts build on each other.

---

## 🆘 Reference Links

- NGXS Docs → https://www.ngxs.io/
- NG-ZORRO Docs → https://ng.ant.design/docs/introduce/en
- Angular Docs → https://angular.dev/
- json-server → https://github.com/typicode/json-server

---

## 📊 Progress Tracker

- [ ] Day 1 — Foundation
- [ ] Day 2 — Actions & Dispatch
- [ ] Day 3 — Selectors
- [ ] Day 4 — State Operators
- [ ] Day 5 — Plugins Part 1
- [ ] Day 6 — Plugins Part 2
- [ ] Day 7 — Action Life Cycle
- [ ] Day 8 — Life-cycle & Lazy Loading
- [ ] Day 9 — Advanced Concepts
- [ ] Day 10 — Testing & Polish

Happy learning! 🚀