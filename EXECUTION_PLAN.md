# Execution Plan: PDP US-01 (User Authentication)

**Story ID:** US-01  
**Story Title:** User Authentication  
**Target Project Path:** `C:\Users\Sakshi\Desktop\GAF-CLI new\AI-SDLC-Framework-AG-CLI\workspace\generated_project`  
**Status:** Awaiting Approval  
**Assigned Agent:** code-generator-agent  

---

## 1. Executive Summary & Workspace Assessment

### Workspace State & Gap Analysis
Based on the workspace inspection of `generated_project`:
- **Backend Architecture (`/backend`):**
  - **Existing:** Node.js / Express base setup (`server.js`, `src/app.js`, `src/config/database.js`, `src/middleware/errorHandler.js`, `src/routes/healthRoutes.js`).
  - **Dependencies Missing:** `jsonwebtoken` (^9.0.2), `bcryptjs` (^2.4.3), `express-rate-limit` (^7.2.0).
  - **Files to Create:**
    - `backend/src/db/schema.sql` (PostgreSQL `users` table schema & optional sample seed data script).
    - `backend/src/services/authService.js` (User lookup, bcrypt password comparison, JWT token generation).
    - `backend/src/controllers/authController.js` (Input validation, status codes 200/400/401, error delegating).
    - `backend/src/routes/authRoutes.js` (Express Router mounting `POST /login` with rate limiting middleware).
  - **Files to Update:**
    - `backend/package.json` (add dependencies).
    - `backend/src/app.js` (mount `/users` router).
    - `backend/.env.example` (add `JWT_SECRET`, `JWT_EXPIRES_IN`, `DATABASE_URL`).

- **Frontend Architecture (`/frontend`):**
  - **Existing:** React v18 + Vite v5 + React Router v6 setup (`src/main.jsx`, `src/App.jsx`, `src/pages/HealthPage.jsx`).
  - **Files to Create:**
    - `frontend/src/services/authService.js` (REST client calling `POST /users/login`).
    - `frontend/src/context/AuthContext.jsx` (Global state for `user` and `token`, persistence in `localStorage`).
    - `frontend/src/pages/Login.jsx` (Controlled UI login form with loading, validation error messages, and submission logic).
    - `frontend/src/pages/Dashboard.jsx` (Authenticated role-based dashboard landing page).
  - **Files to Update:**
    - `frontend/src/App.jsx` (Wrap with `AuthProvider`, add routes `/login` and `/dashboard`).
    - `frontend/.env.example` (add `VITE_API_BASE_URL`).

---

## 2. Detailed Execution Plan by Phase

### Phase 1: Database Schema Definition
- **Task 1.1:** Draft `backend/src/db/schema.sql` containing schema definition:
  ```sql
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
- **Guardrail Note:** File will ONLY be written to disk. No database connection or SQL execution commands will be executed.

### Phase 2: Backend Implementation
- **Task 2.1:** Update `backend/package.json` with dependencies (`jsonwebtoken`, `bcryptjs`, `express-rate-limit`).
- **Task 2.2:** Create `backend/src/services/authService.js`:
  - `authenticateUser(email, password)`: Queries DB via `database.js`, checks password hash via `bcrypt.compare`, signs token via `jwt.sign`.
- **Task 2.3:** Create `backend/src/controllers/authController.js`:
  - Validates `email` format & non-empty `email`/`password`.
  - Returns `400 Bad Request` if invalid.
  - Returns `200 OK` with token and user object on success.
  - Catches invalid credentials and returns `401 Unauthorized`.
- **Task 2.4:** Create `backend/src/routes/authRoutes.js`:
  - Configures `express-rate-limit` (max 5 requests per 15 min window, returning 429).
  - Mounts `POST /login` route to `authController.login`.
- **Task 2.5:** Update `backend/src/app.js`:
  - Mount `/users` route group using `authRoutes`.
- **Task 2.6:** Update `backend/.env.example`.

### Phase 3: Frontend Implementation
- **Task 3.1:** Create `frontend/src/services/authService.js`:
  - Implementation of `loginApi(email, password)` fetching `POST /users/login`.
- **Task 3.2:** Create `frontend/src/context/AuthContext.jsx`:
  - State management for `user` and `token` with `localStorage` synchronization.
  - Expose `useAuth` hook and `AuthProvider`.
- **Task 3.3:** Create `frontend/src/pages/Login.jsx`:
  - Responsive form UI with email and password inputs.
  - State handling for error messages (400, 401, 429) and spinner/loading states.
  - Redirection to `/dashboard` upon successful login.
- **Task 3.4:** Create `frontend/src/pages/Dashboard.jsx`:
  - Role-based welcome view for authenticated users with logout capability.
- **Task 3.5:** Update `frontend/src/App.jsx`:
  - Wrap components inside `AuthProvider`.
  - Add `/login` and `/dashboard` routes.

### Phase 4: Automated QA & Verification
- **Task 4.1:** Execute static analysis syntax checks using `node --check` across all generated backend JavaScript files (`authService.js`, `authController.js`, `authRoutes.js`, `app.js`).
- **Task 4.2:** Perform static code inspection for security compliance (parameterized SQL queries `$1`, bcrypt salt factor 10, JWT secret config, rate limiting, non-disclosing error messages).

---

## 3. Compliance & Guardrail Check

| Rule / Guardrail | Compliance Strategy |
|---|---|
| No placeholder or empty implementations | Write complete production-ready code with full error handling. |
| Write all files under exact target path | All files written exclusively to `C:\Users\Sakshi\Desktop\GAF-CLI new\AI-SDLC-Framework-AG-CLI\workspace\generated_project` |
| Do not execute DB commands directly | Schema file `schema.sql` written to disk only; no `psql` or live DB connections executed. |
| Automated QA limited to syntax checks | Static checks using `node --check` on JS source files. |
| No functionality outside PDP | Strictly follow PDP US-01 specifications. |

---

## 4. Next Steps
Upon human approval of this Execution Plan, proceed to Step 3 (Generate Code & Perform QA Verification).
