# Product Delivery Plan (PDP)

**Story ID:** US-01 (Story 1)  
**Story Title:** User Authentication  
**Project:** Login Module for Food Delivery Platform  
**Version:** 2.0  
**Status:** Approved  
**Target Tech Stack:** Node.js, Express v4, React v18, Vite v5, React Router v6, PostgreSQL (`pg`)  

---

## 1. Functional Requirements Overview

The User Authentication module provides secure identity verification for registered users (Customers, Restaurant Owners, Delivery Partners, and Admins) accessing the Food Delivery Platform.

Key functional capabilities include:
- **Credential Processing:** Accept user credentials (email address and plain-text password) via a secure REST API endpoint (`POST /users/login`).
- **Input Validation:** Perform server-side validation to ensure email format correctness and non-empty password fields.
- **Identity Verification:** Query the PostgreSQL `users` database table to retrieve user details and verify password hashes using the `bcrypt` hashing algorithm.
- **Token Issuance:** Upon successful verification, issue a signed JSON Web Token (JWT) containing user identification (`id`), email (`email`), and system role (`role`).
- **Session Management:** Securely transmit JWT to the client for persistence in `AuthContext` and `localStorage`.
- **Role-Based Navigation:** Redirect authenticated users to their respective role-based dashboard pages.
- **Error Handling:** Return generic, non-disclosing error messages (HTTP 401 Unauthorized) for invalid login attempts to prevent user enumeration attacks.

---

## 2. Detailed User Story

- **Story ID:** US-01
- **Title:** User Authentication
- **User Story Statement:** As a Registered User, I want to log in with email and password so that I can securely access the platform.
- **Primary Actor:** Registered User (Customer, Restaurant Owner, Delivery Partner, Admin)
- **Pre-conditions:**
  1. The user account exists in the PostgreSQL `users` database table with a valid `email` and hashed password (`password_hash`).
  2. The user has navigated to the `/login` route on the frontend application.
- **Post-conditions:**
  1. A signed JWT access token is issued by the backend service.
  2. The frontend application stores the JWT token and user profile object in state/storage.
  3. The user is redirected to the role-based dashboard route.
- **Business Requirements Mapped:**
  - `BR-01`: System shall authenticate users via email/password.
  - `BR-02`: System shall issue and persist a JWT session token.
  - `BR-03`: System shall provide role-based redirection after login.

---

## 3. Non-Functional Requirements

- **Performance & Latency:** The authentication API endpoint (`POST /users/login`) must process authentication requests and respond within 200 milliseconds under standard load.
- **Security & Password Hashing:** Passwords must never be stored, logged, or transmitted in plain text. Passwords must be hashed using `bcrypt` with a minimum salt rounds factor of 10.
- **Token Security:** JWT tokens must be signed using HMAC SHA-256 (`HS256`) with a strong secret key (`JWT_SECRET`) and must have an explicit expiration time (e.g., 24 hours).
- **Scalability:** The authentication mechanism must be stateless to support horizontal scaling of Express backend instances behind a load balancer.
- **Availability:** The authentication service must maintain 99.9% uptime with automated health monitoring.
- **Usability:** The user interface must provide immediate visual feedback for validation errors and network request loading states.

---

## 4. Acceptance Criteria

1. **Successful Authentication:**
   - Sending valid `email` and `password` to `POST /users/login` returns HTTP `200 OK` with JSON payload containing `success: true`, `token` (JWT string), and `user` object (`id`, `email`, `role`).
2. **Token Persistence:**
   - The returned JWT token is stored in `localStorage` and managed globally by React `AuthContext`.
3. **Invalid Credentials Handling:**
   - Submitting an unregistered email or incorrect password returns HTTP `401 Unauthorized` with JSON error message `"Invalid email or password"`.
4. **Input Validation:**
   - Submitting empty fields or an invalid email format returns HTTP `400 Bad Request` with validation detail message `"Email and password are required"`.
5. **Role-Based Redirection:**
   - Upon successful login, the frontend automatically redirects the user to their designated dashboard (`/dashboard`).

---

## 5. Assumptions

- User registration, account creation, and password setup occur outside the scope of this story.
- HTTPS/TLS transport security is enforced at the network gateway / ingress level in production environments.
- The PostgreSQL database instance is provisioned, accessible, and running with connection configurations supplied via environment variables.

---

## 6. Dependencies to be Added

### Backend Dependencies (`backend/package.json`):
- `jsonwebtoken` (`^9.0.2`): JWT signing and verification library.
- `bcryptjs` (`^2.4.3`): Hashing library for password comparison.
- `express-rate-limit` (`^7.2.0`): Rate-limiting middleware for protection against brute-force attacks.

### Frontend Dependencies (`frontend/package.json`):
- `react-router-dom` (`^6.22.3`): Already installed; used for navigation and route protection.
- `react` (`^18.2.0`): Already installed.

---

## 7. Solution Design

### Architecture & Layering
The solution follows a layered architecture pattern:
- **Presentation Layer (Frontend):** React components (`Login.jsx`), Context Provider (`AuthContext.jsx`), and API service layer (`authService.js`).
- **Controller Layer (Backend):** Express route handler (`authRoutes.js`) and controller (`authController.js`) responsible for request parsing, validation, and HTTP response formatting.
- **Business Service Layer (Backend):** Business service (`authService.js`) handling password comparison via `bcrypt` and token signing via `jsonwebtoken`.
- **Data Access Layer (Backend):** Direct SQL query module interacting with PostgreSQL via `pg` connection pool (`database.js`).

### Detailed Execution Flow
```
[User] -> (Types Email/Password in Login.jsx)
  -> Submit Form
    -> authService.login(email, password) [Frontend Service]
      -> HTTP POST /users/login [REST API Request]
        -> express-rate-limit middleware [Rate Check]
          -> authRoutes -> authController.login [Backend Controller]
            -> authService.authenticateUser(email, password) [Business Service]
              -> database.query('SELECT * FROM users WHERE email = $1', [email]) [PostgreSQL]
              <- Returns user record with password_hash
            -> bcrypt.compare(password, password_hash) [Password Check]
            -> jwt.sign({ id, email, role }, JWT_SECRET) [JWT Generation]
          <- Returns HTTP 200 { success: true, token, user }
    <- Save token to AuthContext & localStorage
  <- Redirect to /dashboard
```

---

## 8. Development Tasks

1. **Backend Dependency Installation:** Install `jsonwebtoken`, `bcryptjs`, and `express-rate-limit` in `backend/package.json`.
2. **Database Schema & Seeding Script:** Create database initialization script for `users` table with fields `id`, `email`, `password_hash`, `role`, `created_at`.
3. **Backend Service Implementation:**
   - Implement database query function to find user by email.
   - Implement `authService.js` with `authenticateUser` and `generateToken` functions.
   - Implement `authController.js` handling `POST /users/login`.
   - Implement `authRoutes.js` with rate limiter middleware.
   - Register `/users` route group in `backend/src/app.js`.
4. **Frontend Service & Context Implementation:**
   - Implement `frontend/src/services/authService.js` to execute fetch call to `/users/login`.
   - Implement `frontend/src/context/AuthContext.jsx` to manage `token` and `user` state.
   - Implement `frontend/src/pages/Login.jsx` form UI with validation and error state handling.
   - Update `frontend/src/App.jsx` to wrap application in `AuthProvider` and define `/login` route.

---

## 9. Security Considerations

- **Authentication Impact:** Establishes secure token-based authentication for the platform.
- **Authorization Impact:** Embeds user role in JWT claims, laying foundation for backend middleware authorization checks on protected endpoints.
- **PII Handling:** Email addresses are classified as PII. System must never log email addresses in plain text in server logs or error traces. Passwords must never be logged.
- **Encryption Requirements:**
  - Passwords salted and hashed with `bcrypt` (salt rounds = 10).
  - JWT tokens signed with SHA-256 HMAC using strong secret (`JWT_SECRET`).
  - Transport layer protected via HTTPS/TLS in production.
- **OWASP Checks:**
  - **OWASP A01 (Broken Access Control):** Enforce signature and expiry verification on signed tokens.
  - **OWASP A02 (Cryptographic Failures):** Use `bcrypt` hashing algorithm; enforce minimum key length for `JWT_SECRET`.
  - **OWASP A03 (Injection):** Use parameterized queries (`$1`, `$2`) for all PostgreSQL database operations.
  - **OWASP A07 (Identification and Authentication Failures):** Implement rate limiting and generic error responses to prevent account enumeration.
- **Rate Limiting:** Protect `POST /users/login` endpoint using `express-rate-limit` (maximum 5 requests per 15-minute window per IP address).

---

## 10. Third-Party API & Microservice Considerations

For APIs exposed to external consumers or adjacent microservices:
- **Partner-Wise Rate Limiting:** Implement IP-based and API-key-based rate limiting headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`).
- **Retry Handling:** Frontend API client should implement exponential backoff retry mechanism (up to 3 retries) for transient 5xx server errors, excluding 401/400 errors.
- **Idempotency Support:** `POST /users/login` is non-idempotent by design. Include request correlation ID (`X-Correlation-ID`) header for cross-service request tracing.
- **Circuit Breaker Strategy:** Configure database connection pool timeout (5000ms limit) to ensure connection failures fail fast without exhausting system thread pools.

---

## 11. API Design Specification

### Endpoint: `POST /users/login`

#### Request Headers
```
Content-Type: application/json
```

#### Request Body Schema
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

#### Response Schemas

**200 OK (Success)**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzIwMDAwMDAwLCJleHAiOjE3MjAwODY0MDB9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "customer"
  }
}
```

**400 Bad Request (Validation Error)**
```json
{
  "success": false,
  "error": "Email and password are required."
}
```

**401 Unauthorized (Invalid Credentials)**
```json
{
  "success": false,
  "error": "Invalid email or password."
}
```

**429 Too Many Requests (Rate Limited)**
```json
{
  "success": false,
  "error": "Too many login attempts. Please try again in 15 minutes."
}
```

---

## 12. Tech-Stack Specific Implementation Details

### Backend Architecture Components

1. **Routes Layer (`backend/src/routes/authRoutes.js`):**
   - Express `Router` instance mapping `POST /login` route to `authController.login`.
   - Attaches `express-rate-limit` middleware specifically to `/login`.

2. **Controller Layer (`backend/src/controllers/authController.js`):**
   - Function signature: `async function login(req, res, next)`
   - Extract `email` and `password` from `req.body`.
   - Validate mandatory presence of `email` and `password`.
   - Call `authService.authenticateUser(email, password)`.
   - Return HTTP `200` with payload or pass caught errors to Express `errorHandler`.

3. **Service Layer (`backend/src/services/authService.js`):**
   - Function signature: `async function authenticateUser(email, password)`
   - Execute database query against `users` table via `database.js`.
   - Use `bcrypt.compare(password, user.password_hash)` for hash verification.
   - Use `jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' })`.

4. **Data Access & Database Schema (`backend/src/config/database.js` & `backend/src/db/schema.sql`):**
   - Table Name: `users`
   - Schema Specification:
     ```sql
     CREATE TABLE IF NOT EXISTS users (
       id SERIAL PRIMARY KEY,
       email VARCHAR(255) UNIQUE NOT NULL,
       password_hash VARCHAR(255) NOT NULL,
       role VARCHAR(50) NOT NULL DEFAULT 'customer',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

### Frontend Architecture Components

1. **API Service (`frontend/src/services/authService.js`):**
   - Function signature: `async function loginApi(email, password)`
   - Issues HTTP `POST` request to `http://localhost:5000/users/login`.
   - Handles HTTP response errors and returns parsed JSON.

2. **State Context (`frontend/src/context/AuthContext.jsx`):**
   - React Context (`AuthContext`) and Provider (`AuthProvider`).
   - State variables: `user` (object or null), `token` (string or null).
   - Helper methods: `login(token, user)`, `logout()`.

3. **Login View (`frontend/src/pages/Login.jsx`):**
   - Controlled form component with `email`, `password`, `error`, `loading` states.
   - Triggers `authService.loginApi(email, password)`, calls `AuthContext.login()`, and navigates to `/dashboard`.

---

## 13. Dependency Management

| Resource / Module | Status | Action / Details |
|---|---|---|
| `backend/src/config/database.js` | Reuse | PostgreSQL connection pool wrapper |
| `backend/src/middleware/errorHandler.js` | Reuse | Centralized Express error handler |
| `backend/src/app.js` | Modify | Import and mount `authRoutes` under `/users` |
| `backend/package.json` | Modify | Add `jsonwebtoken`, `bcryptjs`, `express-rate-limit` |
| `frontend/src/App.jsx` | Modify | Wrap with `AuthProvider` and add `/login` route |
| `backend/src/routes/authRoutes.js` | Add | New Express router file |
| `backend/src/controllers/authController.js` | Add | New controller for authentication |
| `backend/src/services/authService.js` | Add | Business logic & JWT/bcrypt operations |
| `frontend/src/services/authService.js` | Add | Client API request handler |
| `frontend/src/context/AuthContext.jsx` | Add | Global authentication React context |
| `frontend/src/pages/Login.jsx` | Add | Login form component page |

---

## 14. QA & Test Cases Required for Validation

- **TC-01 (Valid Login):** Submit valid email and matching password. Expect HTTP 200, JWT token, user profile, and redirection to `/dashboard`.
- **TC-02 (Invalid Email):** Submit non-existent email address. Expect HTTP 401 Unauthorized with error message `"Invalid email or password"`.
- **TC-03 (Wrong Password):** Submit valid email with incorrect password. Expect HTTP 401 Unauthorized with error message `"Invalid email or password"`.
- **TC-04 (Missing Email/Password):** Submit form with empty email or empty password. Expect HTTP 400 Bad Request.
- **TC-05 (Malformed Email Format):** Submit string `"invalid-email"` in email field. Expect HTTP 400 Bad Request.
- **TC-06 (Rate Limit Enforcement):** Execute 6 consecutive invalid login attempts within 1 minute from same IP. Expect 6th request to return HTTP 429 Too Many Requests.
- **TC-07 (JWT Payload Verification):** Decode issued JWT token and verify that payload contains correct `id`, `email`, `role`, and expiration timestamp (`exp`).
- **TC-08 (Client Token Persistence):** Refresh page after login and verify that user remains authenticated with stored token in `localStorage`.

---

## 15. Deployment Plan

### Infrastructure Changes
- No new cloud server instances or infrastructure required. Ensure database network access between Node.js Express host and PostgreSQL database server.

### New Configuration Parameters
- **Backend `.env` Configuration:**
  - `PORT=5000`
  - `JWT_SECRET=super_secret_jwt_key_change_in_production_32bytes`
  - `JWT_EXPIRES_IN=24h`
  - `DATABASE_URL=postgres://user:password@localhost:5432/food_delivery_db`
- **Frontend `.env` Configuration:**
  - `VITE_API_BASE_URL=http://localhost:5000`

### Secrets Required
- `JWT_SECRET`: High-entropy string key for signing and verifying tokens.
- `DATABASE_URL` / DB Credentials (`PGUSER`, `PGPASSWORD`, `PGHOST`, `PGPORT`, `PGDATABASE`).

### Release Steps
1. **Deploy Database Script:**
   - Execute SQL schema creation script on target database:
     `psql -d food_delivery_db -f backend/src/db/schema.sql`
2. **Deploy Application:**
   - Install backend dependencies: `cd backend && npm install`
   - Install frontend dependencies: `cd frontend && npm install`
   - Build frontend static assets: `cd frontend && npm run build`
   - Start backend Express application: `cd backend && npm start`
3. **Verify Health Checks:**
   - Query system health endpoint: `GET http://localhost:5000/api/health`
   - Execute synthetic test login request: `POST http://localhost:5000/users/login`

### Rollback Steps
1. **Revert Application Version:**
   - Roll back Git release tag / deployment bundle to previous stable build.
   - Restart Express service (`npm start`).
2. **Restore Database:**
   - If database schema changes caused failure, drop `users` table or restore database from pre-deployment backup snapshot.
