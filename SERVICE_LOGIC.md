# Money Collection System - Service Logic

## Purpose
This service helps a group, class, or organization collect fixed contributions from members and track progress transparently.

It solves these problems:
- manual tracking errors in notebooks/spreadsheets
- no clear visibility of who paid and who still owes
- no per-member payment history in one place
- weak reporting for total progress and pending balances

## Core Roles
- Admin: manages members, records payments, views reports, updates target amount.
- Member: views personal contribution status and payment history.

## Current Logic Scope (Frontend State)
The current implementation is client-side only (React state + localStorage for role simulation).
No backend/database is active yet.

### Authentication Flow
- Login validates email format and minimum password length.
- Role is selected on login (`admin` or `member`).
- Role and display name are stored in `localStorage`.
- Route access is controlled by role checks in the app router.

### Member Management
- Admin can add a member with a unique name (case-insensitive check).
- Duplicate member names are rejected.
- New member structure:
  - `id`
  - `name`
  - `paid` (starts at `0`)
  - `payments` (starts as empty array)
- Admin can delete a member.

### Payment Recording
- Admin selects a member and enters an amount.
- Validation rules:
  - member must be selected
  - amount must be a positive number
  - amount cannot exceed member remaining balance
- If valid:
  - member `paid` increases by amount
  - a payment record is appended with:
    - `amount`
    - `date` (local timestamp)

### Target and Balances
- Global target per member defaults to `130000`.
- Remaining per member = `target - paid`.
- Overall collected = sum of all member `paid`.
- Overall remaining = `(members count * target) - overall collected`.

### History and Reporting
- Member history shows chronological payment entries per member.
- Reports summarize:
  - total members
  - total collected
  - total remaining
  - completion percentage
  - status breakdown (completed/pending/not paid)

## Business Rules (Must Not Change During UI Redesign)
- Unique member names (case-insensitive).
- No overpayment above member remaining amount.
- Target-driven progress calculations.
- Every payment must create a history entry.
- Reports must be derived from the same source member state.

## UI Redesign Boundaries
When redesigning UI, keep logic unchanged by preserving:
- state shape for members and payments
- validation behavior for add member and payment
- computed totals and progress formulas
- admin/member route behavior

Allowed to change:
- layout, colors, typography, spacing, components
- navigation style and interaction patterns
- visual hierarchy and responsiveness

## Future Service Evolution (Backend Ready)
Planned backend integration should move logic from client state into API + database:
- Auth: replace localStorage role simulation with secure auth (JWT/session)
- Members API: create/list/delete members
- Payments API: record/list payments with server timestamps
- Settings API: persist target amount
- Reports API: server-calculated aggregates

## Success Criteria
The service is successful when:
- admins can manage contributions quickly and accurately
- members can trust and verify their payment status
- leadership can instantly see collection progress and gaps
- audit trail exists for all payment actions
