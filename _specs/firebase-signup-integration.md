# Firebase Signup Integration

## Overview

Integrate the signup form in `app/(public)/signup/` with Firebase Authentication using the project's Firebase configuration. Upon successful account creation, a unique "codename" (PascalCase, 3 random words) will be generated and assigned as the user's `displayName`. Additionally, a user profile document will be created in the Firestore `users` collection.

## Goals

- Enable functional user registration using Firebase Auth.
- Implement an automated, creative codename generation system.
- Establish a secure user profile storage pattern in Firestore that avoids using email as a primary identifier.
- Maintain a clean separation between authentication and user profile data.

## Requirements

### Functional Requirements
- [ ] Connect the existing signup form to Firebase `createUserWithEmailAndPassword`.
- [ ] Generate a random codename by selecting one word from three distinct sets of unique words.
- [ ] Join the three words in PascalCase (e.g., "SwiftShadowStalker").
- [ ] Update the Firebase Auth user's `displayName` with the generated codename.
- [ ] Create a Firestore document in the `users` collection with the path `users/{uid}`.
- [ ] Store `codename` and `id` (Firebase UID) in the Firestore document.
- [ ] Ensure the email address is NOT stored in the Firestore user document.
- [ ] Redirect the user to the dashboard or a success state upon completion.

### Non-Functional Requirements
- [ ] Use only the Firebase Web SDK.
- [ ] Ensure codename generation is performed on the client side during the signup flow.
- [ ] Maintain fast signup performance despite additional Firestore and profile update calls.

## Acceptance Criteria

- [ ] Successful signup creates a new user in Firebase Authentication.
- [ ] The user's `displayName` in Firebase Auth matches the generated 3-word PascalCase codename.
- [ ] A document exists in the Firestore `users` collection where the document ID is the user's UID.
- [ ] The Firestore document contains the `codename` and the `id` (UID).
- [ ] The Firestore document does not contain the user's email address.
- [ ] Only Firebase Web SDK methods are utilized.

## Technical Context

- Use exports from `@lib/firebase.ts` (specifically `auth` and `db`).
- Implementation should occur within the `AuthForm` or a dedicated hook used by the signup page.
- Codename word sets should be robust enough to minimize collisions (though absolute uniqueness is not required for `displayName`).

## Success Metrics

- 100% of successful signups result in a correctly updated `displayName`.
- 100% of successful signups create a corresponding Firestore document.
- Zero email addresses leaked into the public `users` Firestore collection.

## Edge Cases & Common User Behaviors

- [ ] **Network Failure:** Handle cases where Auth succeeds but Firestore or `updateProfile` fails (consider cleanup or retry).
- [ ] **Auth Errors:** Display clear Firebase Auth errors (e.g., email already in use) to the user.
- [ ] **Rapid Submission:** Prevent multiple triggerings of the signup flow while a request is in flight.

## Testing Considerations

### Unit Tests
- [ ] Test the codename generator function for PascalCase formatting and randomness.
- [ ] Verify that the Firestore document payload correctly excludes the email.

### Integration Tests
- [ ] Mock Firebase Auth and Firestore to verify the full signup sequence.
- [ ] Ensure the redirect occurs only after all steps (Auth, Profile Update, Firestore) succeed.

### Accessibility Tests
- [ ] Ensure loading states and error messages are correctly announced during the async signup process.
