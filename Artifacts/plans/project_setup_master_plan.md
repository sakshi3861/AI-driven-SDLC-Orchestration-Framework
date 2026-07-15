# Project Setup Master Plan

This document outlines the setup plan for bootstrapping a strictly generic, featureless, and domain-agnostic project repository. The codebase is designed to support a React.js frontend and a Node.js/Express backend, with PostgreSQL as the database.

---

## 1. Identified Framework & Core Stack

Based on the requirements (BRD, HLD, LLD), the following technology stack has been identified:
- **Core Programming Language:** JavaScript / Node.js
- **Backend Framework:** Express.js
- **Frontend Library:** React.js (bootstrapped with Vite)
- **Build Tool:** npm (package.json)
- **Database Type:** PostgreSQL
- **Environment Management:** dotenv

---

## 2. Strictly Generic Stack Selection

Only baseline dependencies universally required for the stack will be configured:

### Backend Dependencies (`backend/package.json`)
- `express` (Routing & middleware engine)
- `pg` (PostgreSQL client driver)
- `cors` (Cross-Origin Resource Sharing middleware)
- `dotenv` (Environment variable configuration)
- `morgan` (HTTP request logger middleware)
- `nodemon` (Development tool for auto-restarting the server - devDependency)
- `jest` & `supertest` (Testing framework - devDependencies)

### Frontend Dependencies (`frontend/package.json`)
- `react` & `react-dom` (Core React library)
- `react-router-dom` (Client-side routing)
- `vite` (Modern frontend build tool - devDependency)
- `@vitejs/plugin-react` (Vite support for React - devDependency)
- `jest` & `eslint` (Testing and linting - devDependencies)

---

## 3. Directory Layout (Strictly Generic & Domain-Agnostic)

The layout avoids any business domain references (no login, logout, authentication, user, auth controller, food delivery, etc.).

```
workspace/generated_project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Database connection pool setup
│   │   ├── controllers/
│   │   │   └── pingController.js    # Basic status/health-check responder
│   │   ├── middleware/
│   │   │   └── index.js             # Base middleware folder
│   │   ├── routes/
│   │   │   └── index.js             # API base router
│   │   ├── services/
│   │   ├── app.js                   # Application configuration
│   │   └── index.js                 # Server entry point
│   ├── tests/
│   │   └── app.test.js              # Basic integration/health-check test
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx                  # Main frontend entry UI component
    │   └── main.jsx                 # Client entry point
    ├── .env.example
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 4. Configuration Templates (`.env.example`)

To adhere to the guardrail of never assuming any environment-specific values, the configuration files will contain empty variables. 

### Backend `.env.example`
```env
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
NODE_ENV=
```

### Frontend `.env.example`
```env
VITE_API_BASE_URL=
```

---

## 5. Verification & Validation Steps

1. **Install Dependencies:**
   - Execute `npm install` in both `/backend` and `/frontend` directories.
2. **Linting Check:**
   - Run linter checks to ensure no formatting or syntax errors.
3. **Execute Test Build:**
   - Compile/build the frontend using `npm run build` to verify the build configuration.
   - Run backend tests using `npm test` to verify the mock/ping endpoint and base routing.
