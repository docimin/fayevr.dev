# fayevr.dev 3D Rebuild on TanStack Start - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild fayevr.dev on TanStack Start with a scroll-driven 3D circuit-field background that never blocks first paint, and remove Appwrite and the boop counter.

**Architecture:** Next.js App Router is replaced by TanStack Start (Vite + Nitro) with file-based routes under `src/routes/`. Appwrite-backed data becomes static typed modules in `src/data/`. A single fixed React Three Fiber canvas mounts once in the root route, lazy-loaded after first paint behind a capability tier check, with an inline SVG fallback that ships in the initial HTML.

**Tech Stack:** TanStack Start 1.168, TanStack Router 1.170, React 19, Vite 8, Tailwind v4 (`@tailwindcss/vite`), three 0.185 + `@react-three/fiber` 9.6 + `@react-three/drei` 10.7, cmdk 1.1, Vitest 4.

Spec: `docs/superpowers/specs/2026-07-23-fayevr-3d-tanstack-design.md`

## Global Constraints

- **No git commits.** The user asked for local-only changes. Every task ends with a verification step, not a commit. Leave all work in the working tree.
- Package manager and runner is **bun** (1.3.14, `bun.lock`). Never pnpm, npm, or yarn. Use `bun add` / `bun add -d` / `bun remove`, `bun run <script>` for package scripts, and `bunx <bin>` for one-off binaries.
- Lint and format are **Biome only** (`biome.json`, `@biomejs/biome` 2.5). No eslint, no prettier. `bun run lint` is `biome check .` and must exit 0 with zero errors and zero warnings; `bun run format` is `biome check --write .`. Let the formatter format - do not hand-format.
- Biome style, configured in `biome.json`: no semicolons, single quotes, double quotes in JSX, 2-space indent, es5 trailing commas, 80-column lines.
- Biome's recommended a11y rules are enforced. Decorative SVG gets `aria-hidden="true"`; interactive elements must be real `<button type="button">` or anchors with a real `href`. Do not silence a rule by adding files to `biome.json`'s ignore list - fix the code.
- Comments only where the *why* is non-obvious. No banner comments, no comments restating code.
- All styling goes through existing design tokens in `css/globals.css`. No arbitrary Tailwind values (`foo-[...]`), no new raw hex at call sites. Extend the theme instead.
- Never use em dashes or en dashes in code, copy, or docs. Plain hyphens only.
- `tsconfig.json` keeps `"strict": false` - deliberately carried over to keep this rebuild scoped. Do not flip it.
- The canvas must never appear in the initial JS bundle. Any task that adds a static `import` of `three`, `@react-three/fiber`, or `@react-three/drei` into a module reachable from `__root.tsx` is wrong.
- Do not delete `public/` assets. Fonts, sounds, videos, and images all stay.

---

## File Structure

**Created:**

| Path | Responsibility |
|---|---|
| `vite.config.ts` | Vite + TanStack Start + Tailwind plugins |
| `vitest.config.ts` | Test runner config (jsdom) |
| `src/router.tsx` | Router factory |
| `src/routes/__root.tsx` | HTML document, providers, chrome, canvas mount |
| `src/routes/index.tsx` | Home |
| `src/routes/projects/index.tsx` | Projects table |
| `src/routes/projects/suggestions-bot/{index,privacy,terms}.tsx` | Ported static pages |
| `src/routes/{doom,light,ef}.tsx` | Ported toy pages |
| `src/routes/api/{getStatus,health}.ts` | Server routes |
| `src/routes/sitemap[.]xml.ts`, `src/routes/robots[.]txt.ts` | SEO server routes |
| `src/components/theme/ThemeProvider.tsx` | Theme state, replaces next-themes |
| `src/components/theme/theme-script.ts` | Blocking anti-FOUC snippet |
| `src/data/projects.ts` | Static project rows + sort |
| `src/data/stack.ts` | Static tech stack groups |
| `src/lib/perf/tier.ts` | Capability detection and tier resolution |
| `src/components/circuit/geometry.ts` | Pure geometry builder (no three imports) |
| `src/components/circuit/CircuitFieldMount.tsx` | Tier gate, idle mount, fallback swap |
| `src/components/circuit/CircuitFallback.tsx` | Static SVG field |
| `src/components/circuit/CircuitField.tsx` | R3F canvas (lazy chunk boundary) |
| `src/components/circuit/useFieldProgress.ts` | Ref-based scroll/pointer driver |
| `src/components/nav/MobileNav.tsx` | Bottom bar for phones |
| `src/components/CommandPalette.tsx` | cmdk palette, replaces `menu.tsx` |
| `src/components/sound/useClickSound.ts` | Opt-in click sound |

**Deleted:** `src/app/**` (entire tree, after ports), `src/components/boopCounter.tsx`, `src/components/techExperienceVoting.tsx`, `src/components/data/categories.tsx`, `src/components/menu.tsx`, `src/lib/server-calls.ts`, `src/lib/actions/`, `src/hooks/click.js`, `next.config.ts`, `postcss.config.mjs`, `.eslintrc.json`.

---

## Phase 1 - Scaffold and route parity

### Task 1: Vite + TanStack Start scaffold

**Files:**
- Create: `vite.config.ts`, `vitest.config.ts`, `eslint.config.js`, `src/router.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `test/setup.ts`
- Modify: `package.json`, `tsconfig.json`, `.gitignore`
- Delete: `next.config.ts`, `postcss.config.mjs`, `.eslintrc.json`

**Interfaces:**
- Produces: `getRouter()` from `src/router.tsx`; route module convention `createFileRoute('<path>')({ component })`.

- [ ] **Step 1: Swap dependencies**

```bash
bun remove next next-themes next-navigation eslint-config-next appwrite node-appwrite wrangler @headlessui/react @tailwindcss/postcss postcss
bun add @tanstack/react-start@^1.168.32 @tanstack/react-router@^1.170.18 @tailwindcss/vite@^4.1.10 cmdk@^1.1.1
bun add -d vite@^8.1.5 @vitejs/plugin-react vitest@^4.1.10 jsdom @testing-library/react @testing-library/jest-dom @types/three nitro typescript-eslint eslint-plugin-react-hooks @eslint/js
```

`three`, `@react-three/fiber`, and `@react-three/drei` are deliberately **not**
installed here. They arrive in Task 17, so that any accidental static import
before then fails loudly instead of silently bloating the entry bundle.

- [ ] **Step 2: Rewrite package.json scripts**

Replace the `scripts` block with:

```json
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "start": "node .output/server/index.mjs",
    "test": "vitest run",
    "lint": "biome check .",
    "format": "biome check --write ."
  },
```

Delete the `preview`, `deploy`, and `cf-typegen` scripts entirely - Cloudflare is gone.

- [ ] **Step 3: Write vite.config.ts**

```ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    // node-server emits .output/server/index.mjs, which the Dockerfile runs.
    nitro({ preset: 'node-server' }),
    viteReact(),
  ],
})
```

The react plugin must come last. The `node-server` preset is what keeps the
existing Docker/Harbor pipeline working unchanged.

- [ ] **Step 4: Update tsconfig.json**

Change `"jsx": "preserve"` to `"jsx": "react-jsx"`, delete the `"plugins": [{ "name": "next" }]` block, and change `include` to `["**/*.ts", "**/*.tsx"]` (drop `next-env.d.ts` and `.next/types/**/*.ts`). Leave `strict: false` and the `@/*` path alias alone.

- [ ] **Step 5: Write src/router.tsx**

```tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({ routeTree, scrollRestoration: true })
}
```

- [ ] **Step 6: Write src/routes/__root.tsx**

```tsx
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import '../../css/globals.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Faye | Portfolio' },
      {
        name: 'description',
        content:
          "Faye's personal portfolio website. A place to showcase my projects and skills.",
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className="h-full" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-full bg-white antialiased dark:bg-black tracking-widest">
        <div className="w-full">{children}</div>
        <Scripts />
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Write a placeholder home route**

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <h1 className="text-black dark:text-white">fayevr.dev</h1>
}
```

- [ ] **Step 8: Write vitest.config.ts and test setup**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [viteReact()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    // Tasks 1-5 add no tests; without this the script exits 1 and fails the gate.
    passWithNoTests: true,
  },
  resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
})
```

```ts
// test/setup.ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 9: Replace the ESLint config**

**SUPERSEDED.** This step originally set up a flat ESLint config. The project
moved to Biome after Task 3; `eslint.config.js` was deleted, eslint/prettier
uninstalled, and `biome.json` written in their place. The historical ESLint
content is kept below only so the change is traceable - do not recreate it.

`.eslintrc.json` contained only `{ "extends": "next/core-web-vitals" }`, which
stops resolving once `eslint-config-next` is uninstalled. It was deleted and
replaced with a flat config:

```js
// eslint.config.js
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(
  {
    // src/app, src/components and src/hooks still hold un-ported Next code that
    // this task must not touch. Later tasks delete these trees; drop each ignore
    // as its tree goes (all three must be gone by Task 20).
    ignores: [
      '.output',
      '.nitro',
      '.tanstack',
      'src/routeTree.gen.ts',
      'src/app',
      'src/components',
      'src/hooks',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs.recommended.rules,
  }
)
```

- [ ] **Step 10: Ignore generated route tree**

Append to `.gitignore`:

```
# TanStack Router generated
src/routeTree.gen.ts
.output
.nitro
.tanstack
```

- [ ] **Step 11: Verify dev server boots and generates the route tree**

Run: `bun run dev`
Expected: Vite starts on port 3000, `src/routeTree.gen.ts` appears, `http://localhost:3000` renders "fayevr.dev". Stop the server.

- [ ] **Step 12: Verify build, lint, and test runner**

Run: `bun run build && bun run lint && bun run test`
Expected: build writes `.output/server/index.mjs`; lint exits 0; vitest exits 0 reporting "No test files found" (acceptable at this stage).

---

### Task 2: Theme provider replacing next-themes

**Files:**
- Create: `src/components/theme/theme-script.ts`, `src/components/theme/ThemeProvider.tsx`, `src/components/theme/ThemeProvider.test.tsx`
- Modify: `src/routes/__root.tsx`
- Delete: `src/components/providers.tsx`

**Interfaces:**
- Consumes: root route from Task 1.
- Produces: `<ThemeProvider>`, `useTheme(): { theme: 'light' | 'dark', setTheme(t): void, toggle(): void }`, and `THEME_SCRIPT: string`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/theme/ThemeProvider.test.tsx
import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeProvider, useTheme } from './ThemeProvider'

function Probe() {
  const { theme, toggle } = useTheme()
  return (
    <button onClick={toggle} data-testid="probe">
      {theme}
    </button>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('defaults to light when nothing is stored', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    )
    expect(screen.getByTestId('probe')).toHaveTextContent('light')
  })

  it('reads the persisted theme', () => {
    localStorage.setItem('theme', 'dark')
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    )
    expect(screen.getByTestId('probe')).toHaveTextContent('dark')
  })

  it('toggling writes the class and persists', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    )
    act(() => screen.getByTestId('probe').click())
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bunx vitest run src/components/theme/ThemeProvider.test.tsx`
Expected: FAIL - cannot resolve `./ThemeProvider`.

- [ ] **Step 3: Write the blocking script**

```ts
// src/components/theme/theme-script.ts
export const THEME_STORAGE_KEY = 'theme'

// Runs before paint so the persisted theme never flashes.
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`
```

- [ ] **Step 4: Write the provider**

```tsx
// src/components/theme/ThemeProvider.tsx
import * as React from 'react'
import { THEME_STORAGE_KEY } from './theme-script'

type Theme = 'light' | 'dark'
type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggle: () => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  if (document.documentElement.classList.contains('dark')) return 'dark'
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return stored === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(readInitialTheme)

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    localStorage.setItem(THEME_STORAGE_KEY, next)
  }, [])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    }),
    [theme, setTheme]
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}

export function useTheme() {
  const ctx = React.use(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `bunx vitest run src/components/theme/ThemeProvider.test.tsx`
Expected: 3 passing.

- [ ] **Step 6: Wire into the root route**

In `src/routes/__root.tsx`, import `ThemeProvider` and `THEME_SCRIPT`, add the script to the route `head` as `scripts: [{ children: THEME_SCRIPT }]`, and wrap `{children}` in `<ThemeProvider>`.

- [ ] **Step 7: Delete the old provider**

```bash
rm src/components/providers.tsx
```

- [ ] **Step 8: Verify no FOUC**

Run: `bun run dev`, load `http://localhost:3000`, set theme to dark via devtools `localStorage.setItem('theme','dark')`, hard reload.
Expected: page paints dark immediately with no white flash.

---

### Task 3: Port shared chrome

**Files:**
- Create: `src/components/pages/Header.tsx`, `src/components/pages/SideLeft.tsx`, `src/components/pages/SideRight.tsx`, `src/components/ContextMenuProvider.tsx`, `src/components/StatusAvatar.tsx`
- Delete: `src/components/pages/mainHeader.tsx`, `src/components/pages/side-left.tsx`, `src/components/pages/side-right.tsx`, `src/components/contextMenu.tsx`, `src/components/statusFetch.tsx`

**Interfaces:**
- Consumes: `useTheme` from Task 2.
- Produces: `<Header />`, `<SideLeft />`, `<SideRight />`, `<ContextMenuProvider>`, `<StatusAvatar />`.

- [ ] **Step 1: Port the three chrome components**

Copy `mainHeader.tsx`, `side-left.tsx`, `side-right.tsx` to their new PascalCase paths. In each: delete `'use client'`, and replace `import Link from 'next/link'` with `import { Link } from '@tanstack/react-router'`. Internal links change `href` to `to` (`<Link to="/projects">`). External links stay plain `<a href=... target="_blank" rel="noreferrer">` - router `Link` is for internal routes only.

Keep all SVG rail markup byte-for-byte. It is the motif the 3D field is derived from.

- [ ] **Step 2: Port the context menu**

Copy `contextMenu.tsx` to `src/components/ContextMenuProvider.tsx`, drop `'use client'`, swap `next/link` for router `Link` with `to`.

- [ ] **Step 3: Port the status avatar and fix the broken colors**

Create `src/components/StatusAvatar.tsx` from `statusFetch.tsx` with three changes. Replace `next/image` with a plain `<img>` carrying explicit `width={75} height={75}`. Replace the interpolated `bg-${color}` classes - Tailwind v4's scanner cannot see them, so those dots render unstyled today - with a static map:

```tsx
// Named PRESENCE_CLASS, not STATUS_CLASS - src/data/projects.ts exports a
// STATUS_CLASS for project rows, which is a different thing.
const PRESENCE_CLASS: Record<string, string> = {
  online: 'bg-green',
  idle: 'bg-yellow',
  dnd: 'bg-red',
  offline: 'bg-gray',
}
const presenceClass = PRESENCE_CLASS[status] ?? PRESENCE_CLASS.offline
```

Use `presenceClass` on both the ping span and the solid dot. Then back the poll off from 10s to 30s and pause it while hidden:

```tsx
React.useEffect(() => {
  let timer: ReturnType<typeof setInterval> | undefined

  const start = () => {
    if (timer) return
    fetchStatus()
    timer = setInterval(fetchStatus, 30000)
  }
  const stop = () => {
    clearInterval(timer)
    timer = undefined
  }
  const onVisibility = () =>
    document.visibilityState === 'visible' ? start() : stop()

  onVisibility()
  document.addEventListener('visibilitychange', onVisibility)
  return () => {
    stop()
    document.removeEventListener('visibilitychange', onVisibility)
  }
}, [])
```

Keep the `boop :3` click tooltip exactly as it is. It is a separate easter egg from the removed boop counter.

- [ ] **Step 4: Delete the old files**

```bash
rm src/components/pages/mainHeader.tsx src/components/pages/side-left.tsx src/components/pages/side-right.tsx src/components/contextMenu.tsx src/components/statusFetch.tsx
```

- [ ] **Step 5: Verify**

Wire `<ContextMenuProvider>` into `__root.tsx` around `{children}` and render `<Header />` + both rails in `src/routes/index.tsx`. Run `bun run dev`.
Expected: chrome renders, rails show, right-click opens the custom menu, status dot is visibly colored (not transparent).

---

### Task 4: Port remaining page routes

**Files:**
- Create: `src/routes/doom.tsx`, `src/routes/light.tsx`, `src/routes/ef.tsx`, `src/routes/projects/suggestions-bot/{index,privacy,terms}.tsx`, `src/components/LightBulb.tsx`
- Delete: `src/app/doom/`, `src/app/light/`, `src/app/ef/`, `src/app/projects/suggestions-bot/`, `src/components/lightBulb.tsx`, `src/app/loading.tsx`

**Interfaces:**
- Consumes: chrome components from Task 3, `useTheme` from Task 2.

- [ ] **Step 1: Port doom, ef, and the suggestions-bot pages**

Each becomes a route module. Copy the JSX body verbatim, drop `'use client'`, swap link imports. Example shape:

```tsx
// src/routes/doom.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/doom')({
  head: () => ({ meta: [{ title: 'Doom | Faye' }] }),
  component: Doom,
})

function Doom() {
  /* body copied from src/app/doom/page.tsx */
}
```

The privacy and terms pages are static JSX with no imports beyond links - copy them straight across.

- [ ] **Step 2: Port the lightbulb component off next-themes**

Create `src/components/LightBulb.tsx` from `lightBulb.tsx`. Replace `import { useTheme } from 'next-themes'` with `import { useTheme } from '@/components/theme/ThemeProvider'`, and change `resolvedTheme` to `theme` at all four use sites. Delete the `console.log(resolvedTheme)` line. Leave the video timing constants alone.

- [ ] **Step 3: Port the light route**

`src/routes/light.tsx` mirrors `src/app/light/page.tsx`, importing the new `LightBulb`.

- [ ] **Step 4: Delete the ported originals**

```bash
rm -rf src/app/doom src/app/light src/app/ef src/app/projects/suggestions-bot src/components/lightBulb.tsx src/app/loading.tsx
```

- [ ] **Step 5: Verify every route responds**

Run `bun run dev`, then in a second shell:

```bash
for p in / /doom /light /ef /projects/suggestions-bot /projects/suggestions-bot/privacy /projects/suggestions-bot/terms; do printf "%s " "$p"; curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000$p"; done
```

Expected: `200` for all seven.

---

### Task 5: Server routes

**Files:**
- Create: `src/routes/api/health.ts`, `src/routes/api/getStatus.ts`, `src/routes/sitemap[.]xml.ts`, `src/routes/robots[.]txt.ts`
- Delete: `src/app/api/`, `src/app/sitemap.ts`, `src/app/robots.ts`

**Interfaces:**
- Produces: `GET /api/health`, `GET /api/getStatus`, `GET /sitemap.xml`, `GET /robots.txt`.

- [ ] **Step 1: Write the health route**

```ts
// src/routes/api/health.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/health')({
  server: {
    handlers: {
      GET: async () => Response.json({ status: 'ok' }),
    },
  },
})
```

- [ ] **Step 2: Write the status proxy**

```ts
// src/routes/api/getStatus.ts
import { createFileRoute } from '@tanstack/react-router'

const STATUS_URL =
  'https://api1.fayevr.dev/getstatus?member=196742608846979072'

export const Route = createFileRoute('/api/getStatus')({
  server: {
    handlers: {
      GET: async () => {
        const response = await fetch(STATUS_URL, {
          headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
          return Response.json(
            { message: 'Upstream status request failed' },
            { status: response.status }
          )
        }

        return Response.json(await response.json(), {
          headers: { 'Cache-Control': 'public, max-age=15' },
        })
      },
    },
  },
})
```

The original swallowed upstream failures into a generic 500 and had a bare `catch` returning `NextResponse.error()`. Propagating the upstream status is the fix; do not add a catch that hides a thrown fetch.

- [ ] **Step 3: Write sitemap and robots**

```ts
// src/routes/sitemap[.]xml.ts
import { createFileRoute } from '@tanstack/react-router'

const PATHS = ['', '/projects']

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const urls = PATHS.map(
          (path) =>
            `<url><loc>https://fayevr.dev${path}</loc><changefreq>yearly</changefreq><priority>1.0</priority></url>`
        ).join('')

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
          { headers: { 'Content-Type': 'application/xml' } }
        )
      },
    },
  },
})
```

```ts
// src/routes/robots[.]txt.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          'User-agent: *\nAllow: /\n\nSitemap: https://fayevr.dev/sitemap.xml\n',
          { headers: { 'Content-Type': 'text/plain' } }
        ),
    },
  },
})
```

- [ ] **Step 4: Delete the Next equivalents**

```bash
rm -rf src/app/api src/app/sitemap.ts src/app/robots.ts
```

- [ ] **Step 5: Verify all four**

With `bun run dev` running:

```bash
curl -s localhost:3000/api/health; echo; curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/api/getStatus; curl -s localhost:3000/robots.txt; curl -s localhost:3000/sitemap.xml | head -c 120; echo
```

Expected: `{"status":"ok"}`, a `200`, the robots body, and valid XML opening with `<?xml`.

---

## Phase 2 - Removals and static data

### Task 6: Static project data and sorting

**Files:**
- Create: `src/data/projects.ts`, `src/data/projects.test.ts`

**Interfaces:**
- Produces: `type Project`, `PROJECTS: Project[]`, `sortProjects(projects: Project[]): Project[]`, `STATUS_ORDER: Project['status'][]`, `STATUS_CLASS: Record<Project['status'], string>`.

- [ ] **Step 1: Write the failing test**

```ts
// src/data/projects.test.ts
import { describe, it, expect } from 'vitest'
import { sortProjects, STATUS_ORDER, PROJECTS, type Project } from './projects'

const make = (name: string, status: Project['status']): Project => ({
  name,
  status,
  private: false,
  createdAt: '2024-01-01',
})

describe('sortProjects', () => {
  it('orders by declared status rank before name', () => {
    const sorted = sortProjects([
      make('b', 'Archived'),
      make('a', 'Ongoing'),
      make('c', 'Completed'),
    ])
    expect(sorted.map((p) => p.name)).toEqual(['a', 'c', 'b'])
  })

  it('falls back to name within one status', () => {
    const sorted = sortProjects([
      make('zeta', 'Ongoing'),
      make('alpha', 'Ongoing'),
    ])
    expect(sorted.map((p) => p.name)).toEqual(['alpha', 'zeta'])
  })

  it('does not mutate its input', () => {
    const input = [make('b', 'Archived'), make('a', 'Ongoing')]
    sortProjects(input)
    expect(input.map((p) => p.name)).toEqual(['b', 'a'])
  })

  it('every seeded project uses a known status', () => {
    for (const project of PROJECTS) {
      expect(STATUS_ORDER).toContain(project.status)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bunx vitest run src/data/projects.test.ts`
Expected: FAIL - cannot resolve `./projects`.

- [ ] **Step 3: Write the data module**

```ts
// src/data/projects.ts
export type ProjectStatus =
  | 'Ongoing'
  | 'Maintenance'
  | 'Pending'
  | 'Completed'
  | 'Online'
  | 'Error'
  | 'Paused'
  | 'Archived'

export type Project = {
  name: string
  status: ProjectStatus
  gitRepo?: string
  branch?: string
  customUrl?: string
  private: boolean
  image?: string
  createdAt: string
}

export const STATUS_ORDER: ProjectStatus[] = [
  'Ongoing',
  'Maintenance',
  'Pending',
  'Completed',
  'Online',
  'Error',
  'Paused',
  'Archived',
]

export const STATUS_CLASS: Record<ProjectStatus, string> = {
  Ongoing: 'text-yellow-400 bg-yellow-400/10',
  Maintenance: 'text-yellow-400 bg-yellow-400/10',
  Pending: 'text-red-400 bg-red-400/10',
  Completed: 'text-green-400 bg-green-400/10',
  Online: 'text-green-400 bg-green-400/10',
  Error: 'text-rose-400 bg-rose-400/10',
  Paused: 'text-gray-400 bg-gray-400/10',
  Archived: 'text-orange-400 bg-orange-400/10',
}

export const PROJECTS: Project[] = [
  {
    name: 'fayevr.dev',
    status: 'Ongoing',
    gitRepo: 'https://github.com/docimin/fayevr.dev',
    branch: 'main',
    customUrl: 'https://fayevr.dev',
    private: false,
    createdAt: '2023-01-01',
  },
  {
    name: 'headpat.de',
    status: 'Ongoing',
    private: false,
    customUrl: 'https://headpat.de',
    createdAt: '2023-06-01',
  },
]

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const rank =
      STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
    return rank !== 0 ? rank : a.name.localeCompare(b.name)
  })
}
```

**The `PROJECTS` array above is a two-row placeholder, and it is the one piece of this rebuild that cannot be verified from the repo.** The real rows live only in Appwrite. Before this task is considered done, transcribe the live rows from the production `fayevr.dev/projects` table (or an Appwrite export) into this array. Flag to the user that the list needs their review.

- [ ] **Step 4: Run test to verify it passes**

Run: `bunx vitest run src/data/projects.test.ts`
Expected: 4 passing.

---

### Task 7: Projects route on static data, Appwrite deleted

**Files:**
- Create: `src/routes/projects/index.tsx`
- Delete: `src/app/projects/`, `src/app/appwrite-client.ts`, `src/app/appwrite-server.ts`, `src/lib/server-calls.ts`, `src/lib/actions/`, `src/lib/types/projects.ts`
- Modify: `.env.example`

**Interfaces:**
- Consumes: `PROJECTS`, `sortProjects`, `STATUS_CLASS` from Task 6; chrome from Task 3.

- [ ] **Step 1: Write the route**

Port the table markup from `src/app/projects/page.client.tsx`, with these changes: no `useState`/`useEffect`/`getProjects` - call `sortProjects(PROJECTS)` directly at module render; delete the entire `skeletonRows` block and the `projects.length ?` ternary, since static data is never pending; replace the local `statuses` object with the imported `STATUS_CLASS`; replace `item.$createdAt` with `item.createdAt`; replace `item.imageId` with `item.image`; `next/link` becomes router `Link`.

Wrap in the same `SideLeft` / `Header` / `SideRight` shell used by the other routes, and set `head: () => ({ meta: [{ title: 'Projects | Faye' }, { name: 'description', content: "Projects I've worked on in the past or current." }] })`.

- [ ] **Step 2: Delete Appwrite entirely**

```bash
rm -rf src/app/projects src/app/appwrite-client.ts src/app/appwrite-server.ts src/lib/server-calls.ts src/lib/actions src/lib/types/projects.ts
```

- [ ] **Step 3: Empty the Appwrite env vars**

Replace the whole contents of `.env.example` with a single trailing newline comment, since no runtime env vars remain:

```
# No runtime environment variables are required.
```

- [ ] **Step 4: Verify nothing references Appwrite**

```bash
grep -rn "appwrite\|Appwrite\|NEXT_PUBLIC_PROJECT_ID\|NEXT_PUBLIC_DOMAIN_BACKEND" src/ css/ *.ts *.json .env.example 2>/dev/null || echo "CLEAN"
```

Expected: `CLEAN`.

- [ ] **Step 5: Verify the page renders**

Run `bun run dev`, load `http://localhost:3000/projects`.
Expected: table renders every row from `PROJECTS` immediately, no skeleton flash, status dots colored.

---

### Task 8: Stack section replaces voting, boop counter removed

**Files:**
- Create: `src/data/stack.ts`, `src/components/StackShowcase.tsx`
- Modify: `src/routes/index.tsx`
- Delete: `src/components/boopCounter.tsx`, `src/components/techExperienceVoting.tsx`, `src/components/data/categories.tsx`

**Interfaces:**
- Consumes: nothing from prior tasks.
- Produces: `type StackGroup`, `STACK: StackGroup[]`, `<StackShowcase />`.

- [ ] **Step 1: Write the data module**

Lift the names out of `src/components/data/categories.tsx` before deleting it, dropping the vote counts and moving the icon to a name the component resolves:

```ts
// src/data/stack.ts
export type StackGroup = {
  id: string
  name: string
  icon: 'layers' | 'code' | 'database' | 'cpu'
  items: string[]
}

export const STACK: StackGroup[] = [
  {
    id: 'frameworks',
    name: 'Frameworks',
    icon: 'layers',
    items: ['React', 'Next.js', 'Vue.js', 'Angular', 'Svelte'],
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: 'code',
    items: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go'],
  },
  {
    id: 'databases',
    name: 'Databases',
    icon: 'database',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase'],
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: 'cpu',
    items: ['Docker', 'Git', 'VS Code', 'GitHub Actions', 'Vercel'],
  },
]
```

- [ ] **Step 2: Write the showcase component**

```tsx
// src/components/StackShowcase.tsx
import { Code2, Cpu, Database, Layers } from 'lucide-react'
import { STACK, type StackGroup } from '@/data/stack'

const ICONS = {
  layers: Layers,
  code: Code2,
  database: Database,
  cpu: Cpu,
} satisfies Record<StackGroup['icon'], unknown>

export default function StackShowcase() {
  return (
    <div className="space-y-8">
      {STACK.map((group) => {
        const Icon = ICONS[group.icon]
        return (
          <div key={group.id} className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2">
              <Icon className="h-5 w-5" />
              <h2 className="text-xl font-semibold">{group.name}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border bg-background px-4 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: Build the real home route**

Port the body of `src/app/page.tsx` into `src/routes/index.tsx` with the Appwrite parts excised: delete the `boopCount`, `categories`, and `userVotes` state, the entire `client.subscribe` effect, the `<BoopCounter />` element, and the `<TechExperienceVoting />` element. Keep `handleDownload`, the `function about() {` hero, Experience, Languages, "Also busy with", and the closing brace. Replace the "Tech Experience Voting" heading block with:

```tsx
<div className="container mx-auto py-16 px-4 md:px-6">
  <div className="flex flex-col items-center mb-8">
    <h2 className="text-3xl font-bold tracking-tight mb-2">Stack</h2>
    <p className="text-muted-foreground text-center max-w-2xl">
      The frameworks, languages, databases and tools I reach for.
    </p>
  </div>
  <StackShowcase />
</div>
```

- [ ] **Step 4: Delete the removed features**

```bash
rm src/components/boopCounter.tsx src/components/techExperienceVoting.tsx src/components/data/categories.tsx
rmdir src/components/data 2>/dev/null
```

- [ ] **Step 5: Verify boop is gone and the app tree is empty**

```bash
grep -rn "boop\|Boop" src/ | grep -v "boop :3" || echo "NO BOOP COUNTER"
ls src/app 2>/dev/null || echo "APP TREE GONE"
```

Expected: `NO BOOP COUNTER` (the `boop :3` avatar tooltip is the only allowed match) and `APP TREE GONE`. If `src/app` still exists, remove whatever remains after confirming it was ported.

- [ ] **Step 6: Verify the home page**

Run `bun run dev`, load `/`.
Expected: hero, resume button, Stack section with four groups, Experience, Languages, no boop counter, no vote arrows.

---

## Phase 3 - Design system and interaction fixes

### Task 9: Depth tokens and body typeface

**Files:**
- Modify: `css/globals.css`
- Add: `public/fonts/JetBrainsMono[wght].woff2`

**Interfaces:**
- Produces: theme tokens `--shadow-elevation-{1,2,3}`, `--shadow-glow`, `--color-glass`, `--font-display`, `--font-body`, yielding the utilities `shadow-elevation-1|2|3`, `shadow-glow`, and `bg-glass`.

- [ ] **Step 1: Add the body typeface**

Download the JetBrains Mono variable font, latin subset, to `public/fonts/JetBrainsMono[wght].woff2`. Add to `css/globals.css` beside the existing `@font-face`:

```css
@font-face {
  font-family: 'JetBrains Mono';
  src: url('../public/fonts/JetBrainsMono[wght].woff2') format('woff2');
  font-weight: 100 800;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 2: Add depth and font tokens to the `@theme` block**

These go inside the existing `@theme` block, using Tailwind v4's `--color-*` and
`--shadow-*` namespaces so they generate real `bg-glass` / `shadow-elevation-3`
utilities. Defining them as bare custom properties would force `bg-[var(--x)]`
arbitrary values at every call site, which this codebase does not use.

```css
  --font-display: PixelMplus12, monospace;
  --font-body: 'JetBrains Mono', ui-monospace, monospace;

  --color-glass: hsl(var(--background) / 0.72);

  --shadow-elevation-1: 0 1px 2px rgb(0 0 0 / 0.16), 0 2px 8px rgb(0 0 0 / 0.12);
  --shadow-elevation-2: 0 2px 4px rgb(0 0 0 / 0.18), 0 8px 24px rgb(0 0 0 / 0.16);
  --shadow-elevation-3: 0 4px 8px rgb(0 0 0 / 0.2), 0 16px 48px rgb(0 0 0 / 0.22);
  --shadow-glow: 0 0 24px hsl(var(--primary) / 0.35);
```

Call sites then use `bg-glass`, `shadow-elevation-3`, `shadow-glow`.

- [ ] **Step 3: Apply the split**

Change the bare `html { font-family: PixelMplus12, monospace }` rule to `font-family: var(--font-body)`, and add `h1, h2, h3, .font-display { font-family: var(--font-display) }`.

- [ ] **Step 4: Preload both fonts**

In `src/routes/__root.tsx`, add to the route `head` a `links` array preloading both woff2 files with `rel: 'preload'`, `as: 'font'`, `type: 'font/woff2'`, `crossOrigin: 'anonymous'`.

- [ ] **Step 5: Remove the duplicated button rule**

`css/globals.css` declares `button:hover { box-shadow: -2.5px 2.5px 0px 0px }` at line 175 and then overrides it with `button:hover { box-shadow: 0px 0px 0px 0px }` at line 205, so the first is dead. Delete the first rule and keep the second.

- [ ] **Step 6: Verify**

Run `bun run dev`. Expected: headings still pixel type, paragraphs render in JetBrains Mono, no layout shift on load, no console 404 for either font.

---

### Task 10: Opt-in click sound

**Files:**
- Create: `src/components/sound/useClickSound.ts`, `src/components/sound/SoundToggle.tsx`
- Modify: `src/routes/__root.tsx`
- Delete: `src/hooks/click.js`

**Interfaces:**
- Produces: `useClickSound(): { enabled: boolean, setEnabled(v: boolean): void }`, `<SoundToggle />`.

- [ ] **Step 1: Write the hook**

The current `src/hooks/click.js` fires on both `mousedown` and `mouseup` for every click anywhere, constructs a fresh `AudioContext` per gesture and never closes it, and starts without consent. Replace it with a single opt-in listener using one lazily created `Audio` element:

```ts
// src/components/sound/useClickSound.ts
import * as React from 'react'

const STORAGE_KEY = 'click-sound'

export function useClickSound() {
  const [enabled, setEnabledState] = React.useState(false)

  React.useEffect(() => {
    setEnabledState(localStorage.getItem(STORAGE_KEY) === 'on')
  }, [])

  React.useEffect(() => {
    if (!enabled) return

    const audio = new Audio('/sounds/click.ogg')
    audio.volume = 0.2

    const play = () => {
      audio.currentTime = 0
      void audio.play().catch(() => {})
    }

    document.addEventListener('pointerdown', play)
    return () => document.removeEventListener('pointerdown', play)
  }, [enabled])

  const setEnabled = React.useCallback((value: boolean) => {
    setEnabledState(value)
    localStorage.setItem(STORAGE_KEY, value ? 'on' : 'off')
  }, [])

  return { enabled, setEnabled }
}
```

- [ ] **Step 2: Write the toggle**

```tsx
// src/components/sound/SoundToggle.tsx
import { Volume2, VolumeX } from 'lucide-react'
import { useClickSound } from './useClickSound'

export default function SoundToggle() {
  const { enabled, setEnabled } = useClickSound()

  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      aria-pressed={enabled}
      aria-label={enabled ? 'Click sound on' : 'Click sound off'}
      className="flex h-11 w-11 items-center justify-center text-black dark:text-white"
    >
      {enabled ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5 opacity-50" />
      )}
    </button>
  )
}
```

Place it in the left rail beside the menu button.

- [ ] **Step 3: Swap it in and delete the old hook**

Remove `<ClickSound />` from the root document, render `<SoundToggle />` in the rail.

```bash
rm src/hooks/click.js
rmdir src/hooks 2>/dev/null
bun remove use-sound
```

- [ ] **Step 4: Verify**

Run `bun run dev`. Expected: no sound on load or on any click by default; enabling the toggle produces one sound per click (not two); the choice survives a reload.

---

### Task 11: Command palette on cmdk

**Files:**
- Create: `src/components/CommandPalette.tsx`, `src/components/CommandPalette.test.tsx`, `src/lib/palette.ts`
- Delete: `src/components/menu.tsx`

**Interfaces:**
- Produces: `type PaletteItem`, `PALETTE_ITEMS: PaletteItem[]`, `filterPalette(items, query): PaletteItem[]`, `<CommandPalette open onOpenChange />`.

- [ ] **Step 1: Write the failing test**

```ts
// src/components/CommandPalette.test.tsx
import { describe, it, expect } from 'vitest'
import { filterPalette, PALETTE_ITEMS } from '@/lib/palette'

describe('filterPalette', () => {
  it('returns nothing for an empty query', () => {
    expect(filterPalette(PALETTE_ITEMS, '')).toEqual([])
  })

  it('matches on name, case insensitively', () => {
    const result = filterPalette(PALETTE_ITEMS, 'PROJ')
    expect(result.some((item) => item.url === '/projects')).toBe(true)
  })

  it('restricts to projects when the query starts with #', () => {
    const result = filterPalette(PALETTE_ITEMS, '#')
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((item) => item.category === 'Projects')).toBe(true)
  })

  it('filters within the # namespace by the rest of the query', () => {
    const result = filterPalette(PALETTE_ITEMS, '#fayevr')
    expect(result.every((item) => item.category === 'Projects')).toBe(true)
    expect(result.some((item) => item.name.includes('fayevr'))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bunx vitest run src/components/CommandPalette.test.tsx`
Expected: FAIL - cannot resolve `@/lib/palette`.

- [ ] **Step 3: Write the filter**

```ts
// src/lib/palette.ts
import { PROJECTS } from '@/data/projects'

export type PaletteItem = {
  id: string
  name: string
  category: 'Pages' | 'Projects' | 'Help'
  url: string
  external?: boolean
}

const PAGES: PaletteItem[] = [
  { id: 'home', name: 'home', category: 'Pages', url: '/' },
  { id: 'projects', name: 'projects', category: 'Pages', url: '/projects' },
  { id: 'doom', name: 'doom', category: 'Pages', url: '/doom' },
  { id: 'light', name: 'light', category: 'Pages', url: '/light' },
  {
    id: 'github',
    name: 'github',
    category: 'Help',
    url: 'https://github.com/docimin/',
    external: true,
  },
]

export const PALETTE_ITEMS: PaletteItem[] = [
  ...PAGES,
  ...PROJECTS.map((project) => ({
    id: `project-${project.name}`,
    name: project.name,
    category: 'Projects' as const,
    url: project.customUrl ?? project.gitRepo ?? '/projects',
    external: Boolean(project.customUrl ?? project.gitRepo),
  })),
]

export function filterPalette(
  items: PaletteItem[],
  query: string
): PaletteItem[] {
  if (query === '') return []

  if (query.startsWith('#')) {
    const term = query.slice(1).toLowerCase()
    return items.filter(
      (item) =>
        item.category === 'Projects' &&
        item.name.toLowerCase().includes(term)
    )
  }

  const term = query.toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(term))
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bunx vitest run src/components/CommandPalette.test.tsx`
Expected: 4 passing.

- [ ] **Step 5: Build the palette UI**

```tsx
// src/components/CommandPalette.tsx
import * as React from 'react'
import { Command } from 'cmdk'
import { useRouter } from '@tanstack/react-router'
import { filterPalette, PALETTE_ITEMS, type PaletteItem } from '@/lib/palette'

export default function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [query, setQuery] = React.useState('')
  const router = useRouter()

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  const results = filterPalette(PALETTE_ITEMS, query)
  const groups = Array.from(new Set(results.map((item) => item.category)))

  const select = (item: PaletteItem) => {
    onOpenChange(false)
    setQuery('')
    if (item.external) window.location.href = item.url
    else router.navigate({ to: item.url })
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Site search"
      className="fixed inset-0 z-50 p-4 sm:p-6 md:p-20"
      // cmdk renders its own overlay; these classes style the panel wrapper.
      contentClassName="mx-auto max-w-xl overflow-hidden rounded-xl border border-border bg-glass text-foreground shadow-elevation-3 backdrop-blur"
    >
      <Command.Input
        value={query}
        onValueChange={setQuery}
        placeholder="Search..."
        className="h-12 w-full border-0 bg-transparent px-4 text-foreground placeholder:text-muted-foreground focus:ring-0"
      />
      <Command.List className="max-h-80 overflow-y-auto pb-2">
        {query !== '' && (
          <Command.Empty className="px-6 py-10 text-center text-sm text-muted-foreground">
            No results found
          </Command.Empty>
        )}
        {groups.map((group) => (
          <Command.Group
            key={group}
            heading={group}
            className="px-2 text-xs font-semibold text-muted-foreground"
          >
            {results
              .filter((item) => item.category === group)
              .map((item) => (
                <Command.Item
                  key={item.id}
                  value={item.id}
                  onSelect={() => select(item)}
                  className="cursor-pointer rounded-sm px-2 py-2 text-sm text-foreground data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
                >
                  {item.name}
                </Command.Item>
              ))}
          </Command.Group>
        ))}
      </Command.List>
      <div className="flex items-center gap-1 border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
        Type
        <kbd className="mx-1 flex h-5 w-5 items-center justify-center rounded-sm border border-primary text-primary">
          #
        </kbd>
        to search projects.
      </div>
    </Command.Dialog>
  )
}
```

The old dialog was hardcoded light (`bg-white`, `text-gray-900`) and unreadable in dark mode; this one runs entirely on tokens. The footer keeps the `#` hint, now functional, and drops the `?` hint that was advertised and never implemented.

If cmdk's installed version does not accept `contentClassName`, wrap the children in a styled `<div>` inside `Command.Dialog` instead and move the panel classes there.

- [ ] **Step 6: Swap it in**

Replace `MenuComponent` in the left rail with `CommandPalette`, then `rm src/components/menu.tsx`.

- [ ] **Step 7: Verify**

Run `bun run dev`. Expected: ⌘K opens the palette; typing `proj` shows the projects page; typing `#` lists only projects; selecting navigates; dialog is legible in dark mode.

---

### Task 12: Mobile navigation

**Files:**
- Create: `src/components/nav/MobileNav.tsx`
- Modify: `src/routes/__root.tsx`

**Interfaces:**
- Consumes: `<StatusAvatar />` (Task 3), `<CommandPalette />` (Task 11), `<SoundToggle />` (Task 10).

- [ ] **Step 1: Build the bar**

Both rails are `hidden md:flex`, so on phones the menu, socials, status, doom link, and lightbulb link are all unreachable today.

```tsx
// src/components/nav/MobileNav.tsx
import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { HomeIcon, LightbulbIcon, SearchIcon, FolderIcon } from 'lucide-react'
import CommandPalette from '@/components/CommandPalette'
import StatusAvatar from '@/components/StatusAvatar'

const ITEM = 'flex h-11 w-11 items-center justify-center text-black dark:text-white'

export default function MobileNav() {
  const [paletteOpen, setPaletteOpen] = React.useState(false)

  return (
    <>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-black bg-glass backdrop-blur md:hidden dark:border-white"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <button
          type="button"
          className={ITEM}
          onClick={() => setPaletteOpen(true)}
          aria-label="Search"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
        <Link to="/" className={ITEM} aria-label="Home">
          <HomeIcon className="h-5 w-5" />
        </Link>
        <Link to="/projects" className={ITEM} aria-label="Projects">
          <FolderIcon className="h-5 w-5" />
        </Link>
        <Link to="/light" className={ITEM} aria-label="Light">
          <LightbulbIcon className="h-5 w-5" />
        </Link>
        <div className="flex h-11 w-11 items-center justify-center">
          <StatusAvatar />
        </div>
      </nav>
    </>
  )
}
```

`StatusAvatar` renders at 75px in the rail; scope it down here with a wrapper class or accept a `size` prop rather than hardcoding a second copy.

- [ ] **Step 2: Mount it and reserve space**

Render `<MobileNav />` in `__root.tsx` below the outlet. Add `pb-16 md:pb-0` to the page wrapper so the bar never covers the last section.

- [ ] **Step 3: Verify**

Run `bun run dev` and load at 375px width.
Expected: bar visible, all five affordances reachable, page bottom not obscured, bar hidden at ≥768px.

---

## Phase 4 - The 3D layer

### Task 13: Capability tiering

**Files:**
- Create: `src/lib/perf/tier.ts`, `src/lib/perf/tier.test.ts`

**Interfaces:**
- Produces: `type Tier = 'high' | 'low' | 'off'`, `type TierInputs`, `resolveTier(inputs: TierInputs): Tier`, `detectTierInputs(): TierInputs`.

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/perf/tier.test.ts
import { describe, it, expect } from 'vitest'
import { resolveTier, type TierInputs } from './tier'

const base: TierInputs = {
  webgl2: true,
  reducedMotion: false,
  saveData: false,
  hardwareConcurrency: 8,
  deviceMemory: 8,
  coarsePointer: false,
}

describe('resolveTier', () => {
  it('is high on a capable desktop', () => {
    expect(resolveTier(base)).toBe('high')
  })

  it('is off without WebGL2', () => {
    expect(resolveTier({ ...base, webgl2: false })).toBe('off')
  })

  it('is off under reduced motion', () => {
    expect(resolveTier({ ...base, reducedMotion: true })).toBe('off')
  })

  it('is off under save-data', () => {
    expect(resolveTier({ ...base, saveData: true })).toBe('off')
  })

  it('is low on few cores', () => {
    expect(resolveTier({ ...base, hardwareConcurrency: 4 })).toBe('low')
  })

  it('is low on little memory', () => {
    expect(resolveTier({ ...base, deviceMemory: 4 })).toBe('low')
  })

  it('is low on touch devices', () => {
    expect(resolveTier({ ...base, coarsePointer: true })).toBe('low')
  })

  it('treats unknown memory as acceptable', () => {
    expect(resolveTier({ ...base, deviceMemory: undefined })).toBe('high')
  })

  it('prefers off over low when both apply', () => {
    expect(
      resolveTier({ ...base, reducedMotion: true, hardwareConcurrency: 2 })
    ).toBe('off')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bunx vitest run src/lib/perf/tier.test.ts`
Expected: FAIL - cannot resolve `./tier`.

- [ ] **Step 3: Write the module**

```ts
// src/lib/perf/tier.ts
export type Tier = 'high' | 'low' | 'off'

export type TierInputs = {
  webgl2: boolean
  reducedMotion: boolean
  saveData: boolean
  hardwareConcurrency: number
  deviceMemory?: number
  coarsePointer: boolean
}

export function resolveTier(inputs: TierInputs): Tier {
  if (!inputs.webgl2 || inputs.reducedMotion || inputs.saveData) return 'off'
  if (inputs.hardwareConcurrency <= 4) return 'low'
  if (inputs.deviceMemory !== undefined && inputs.deviceMemory <= 4) return 'low'
  if (inputs.coarsePointer) return 'low'
  return 'high'
}

export function detectTierInputs(): TierInputs {
  const canvas = document.createElement('canvas')
  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean }
  }

  return {
    webgl2: Boolean(canvas.getContext('webgl2')),
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    saveData: Boolean(nav.connection?.saveData),
    hardwareConcurrency: nav.hardwareConcurrency ?? 4,
    deviceMemory: nav.deviceMemory,
    coarsePointer: matchMedia('(pointer: coarse)').matches,
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bunx vitest run src/lib/perf/tier.test.ts`
Expected: 9 passing.

---

### Task 14: Circuit geometry builder

**Files:**
- Create: `src/components/circuit/geometry.ts`, `src/components/circuit/geometry.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `type CircuitGeometry = { nodes: Float32Array; traces: Float32Array; pulseSeeds: Float32Array; nodeCount: number; pulseCount: number }`, `buildCircuitGeometry(options: CircuitOptions): CircuitGeometry`, `type CircuitOptions = { seed: number; layers: number; nodesPerLayer: number; width: number; height: number; depth: number }`.

This module must contain **zero** three.js imports - it emits plain typed arrays so it can be unit tested and so the geometry cost is not tied to the lazy chunk.

- [ ] **Step 1: Write the failing test**

```ts
// src/components/circuit/geometry.test.ts
import { describe, it, expect } from 'vitest'
import { buildCircuitGeometry, type CircuitOptions } from './geometry'

const options: CircuitOptions = {
  seed: 42,
  layers: 3,
  nodesPerLayer: 12,
  width: 20,
  height: 30,
  depth: 12,
}

describe('buildCircuitGeometry', () => {
  it('emits three floats per node', () => {
    const geometry = buildCircuitGeometry(options)
    expect(geometry.nodeCount).toBe(36)
    expect(geometry.nodes.length).toBe(36 * 3)
  })

  it('emits trace vertices in segment pairs', () => {
    const { traces } = buildCircuitGeometry(options)
    expect(traces.length % 6).toBe(0)
    expect(traces.length).toBeGreaterThan(0)
  })

  it('is deterministic for a given seed', () => {
    const a = buildCircuitGeometry(options)
    const b = buildCircuitGeometry(options)
    expect(Array.from(a.nodes)).toEqual(Array.from(b.nodes))
    expect(Array.from(a.traces)).toEqual(Array.from(b.traces))
  })

  it('differs across seeds', () => {
    const a = buildCircuitGeometry(options)
    const b = buildCircuitGeometry({ ...options, seed: 43 })
    expect(Array.from(a.nodes)).not.toEqual(Array.from(b.nodes))
  })

  it('keeps every node inside the requested bounds', () => {
    const { nodes } = buildCircuitGeometry(options)
    for (let i = 0; i < nodes.length; i += 3) {
      expect(Math.abs(nodes[i])).toBeLessThanOrEqual(options.width / 2)
      expect(Math.abs(nodes[i + 1])).toBeLessThanOrEqual(options.height / 2)
      expect(Math.abs(nodes[i + 2])).toBeLessThanOrEqual(options.depth)
    }
  })

  it('emits one seed pair per pulse', () => {
    const { pulseSeeds, pulseCount } = buildCircuitGeometry(options)
    expect(pulseSeeds.length).toBe(pulseCount * 2)
  })

  it('scales node count with the layer count', () => {
    const small = buildCircuitGeometry({ ...options, layers: 1 })
    expect(small.nodeCount).toBe(12)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bunx vitest run src/components/circuit/geometry.test.ts`
Expected: FAIL - cannot resolve `./geometry`.

- [ ] **Step 3: Write the builder**

```ts
// src/components/circuit/geometry.ts
export type CircuitOptions = {
  seed: number
  layers: number
  nodesPerLayer: number
  width: number
  height: number
  depth: number
}

export type CircuitGeometry = {
  nodes: Float32Array
  traces: Float32Array
  pulseSeeds: Float32Array
  nodeCount: number
  pulseCount: number
}

// mulberry32 - deterministic so the field is stable across renders and testable.
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function buildCircuitGeometry(
  options: CircuitOptions
): CircuitGeometry {
  const { seed, layers, nodesPerLayer, width, height, depth } = options
  const random = rng(seed)
  const nodeCount = layers * nodesPerLayer

  const nodes = new Float32Array(nodeCount * 3)
  const segments: number[] = []

  for (let layer = 0; layer < layers; layer++) {
    const z = -(layer / Math.max(layers - 1, 1)) * depth
    let previousX = (random() - 0.5) * width
    let previousY = -height / 2

    for (let index = 0; index < nodesPerLayer; index++) {
      const x = (random() - 0.5) * width
      const y = -height / 2 + (index / (nodesPerLayer - 1 || 1)) * height
      const offset = (layer * nodesPerLayer + index) * 3

      nodes[offset] = x
      nodes[offset + 1] = y
      nodes[offset + 2] = z

      // Orthogonal routing: vertical run then horizontal run, matching the
      // existing SVG rail motif rather than a straight diagonal.
      segments.push(previousX, previousY, z, previousX, y, z)
      segments.push(previousX, y, z, x, y, z)

      previousX = x
      previousY = y
    }
  }

  const pulseCount = nodeCount
  const pulseSeeds = new Float32Array(pulseCount * 2)
  for (let index = 0; index < pulseCount; index++) {
    pulseSeeds[index * 2] = random()
    pulseSeeds[index * 2 + 1] = 0.4 + random() * 1.6
  }

  return {
    nodes,
    traces: new Float32Array(segments),
    pulseSeeds,
    nodeCount,
    pulseCount,
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bunx vitest run src/components/circuit/geometry.test.ts`
Expected: 7 passing.

---

### Task 15: Static SVG fallback

**Files:**
- Create: `src/components/circuit/CircuitFallback.tsx`

**Interfaces:**
- Produces: `<CircuitFallback className?: string />`.

This renders in the initial HTML on every load and is the permanent field for `tier === 'off'`. It must not import three.

- [ ] **Step 1: Build it**

```tsx
// src/components/circuit/CircuitFallback.tsx
const TRACES = [
  'M12 20 L12 88 L84 124 L84 220 L40 250 L40 340',
  'M128 -5 L128 52 L200 90 L200 205 L150 236 L150 340',
  'M292 16 L292 74 L232 106 L232 200 L272 228 L272 340',
  'M62 340 L62 300 L112 272 L112 150 L58 118 L58 -8',
  'M246 -6 L246 44 L166 88 L166 168',
]

const NODES = [
  { cx: 84, cy: 124, r: 4, delay: '0s' },
  { cx: 200, cy: 90, r: 4, delay: '.5s' },
  { cx: 112, cy: 150, r: 3, delay: '1s' },
  { cx: 232, cy: 106, r: 3, delay: '1.5s' },
  { cx: 166, cy: 168, r: 2.5, delay: '2s' },
]

export default function CircuitFallback({
  className = '',
}: {
  className?: string
}) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none h-full w-full text-primary ${className}`}
      viewBox="0 0 300 340"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="circuit-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity=".85" />
          <stop offset="55%" stopColor="currentColor" stopOpacity=".3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity=".1" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#circuit-fade)" strokeWidth="1.4">
        {TRACES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="currentColor">
        {NODES.map((node) => (
          <circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            className="circuit-node"
            style={{ animationDelay: node.delay }}
          />
        ))}
      </g>
    </svg>
  )
}
```

Default export - Task 16 imports it as `import CircuitFallback from './CircuitFallback'`.

- [ ] **Step 2: Add the node animation**

In `css/globals.css`:

```css
.circuit-node {
  opacity: 0.25;
}

@media (prefers-reduced-motion: no-preference) {
  .circuit-node {
    animation: circuit-pulse 3s ease-in-out infinite;
  }
}

@keyframes circuit-pulse {
  0%,
  100% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.9;
  }
}
```

- [ ] **Step 3: Verify**

Temporarily render it in `src/routes/index.tsx` behind the content. Run `bun run dev`.
Expected: field visible in both themes, no console errors, no horizontal scrollbar, nodes static under emulated reduced motion.

---

### Task 16: Canvas mount, tier gate, and idle loading

**Files:**
- Create: `src/components/circuit/CircuitFieldMount.tsx`
- Modify: `src/routes/__root.tsx`

**Interfaces:**
- Consumes: `resolveTier`, `detectTierInputs` (Task 13); `<CircuitFallback />` (Task 15).
- Produces: `<CircuitFieldMount />`. Lazily imports `./CircuitField` (Task 17) - that import is the chunk boundary.

- [ ] **Step 1: Write the mount**

```tsx
// src/components/circuit/CircuitFieldMount.tsx
import * as React from 'react'
import { detectTierInputs, resolveTier, type Tier } from '@/lib/perf/tier'
import CircuitFallback from './CircuitFallback'

// Dynamic import keeps three.js out of the initial bundle entirely.
const CircuitField = React.lazy(() => import('./CircuitField'))

export default function CircuitFieldMount() {
  const [tier, setTier] = React.useState<Tier | null>(null)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    const schedule =
      window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200))
    const handle = schedule(() => setTier(resolveTier(detectTierInputs())))
    return () => window.cancelIdleCallback?.(handle as number)
  }, [])

  const showCanvas = tier === 'high' || tier === 'low'

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <CircuitFallback
        className={`absolute inset-0 transition-opacity duration-700 ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {showCanvas && (
        <React.Suspense fallback={null}>
          <CircuitField tier={tier} onReady={() => setReady(true)} />
        </React.Suspense>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Mount it in the root document**

Render `<CircuitFieldMount />` as the first child inside `<body>`'s wrapper in `__root.tsx`, and give the content wrapper `relative z-10` so it layers above.

- [ ] **Step 3: Verify the bundle boundary**

```bash
bun run build
grep -rl "three" .output/public/_build/assets/*.js | head
```

Expected: the three.js code appears only in a separate lazily-loaded chunk, never in the entry chunk. Confirm by checking that the entry file listed in `.output/public/_build/.vite/manifest.json` under `isEntry: true` is not among the greps.

---

### Task 17: The R3F scene

**Files:**
- Create: `src/components/circuit/CircuitField.tsx`, `src/components/circuit/useFieldProgress.ts`

**Interfaces:**
- Consumes: `buildCircuitGeometry` (Task 14), `Tier` (Task 13).
- Produces: default-exported `<CircuitField tier: Tier, onReady: () => void />`.

- [ ] **Step 1: Write the ref-based progress driver**

Scroll and pointer must never touch React state - a re-render per scroll event would defeat the whole design.

```ts
// src/components/circuit/useFieldProgress.ts
import * as React from 'react'

export type FieldProgress = { scroll: number; pointerX: number; pointerY: number }

export function useFieldProgress() {
  const progress = React.useRef<FieldProgress>({
    scroll: 0,
    pointerX: 0,
    pointerY: 0,
  })

  React.useEffect(() => {
    let frame = 0

    const read = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.current.scroll = max > 0 ? window.scrollY / max : 0
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }

    const onPointer = (event: PointerEvent) => {
      progress.current.pointerX = (event.clientX / window.innerWidth) * 2 - 1
      progress.current.pointerY = (event.clientY / window.innerHeight) * 2 - 1
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return progress
}
```

- [ ] **Step 2: Install the 3D dependencies**

```bash
bun add three@^0.185.1 @react-three/fiber@^9.6.1 @react-three/drei@^10.7.7
```

- [ ] **Step 3: Write the scene**

```tsx
// src/components/circuit/CircuitField.tsx
import * as React from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { buildCircuitGeometry } from './geometry'
import { useFieldProgress } from './useFieldProgress'
import type { Tier } from '@/lib/perf/tier'

type CircuitFieldProps = {
  tier: Tier
  onReady: () => void
  onDegrade: () => void
}

const PULSE_VERTEX = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute vec2 aSeed;
  uniform float uTime;
  uniform float uDensity;
  varying float vAlpha;

  void main() {
    float t = fract(aSeed.x + uTime * aSeed.y * 0.15);
    vec3 traveled = mix(aStart, aEnd, t);
    vAlpha = (1.0 - abs(t * 2.0 - 1.0)) * uDensity;
    vec4 viewPosition = modelViewMatrix * vec4(traveled, 1.0);
    viewPosition.xy += position.xy * 0.09;
    gl_Position = projectionMatrix * viewPosition;
  }
`

const PULSE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    if (vAlpha <= 0.01) discard;
    gl_FragColor = vec4(uColor, vAlpha);
  }
`

function Field({ tier }: { tier: Tier }) {
  const progress = useFieldProgress()
  const nodesRef = React.useRef<THREE.InstancedMesh>(null)
  const groupRef = React.useRef<THREE.Group>(null)
  const uniforms = React.useRef({
    uTime: { value: 0 },
    uDensity: { value: 1 },
    uColor: { value: new THREE.Color('#f97316') },
  })

  const geometry = React.useMemo(
    () =>
      buildCircuitGeometry({
        seed: 1337,
        layers: tier === 'high' ? 3 : 2,
        nodesPerLayer: tier === 'high' ? 14 : 8,
        width: 26,
        height: 34,
        depth: 14,
      }),
    [tier]
  )

  const pulseGeometry = React.useMemo(() => {
    const { traces, pulseSeeds, pulseCount } = geometry
    const segmentCount = traces.length / 6
    const count = Math.min(pulseCount, segmentCount)

    const starts = new Float32Array(count * 3)
    const ends = new Float32Array(count * 3)
    for (let index = 0; index < count; index++) {
      const base = index * 6
      starts.set(traces.subarray(base, base + 3), index * 3)
      ends.set(traces.subarray(base + 3, base + 6), index * 3)
    }

    const plane = new THREE.PlaneGeometry(1, 1)
    const instanced = new THREE.InstancedBufferGeometry()
    instanced.index = plane.index
    instanced.attributes.position = plane.attributes.position
    instanced.instanceCount = count
    instanced.setAttribute(
      'aStart',
      new THREE.InstancedBufferAttribute(starts, 3)
    )
    instanced.setAttribute('aEnd', new THREE.InstancedBufferAttribute(ends, 3))
    instanced.setAttribute(
      'aSeed',
      new THREE.InstancedBufferAttribute(pulseSeeds.subarray(0, count * 2), 2)
    )
    return instanced
  }, [geometry])

  React.useLayoutEffect(() => {
    const mesh = nodesRef.current
    if (!mesh) return

    const dummy = new THREE.Object3D()
    for (let index = 0; index < geometry.nodeCount; index++) {
      dummy.position.set(
        geometry.nodes[index * 3],
        geometry.nodes[index * 3 + 1],
        geometry.nodes[index * 3 + 2]
      )
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }, [geometry])

  // Reads refs only. A setState here would re-render the tree every frame.
  useFrame((state, delta) => {
    const { scroll, pointerX, pointerY } = progress.current
    uniforms.current.uTime.value += delta
    uniforms.current.uDensity.value = 1 - scroll * 0.75

    const group = groupRef.current
    if (group) {
      group.rotation.y += (pointerX * 0.12 - group.rotation.y) * 0.05
      group.rotation.x += (pointerY * 0.08 - group.rotation.x) * 0.05
    }

    state.camera.position.z += (18 - scroll * 9 - state.camera.position.z) * 0.06
  })

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={nodesRef}
        args={[undefined as never, undefined as never, geometry.nodeCount]}
        frustumCulled={false}
      >
        <boxGeometry args={[0.16, 0.16, 0.16]} />
        <meshBasicMaterial color="#f97316" toneMapped={false} />
      </instancedMesh>

      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[geometry.traces, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#f97316"
          transparent
          opacity={0.32}
          toneMapped={false}
        />
      </lineSegments>

      <mesh geometry={pulseGeometry} frustumCulled={false}>
        <shaderMaterial
          vertexShader={PULSE_VERTEX}
          fragmentShader={PULSE_FRAGMENT}
          uniforms={uniforms.current}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export default function CircuitField({
  tier,
  onReady,
  onDegrade,
}: CircuitFieldProps) {
  const [dpr, setDpr] = React.useState(tier === 'high' ? 1.75 : 1)
  const [frameloop, setFrameloop] = React.useState<'always' | 'never'>('always')
  const declines = React.useRef(0)

  React.useEffect(() => {
    const onVisibility = () =>
      setFrameloop(document.visibilityState === 'visible' ? 'always' : 'never')

    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, dpr]}
      camera={{ position: [0, 0, 18], fov: 55 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      onCreated={onReady}
    >
      <PerformanceMonitor
        onDecline={() => {
          declines.current += 1
          // First strike drops resolution; a second means this GPU cannot
          // hold the budget, so fall back to the static SVG for good.
          if (declines.current === 1) setDpr(1)
          else onDegrade()
        }}
      >
        <Field tier={tier} />
      </PerformanceMonitor>
    </Canvas>
  )
}
```

Materials are `meshBasicMaterial` / `lineBasicMaterial` / `shaderMaterial` only. No lights, no shadows, no `<Environment>`, no post-processing, no textures.

- [ ] **Step 4: Wire onDegrade into the mount**

`CircuitFieldMount` from Task 16 must supply the third prop. Add `const [degraded, setDegraded] = React.useState(false)`, change the guard to
`const showCanvas = !degraded && (tier === 'high' || tier === 'low')`, and pass
`onDegrade={() => { setDegraded(true); setReady(false) }}` so the fallback fades
back in when the canvas is pulled.

- [ ] **Step 5: Verify the performance budget**

Run `bun run dev`, open `/`, and in devtools:

```js
// paste in console after the canvas mounts
const r = __r3f?.store?.getState()?.gl?.info
console.log(r.render.calls, r.render.triangles, r.programs.length)
```

Expected: draw calls ≤ 5, triangles < 30000.

Then in the Performance panel, record 5 seconds of scrolling.
Expected: sustained 60fps on desktop, no long tasks over 50ms, and **zero React commits during scroll** (confirm via the React DevTools profiler - the scroll driver writes to refs only).

- [ ] **Step 6: Verify the 120kb budget**

```bash
bun run build
find .output/public -name '*.js' -exec sh -c 'printf "%8s  %s\n" "$(gzip -c "$1" | wc -c)" "$1"' _ {} \; | sort -rn | head -5
```

Expected: the lazy three.js chunk gzips to **≤123000 bytes**. If it exceeds the
budget, drop `@react-three/drei` and hand-roll the decline detection from
`useFrame` deltas rather than shipping the extra library. Report the actual
number either way.

- [ ] **Step 7: Verify the fallback paths**

Test each and confirm the page still looks correct with the SVG field visible:

```bash
# reduced motion: devtools > Rendering > Emulate prefers-reduced-motion
# save-data: devtools > Network > throttle with Save-Data header
# no webgl: launch chrome with --disable-3d-apis
```

Expected: `tier` resolves to `off` in all three, no WebGL chunk is fetched (check the Network tab), and `CircuitFallback` stays at full opacity.

---

### Task 18: Content layering and card tilt

**Files:**
- Create: `src/components/ui/tilt-card.tsx`, `src/hooks/useReveal.ts`
- Modify: `src/routes/index.tsx`, `src/routes/projects/index.tsx`, `css/globals.css`

**Interfaces:**
- Consumes: depth tokens from Task 9.
- Produces: `<TiltCard>`, `useReveal(): React.RefObject<HTMLElement>`.

- [ ] **Step 1: Build the tilt card**

```tsx
// src/components/ui/tilt-card.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const MAX_TILT = 8

export function TiltCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const frame = React.useRef(0)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return
    if (
      matchMedia('(pointer: coarse)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const onMove = (event: PointerEvent) => {
      if (frame.current) return
      frame.current = requestAnimationFrame(() => {
        frame.current = 0
        const rect = element.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        element.style.transform = `perspective(700px) rotateY(${
          x * MAX_TILT
        }deg) rotateX(${-y * MAX_TILT}deg)`
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(frame.current)
      frame.current = 0
      element.style.transform = ''
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame.current)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-transform duration-200 will-change-transform',
        className
      )}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Build the reveal hook**

```ts
// src/hooks/useReveal.ts
import * as React from 'react'

export function useReveal<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.dataset.revealed = 'true'
        observer.disconnect()
      },
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}
```

Paired CSS in `css/globals.css`:

```css
@media (prefers-reduced-motion: no-preference) {
  [data-reveal] {
    opacity: 0;
    transform: translateY(1.5rem);
    transition:
      opacity 0.6s ease-out,
      transform 0.6s ease-out;
  }

  [data-reveal][data-revealed='true'] {
    opacity: 1;
    transform: none;
  }
}
```

Sections opt in with `data-reveal` plus `ref={useReveal()}`. Under reduced motion the rule never applies, so content is visible with no observer-driven flash.

- [ ] **Step 3: Apply the layering**

Give the home page sections `bg-glass backdrop-blur` panels, wrap the Stack items and project rows in `<TiltCard className="shadow-elevation-2">`, and attach `data-reveal` plus `ref={useReveal()}` to each major section.

- [ ] **Step 4: Verify**

Run `bun run dev`.
Expected: content is legible over the field at every scroll position in both themes; cards tilt on hover on desktop and are static on touch; sections fade in once and never re-animate; nothing tilts or fades under emulated reduced motion.

---

## Phase 5 - Ship

### Task 19: Docker, CI, and dead weight

**Files:**
- Modify: `Dockerfile`, `.github/workflows/build.yml`, `.dockerignore`, `README.md`
- Delete: `public/registry/emblor.json` if unreferenced

**PENDING DECISION - resolve before starting this task.** The toolchain moved to
bun mid-run. Bun as package manager is settled; whether the *production runtime*
also becomes bun is not. Two paths:

- **Node runtime (current default):** keep `nitro({ preset: 'node-server' })`,
  base image `node:22-alpine`, `CMD ["node", ".output/server/index.mjs"]`. Build
  step runs `bun install --frozen-lockfile` and `bun run build`. Steps below
  assume this.
- **Bun runtime:** switch to `nitro({ preset: 'bun' })` in `vite.config.ts`, base
  image `oven/bun:1.3-alpine`, `CMD ["bun", ".output/server/index.mjs"]`, and
  delete `.node-version`.

Either way the build stage installs with bun. Confirm with the user first.

- [ ] **Step 1: Rewrite the Dockerfile runner stage**

Keep the `deps` and `builder` stages; delete both `ARG`/`ENV` pairs for `NEXT_PUBLIC_DOMAIN_BACKEND` and `NEXT_PUBLIC_PROJECT_ID`. Replace the runner stage's copies and command:

```dockerfile
COPY --from=builder --chown=node:node /app/.output ./.output

USER node
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", ".output/server/index.mjs"]
```

Drop the `nextjs`/`nodejs` user creation - the node image already ships a `node` user. Drop the separate `public` copy; Nitro bundles public assets into `.output/public`.

- [ ] **Step 2: Strip the Appwrite build args from CI**

In `.github/workflows/build.yml`, remove both `--build-arg` lines from the `docker build` invocation. Leave the Harbor login, tagging, and push steps untouched.

- [ ] **Step 3: Check for orphans**

```bash
grep -rn "emblor" src/ css/ public/ 2>/dev/null || echo "emblor unreferenced"
```

If unreferenced, `rm -rf public/registry`.

- [ ] **Step 4: Update the README**

Replace any Next.js references with the TanStack Start commands: `bun run dev`, `bun run build`, `bun run start`.

- [ ] **Step 5: Verify the image builds and serves**

```bash
docker build -t fayevr-test . && docker run --rm -p 3001:3000 fayevr-test &
sleep 8 && curl -s -o /dev/null -w "%{http_code}\n" localhost:3001/api/health
```

Expected: `200`. Stop the container afterwards.

---

### Task 20: Final verification

- [ ] **Step 1: Full test suite**

Run: `bun run test`
Expected: all suites pass. Report the actual count.

- [ ] **Step 2: Typecheck and build**

Run: `bunx tsc --noEmit && bun run lint && bun run build`
Expected: no errors, `.output/server/index.mjs` written.

- [ ] **Step 3: Route sweep**

With `bun run start` running against the production build:

```bash
for p in / /projects /doom /light /ef /projects/suggestions-bot /projects/suggestions-bot/privacy /projects/suggestions-bot/terms /api/health /api/getStatus /robots.txt /sitemap.xml; do printf "%-42s " "$p"; curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000$p"; done
```

Expected: `200` on all twelve.

- [ ] **Step 4: Confirm the removals stuck**

```bash
grep -rn "appwrite\|next/link\|next/image\|next-themes\|use-sound\|headlessui" src/ css/ || echo "CLEAN"
grep -c "next" package.json
```

Expected: `CLEAN`, and no `next`, `appwrite`, `wrangler`, or `use-sound` entries left in `package.json`.

- [ ] **Step 5: Verify the perf claim honestly**

Run a Lighthouse mobile audit on `http://localhost:3000/` from a clean profile. Record the actual Performance score, LCP, and TBT. **Report the real numbers, including if they miss.** The design's central claim is that the canvas never blocks first paint, so confirm in the Network waterfall that the three.js chunk loads *after* LCP.

- [ ] **Step 6: Leave everything uncommitted**

Run: `git status --short`
Expected: a working tree full of changes and no new commits. Summarize the change set for the user and let them decide what to commit.

---

## Open Item

`PROJECTS` in `src/data/projects.ts` ships as a two-row placeholder. The live rows exist only in Appwrite and must be transcribed from production before Task 7 is signed off. Surface this to the user rather than shipping the placeholder silently.
