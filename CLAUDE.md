# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Pocket Heist** is a Next.js 16 web application built with React 19, TypeScript, Tailwind CSS 4, and Vitest. The app is organized into public routes (authentication/onboarding) and protected dashboard routes.

## Development Commands

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Build for production | `npm build` |
| Start production server | `npm start` |
| Run all tests | `npm test` |
| Run single test file | `npm test Navbar.test.tsx` |
| Run tests in watch mode | `npm test -- --watch` |
| Lint code | `npm run lint` |

The dev server runs on `http://localhost:3000` with hot module replacement enabled.

## Architecture

### Directory Structure

```
app/
  ├── layout.tsx                 # Root layout (metadata, globals.css)
  ├── globals.css                # Design tokens + Tailwind config
  ├── (public)/                  # Public routes (route groups)
  │   ├── layout.tsx
  │   ├── page.tsx               # Home page
  │   ├── login/page.tsx
  │   ├── signup/page.tsx
  │   └── preview/page.tsx        # Component preview page
  └── (dashboard)/               # Protected routes (route groups)
      ├── layout.tsx             # Includes Navbar
      ├── heists/page.tsx
      ├── heists/create/page.tsx
      └── heists/[id]/page.tsx

components/
  └── [ComponentName]/
      ├── index.ts               # Export barrel
      ├── [ComponentName].tsx     # Component logic
      ├── [ComponentName].module.css  # Component styles (if CSS modules)

tests/
  └── components/
      └── [ComponentName].test.tsx
```

### Design System

All design tokens are defined in `app/globals.css` using Tailwind's `@theme` directive. This allows tokens to be referenced in both CSS classes and component utilities:

**Brand Colors:**
- Primary: `#8B80F9` (purple)
- Primary Dark: `#302D79` (for accents/shadows)
- Secondary: `#F06543` (orange)
- Secondary Dark: `#C04A2A` (for shadows/hover states)

**UI Backgrounds:**
- Main: `#FEF7F2` (pale cream)
- Muted: `#F5EDE6` (slightly darker)

**Text:**
- Default: `#141616` (dark/black)
- Accent: `#302D79` (dark purple for accents)
- Muted: `#6B6B6B` (gray)

**Component States:**
- Disabled BG: `#E8E4DC`
- Disabled Text: `#9A9A9A`
- Disabled Border: `#D4CEC4`

**Utility:**
- Success: `#05DF72`
- Error: `#FF6467`

### Routing & Layouts

Next.js **route groups** (folders in parentheses) organize routes by context:
- `(public)` — Login, signup, onboarding pages
- `(dashboard)` — Authenticated heist management with Navbar

Each group has its own layout. The dashboard layout imports and renders the Navbar component at the top.

### Component Structure

Components follow a modular folder pattern:
1. Create a folder with PascalCase name (e.g., `components/Button/`)
2. Place component in `[ComponentName].tsx`
3. Export from `index.ts` barrel file
4. Add CSS modules (`[ComponentName].module.css`) for component-scoped styles or use Tailwind classes

**Example component (Button.tsx):**
- Uses variant prop to apply different styles (primary/secondary)
- Tailwind classes for base styles, design token vars for colors
- Shadow borders using Tailwind's `shadow-[...]` syntax
- Disabled state handled with design system token colors

### Styling Approach

- **Global styles:** `globals.css` contains design tokens, typography rules, and generic layout classes
- **Component styles:** Use CSS modules for complex layouts or Tailwind utilities for simple components
- **CSS Modules:** Import and apply as `className={styles.className}` (see Navbar)
- **Tailwind utilities:** Use design token colors with `bg-primary`, `text-text`, etc.

Class names follow the pattern `.siteNav`, `.page-content`, `.center-content` for reusable layout utilities.

## Testing

Testing uses **Vitest** with React Testing Library. Test files mirror component structure:

```
components/Button/Button.tsx
tests/components/Button.test.tsx
```

**Test pattern:**
```typescript
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Button from "@/components/Button"

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText(/click me/i)).toBeInTheDocument()
  })
})
```

Setup files in `vitest.setup.ts` initialize jest-dom matchers. Use `screen` queries for accessibility-first testing (avoid `container.querySelector`).

## Import Paths

Absolute imports use the `@/` alias (configured in `tsconfig.json`):
```typescript
import Navbar from "@/components/Navbar"
import "@/app/globals.css"
```

## Code Style

- **TypeScript:** Strict mode enabled, types required for function parameters and return values
- **ESLint:** Uses Next.js core web vitals + TypeScript config (see `eslint.config.mjs`)
- **Formatting:** No Prettier configured; rely on ESLint
- **Naming:** Components use PascalCase, files match component names

## Adding New Components

1. Create `components/[ComponentName]/[ComponentName].tsx`
2. Create `components/[ComponentName]/index.ts` with barrel export
3. Add styles (Tailwind utilities or CSS module)
4. Create `tests/components/[ComponentName].test.tsx`
5. Import in pages/layouts as needed

Use the Button component in `components/Button/` as a reference for styling patterns and design token usage.
