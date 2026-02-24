# Login and Sign Up Forms

## Overview

Implement authentication forms for login and sign up functionality on the public routes. Users should be able to authenticate with an email and password, with the ability to toggle password visibility. The login page will include a link to the sign up page for new users.

## Goals

- Provide a user-friendly login experience on the public routes
- Provide a user-friendly sign up experience on the public routes
- Allow users to control password field visibility for better usability
- Encourage new users to sign up via a call-to-action link on the login page
- Establish a foundation for authentication that can be extended with backend integration

## Requirements

### Login Form
- Email input field with appropriate validation feedback
- Password input field with show/hide toggle
- Submit button to process login
- Link to sign up page with text: "Don't have an account? Sign up"
- Form should console log user details (email and password) on successful submission
- Clear visual feedback for required fields

### Sign Up Form
- Email input field with appropriate validation feedback
- Password input field with show/hide toggle
- Password confirmation field with show/hide toggle
- Submit button to process sign up
- Link back to login page with text: "Already have an account? Log in"
- Form should console log user details (email and password) on successful submission
- Clear visual feedback for required fields
- Password confirmation validation (passwords must match)

### General Requirements
- Forms should use existing design system tokens and styling
- Password visibility toggle should update both password and confirmation fields
- Forms should be responsive and accessible
- Follow the existing component structure and patterns defined in CLAUDE.md
- Both forms should be located under the `(public)` route group

## Acceptance Criteria

- [ ] Login form renders at `/login` with email and password fields
- [ ] Sign up form renders at `/signup` with email, password, and password confirmation fields
- [ ] Password visibility toggle works on all password fields
- [ ] Login form includes link to sign up page
- [ ] Sign up form includes link to login page
- [ ] Form submission logs user details to console
- [ ] Forms reject submission if required fields are empty
- [ ] Forms have appropriate styling using design tokens
- [ ] All components follow existing code patterns

## Technical Context

- Use React components following the existing pattern in `components/`
- Leverage Tailwind CSS with design system tokens from `globals.css`
- Create reusable input components if needed
- Keep form validation simple for now (email format, password matching)
- Log to console instead of making API calls

## Success Metrics

- Users can successfully fill and submit both forms
- Password toggle provides clear visual indication of state
- Console output shows user-entered details on submission
- Navigation between forms works smoothly
- Forms integrate seamlessly with existing design system

## Edge Cases & Common User Behaviors

### Email Input Edge Cases
- Empty email submission (should prevent form submission)
- Spaces before/after email (should be trimmed)
- Invalid email formats (e.g., missing @ or domain)
- Uppercase letters in email (should be handled consistently)
- Very long email addresses (should truncate/validate)

### Password Input Edge Cases
- Empty password submission (should prevent form submission)
- Very short passwords (e.g., single character)
- Very long passwords (should not break UI)
- Passwords with special characters, emojis, Unicode
- Leading/trailing spaces in password (should be preserved)
- Copy/paste into password field (should work smoothly)

### Password Visibility Toggle Behaviors
- Toggling visibility should not clear the input value
- Toggling should work rapidly without lag
- Icon/button should provide clear visual indication of current state
- Toggle should persist the visibility state as user types (or reset on form clear)
- On sign up form, toggling password should also toggle confirmation field

### Password Confirmation (Sign Up)
- User types password, leaves confirmation empty, tries to submit (should fail)
- User types mismatched passwords, tries to submit (should show error)
- User types matching passwords, then changes password (confirmation becomes invalid)
- User types confirmation field first, then password (should validate dynamically)

### Form Submission & Navigation
- User submits form by clicking Enter/Return key (should work)
- User clicks submit button multiple times rapidly (should prevent duplicate submissions)
- User navigates away before form submission completes (should handle gracefully)
- User refreshes page after form submission (should not resubmit)
- User uses browser back button on sign up page (should preserve form data or clear gracefully)

### User Workflow Edge Cases
- User visits `/login`, doesn't have account, clicks "Sign up" link (should navigate to `/signup`)
- User visits `/signup`, already has account, clicks "Log in" link (should navigate to `/login`)
- User switches between login and signup multiple times (forms should not retain previous data)
- User opens login in one tab, signup in another (independent state)
- User on mobile scrolls and accidentally toggles password visibility (should not interfere with scrolling)

## Testing Considerations

### Unit Tests
- Email field validation (valid/invalid formats)
- Password field validation (empty, length requirements)
- Password matching validation on sign up
- Password visibility toggle state management
- Form submission prevention when validation fails
- Console logging with correct data structure

### Integration Tests
- Navigation between login and signup pages via links
- Form data submission and console output verification
- Password toggle affecting both password and confirmation fields
- Enter key triggering form submission
- Multiple rapid submissions handled correctly

### Edge Case Tests
- Trim whitespace from email and password
- Handle special characters and Unicode in password
- Validate very long input strings don't break layout
- Empty field submission attempts
- Mismatched password confirmation
- Rapid toggle of password visibility

### Accessibility Tests
- All inputs have associated labels
- Error messages announced to screen readers
- Password toggle button is keyboard accessible
- Tab navigation works correctly through form
- Required field indicators are announced
- Focus states are visible
