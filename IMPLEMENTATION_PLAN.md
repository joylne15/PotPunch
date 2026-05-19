# Implementation Plan: Bankco UI/UX Rebuild (Admin Repo First)

## Goal
Rebuild this project to mimic the provided Bankco reference UI/UX as closely as possible (pixel-level intent), using:
- React
- TypeScript
- Tailwind CSS v4 (pure usage, no hybrid UI framework)

This repository is the **admin/client-admin frontend track** first. Public website and backend are separate tracks later.

## Audit 1: Current State (Codebase Reality)
- Stack is Vite + React with `.jsx` files.
- Tailwind v4 is active via `@import "tailwindcss";`.
- Existing pages/components are functional but structurally far from reference.
- Existing screens include login, admin dashboard, member dashboard.
- Business behavior is documented in `SERVICE_LOGIC.md` and must remain intact.

## Audit 2: Gap and Risk
- Major gap: reference has a large UI surface (admin shell, user shell, messaging layout, auth pages, menus/popups, 404) while current app is smaller.
- Major risk: combining visual rewrite with logic changes can break operations.
- Major risk: no shared design-token/component system yet, which can cause inconsistency.
- Migration risk: JSX -> TSX conversions can introduce typing and route regressions.

## Scope Boundary (This Repo)
In-scope now:
- Admin/client-admin interface architecture and pages.
- Auth pages (Sign In / Sign Up) UI mimic.
- 404 page UI mimic.
- Messaging UI mimic.
- User-facing dashboard shell mimic if included in this repo routes.

Out-of-scope now:
- Backend redesign.
- Separate website repo redesign.

## Non-Negotiables
- Preserve all business rules from `SERVICE_LOGIC.md`.
- Tailwind v4 only.
- React + TypeScript migration must be completed before full final polish.
- Build reusable primitives first, then pages.

## Target Information Architecture
- `src/app` (bootstrap, providers, router)
- `src/layouts` (AdminShell, AuthShell, UserShell)
- `src/components/ui` (Button, Input, Badge, Card, Avatar, Modal, Dropdown)
- `src/features/admin/*` (dashboard, messages, settings, users, etc.)
- `src/features/auth/*` (signin, signup, reset-password flow)
- `src/features/shared/*` (header widgets, notifications, profile menu)
- `src/styles` (tokens/utilities if needed)
- `src/types` (domain and UI state types)
- `src/mocks` (static fixtures for visual fidelity)

## Delivery Phases

### Phase 0: Baseline Safety
1. Freeze logic contracts from `SERVICE_LOGIC.md`.
2. Add a regression checklist for existing behavior.
3. Snapshot current routes/components before migration.

### Phase 1: TypeScript Migration
1. Add TypeScript config and strict baseline.
2. Convert entry/core files (`main`, `App`, routing).
3. Convert existing components/pages incrementally to `.tsx`.
4. Keep behavior identical during migration.

### Phase 2: Design System Foundation
1. Define color/spacing/radius/shadow/typography tokens from reference.
2. Implement shared UI primitives.
3. Implement icon strategy (typed SVG components).
4. Establish responsive rules (mobile, tablet, desktop).

### Phase 3: Layout Shells
1. Admin shell: sidebar variants + desktop/mobile header + body wrapper.
2. Auth shell: split panel and modal behavior.
3. Messaging shell: left list, center chat, right profile panel.
4. Error shell: 404 layout.

### Phase 4: Screen Build Order
1. Sign In
2. Sign Up
3. Admin Dashboard shell and top navigation widgets
4. Messaging full page
5. User-side dashboard/list page (if route exists in this repo)
6. 404 page

### Phase 5: Interaction Fidelity
1. Dropdowns, notifications, message popups, profile menu.
2. Dark mode parity.
3. Keyboard/focus/accessibility pass.
4. Scroll/overflow and sticky behavior parity.

### Phase 6: Logic Rebinding
1. Reconnect existing actions and state flows.
2. Keep add-member/payment/history flows unchanged.
3. Verify role-based route behavior still works.

### Phase 7: QA and Sign-off
1. Pixel checks against reference captures.
2. Cross-breakpoint validation.
3. Visual state matrix (default/hover/focus/active/disabled/dark).
4. Final regression against `SERVICE_LOGIC.md`.

## Route-Level Implementation Checklist
- `/signin` (or `/login`): full auth-left panel + right illustration panel mimic.
- `/signup`: same shell parity + signup form states.
- `/admin` and child routes: header, sidebar, widgets, content cards/tables.
- `/messages`: full three-column messaging experience.
- `/404`: branded error page.
- User shell routes if present: compact/expanded sidebar + listing page parity.

## Artifacts Required for Team Continuity
- `AGENT.md`: implementation protocol for contributors/agents.
- `DESIGN.md`: token/spec source of truth.

## Acceptance Criteria
- UI structure and behavior closely mimic reference across desktop and mobile.
- No regressions in business logic.
- All major pages use shared primitives and tokens.
- TypeScript build passes and app runs cleanly.

## Immediate Next Actions
1. Create and finalize `AGENT.md`.
2. Create and finalize `DESIGN.md`.
3. Start Phase 1 conversion (`.jsx` -> `.tsx`) after docs approval.
