# Next.js 16 — What's Different From Your Training Data

This project runs Next.js 16. Several defaults changed from earlier versions:

- **Turbopack is the default bundler** (dev and build) — no webpack config needed.
- **`middleware.ts` is gone — use `proxy.ts`.** Same purpose (request interception), runs on the Node.js runtime, exported function is named `proxy` not `middleware`.
- **Caching is explicit now.** Nothing is cached by default. Add the `"use cache"` directive at the top of a file or function to opt in. Do not assume a fetch or Server Component is cached unless `"use cache"` is present.
- **`params`, `cookies()`, and `headers()` are async.** Always `await` them — `params` is a `Promise`, not a plain object.
- **Node.js 20.9.0+ and TypeScript 5.1.0+ are required minimums.**
- The old `experimental.ppr` flag is gone — Partial Prerendering is now part of Cache Components (`experimental.cacheComponents`).

If something looks like it should work a certain way from pre-16 muscle memory, assume it changed and check before writing it.

---

# Project Conventions

Prefer scoped, minimal diffs over broad rewrites.

## Package manager

This project uses **yarn**. Do not use `npm install` or `npx` — use `yarn add` / `yarn dlx` instead. Lockfile is `yarn.lock`; never generate or commit a `package-lock.json`.

## Folder structure

Keep it simple. Every route segment contains:

- `page.tsx` — the page for that route
- `layout.tsx` — the layout for that route
- `_components/` — components used by that route

Rules:

- Each component is its own folder containing an `index.tsx` with the component code (e.g. `hero-section/index.tsx`).
- A component's own assets go in a colocated `_assets/` folder inside that component's folder.
- Subcomponents live inside the parent component's `_components/` folder, recursively (e.g. `dummy/_components/hero-section/_components/hero-section-cta/index.tsx`).
- All files and folders use **kebab-case**.

Example for a `dummy` route:

```
dummy/
├── page.tsx
├── layout.tsx
└── _components/
    └── hero-section/
        ├── index.tsx
        ├── _assets/
        └── _components/
            └── hero-section-cta/
                ├── index.tsx
                └── _assets/
```

## "use client"

Apply `"use client"` **atomically** — only on the specific leaf file that actually needs client-side JS. Never bubble it up to wrap a whole section or page.

Example: if a button inside `hero-section` needs JS, the directive belongs in that button's file (e.g. `hero-section-cta/index.tsx`), not in `hero-section/index.tsx` or `page.tsx`.

## Tailwind (v4)

- We use Tailwind v4 (CSS-first). There is **no `tailwind.config.js`**.
- Do not create standalone CSS files. If one is genuinely necessary, colocate it at the component level as a `*.module.css` file (same placement as `_assets/`).
- Control as much as possible through Tailwind utilities. Avoid ad-hoc CSS and avoid declaring separate `:root` CSS variables.
- Add custom colors, animations, and other tokens to the `@theme` block in the global stylesheet. A token defined there is automatically exposed as **both** a utility class and a CSS variable, so there is no need to declare it twice.
- Use `cn()` for conditional or combined class names (not plain `clsx`). `cn()` lives at `lib/cn.ts` — combines `clsx` with `tailwind-merge` so conflicting Tailwind classes resolve correctly. If it doesn't exist yet, create it before using it:

  ```ts
  // lib/cn.ts
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  ```
