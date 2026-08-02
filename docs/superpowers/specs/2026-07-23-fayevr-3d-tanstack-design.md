# fayevr.dev - 3D rebuild on TanStack Start

Date: 2026-07-23
Status: approved, not yet implemented

## Goal

Rebuild fayevr.dev as a visibly modern, three-dimensional site that stays fast on
low-end hardware, migrate the framework from Next.js to TanStack Start, and
remove Appwrite and the boop counter.

The site keeps its existing identity: pixel type, hard borders, orange accent,
`function about() {` framing, circuit side-rails, and the jokes. This is the same
site with depth, not a new site.

## Decisions

| Question | Decision |
|---|---|
| Projects and tech-voting data after Appwrite | Static typed file in repo; voting becomes a non-interactive Stack showcase |
| Visual direction | Keep identity, add depth |
| 3D technology | Full React Three Fiber |
| Scene concept | Circuit field - the SVG side-rail motif promoted to 3D |
| Layout | Fixed scroll-driven canvas, layered content above it |
| Existing extras | All kept: `/doom`, `/light`, `/ef`, Discord status, click sound, command palette, context menu |

## Architecture

### Framework

TanStack Start (Vite + Nitro) with React 19, TypeScript, Tailwind v4. The
shadcn/ui components in `src/components/ui/` are Radix + Tailwind and carry over
unchanged.

Dependencies removed: `next`, `next-themes`, `next-navigation`,
`eslint-config-next`, `appwrite`, `node-appwrite`, `wrangler`,
`@headlessui/react`. Config files removed: `next.config.ts`,
`postcss.config.mjs`.

`.eslintrc.json` extends `next/core-web-vitals` and stops working once Next is
gone. It is replaced by a flat `eslint.config.js` with the TypeScript and
react-hooks plugins, and the `lint` script changes from `next lint` to `eslint .`.

Dependencies added: `@tanstack/react-start`, `@tanstack/react-router`, `vite`,
`@vitejs/plugin-react`, `@tailwindcss/vite`, `three`, `@react-three/fiber`,
`@react-three/drei`, `cmdk`, `vitest`, `@testing-library/react`.

`vite.config.ts` registers `tanstackStart()` before `viteReact()`, plus
`tailwindcss()`. `package.json` scripts become `vite dev`, `vite build`, and
`node .output/server/index.mjs`.

### Routes

```
src/routes/
  __root.tsx
  index.tsx
  projects.index.tsx
  projects.suggestions-bot.index.tsx
  projects.suggestions-bot.privacy.tsx
  projects.suggestions-bot.terms.tsx
  doom.tsx
  light.tsx
  ef.tsx
  api.getStatus.ts
  api.health.ts
  sitemap[.]xml.ts
  robots[.]txt.ts
```

Server routes use the `server.handlers` form:

```ts
export const Route = createFileRoute('/api/health')({
  server: { handlers: { GET: async () => Response.json({ status: 'ok' }) } },
})
```

`next/link` becomes TanStack Router `Link`. `next/image` is dropped entirely -
its only remote sources were Appwrite CDN URLs, and all remaining images are
local; they get explicit `width`/`height` plus `loading` and `decoding`
attributes. Metadata moves from the Next `metadata` export to each route's
`head()`.

`next-themes` is replaced by a `dark` class on `<html>` driven by a small
provider, plus an inline blocking script in `__root.tsx` that reads
`localStorage` and the `prefers-color-scheme` media query before first paint so
the theme never flashes.

### Deployment

Unchanged in shape. Nitro's `node-server` preset emits `.output/server/index.mjs`.
The Dockerfile copies `.output` instead of `.next/standalone` and runs
`node .output/server/index.mjs` on port 3000. The GitHub workflow drops the
`NEXT_PUBLIC_DOMAIN_BACKEND` and `NEXT_PUBLIC_PROJECT_ID` build args; Harbor
registry publishing is untouched.

## Removals

Deleted files:

- `src/app/appwrite-client.ts`
- `src/app/appwrite-server.ts`
- `src/lib/server-calls.ts`
- `src/lib/actions/sendBoop.ts`
- `src/lib/actions/updateVote.ts`
- `src/components/boopCounter.tsx`
- `src/components/techExperienceVoting.tsx`
- `src/components/data/categories.tsx`

Also removed: the `NEXT_PUBLIC_DOMAIN_BACKEND`, `NEXT_PUBLIC_PROJECT_ID` and
`API_KEY` entries in `.env.example`, the matching Docker build args, and the
Appwrite realtime subscription in the homepage.

The `boop :3` tooltip on the avatar in `statusFetch.tsx` is a separate local
easter egg and is explicitly retained.

### Data

`src/data/projects.ts` exports a typed array replacing the Appwrite `projects`
collection. Shape follows the fields the current table renders:

```ts
type Project = {
  name: string
  status: 'Ongoing' | 'Maintenance' | 'Pending' | 'Completed'
        | 'Online' | 'Error' | 'Paused' | 'Archived'
  gitRepo?: string
  branch?: string
  customUrl?: string
  private: boolean
  image?: string
  createdAt: string
}
```

Sorting keeps the existing rule: by the declared status order, then name.
`image` falls back to the existing `/images/placeholder.png` when absent, as the
current table already does.

**Seed content.** The live rows exist only in Appwrite, so the initial contents
of `projects.ts` are transcribed from the current production
`fayevr.dev/projects` table before Appwrite access is torn down. This is a
one-way transcription and is expected to need correction by hand; it is the one
step in this rebuild whose output cannot be verified against the repo alone.

`src/data/stack.ts` replaces the voting collection with grouped technologies
(frameworks, languages, databases, tools). Its contents are lifted from the
existing `src/components/data/categories.tsx` before that file is deleted.
Rendered as a static showcase, without counts or vote controls.

## The 3D layer

### Scene

`<CircuitField />` mounts once in `__root.tsx` as a fixed, full-viewport canvas
at `z-index: 0` with `pointer-events: none` and `aria-hidden="true"`.

Geometry, sized to stay within budget:

- Nodes: one `InstancedMesh` of small boxes across three parallax z-layers.
- Traces: one `LineSegments` with a prebuilt `BufferGeometry` of orthogonal
  routed paths, matching the existing SVG rail motif.
- Pulses: instanced quads animated entirely in a vertex shader from a `uTime`
  uniform and a per-instance offset attribute. No per-frame JavaScript loop over
  pulse positions.

Materials are flat and untextured. No shadows, no lights requiring a shadow map,
no post-processing.

### Interaction

Scroll position and pointer position are written to refs by passive,
rAF-coalesced listeners and consumed inside `useFrame`. They never touch React
state, so scrolling causes zero re-renders. A single normalized `progress`
uniform drives camera z and field density, so the field thins and recedes as the
page is read.

### Performance guards

These are load-bearing requirements, not optimizations. Full R3F was chosen over
a lighter option, so "lag-free so everyone can use it" is enforced here:

1. **Off the critical path.** The canvas is `React.lazy` + dynamic import,
   mounted inside `requestIdleCallback` after first paint. No WebGL or three.js
   code is in the initial bundle. LCP is the headline text, never the canvas.
2. **Static fallback ships first.** An inline SVG version of the circuit field
   renders immediately and cross-fades out once the canvas reports its first
   frame. If WebGL is unavailable or fails, the page still matches the approved
   design.
3. **Capability tiering.** On mount, probe WebGL2 support,
   `navigator.hardwareConcurrency`, `navigator.deviceMemory`,
   `navigator.connection.saveData`, and `matchMedia('(pointer: coarse)')`.
   Resolve to `high`, `low`, or `off`. `low` reduces instance counts and layer
   count; `off` keeps the static fallback permanently.
4. **Adaptive resolution.** DPR clamped to `[1, 1.75]`. drei's
   `PerformanceMonitor` steps DPR down when frame rate sags and demotes to the
   static fallback if it stays bad.
5. **Never render offscreen.** An `IntersectionObserver` and a
   `visibilitychange` listener pause the render loop when the canvas is out of
   view or the tab is hidden.
6. **Reduced motion.** `prefers-reduced-motion: reduce` renders a single static
   frame with no animation and no scroll drive.

Budget: 5 draw calls or fewer, under 30k triangles, and at most ~120kb gzipped
of added JavaScript, none of it blocking first render.

### Content layering

Content sits at `z-index: 1` in panels over the canvas. Cards tilt on pointer
using CSS `perspective` with `rotateX`/`rotateY` - compositor-only, animating
transform and opacity exclusively. Section reveals use `IntersectionObserver`
with CSS transitions rather than a scroll-animation library.

## Design system

Tokens remain CSS custom properties in `css/globals.css` and are extended rather
than bypassed. New tokens cover elevation shadows, accent glow, and glass panel
surfaces, so the depth work has no arbitrary values at call sites.

Typography: PixelMplus12 keeps display type, headings, labels, and UI chrome.
Paragraph body text switches to JetBrains Mono (self-hosted variable woff2,
latin subset, `font-display: swap`), because PixelMplus at body size is the main
thing that reads dated rather than deliberately retro. Two families, one new
network request, both preloaded.

Side-rails remain real DOM navigation carrying the menu button, socials, avatar
status, doom link, and lightbulb link, restyled with the new depth tokens. They
are currently `hidden md:flex`, which leaves phones with no navigation at all; a
bottom bar is added so all five affordances are reachable on mobile.

## Correctness fixes

- `statusFetch.tsx` composes class names as `bg-${color}`, which Tailwind v4's
  scanner cannot statically see, so those presence colors do not render today.
  Replaced with a static status-to-class map.
- Discord presence polling backs off from 10s to 30s and pauses while the tab is
  hidden.
- The global click sound currently fires on both `mousedown` and `mouseup` for
  every click site-wide, starting without consent. It moves behind a persisted
  opt-in toggle, default off.
- The command palette advertises `#` and `?` prefixes that do nothing. `#` is
  implemented for project search; `?` and its legend entry are removed. Palette
  is rebuilt on `cmdk` since `@headlessui/react` is being dropped.

## Testing

Vitest with Testing Library, covering the logic where regressions are plausible:

- capability tiering resolves to the expected tier for representative inputs,
  including the reduced-motion and `saveData` paths
- project sorting orders by status rank then name
- command palette filtering, including the `#` prefix

Typecheck and production build are the gate. Routes are verified manually after
migration. No Playwright or Lighthouse CI - disproportionate for a personal site.

## Sequencing

The framework migration and the redesign are interdependent - every page is
touched by the migration, and the depth work has no home until routes exist - so
they are one spec. The implementation plan splits them into ordered phases:
scaffold and route parity first, then removals and static data, then the design
system, then the 3D layer, with the site kept runnable at the end of each phase.

## Out of scope

- No CMS or admin surface; project data is edited in the repo.
- Copy is unchanged except where removed features leave holes.
- `/doom`, `/light`, and `/ef` are ported as-is aside from the rail restyle.
- No replacement backend. Voting is gone, not relocated.
