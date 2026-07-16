# Boilerplate Stack (Decoupled React + Node/Express + PostgreSQL Client)

A decoupled, strictly generic, and domain-agnostic boilerplate project structure built using modern engineering patterns. This template separates frontend client interfaces from backend API logic, providing a clean system baseline before any business domain concepts are introduced.

---

## Technical Stack Overview

- **Backend Architecture:**
  - **Runtime & Framework:** Node.js with Express.js
  - **Database Interface:** PostgreSQL (raw SQL queries configured with `pg` client driver)
  - **Security:** Session token structures (`jsonwebtoken`) & password hashing (`bcryptjs`)
  - **Middleware:** Global error handling, cross-origin resource sharing (`cors`), and custom HTTP logger
  - **Testing Framework:** Jest with Supertest for endpoints integration assertions

- **Frontend Architecture:**
  - **Runtime & Build Tool:** React.js scaffolded via Vite
  - **Routing:** SPA routing configured via `react-router-dom`
  - **API Client:** Axios configuration referencing customizable environment endpoints
  - **Styling:** Custom CSS stylesheet utilizing modern design tokens (Outfit/Inter typography, fluid transitions)
  - **Testing Framework:** Vitest with jsdom environment

---

## Directory Structure

```text
workspace/generated_project/
├── backend/
│   ├── src/
│   │   ├── config/          # db.js (PostgreSQL client pool setup)
│   │   ├── controllers/     # PingController.js (system telemetry placeholder)
│   │   ├── middleware/      # auth.js (JWT validation), logger.js (HTTP logs)
│   │   ├── routes/          # index.js (express routes registration)
│   │   ├── services/        # baseService.js (generic SQL wrapper query)
│   │   ├── app.js           # express app initialization and setup
│   │   └── server.js        # server bootstrapper
│   ├── tests/               # ping.test.js (integration test)
│   ├── .env.example         # configuration variables blueprint
│   └── package.json         # server dependencies definition
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Button.jsx, Input.jsx (generic styling)
│   │   ├── context/         # AuthContext.jsx (session structure holder)
│   │   ├── pages/           # Login.jsx, Dashboard.jsx (generic, featureless forms)
│   │   ├── services/        # api.js (axios request configuration)
│   │   ├── App.jsx          # client routes configuration container
│   │   ├── index.css        # modern variables and styling overrides
│   │   ├── main.jsx         # application mount script
│   │   └── App.test.jsx     # client sanity check test suite
│   ├── index.html           # main HTML entry document
│   ├── vite.config.js       # build tool config
│   ├── .env.example         # frontend environment blueprint
│   └── package.json         # app libraries definition
```

---

## Getting Started

### 1. Backend Setup
Navigate into the `backend/` directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Configure Environment Variables:
Copy `.env.example` to `.env` and populate your PostgreSQL connection parameters:
```bash
cp .env.example .env
```

Start the developer server:
```bash
npm run dev
```

### 2. Frontend Setup
Navigate into the `frontend/` directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Configure Environment Variables:
Copy `.env.example` to `.env` and set the target backend API endpoint:
```bash
cp .env.example .env
```

Start the Vite dev server:
```bash
npm run dev
```

---

## Testing

To run the automated verification suites:

- **Backend Tests:**
  ```bash
  cd backend
  npm test
  ```
- **Frontend Tests:**
  ```bash
  cd frontend
  npm test
  ```
