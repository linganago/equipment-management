# Equipment Management System

A full-stack web application to manage equipment and their maintenance lifecycle.

## Monorepo Structure

```
equipment-management/
├── frontend/     ← React app (this guide)
├── backend/      ← Spring Boot (Java)
├── db/           ← PostgreSQL schema
├── README.md
└── COMPLIANCE.md
```

---

## Prerequisites

| Tool       | Version  |
|------------|----------|
| Node.js    | >= 18.x  |
| npm        | >= 9.x   |
| Java       | >= 17    |
| PostgreSQL | >= 14    |

---

## Database Setup

```bash
# 1. Create the database
psql -U postgres -c "CREATE DATABASE equipment_db;"

# 2. Run the schema
psql -U postgres -d equipment_db -f db/schema.sql
```

---

## Running the Frontend

```bash
cd frontend
npm install
npm start
# Opens at http://localhost:3000
```

> **Mock mode**: The frontend runs with mock data by default (`USE_MOCK = true` in `src/App.jsx`).
> Set it to `false` once your Spring Boot backend is running on port 8080.

---

## Running the Backend

```bash
cd backend
./mvnw spring-boot:run
# Runs at http://localhost:8080
```

---

## Additional Libraries

| Library | Purpose            | Install           |
|---------|--------------------|-------------------|
| axios   | HTTP client        | `npm install axios` (already in package.json) |

---

## Assumptions

- Equipment types are seeded via SQL; no UI to manage them (as per spec)
- Frontend enforces the 30-day Active rule as a UX guard; backend also enforces it
- Mock data is used when `USE_MOCK = true` in `App.jsx`
