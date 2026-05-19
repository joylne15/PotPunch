# DESIGN.md

## Purpose
Single source of truth for visual implementation while mimicking the provided Bankco reference.

## Design Principles
- Pixel-intent fidelity to reference.
- Clean hierarchy and dense admin information layout.
- Reusable primitives over ad-hoc styling.
- Consistent light and dark theme behavior.

## Token System (Tailwind v4)
Define/maintain tokens for:
- Colors: neutrals, success green, warning, error, surfaces, borders.
- Typography: display/title/body/caption scales.
- Radius: cards, inputs, pills, avatars.
- Spacing: 4/8-based rhythm with route-specific exceptions for exact mimic.
- Elevation: popup/dropdown/modal shadow levels.

## Global Layout Specs
- Header height target: ~108px desktop, ~80px mobile variant.
- Sidebar supports expanded + collapsed + mobile drawer states.
- Content containers use large desktop paddings and tighter mobile paddings.
- Scroll regions must match behavior in message panels and dropdown lists.

## Component Specs

### Buttons
- Primary: success green background, white text, clear hover/active states.
- Secondary/ghost: border and subtle hover surface.
- Icon buttons: square rounded containers with notification dots where needed.

### Inputs
- Rounded, soft neutral backgrounds.
- Strong focus ring/border in success tone.
- Search inputs include embedded icons and keyboard hint chips where required.

### Cards and Panels
- White/dark surfaces with rounded corners.
- Distinct borders/shadows for floating popups.
- Dense but readable spacing in list/table rows.

### Navigation
- Sidebar icon+label rows for expanded mode.
- Compact icon-only rail for collapsed mode.
- Active item has strong contrast and success accent.

### Popups
- Notification/message/profile/store dropdowns require:
  - Absolute anchored position
  - Layered shadow
  - Scrollable content zones
  - Outside-click dismiss behavior

### Messaging Screen
- Three-column layout on desktop:
  - Left: search + pinned/all threads list
  - Center: chat header, thread, composer
  - Right: profile + shared files/links
- Mobile behavior collapses side panes.

### Auth Screens
- Split layout with form side + illustration/content side.
- Include social auth buttons, divider, form inputs, legal/footer links.
- Support modal reset-password flow.

### 404 Screen
- Branded visual continuity with app style.
- Clear recovery CTA back to main route.

## State Matrix (Required)
For all interactive components implement:
- Default
- Hover
- Focus
- Active
- Disabled
- Dark mode equivalents

## Responsive Breakpoints
- Mobile first.
- Validate at least:
  - Small mobile
  - Tablet
  - Standard desktop
  - Large desktop (including wide sidebar/header spacing)

## Visual QA Checklist
- Typography sizes/weights match intent.
- Spacing and alignment are consistent across sections.
- Border radius and shadows are consistent.
- Icon sizing and stroke weights are uniform.
- Dark mode contrast remains readable.
- No layout break in overflow-heavy areas.

## Asset and Icon Guidance
- Prefer local assets where possible.
- Convert repeated SVGs into reusable React components.
- Keep icon color behavior state-aware (light/dark/active).

## Final Fidelity Goal
If a side-by-side compare is made with the provided reference snippets, page structure, spacing rhythm, and interaction behavior should feel equivalent, not just similar.
