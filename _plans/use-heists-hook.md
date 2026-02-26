# Plan: useHeists Hook

## Context

The spec `_specs/use-heists-hook.md` calls for a `useHeists` custom hook that subscribes to real-time heist data from Firestore using `onSnapshot`. The hook accepts a filter type (`'active' | 'expired'`) and returns a typed `Heist[]` array along with `loading` and `error` states. Once built, it will be integrated into the existing `app/(dashboard)/heists/page.tsx` to populate the three sections already scaffolded there.

---

## Critical Files

| File | Role |
|---|---|
| `hooks/useHeists.ts` | **New** — implement the hook here |
| `app/(dashboard)/heists/page.tsx` | **Update** — consume the hook, render heist titles |
| `types/firestore/heist.ts` | `Heist` type, `heistConverter` |
| `types/firestore/index.ts` | `COLLECTIONS.HEISTS` |
| `lib/firebase.ts` | `db` export |
| `hooks/useUser.ts` | Get `user.uid` for the 'active' filter |
| `contexts/AuthContext.tsx` | `AuthContextType` shape reference |
| `tests/hooks/useUser.test.tsx` | Reference test pattern for hooks |

---

## Implementation Plan

### 1. Create `hooks/useHeists.ts`

```typescript
type HeistsFilter = 'active' | 'expired'

type UseHeistsResult = {
  heists: Heist[]
  loading: boolean
  error: string
}
```

**Logic:**

- Call `useUser()` to get the current `user`
- Set up state: `heists: Heist[]`, `loading: boolean`, `error: string`
- In `useEffect` (deps: `[filter, user]`):
  - If filter is `'active'` and `user` is null → set `heists: []`, `loading: false`, return
  - Build Firestore query:
    - **`'active'`**: `query(collection, where('assignedTo', '==', user.uid), where('deadline', '>', new Date()))`
    - **`'expired'`**: `query(collection, where('deadline', '<=', new Date()), where('finalStatus', '!=', null))`
  - Call `onSnapshot(q.withConverter(heistConverter), ...)`
    - On success: `setHeists(snapshot.docs.map(d => d.data()))`, `setLoading(false)`
    - On error: `setError(err.message)`, `setLoading(false)`
  - Return the unsubscribe function from `useEffect` cleanup

**Imports:** `collection`, `onSnapshot`, `query`, `where` from `firebase/firestore`; `db` from `@/lib/firebase`; `COLLECTIONS`, `Heist`, `heistConverter` from `@/types/firestore`; `useUser` from `@/hooks/useUser`

---

### 2. Update `app/(dashboard)/heists/page.tsx`

Convert to a client component (`'use client'`).

Use the hook twice:
```typescript
const { heists: activeHeists, loading: loadingActive } = useHeists('active')
const { heists: expiredHeists, loading: loadingExpired } = useHeists('expired')
```

Render pattern for each section:
- Show `<p>Loading...</p>` while `loading` is true
- Show `<p>No heists found.</p>` for empty arrays
- Otherwise render `<ul>` with `<li>` per heist showing `heist.title`

Sections:
- **"Your Active Heists"** → `activeHeists`
- **"Heists You've Assigned"** → stub (not covered by spec filter types)
- **"All Expired Heists"** → `expiredHeists`

---

### 3. Add `tests/hooks/useHeists.test.tsx`

Mock pattern (following `tests/hooks/useUser.test.tsx`):
```typescript
vi.mock('@/lib/firebase', () => ({ db: {} }))
vi.mock('@/hooks/useUser', () => ({ useUser: vi.fn() }))
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  onSnapshot: vi.fn(),
}))
```

Test cases:
- Returns `loading: true` initially
- Returns heists array when `onSnapshot` fires with docs
- Returns empty array when `user` is null and filter is `'active'`
- Calls `onSnapshot` with correct query for `'active'` filter
- Calls `onSnapshot` with correct query for `'expired'` filter
- Unsubscribes from `onSnapshot` on unmount

---

## Verification

1. Run `npm run dev`, sign in, navigate to `/heists`
2. Confirm "Your Active Heists" shows titles of heists assigned to your uid with a future deadline
3. Confirm "All Expired Heists" shows titles where deadline has passed and `finalStatus` is set
4. Create a new heist — confirm it appears in the active list in real-time without a page refresh
5. Run `npm test useHeists` → all unit tests pass
