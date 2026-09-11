# Project Plans

Use this file for project plans and implementation checklists. Add each new plan as a top-level `##` section and copy the template at the bottom when starting something new.

## Admin Architecture

### Direction

- [ ] Use `server2` + Firebase as the only active authentication system
- [ ] Retire or archive the legacy JWT/password backend in `server/`
- [ ] Confirm MongoDB stores the authoritative application role

### Initial Admin Setup

- [ ] Create the initial admin account in Firebase Authentication
- [ ] Obtain the Firebase user UID
- [ ] Create a one-time secured bootstrap script
- [ ] Use an environment variable for the initial admin UID
- [ ] Create or update the MongoDB profile with `role: "admin"`
- [ ] Run the bootstrap script once
- [ ] Disable or remove the bootstrap capability afterward
- [ ] Ensure no default password exists in source code or deployment config

### Server Authorization

- [ ] Reuse Firebase token verification middleware
- [ ] Create reusable `requireAdmin` middleware
- [ ] Look up the MongoDB user by Firebase UID
- [ ] Return `401` for missing or invalid Firebase tokens
- [ ] Return `403` for authenticated non-admin users
- [ ] Return `403` or `404` consistently when the MongoDB profile is missing
- [] Apply `requireAdmin` to every admin-only route
- [ ] Never trust a client-provided role
- [ ] Add audit information for role changes

### Admin Management

- [-] Replace password-based admin creation
- [-] Add a protected admin role-promotion endpoint
- [ ] Allow admins to promote existing users
- [ ] Prevent unauthenticated users from promoting users
- [ ] Prevent accidental self-escalation
- [ ] Decide whether admin invitations are needed
- [ ] Add audit fields such as `promotedBy` and `promotedAt`

### Client Protection

- [-] Add an `AdminRoute` or role-aware route guard
- [ ] Protect the dashboard and all admin pages
- [ ] Update desktop navigation role checks
- [ ] Update mobile navigation role checks
- [ ] Standardize client role checks with the server role vocabulary
- [ ] Update `CreateAdminPage` to use role promotion instead of passwords
- [ ] Keep client checks for UX only, never security

### Backend Integration

- [ ] Confirm the client API base URL points to `server2`
- [ ] Confirm Firebase ID tokens are sent with API requests
- [ ] Confirm `server2` accepts and verifies those tokens
- [ ] Migrate any required legacy endpoints
- [ ] Remove duplicate JWT/token logic once unused

### Testing

- [ ] Test unauthenticated requests return `401`
- [ ] Test normal authenticated users receive `403`
- [ ] Test admins can access admin routes
- [ ] Test missing MongoDB profiles are denied consistently
- [ ] Test every admin mutation is protected
- [ ] Test direct navigation to admin URLs as a normal user
- [ ] Test direct navigation to admin URLs as an admin
- [ ] Test admin promotion behavior
- [ ] Run client lint
- [ ] Run client production build
- [ ] Check deployment configuration for default credentials
- [ ] Check repository history and source for `admin123` or other bootstrap passwords

### Documentation

- [ ] Update `DATA_MODEL.md` with the final role model
- [ ] Document the initial admin provisioning process
- [ ] Document how to promote or revoke an admin
- [ ] Document which backend is active
- [ ] Document the legacy backend migration status

---

## New Plan Template

Copy this section, paste it above this template, and rename the heading.

## Plan Name

### Goal

- [ ] Describe the outcome this plan should achieve

### Implementation

- [ ] First implementation task
- [ ] Second implementation task
- [ ] Third implementation task

### Testing

- [ ] Add or update focused tests
- [ ] Run lint, typecheck, or build validation
- [ ] Perform relevant manual verification

### Documentation

- [ ] Update relevant documentation

### Notes and Decisions

- Decision:
- Open question:
- Related files:
