# Heist Card Component

## Overview

Create a reusable `HeistCard` component that displays individual heist data from the Firestore `heists` collection. The card will render key heist information including title (as a link to the detail page), assigned user, creator, deadline, and status. The component will be used in the `/heists` dashboard page to list all heists.

## Goals

- Display heist data in a visually consistent, card-based layout matching the design system.
- Provide navigation to individual heist detail pages via clickable titles.
- Show heist metadata (assigned to, created by, deadline, status) in an accessible and scannable format.
- Establish a reusable component pattern for heist list displays.

## Requirements

### Functional Requirements

- [ ] Accept a heist object as a prop with properties: `id`, `title`, `description`, `assignedTo`, `assignedToCodename`, `createdBy`, `createdByCodename`, `deadline`, `finalStatus`, and `createdAt`.
- [ ] Render the heist title as a clickable link pointing to `/heists/{id}`.
- [ ] Display assigned user information with a visual indicator (icon/badge).
- [ ] Display creator information (codename of the user who created the heist).
- [ ] Show time remaining until the deadline (e.g., "2 days left", "6 hours left").
- [ ] Display the created date/time of the heist.
- [ ] Use the design tokens and layout specified in the Figma design (node-id=1-2).
- [ ] Apply an orange accent bar at the top of the card as the primary visual identity marker.

### Non-Functional Requirements

- [ ] Use Tailwind CSS utilities and design system tokens for styling.
- [ ] Follow the existing component folder structure pattern (`components/HeistCard/`).
- [ ] Support TypeScript with proper type definitions for the heist object.
- [ ] Maintain responsive behavior across different screen sizes.
- [ ] Write unit tests for the component in `tests/components/HeistCard.test.tsx`.

## Acceptance Criteria

- [ ] The `HeistCard` component renders without errors when passed a valid heist object.
- [ ] The heist title is a clickable link that navigates to `/heists/{id}`.
- [ ] The card displays all required metadata fields (assigned to, created by, time left, created date).
- [ ] The orange accent bar (`#E8652B` or `bg-secondary`) is visible at the top of the card.
- [ ] The card matches the design specifications from the Figma file (layout, spacing, typography, colors).
- [ ] The component accepts an optional `className` prop for styling flexibility.
- [ ] The component is exported from `components/HeistCard/index.ts`.
- [ ] Unit tests cover rendering the card with valid data and clicking the title link.

## Design Reference

**[View Figma design file](https://www.figma.com/design/gEBLGMznTF7RQbpL1paIia/Pocket-Heist-Designs?node-id=1-2&m=dev)**

### Key Design Details

- **Card dimensions:** ~325px wide, 8px border-radius, 1px solid border (#DDD5C9), soft drop shadow
- **Orange accent bar:** 3px tall gradient bar at the top using `#E8652B` (secondary color)
- **Card layout:** Flex-column with 20px gap between major sections
- **Title:** Playfair Display Medium, 22px, color #2C2416, rendered as a link
- **Metadata rows:** Two-line label stacks with icon badges (34x34px) in a 6px radius box
- **Bottom stat tiles:** Two equal-width tiles showing "Time Left" and "Created" with 16px gap
- **Color palette:** Uses design system tokens with subtle warm tones (#2C2416 for text, #B8AE9E for labels)

## Technical Context

- **Location:** `components/HeistCard/HeistCard.tsx`
- **Export:** `components/HeistCard/index.ts`
- **Interface:**
  ```typescript
  export interface HeistCardProps {
    heist: {
      id: string
      title: string
      description: string
      assignedTo: string
      assignedToCodename: string
      createdBy: string
      createdByCodename: string
      deadline: Date | Timestamp
      finalStatus: string | null
      createdAt: Date | Timestamp
    }
    className?: string
  }
  ```
- **Dependencies:** React, Next.js Link, TypeScript, Tailwind CSS, date formatting utility (if needed).

## Success Metrics

- Users can see heist cards rendered on the `/heists` dashboard page.
- Clicking a heist title navigates to the detail page without errors.
- The card layout matches the Figma design specification within 2-3% variance.

## Edge Cases & Common Scenarios

- [ ] **Past deadline:** Heist deadline has already passed; display "Overdue" or similar.
- [ ] **No status:** `finalStatus` is `null`; display a default state (e.g., "In Progress").
- [ ] **Long title:** Heist title is very long; ensure text wrapping or truncation is handled gracefully.
- [ ] **Same creator and assignee:** Creator and assignee are the same user; still display both.
- [ ] **Very soon deadline:** Deadline is within a few hours; highlight with visual cue if needed.

## Testing Considerations

### Unit Tests
- [ ] Component renders without errors when passed a valid heist object.
- [ ] Heist title renders as a link with the correct `href` attribute (`/heists/{id}`).
- [ ] All metadata fields (assigned to, created by, deadline) are rendered.
- [ ] Time-remaining calculation is correct (e.g., "2 days left").
- [ ] Component accepts and applies the optional `className` prop.

### Accessibility Tests
- [ ] Link has descriptive text (heist title).
- [ ] Metadata labels are properly associated with their values.
- [ ] Color alone is not used to convey information (accent bar is visual only).
- [ ] Card is keyboard navigable (link is focusable).

### Integration Tests
- [ ] Card displays correctly within the heists list page (`/heists`).
- [ ] Multiple cards render correctly without layout issues.
