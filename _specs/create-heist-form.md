# Create Heist Form

## Overview

Implement a 'create heist' form in `app/(dashboard)/heists/create/page.tsx`. When submitted, the form should create a new heist document in a Firestore `heists` collection and then redirect the user to the `/heists` page. The form will allow users to assign the heist to other users by fetching codenames and user IDs from the `users` collection.

## Goals

- Provide a functional and intuitive form for creating new heists.
- Integrate the form with Firebase Firestore for data persistence.
- Allow users to assign heists to other members of the "crew" using their codenames.
- Automatically calculate and store the heist deadline (48 hours from creation).
- Ensure a smooth user experience with appropriate redirection after successful creation.

## Requirements

### Functional Requirements
- [ ] Render a form with fields for `title`, `description`, and `assignedTo`.
- [ ] Fetch the list of available users (codenames and IDs) from the Firestore `users` collection to populate an assignment dropdown.
- [ ] Implement the `CreateHeistInput` interface for form submission.
- [ ] Automatically set `createdAt` using `serverTimestamp()`.
- [ ] Automatically set `deadline` to 48 hours from the time of creation.
- [ ] Set `finalStatus` to `null` by default for new heists.
- [ ] Set `createdBy` and `createdByCodename` based on the currently authenticated user.
- [ ] Redirect the user to `/heists` upon successful submission.
- [ ] Display loading states during form submission and user fetching.

### Non-Functional Requirements
- [ ] Ensure form validation (e.g., required fields).
- [ ] Maintain consistent styling with the existing dashboard layout and design tokens.
- [ ] Handle potential Firestore errors gracefully (e.g., permission denied, network issues).

## Acceptance Criteria

- [ ] The "Create Heist" form is accessible at `/heists/create`.
- [ ] The "Assigned To" field is a dropdown populated with codenames from the `users` collection.
- [ ] Submitting the form creates a new document in the `heists` collection with all required fields.
- [ ] The `deadline` field in the database is exactly 48 hours after `createdAt`.
- [ ] The user is redirected to the `/heists` page immediately after a successful heist creation.
- [ ] Form submission is disabled while a request is in progress.
- [ ] Required field validation prevents submission of incomplete forms.

## Technical Context

- **Location:** `app/(dashboard)/heists/create/page.tsx`
- **Database:** Firestore `heists` collection.
- **Interface:** 
  ```typescript
  export interface CreateHeistInput {
    title: string
    description: string
    createdBy: string
    createdByCodename: string
    assignedTo: string
    assignedToCodeName: string
    deadline: Date // 48 hours from creation
    finalStatus: null
    createdAt: FieldValue // serverTimestamp()
  }
  ```
- **Dependencies:** Firebase (Firestore, Auth), Next.js `useRouter`.

## Success Metrics

- Users can successfully create a heist and see it in the database.
- Redirection to the heists list occurs within a reasonable timeframe (< 1s after DB confirmation).
- All fields in the `CreateHeistInput` are correctly populated.

## Edge Cases & Common User Behaviors

- [ ] **Empty Fields:** User attempts to submit without a title or description.
- [ ] **No Assignment:** User doesn't select anyone to assign the heist to.
- [ ] **Network Failure:** Firestore is unreachable during submission.
- [ ] **Auth Session Expiry:** User's session expires while they are filling out the form.
- [ ] **Self-Assignment:** User assigns a heist to themselves.

## Testing Considerations

### Unit Tests
- [ ] Form validation logic (required fields).
- [ ] Correct calculation of the 48-hour deadline.
- [ ] Mapping of form state to the `CreateHeistInput` structure.

### Integration Tests
- [ ] Fetching and displaying the list of users in the dropdown.
- [ ] Mocking Firestore `addDoc` and verifying the arguments passed.
- [ ] Verifying redirection after successful `addDoc` call.

### Accessibility Tests
- [ ] Form fields have correct labels.
- [ ] Keyboard navigation through the form and dropdown.
- [ ] Error messages are announced to screen readers.
