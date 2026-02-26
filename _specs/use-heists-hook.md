# Use Heists Hook

## Overview

Implement a custom React hook `useHeists` for accessing real-time heist data from the Firestore `heists` collection. The hook will support dynamic querying based on a provided filter argument ('active' or 'expired'). Once implemented, the hook will be used on the heists dashboard page to display titles of relevant heists.

## Goals

- Create a reusable `useHeists` hook for real-time Firestore data synchronization.
- Implement conditional querying logic to filter heists based on their status and deadline.
- Integrate the hook into the `(dashboard)/heists` page to display heist titles.
- Ensure efficient data fetching and proper cleanup of Firestore listeners.

## Requirements

### useHeists Hook
- **Input:** Accepts an argument of type `'active' | 'expired'`.
- **Functionality:** 
    - For `'active'`: Queries all heists where `assignedTo` is the current user ID AND `deadline` date has not passed.
    - For `'expired'`: Queries all heists where `deadline` date has passed AND `finalStatus` is NOT `null` (regardless of the user).
- **Real-time Updates:** Uses Firestore `onSnapshot` to provide real-time updates.
- **Output:** Returns an array of heist objects (matching the existing heist schema).
- **Error Handling:** Should handle potential Firestore access errors and loading states.

### Dashboard Integration
- Location: `@app/(dashboard)/heists/page.tsx`
- Use the `useHeists` hook to fetch and display only the **titles** of the heist result sets.
- Should show three distinct lists (or sections) based on the filter logic.

## Acceptance Criteria

- [ ] `useHeists` hook correctly fetches real-time data from Firestore.
- [ ] 'Active' filter returns only heists assigned to the current user with a future deadline.
- [ ] 'Expired' filter returns heists with a past deadline and a non-null `finalStatus`.
- [ ] Hook cleans up the Firestore listener on unmount.
- [ ] Dashboard page displays the titles of heists correctly using the new hook.
- [ ] Loading and empty states are handled on the dashboard page.

## Technical Context

- **Firestore Collection:** `heists`
- **Existing Hook Patterns:** Refer to `hooks/useUser.ts` for authentication context.
- **Data Types:** Ensure the hook returns objects consistent with the heist schema defined in `types/firestore/heist.ts`.
- **Authentication:** Use `AuthContext` or `useUser` to get the current user ID for the 'active' filter.

## Success Metrics

- Data in the dashboard reflects real-time changes in Firestore.
- No memory leaks from uncleaned Firestore listeners.
- Correct filtering logic as verified by test cases.

## Edge Cases & Common User Behaviors

- [ ] **No User:** If no user is authenticated, the 'active' filter should return an empty array or handle the case gracefully.
- [ ] **Empty Results:** Handle cases where no heists match the 'active' or 'expired' filters.
- [ ] **Immediate Deadlines:** Heists with deadlines very close to the current time should transition correctly between filters.
- [ ] **Firestore Latency:** UI should handle the delay between the hook initialization and the first data snapshot.

## Testing Considerations

### Unit Tests
- [ ] Test the filtering logic by mocking Firestore's `query` and `where` functions.
- [ ] Verify the hook returns the expected data structure.
- [ ] Ensure the listener is unsubscribed on unmount.

### Integration Tests
- [ ] Test the integration with the dashboard page.
- [ ] Simulate real-time data updates and verify UI updates.

### Accessibility Tests
- [ ] Ensure the lists of heist titles are semantically marked up (e.g., using `<ul>` and `<li>`).
