# Project Setup Master Plan

## 1. Technical Stack Identification
Based on the High Level Design (HLD) and Low Level Design (LLD) documents, the project utilizes a split frontend/backend stack:
*   **Core Programming Language:** JavaScript (ES6+)
*   **Frontend Framework:** React.js (scaffolded via Vite)
*   **Backend Framework:** Node.js with Express
*   **Build Tool / Package Manager:** npm
*   **Database:** PostgreSQL (using `pg` driver)

---

## 2. Directory Structure
The workspace will feature a clean monorepo-style structure dividing `frontend` and `backend` services.

```text
workspace/generated_project/
├── README.md        # Setup documentation and project guides
├── backend/
│   ├── src/
│   │   ├── config/          # System-level configurations (DB, security, etc.)
│   │   ├── controllers/     # Controller route handlers (PingController, etc.)
│   │   ├── middleware/      # Global system middleware (auth checking structures, logger)
│   │   ├── routes/          # Express route registration
│   │   ├── services/        # System services (e.g., base DB queries setup)
│   │   ├── app.js           # Express app setup and middleware configuration
│   │   └── server.js        # Server listener startup
│   ├── tests/               # Backend system and integration tests
│   ├── .env.example         # Template for environment configuration
│   └── package.json         # Backend dependencies & npm scripts
│
├── frontend/
│   ├── src/
│   │   ├── assets/          # Static assets (images, logos)
│   │   ├── components/      # Common UI components (buttons, inputs)
│   │   ├── context/         # Auth contexts or global states
│   │   ├── pages/           # Pages (structure placeholders only)
│   │   ├── services/        # API communication services
│   │   ├── App.jsx          # Main application element
│   │   ├── index.css        # Global CSS stylesheet & design tokens
│   │   └── main.jsx         # App entry point & mounting
│   ├── .env.example         # Template for frontend environment config
│   ├── vite.config.js       # Vite build configurations
│   └── package.json         # Frontend dependencies & npm scripts
```

---

## 3. Baseline Dependencies

### Backend Dependencies
*   **Core Dependencies:**
    *   `express` (REST API framework)
    *   `pg` (PostgreSQL client driver)
    *   `jsonwebtoken` (Session token generation/verification)
    *   `bcryptjs` (Password hashing library)
    *   `cors` (Cross-Origin Resource Sharing)
    *   `dotenv` (Environment configuration loader)
*   **Development Dependencies:**
    *   `nodemon` (Hot reloading server)
    *   `jest` (Testing framework)
    *   `supertest` (HTTP testing assertion library)

### Frontend Dependencies
*   **Core Dependencies:**
    *   `react` (UI library)
    *   `react-dom` (DOM renderer)
    *   `react-router-dom` (Client-side routing)
    *   `axios` (HTTP client)
*   **Development Dependencies:**
    *   `vite` (Build tool and dev server)
    *   `@vitejs/plugin-react` (Vite React plugin)
    *   `vitest` (Vite testing framework)

---

## 4. Configuration Files Templates

### Backend: `backend/.env.example`
As per the guardrails, all values are left blank or generic.
```env
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
JWT_EXPIRES_IN=
```

### Frontend: `frontend/.env.example`
```env
VITE_API_URL=
```

---

## 5. Domain-Agnostic Placeholders
To ensure the build passes without referencing any domain logic (e.g. food, delivery, or authentication logic):
*   **Backend:** A simple `PingController.js` and `/ping` route that returns `{ status: "ok" }`.
*   **Frontend:** A simple routing container under `App.jsx` pointing to a generic dashboard/login shell with basic input forms and page layouts.
