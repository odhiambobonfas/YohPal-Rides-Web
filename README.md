# YohPal Rides Web

A Next.js-based ride-sharing web application built for drivers and customers to manage rides, orders, and earnings.

## Getting Started

1. **Clone repo**
```console
git clone https://github.com/Yohpal-International-Limited/YohPal-Rides-Web.git
git switch -c <your_branch>
```

2. **Install dependencies**
```console
bun install
# or npm install, yarn install, pnpm install
```

3. **Run development server**
```console
bun run dev
# or npm run dev, yarn dev, pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. **Run linter**
```console
bun run lint
```

## Project Overview

```
.
├── actions/
├── app/
│   ├── auth/
│   ├── dashboard/
│   ├── data/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── (yohpal)/
├── components/
│   ├── app/
│   ├── custom/
│   └── ui/
├── constants/
├── hooks/
├── lib/
├── middleware.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── providers/
├── public/
├── services/
│   ├── client/
│   └── server/
├── tsconfig.json
└── types/
```

## Directory Overview

`actions/` - Server Actions that bridge services to client components
- Handles data mutations, form submissions, and server-side operations
- Cookie management and authentication flows

`app/` - Next.js App Router pages and layouts
- `auth/` - Authentication pages (login, register, forgot-password)
- `dashboard/` - Main dashboard entry point
- `(yohpal)/` - Route group containing main application pages
  - `history/` - Trip history and earnings records
  - `orders/` - Customer orders and ride management
  - `profile/` - Driver/customer profile pages
  - `rides/` - Active rides and ride tracking
- `data/` - Sample data files (TypeScript)
- `globals.css` - Shared styling across the application

`components/` - Reusable UI components
- `app/` - Application-specific components
- `custom/` - Custom-built components for this project
- `ui/` - Components sourced and extended from [shadcn/ui](https://ui.shadcn.com)

`constants/` - Centralized constants (app-wide values, enums, and config-like constants)

`hooks/` - Custom React hooks (client-side state and reusable logic)

`lib/` - General-purpose utilities and shared logic (formatters, helpers, etc.)

`providers/` - React context providers and application-level state management (auth, theme, etc.)

`public/` - Static assets (images, icons, files accessible directly via `/`)

`services/` - Business logic layer
- `client/` - interacts with Firebase **client SDK** (used in the browser)
- `server/` - interacts with Firebase **admin SDK** (server-only logic, SSR or API routes)

`types/` - TypeScript type definitions for the entire project

## Conventions

### Naming
- Variables, functions, and parameters: `camelCase`
- Components, classes, types, and interfaces: `PascalCase`
- Constants: `UPPER_CASE`
- Unused variables/params: prefix with `__` (e.g. `__unusedVar`)

### Hooks
- Group hooks by domain inside subfolders (e.g. `hooks/user/`).
- **No side effects in `use...` hooks** — they are guaranteed readonly (data fetching, selectors, derived state).
- **Mutations must be explicit**: hooks that modify state/data must be named with the `Mutation` suffix (e.g. `useOrderMutations`).

### Services
- Business logic **must not leak into components**.
- Use `services/client` for browser SDK logic, `services/server` for admin/server-side logic.
- Any database operation should be done here.

### Providers
- Keep global context/state management in `providers/`.
- Providers should avoid heavy business logic — delegate that to `services/`.

### Actions
- Server Actions are the **bridge layer** between client components and server services.
- Must be marked with `"use server"` at the top of the file.
- Used for:
  - Data mutations (create, update, delete operations)
  - Server-side cookie management (set, unset, read)
  - Form submissions and validations
  - Any operation requiring server-only secrets or admin privileges

*Why:*
- **Security**: Actions run on the server, so they can safely use admin SDKs and environment secrets.
- **Type safety**: Actions are fully type-safe when called from client components.
- Group actions by domain (e.g. `actions/rides/`, `actions/auth/`).

## Environment Setup

Copy `.env.example` to `.env.local` and configure:
```bash
cp .env.example .env.local
```

## Learn More

> [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
>
> [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
>
> [Firebase Documentation](https://firebase.google.com/docs) - Backend services integration.
