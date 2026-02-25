# GEMINI.md

This document provides an overview and operational guidelines for the Claude Code Masterclass project, named **Pocket Heist**.

## Project Overview

**Pocket Heist** is a Next.js 16 web application built with React 19, TypeScript, and Tailwind CSS 4. It leverages Firebase for backend services. The application architecture separates public routes (authentication/onboarding) from protected dashboard routes. It utilizes Vitest for testing.

## Technologies Used

*   **Framework:** Next.js 16 (React 19)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS 4, CSS Modules
*   **Backend/Database:** Firebase
*   **Testing:** Vitest, React Testing Library
*   **Linting:** ESLint

## Architecture

### Directory Structure Highlights

*   `app/`: Contains root layout, global styles, and Next.js route groups for public (`(public)`) and protected (`(dashboard)`) routes.
*   `components/`: Modular component structure, where each component resides in its own folder with an `index.ts` barrel file and a `[ComponentName].tsx` file.
*   `contexts/`: Global state management, e.g., `AuthContext.tsx`.
*   `hooks/`: Custom React hooks, e.g., `useUser.ts`.
*   `lib/`: Utility functions and configurations, e.g., `firebase.ts`.
*   `tests/`: Test files mirroring the component structure.
*   `_specs/`: Markdown feature specifications.
*   `_plans/`: Markdown implementation plans.

### Design System

Design tokens (colors, UI backgrounds, text, component states) are defined in `app/globals.css` using Tailwind's `@theme` directive.

**Key Colors:**
*   Primary: `#8B80F9` (purple)
*   Secondary: `#F06543` (orange)
*   Main Background: `#FEF7F2` (pale cream)
*   Text Default: `#141616` (dark/black)

### Component Structure and Styling

Components follow a modular folder pattern. Styling can be done using Tailwind utilities or CSS Modules. CSS Modules must include `@reference "../../app/globals.css"` to access design tokens. Client components (using React state, event handlers, etc.) must include `"use client"` directive.

### Routing & Layouts

Next.js route groups (`(public)` and `(dashboard)`) manage routing contexts. Each group has its own layout, with the dashboard layout including a Navbar.

## Building and Running

### Development

To install dependencies:
```bash
npm install
```

To run the development server (available at `http://localhost:3000`):
```bash
npm run dev
```

### Production

To build the project for production:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

### Testing

To run all tests:
```bash
npm test
```

To run a single test file (e.g., `Navbar.test.tsx`):
```bash
npm test Navbar.test.tsx
```

To run tests in watch mode:
```bash
npm test -- --watch
```

### Linting

To lint the codebase:
```bash
npm run lint
```

## Development Conventions

### Code Style

*   **TypeScript:** Strict mode enabled, types required for function parameters and return values.
*   **ESLint:** Used for code quality (configured via `eslint.config.mjs`).
*   **Formatting:** Relies on ESLint; no Prettier is explicitly configured.
*   **Naming:** Components use PascalCase, file names match component names.

### Testing Practices

*   Tests are written using Vitest with React Testing Library.
*   Test files mirror the component directory structure.
*   Setup files in `vitest.setup.ts` initialize `jest-dom` matchers.
*   `screen` queries are preferred for accessibility-first testing.

### Import Paths

Absolute imports are configured using the `@/` alias (e.g., `import Navbar from "@/components/Navbar"`).

### Feature Workflow

The project follows a spec-first workflow:
*   New features require a Markdown specification file in `_specs/`.
*   Implementation plans are documented in Markdown files within `_plans/` before coding begins.

### Adding New Components

1.  Create `components/[ComponentName]/[ComponentName].tsx`.
2.  Create `components/[ComponentName]/index.ts` for barrel export.
3.  Add styles (Tailwind utilities or CSS module).
4.  Create `tests/components/[ComponentName].test.tsx`.
5.  Import and use in pages/layouts as needed.
    (Refer to `components/Button/` for styling examples and `components/AuthForm/` for client component patterns).
