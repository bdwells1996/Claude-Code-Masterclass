# Firebase Signup Integration Plan

## Context
The signup page at `app/(public)/signup/page.tsx` currently has a stub `handleSubmit` that only `console.log`s the form data. This plan wires it up to Firebase Auth, generates a PascalCase codename, updates the user's `displayName`, creates a Firestore user document, and redirects to the dashboard.

## Implementation Steps

### 1. Create codename generator utility
**File:** `lib/generateCodename.ts`

Create three word arrays (adjective1, adjective2, noun) with ~20+ words each. Export `generateCodename(): string` that picks one from each array and joins in PascalCase (e.g. `"SwiftShadowStalker"`).

### 2. Update signup page
**File:** `app/(public)/signup/page.tsx`

Replace the stub `handleSubmit` with a full async signup flow:
1. Call `createUserWithEmailAndPassword(auth, email, password)` from `firebase/auth`
2. Generate codename via `generateCodename()`
3. Call `updateProfile(userCredential.user, { displayName: codename })`
4. Call `setDoc(doc(db, 'users', uid), { id: uid, codename })` — no email stored
5. Redirect to `/heists` using `useRouter`

Add loading state (disable form during in-flight request) and error state (display Firebase error messages).

### 3. Update AuthForm to accept loading/error props
**File:** `components/AuthForm/AuthForm.tsx`

Add optional `loading?: boolean` and `error?: string` props so the signup page can pass down state for display and button disabling. Keeps form reusable for login.

## Critical Files
- `app/(public)/signup/page.tsx` — main change
- `lib/generateCodename.ts` — new utility
- `components/AuthForm/AuthForm.tsx` — add loading/error props
- `lib/firebase.ts` — import `auth` and `db` (already exported)

## Reuse
- `auth` and `db` from `@/lib/firebase` (already configured)
- `AuthContext` in `contexts/AuthContext.tsx` will auto-update after user creation via `onAuthStateChanged`

## Tests
- `tests/lib/generateCodename.test.ts` — test PascalCase format, three words joined, randomness
- `tests/components/SignupPage.test.tsx` — mock `firebase/auth` and `firebase/firestore`, verify: Auth called, `updateProfile` called with codename, `setDoc` called without email, redirect triggered

## Verification
1. Run `npm run dev` and attempt signup with a new email
2. Check Firebase console → Authentication for new user with codename as `displayName`
3. Check Firestore → `users/{uid}` document has `id` and `codename`, no email
4. Confirm redirect to `/heists` after success
5. Test duplicate email shows error message in UI
6. Run `npm test` to confirm all tests pass
