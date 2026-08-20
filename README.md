# Next.js Boilerplate

Next.js (App Router) + TypeScript + Tailwind CSS v3.

## Stack

- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS v3
- ESLint (next/core-web-vitals + next/typescript)
- Prettier + prettier-plugin-tailwindcss (optional, config included)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint
- `npm run type-check` — run `tsc --noEmit`

## Structure

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
```

Path alias `@/*` maps to `src/*` (see `tsconfig.json`).

## Notes

- Prettier is optional — install it plus `prettier` and `prettier-plugin-tailwindcss` as dev dependencies if you want auto-sorted Tailwind classes:
  `npm i -D prettier prettier-plugin-tailwindcss`
