# Plan: Login and Sign Up Forms

## Context

The public routes at `/login` and `/signup` are currently empty shells — each renders only an `<h2>` heading with no form, inputs, or interactions. This plan implements the full authentication UI described in `_specs/login-signup-forms.md`: email + password fields with a show/hide toggle, cross-page navigation links, and console logging on submission.

## What We're Building

Two new reusable components + updates to both public page files + tests.

---

## Files to Create

### `components/FormInput/FormInput.tsx`
A reusable labeled text input for email fields.
- Props: `id`, `label`, `type`, `value`, `onChange`, `placeholder`, `required`
- Renders a `<label>` and `<input>` pair, styled with design tokens

### `components/FormInput/index.ts`
Barrel export: `export { default } from "./FormInput"`

### `components/PasswordInput/PasswordInput.tsx`
A password field with show/hide toggle.
- Props: `id`, `label`, `value`, `onChange`, `placeholder`, `required`
- Internal `useState` for `showPassword` boolean
- Toggle button uses `lucide-react` (`Eye` / `EyeOff` icons — already installed via Navbar)
- Switches input `type` between `"password"` and `"text"`
- Toggle button is `type="button"` to avoid accidental form submission

### `components/PasswordInput/index.ts`
Barrel export: `export { default } from "./PasswordInput"`

---

## Files to Modify

### `app/(public)/login/page.tsx`
Convert to a client component (`"use client"`).
- Form state: `email`, `password` via `useState`
- `handleSubmit` prevents default, validates fields are non-empty, then `console.log({ email, password })`
- Renders: `FormInput` (email) + `PasswordInput` (password) + `Button type="submit"` + Next.js `<Link>` to `/signup`
- Link text: "Don't have an account? Sign up"
- Fix copy/paste bug: rename function from `SignupPage` → `LoginPage`

### `app/(public)/signup/page.tsx`
Convert to a client component (`"use client"`).
- Form state: `email`, `password`, `confirmPassword` via `useState`
- `handleSubmit` prevents default, validates fields non-empty + passwords match, then `console.log({ email, password })`
- If passwords don't match: display inline error message using `text-error` token
- Renders: `FormInput` (email) + `PasswordInput` (password) + `PasswordInput` (confirm) + `Button type="submit"` + Next.js `<Link>` to `/login`
- Link text: "Already have an account? Log in"

---

## Files to Create (Tests)

### `tests/components/FormInput.test.tsx`
- Renders with correct label and placeholder
- Input value updates on change
- Has correct input type

### `tests/components/PasswordInput.test.tsx`
- Renders with label, starts as `type="password"`
- Toggle button shows/hides password (type switches to `"text"` and back)
- Toggle does not clear the input value
- Toggle button is accessible (has accessible name)

### `tests/components/LoginPage.test.tsx`
- Renders email and password fields
- Renders submit button
- Renders "Don't have an account? Sign up" link pointing to `/signup`
- Prevents submission if fields are empty
- `console.log` called with correct values on valid submission

### `tests/components/SignupPage.test.tsx`
- Renders email, password, confirm password fields
- Renders submit button
- Renders "Already have an account? Log in" link pointing to `/login`
- Shows error message when passwords don't match
- Prevents submission if fields are empty
- `console.log` called with correct values on valid submission

---

## Reuse

- `Button` from `components/Button/Button.tsx` — use `type="submit"` and `variant="primary"`
- `lucide-react` — already installed (Navbar uses it). Use `Eye` and `EyeOff` icons
- `Link` from `next/link` — for cross-page navigation
- `.center-content`, `.page-content`, `.form-title` utility classes from `app/globals.css`
- Design tokens: `text-error`, `bg-bg-muted`, `text-text-muted`, `text-primary`

---

## Styling Approach

- Tailwind utilities + design tokens, no new CSS modules needed
- Input fields: `border rounded-xl px-4 py-3 w-full` with `focus:outline-none focus:ring-2 focus:ring-primary`
- Password toggle: `absolute` positioned inside a `relative` wrapper, `Eye`/`EyeOff` icon at ~18px
- Error message: `text-error text-sm` below the confirm password field
- Cross-page link: `text-primary hover:underline text-sm` centered below submit button

---

## Verification

1. `npm run dev` → visit `/login` and `/signup`, confirm forms render correctly
2. Test password visibility toggle on both pages
3. Submit login form → check console logs `{ email, password }`
4. Submit signup form with mismatched passwords → confirm error displays
5. Submit signup form with matching passwords → check console logs `{ email, password }`
6. Confirm cross-page links navigate correctly
7. `npm test` → all new and existing tests pass
