**Purpose**
- **Goal:** Help AI coding agents be productive immediately in this repository: a small static web client hosted with Firebase.

**Project Overview**
- **Type:** Static single-page client (HTML/CSS/JS) located in `public/`.
- **Key files:** `public/index.html` (markup), `public/script.js` (app logic), `public/main.css` (styles), `public/assets/` (images).
- **Deployment:** Firebase Hosting; configuration in `firebase.json` and rules in `database.rules.json`.

**Architecture & Why**
- **Simple static site:** No backend code in this repo; client-side logic runs in `public/script.js` and any dynamic behavior is expected to be implemented via Firebase services or external APIs.
- **Firebase-centric workflow:** Changes to `public/` are deployed via Firebase CLI (`firebase deploy --only hosting`). Keep `firebase.json` in sync when modifying hosting configuration.

**Developer Workflows**
- **Local preview:** Serve the `public/` folder with a static server. Example: `npx serve public` or `python3 -m http.server --directory public 8000`.
- **Deploy to hosting:** `firebase deploy --only hosting` (requires Firebase CLI auth and correct project alias in `.firebaserc` or environment).
- **Database rules:** Update `database.rules.json` only when changing security rules; validate with `firebase emulators:start --only database` when available.

**Conventions & Patterns**
- **Single-entry UI:** All UI is in `index.html` and wired in `script.js` — prefer minimal DOM changes and small, well-scoped functions.
- **Assets:** Place new images in `public/assets/` and reference them via relative paths from `index.html` or CSS.
- **No build step:** There is currently no bundler, transpiler, or package manifest; avoid introducing a build system unless necessary and discuss with maintainers first.

**Integration Points**
- **Firebase:** `firebase.json` controls hosting; look there for redirects, rewrites, or headers you must preserve.
- **Third-party APIs:** Any network calls will be visible in `public/script.js`. If adding secrets, do not commit them—use Firebase Functions or remote services for server-side secret storage.

**What to Change Where (Examples)**
- **Add UI element:** Edit `public/index.html` to add markup, and `public/main.css` for styles; wire behavior in `public/script.js`.
- **Change images:** Put files in `public/assets/` and update `src` attributes in `index.html` or CSS `url()` references.
- **Update hosting rules:** Modify `firebase.json` and run a local preview before deploying.

**Files to Inspect First**
- `public/index.html` — starting point for layout and markup.
- `public/script.js` — primary app logic and network calls.
- `public/main.css` — site design tokens and layout rules.
- `firebase.json`, `database.rules.json` — hosting and DB rules.

**Restrictions / Do Not Do**
- Do not add committed secrets or environment keys to this repo.
- Do not add a complex build pipeline without discussion; this repo is intentionally simple.

**If you need more context**
- Ask the maintainer which Firebase project alias to use for deploys and whether an emulator/test harness exists.

**Feedback request**
- If any repository-specific conventions are missing or inaccurate, please tell me what to add.
