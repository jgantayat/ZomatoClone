---
description: Sync local main, create a feature branch, analyze changes, and open a Pull Request with a reviewed commit message and PR description — tailored for the Zomato NGXS 10-day learning project.
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git fetch:*), Bash(git pull:*), Bash(git checkout:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(git branch:*), Bash(git log:*), Bash(gh pr create:*), Bash(gh pr view:*), Bash(gh auth status:*)
---

## Run these commands first:

```
gh auth status
git status
git fetch origin
git diff HEAD origin/main --stat
git log --oneline -5
```

If `gh auth status` fails, STOP immediately and tell the user:
> "Run `gh auth login` first, then re-run `/commit-to-git`."

---

## Your task

You are about to execute the full Git workflow for the **Zomato NGXS 10-day learning project** — a documentation-and-code repo where progress is tracked across 10 markdown files (`day-01-foundation.md` … `day-10-testing-polish.md`) plus the actual Angular code being built day by day.

Follow every step **in order** and **never skip the approval gates**.

---

## Step 1 — Sync local `main` with remote

```
git checkout main
git pull origin main
```

Confirm `main` is now up to date. If there are merge conflicts, STOP and ask the user how to resolve.

---

## Step 2 — Create a feature branch

Inspect the staged/unstaged changes and choose a branch name that fits the project's nature.

### Branch naming rules for this project

Use kebab-case. Prefix based on **what kind of work** is being committed:

| Prefix | When to use | Example |
|--------|-------------|---------|
| `day-XX/` | Completing or progressing through a specific learning day | `day-03/selectors-deep-dive` |
| `feat/` | Adding a new app feature (cart, search, orders, etc.) | `feat/cart-state-operators` |
| `fix/` | Fixing a bug in the app or a typo in docs | `fix/restaurant-loading-flag` |
| `docs/` | Updates to the .md learning plan files only | `docs/clarify-day-05-storage` |
| `refactor/` | Restructuring code without behavior change | `refactor/extract-cart-selectors` |
| `chore/` | Build, deps, config (NG-ZORRO bumps, etc.) | `chore/bump-ngxs-21.1` |

```
git checkout -b <branch-name>
```

State the chosen branch name and **one-line reasoning** for the prefix.

---

## Step 3 — Analyze the changes

```
git status
git diff
git diff --staged
```

Produce a structured summary:

| Category | Details |
|----------|---------|
| **Day being worked on** | Identify which `day-XX-*.md` file (or files) are touched, if any |
| **New files** | List newly created files (grouped: `.md` learning files vs. `.ts/.html/.less` code files) |
| **Modified files** | Files with changes + brief description of what changed |
| **Deleted files** | Any removed files |
| **NGXS concepts touched** | If code files changed, name the concepts (e.g. "State Operators", "Actions Stream", "Selectors"). For docs-only, write "N/A". |
| **Key context** | The *why* — what learning milestone, feature, fix, or doc improvement this represents |

---

## Step 4 — Stage all changes

```
git add .
```

---

## Step 5 — Propose the commit message (APPROVAL GATE 1)

Compose the commit message using the conventions below.

### Commit types with emojis

Use ONLY these:

* ✨ `feat:` — New app feature or new NGXS concept implemented
* 🐛 `fix:` — Bug fix (code or doc)
* 🔨 `refactor:` — Refactoring code without behavior change
* 📝 `docs:` — Learning plan `.md` files, README, comments
* 🎨 `style:` — Formatting, NG-ZORRO theme tweaks
* ✅ `test:` — Unit tests / specs
* ⚡ `perf:` — Performance (memoisation, selector tuning, bundle size)
* 📚 `learn:` — Marking a learning day as complete or adding reflection notes
* 🔧 `chore:` — Dependencies, build config, json-server, env files

### Optional Day-tag suffix

If the commit relates to a specific learning day, append `[Day N]` to the description. This makes the history easy to scan.

### Format

```
<emoji> <type>: <concise description> [Day N]

<body — present tense, explain WHY, not just WHAT.
Reference the NGXS concept learned or applied where relevant.>
```

### Examples for this project

```
✨ feat: implement cart state with state operators [Day 4]

Adds CartState using patch, append, removeItem, and updateItem operators
from @ngxs/store/operators. Replaces verbose spread chains and demonstrates
the upsert pattern via a reusable custom operator.
```

```
📝 docs: tighten Day 7 cancellation explanation

Clarifies the abortSignal flow vs cancelUncompleted decorator option, and
adds a network-tab verification step so learners can SEE the cancellation.
```

```
📚 learn: complete Day 3 — selectors deep-dive

Tick all checklist items, fill in reflection answers, confirm signal-based
selects are wired through the restaurant list component.
```

```
🔧 chore: pin NG-ZORRO to 21.2.2

Aligns the NG-ZORRO version with Angular 21 to avoid peer dep warnings
on fresh installs.
```

> ⛔ **STOP — do NOT commit yet.**
> Present the proposed commit message to the user and ask:
> *"Does this commit message look good? Reply **yes** to commit, or suggest changes."*

Only proceed to Step 6 after the user explicitly approves.

---

## Step 6 — Commit and push

After approval:

```
git commit -m "<approved commit message>"
git push -u origin <branch-name>
```

The `-u` flag sets the upstream so future `git push` calls in this branch don't need arguments.

---

## Step 7 — Propose the Pull Request (APPROVAL GATE 2)

Compose the PR using the template below. Pull content from the Step 3 analysis and the approved commit message.

### PR format

```
Title:   <emoji> <type>: <same concise description> [Day N]

## Summary
<1–3 sentences: what this PR delivers and why.
If part of the 10-day plan, name the day and the NGXS concept(s) it covers.>

## Changes
- <bullet: file path — what changed and why>
- <bullet: ...>

## NGXS Concepts Demonstrated
<List concepts touched, e.g. "State Operators", "Actions Stream", "Lazy Loading".
Write "N/A — docs only" for pure-documentation PRs.>

## Type of Change
- [ ] ✨ New feature
- [ ] 🐛 Bug fix
- [ ] 🔨 Refactor
- [ ] 📝 Documentation
- [ ] 🎨 Style / formatting
- [ ] ✅ Tests
- [ ] ⚡ Performance
- [ ] 📚 Learning progress
- [ ] 🔧 Chore

## How to Verify
<Concrete steps a reviewer (or future-you) can take to see the change work.
For code: "Start json-server, run ng serve, open Redux DevTools, dispatch X, observe Y."
For docs: "Open day-XX-*.md and confirm section Z reads correctly.">

## Learning Progress (if applicable)
- [ ] Day N checklist items completed
- [ ] Reflection section filled in
- [ ] Reference links verified

## Notes for Reviewer
<Anything tricky, intentionally deferred, or worth flagging.>
```

> ⛔ **STOP — do NOT create the PR yet.**
> Present the full PR title and body to the user and ask:
> *"Does this Pull Request description look good? Reply **yes** to create the PR, or suggest changes."*

Only proceed to Step 8 after the user explicitly approves.

---

## Step 8 — Create the Pull Request

After approval:

```
gh pr create \
  --base main \
  --head <branch-name> \
  --title "<approved PR title>" \
  --body "<approved PR body>"
```

Then:

```
gh pr view
```

Display the PR URL clearly to the user.

---

## Output summary

After all steps complete, show this recap:

| Step | Status |
|------|--------|
| `gh` CLI authenticated | ✅ |
| Synced local `main` with remote | ✅ |
| Created feature branch | ✅ `<branch-name>` |
| Analyzed and staged changes | ✅ |
| Commit message approved & committed | ✅ |
| Pushed branch to remote | ✅ |
| PR description approved & PR created | ✅ |
| PR URL | `<url>` |
| Day touched (if any) | `Day N` or `—` |

---

## Rules

* **Never auto-commit** — always wait for user approval at **Gate 1**.
* **Never auto-create the PR** — always wait for user approval at **Gate 2**.
* Use **present tense** in commit messages and PR descriptions.
* Explain **why** the change was made, not just what.
* Use the **`[Day N]` suffix** when the change relates to a specific learning day — it keeps the 10-day journey traceable in `git log`.
* For docs-only changes to the learning plan, use `📝 docs:` or `📚 learn:` — never `✨ feat:`.
* If `gh` CLI is not authenticated, tell the user to run `gh auth login` first.
* If the user is already on a feature branch (not `main`) when `/commit-to-git` is invoked, ASK before switching — they may have intended to stay there.
* Never force-push (`--force` / `-f`). If the push is rejected, surface the error and let the user decide.