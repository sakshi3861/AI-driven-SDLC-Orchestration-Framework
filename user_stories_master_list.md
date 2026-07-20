# Master User Stories List

**Project:** Login Module for Food Delivery Platform  
**Source Documents:** `ingestion/requirements/BRD.md` & `ingestion/architecture/LLD.md`  
**Version:** 2.0  

---

## 1. Scope & Out-of-Scope Summary

### In-Scope
- **US-01:** User Authentication
- **US-02:** Secure Logout

### Explicitly Out-of-Scope
- User Registration
- Password Reset
- Multi-Factor Authentication (MFA)
- Social Login (OAuth / Single Sign-On)
- User Profile Management

---

## 2. Master List of User Stories

### US-01: User Authentication

- **ID:** US-01
- **Title:** User Authentication
- **User Story:** As a Registered User, I want to log in with email and password so that I can securely access the platform.
- **Acceptance Criteria:**
  1. Valid credentials authenticate via backend REST API (`POST /users/login`).
  2. JWT token is issued by the backend and persisted on the client.
  3. Invalid credentials display a clear, descriptive error message.
  4. Authenticated user is redirected to their role-based dashboard.
- **Business Requirements Mapped:**
  - `BR-01`: System shall authenticate users via email/password.
  - `BR-02`: System shall issue and persist a JWT session token.
  - `BR-03`: System shall provide role-based redirection after login.
- **Technical Components & Architecture (LLD Mapping):**
  - **Frontend:**
    - `frontend/src/pages/Login.jsx`: Form state, client-side validation, calls `authService.login()`, stores JWT via `AuthContext`, redirects based on user role.
    - `frontend/src/context/AuthContext.jsx`: Stores JWT and user state; exposes `login()`.
    - `frontend/src/services/authService.js`: Executes HTTP call to `POST /users/login`, handles responses/errors.
  - **Backend:**
    - `backend/src/routes/authRoutes.js`: Defines authentication routes.
    - `backend/src/controllers/authController.js`: Handles `POST /users/login`, validates request body, delegates to `authService.authenticate()`, returns `{ token, user }` or HTTP 401.
    - `backend/src/services/authService.js`: Business logic for credential verification (bcrypt password comparison) and JWT generation.
  - **Database Schema:**
    - `Users` table: `id`, `email`, `password_hash`, `role`, `created_at`.

---

### US-02: Secure Logout

- **ID:** US-02
- **Title:** Secure Logout
- **User Story:** As an authenticated user, I want to log out so that my session is securely terminated.
- **Acceptance Criteria:**
  1. Triggering logout clears the JWT token from browser storage and resets `AuthContext` state.
  2. User is immediately redirected to the login page (`/login`).
  3. All protected routes become inaccessible following logout.
- **Business Requirements Mapped:**
  - `BR-04`: System shall allow secure logout, destroying the session.
- **Technical Components & Architecture (LLD Mapping):**
  - **Frontend:**
    - `frontend/src/context/AuthContext.jsx`: Implements `logout()`, removing stored token, resetting user state to `null`.
    - `frontend/src/pages/Login.jsx` / `Navbar`: Logout button/action that triggers `AuthContext.logout()` and redirects to `/login`.
  - **Backend / Routing:**
    - Protected route guards check for valid JWT context; unauthenticated requests are redirected or denied.

---

## 3. Approved Execution Scope Status

| Story ID | Story Name | Status | Target PDP Document |
|---|---|---|---|
| **US-01** | User Authentication | Approved | `PDP-US-01-User-Authentication.md` |
| **US-02** | Secure Logout | Approved | `PDP-US-02-Secure-Logout.md` |
