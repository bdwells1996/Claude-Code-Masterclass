# useUser Hook with Auth State Management

## Overview

Implement a centralized auth state management system for the Pocket Heist application that provides real-time access to the current authenticated user throughout the app. Users should be able to use a `useUser()` hook in any page or component to access the current user object (null if logged out, user object if logged in). This foundation enables protected routes and personalized experiences without requiring page-level prop drilling.

## Goals

- Provide a simple, accessible `useUser()` hook for querying current authentication state in any component
- Enable real-time synchronization of user state across the entire application
- Create a foundation for future auth features (protected routes, role-based access, user preferences)
- Establish auth context that can be used alongside Firebase authentication
- Support authenticated and unauthenticated states seamlessly

## Requirements

### useUser Hook
- Export a custom hook called `useUser()` from a dedicated auth context module
- Hook should return the current user object or null if not authenticated
- Hook should be usable in any page or component without prop drilling
- Hook should throw an error if used outside of the AuthProvider
- Hook should provide TypeScript type safety for the user object

### Auth Provider Context
- Create an AuthProvider component that wraps the entire application or dashboard routes
- AuthProvider should establish real-time listener for user authentication state
- AuthProvider should update context whenever user authentication state changes
- AuthProvider should handle loading state during initial auth check
- AuthProvider should pass user state and loading state to context consumers

### Real-time Listener
- Implement real-time listener to detect changes in authentication state
- Listener should update app immediately when user logs in or logs out
- Listener should persist across page navigation and route changes
- Listener should be efficient and not cause unnecessary re-renders

### Integration Points
- useUser hook should be available in all page and component files
- Works seamlessly with existing (public) and (dashboard) route groups
- Can be used to conditionally render UI based on authentication status
- No changes required to signup/login/logout pages at this stage

## Acceptance Criteria

- [ ] useUser hook exports from a dedicated auth module
- [ ] Hook returns user object when authenticated, null when logged out
- [ ] AuthProvider wraps application and establishes real-time listener
- [ ] AuthProvider includes loading state during initial auth check
- [ ] Hook throws descriptive error when used outside of AuthProvider
- [ ] Hook works in both server and client components (with appropriate directives)
- [ ] Real-time updates propagate to all components using the hook
- [ ] TypeScript types defined for user object and hook return value
- [ ] Auth state persists across page navigation
- [ ] No modifications needed to existing login/signup/logout pages

## Technical Context

- Leverage Firebase Authentication for real-time listener and user state
- Use React Context API for state management across the app
- Create dedicated `hooks/useUser.ts` and `contexts/AuthContext.tsx` files
- Use TypeScript for type safety on user object and hook
- Implement proper error boundaries and error messages
- Follow existing component and hook patterns in the codebase

## Success Metrics

- useUser hook is easily importable and usable in any component
- Real-time listener activates immediately when app loads
- Auth state updates instantly when user logs in/out
- Type safety prevents runtime errors related to user state
- Application remains performant with context updates
- Zero prop drilling required for auth state access

## Edge Cases & Common User Behaviors

### Initial Load
- User visits app for first time (should show loading state, then unauthenticated)
- User has valid Firebase session from previous visit (should restore user immediately)
- User has expired session (should log out automatically)
- Network error during initial auth check (should handle gracefully)

### Real-time Updates
- User logs in while component is mounted (should reflect immediately)
- User logs out from another tab (should update current app instantly)
- User account is disabled server-side (should log out and sync)
- Multiple components use useUser hook simultaneously (should not cause re-render flooding)

### Hook Usage
- useUser called outside AuthProvider (should throw clear error)
- useUser called during server-side rendering (should handle appropriately)
- useUser called in deeply nested component (should still work without prop drilling)
- Component unmounts while auth state is updating (should clean up properly)

### State Transitions
- User transitions from logged out to logged in (full user object should populate)
- User transitions from logged in to logged out (should become null)
- User updates profile (user object should reflect changes)
- Loading state should appear during transitions (for optional skeleton screens)

## Testing Considerations

### Unit Tests
- useUser hook returns null when no user authenticated
- useUser hook returns user object when authenticated
- useUser throws error when used outside AuthProvider
- Hook re-renders components when user state changes
- TypeScript types are correctly inferred

### Integration Tests
- AuthProvider initializes and checks auth state on mount
- Real-time listener responds to Firebase auth changes
- Multiple components using useUser stay in sync
- Real-time updates work across route changes
- Loading state displays during initial auth check

### Hook Usage Tests
- useUser works in various component types (pages, layout, nested components)
- useUser doesn't cause unnecessary re-renders
- useUser cleanup happens on component unmount
- Rapid auth state changes are handled correctly

### Edge Case Tests
- Network failure during auth check (handles gracefully)
- User logs in/out from another browser tab (syncs immediately)
- Component unmounts during auth transition (cleans up properly)
- useUser used in multiple places simultaneously (no conflicts)
