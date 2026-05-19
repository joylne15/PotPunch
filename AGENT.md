# AGENT.md

## Mission
Implement a full UI/UX rebuild to mimic the provided Bankco reference in this repository (admin/client-admin track), using React + TypeScript + Tailwind v4.

## Hard Constraints
- Do not change business logic behavior defined in `SERVICE_LOGIC.md`.
- Use Tailwind v4 only.
- Keep components reusable and token-driven.
- Preserve route-level behavior while replacing presentation.

## Working Rules
1. Separate presentation work from logic work.
2. Prefer shared components over page-level one-offs.
3. Keep each change set small and verifiable.
4. Match both desktop and mobile behavior.
5. Implement dark mode states where shown in reference.

## Ownership Model
- `IMPLEMENTATION_PLAN.md`: source of execution phases.
- `DESIGN.md`: source of visual specs and tokens.
- `SERVICE_LOGIC.md`: source of immutable behavior rules.

## Suggested Build Order
1. Foundation + TypeScript migration.
2. Design tokens and UI primitives.
3. Layout shells (admin, auth, messaging, error).
4. Page assembly by route priority.
5. Interaction fidelity and QA.

## Route Responsibility Matrix
- Auth: sign in, sign up, forgot password modal flow.
- Admin shell: sidebar, header, quick actions, profile/notification popups.
- Messaging: conversation list + active thread + user info pane.
- User listing/dashboard page: table/list row interactions.
- 404 page: branded error experience.

## Definition of Done (Per Screen)
- Layout matches reference structure.
- Spacing/typography/colors follow `DESIGN.md`.
- Interactive states are implemented.
- Responsive behavior works at mobile/tablet/desktop.
- No business logic regressions.

## QA Gate (Must Pass)
- TypeScript compile/build passes.
- Main interactions clickable and stable.
- Dark mode visual parity for implemented screens.
- Route guards and role behaviors still functional.
- Regression checklist from `SERVICE_LOGIC.md` passes.

## Collaboration Notes for Any Agent
- Read `IMPLEMENTATION_PLAN.md` and `DESIGN.md` before coding.
- If unsure on visuals, follow pixel intent over convenience shortcuts.
- Do not introduce new business rules.
- Document assumptions in PR/commit notes.
