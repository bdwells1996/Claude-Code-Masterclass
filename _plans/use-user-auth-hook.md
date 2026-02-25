# Plan: useUser Hook with Auth State Management

## Context

The app has Firebase fully configured (`lib/firebase.ts` exports `auth`) and an `AuthForm` component wired to console.log stubs. Before connecting real Firebase auth calls to signup/login pages, we need a global auth state layer — a React context + `useUser` hook that any component can call to know who (if anyone) is logged in. This is the foundational piece that enables protected routes, personalised UI, and eventual login/logout wiring.

## Files to Create

| File | Purpose |
|------|---------|
| `contexts/AuthContext.tsx` | AuthProvider component + AuthContext |
| `hooks/useUser.ts` | `useUser()` hook that reads from AuthContext |
| `tests/contexts/AuthContext.test.tsx` | Tests for AuthProvider context |
| `tests/hooks/useUser.test.tsx` | Tests for useUser hook |

## Files to Modify

| File | Change |
|------|--------|
| `app/layout.tsx` | Wrap `{children}` with `<AuthProvider>` |

## Implementation Steps

### 1. Create `contexts/AuthContext.tsx`

- Add `'use client'` directive (uses React state and effects)
- Import `auth` from `@/lib/firebase`
- Import `onAuthStateChanged` and `User` type from `firebase/auth`
- Define `AuthContextType`: `{ user: User | null; loading: boolean }`
- Create `AuthContext` with `createContext<AuthContextType | null>(null)`
- Create `AuthProvider` component:
  - State: `user: User | null` (init `null`) and `loading: boolean` (init `true`)
  - `useEffect` subscribes to `onAuthStateChanged(auth, (firebaseUser) => { setUser(firebaseUser); setLoading(false) })`
  - Effect cleanup calls the unsubscribe function returned by `onAuthStateChanged`
  - Renders `<AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>`
- Default export: `AuthProvider`

### 2. Create `hooks/useUser.ts`

- Import `useContext` from `react`
- Import `AuthContext` from `@/contexts/AuthContext`
- Export `useUser` function:
  - Reads context with `useContext(AuthContext)`
  - Throws `new Error('useUser must be used within an AuthProvider')` if context is null
  - Returns `context` (exposes both `user` and `loading`)

### 3. Wrap root layout in `app/layout.tsx`

- Add `import AuthProvider from '@/contexts/AuthContext'`
- Wrap `{children}` with `<AuthProvider>{children}</AuthProvider>`
- Keep layout as server component (AuthProvider is client, wrapping is fine)

### 4. Write tests

**`tests/hooks/useUser.test.tsx`**
- Mock `firebase/auth` with `vi.mock`
- Test: throws error when used outside AuthProvider
- Test: returns `{ user: null, loading: false }` when no user
- Test: returns user object when authenticated

**`tests/contexts/AuthContext.test.tsx`**
- Mock `onAuthStateChanged` to call back with null (logged out) or a user object
- Test: renders children
- Test: provides `user: null` on initial unauthenticated state
- Test: provides `user` object when Firebase auth resolves with a user
- Test: loading is true initially, false after auth state resolved
- Test: cleans up listener on unmount

## Reuse Notes

- `auth` from `@/lib/firebase` — already initialised, import directly
- `onAuthStateChanged` from `firebase/auth` — the real-time listener
- `User` type from `firebase/auth` — type safety for the user object
- Root layout pattern from `app/layout.tsx` — add AuthProvider as a wrapper

## Verification

1. Run `npm test` — all new tests should pass
2. Run `npm run dev` — open browser, check no console errors on load
3. Import and call `useUser()` in a page component to verify it returns `{ user: null, loading: false }` for unauthenticated state
4. Run `npm run build` — TypeScript compilation should pass with no type errors
