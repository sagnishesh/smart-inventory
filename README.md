# Smart Inventory Tracker

This repository now includes Sprint&nbsp;0 + Sprint&nbsp;1 deliverables for the Smart Inventory Tracker platform. It combines a modular Angular frontend with a Spring Boot backend, MongoDB persistence, and JWT-secured authentication following the refined development plan.

## Project Structure

```
demo-app-one/
├── backend/   # Spring Boot 3.4.x application
├── frontend/  # Angular 18 application with Tailwind & Angular Material
├── .env.example
└── refined-development-plan.md
```

## Prerequisites

- Node.js 20+ and npm 10+
- Java 21 (Temurin or Oracle)
- Maven 3.9+
- MongoDB Atlas cluster or local MongoDB instance

## Environment Variables

Copy `.env.example` to `.env` and provide real credentials:

```
cp .env.example .env
```

Required values:

- `MONGO_URI` – MongoDB Atlas connection string
- `JWT_SECRET` – 32‑character secret used for JWT signing
- `JWT_EXPIRATION_MS` – Token lifetime in milliseconds (default: `3600000`)

> The backend reads configuration via Spring environment variables. Use a tool like `dotenv-java` or your deployment platform to inject them at runtime.

## Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

- Base URL: `http://localhost:8080`
- Health endpoint: `GET /api/v1/health` → `{"status":"ok"}`
- MongoDB URI resolves from `MONGO_URI` (defaults to `mongodb://localhost:27017/smart_inventory`)

## Frontend (Angular)

```bash
cd frontend
npm install
npm run start
```

- Runs at `http://localhost:4200`
- Sign in or register from `/auth/*` pages; successful auth redirects to the protected health dashboard.
- Navigate to `/inventory` for the Sprint&nbsp;2 data table with inline filtering, Material dialogs for create/update, and reorder status chips.
- Authentication state is managed with NgRx, persisted in `localStorage`, and injected into API calls via an HTTP interceptor.
- Tailwind CSS and Angular Material drive the design system for quicker feature delivery.

## Authentication API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/auth/register` | `POST` | Create a new user (`email`, `password`, optional `role`) and receive a JWT + user payload. |
| `/api/v1/auth/login` | `POST` | Authenticate an existing user and receive a JWT + user payload. |
| `/api/v1/users/me` | `GET` | Return the authenticated user's profile; requires `Authorization: Bearer <token>`. |
| `/api/v1/inventory` | `GET \| POST` | List or create inventory items. Body accepts name, sku, supplierId, quantity, reorderLevel, unitPrice. |
| `/api/v1/inventory/{id}` | `PUT \| DELETE` | Update or remove an existing inventory item. |

JWT secrets and expiry are configurable through environment variables; tokens encode the MongoDB user id, email, and role.

## Testing

```bash
# Backend
cd backend
./mvnw test

# Frontend
cd frontend
npm run test

# E2E (requires backend + frontend running)
APP_URL=http://localhost:4200 \
API_URL=http://localhost:8080/api/v1 \
E2E_EMAIL=e2e-user@example.com \
E2E_PASSWORD=Password123! \
npm run e2e
```

> First-time setup: `cd frontend && npm install && npx playwright install` to download browser binaries.

## Next Steps

Sprint&nbsp;2 (inventory management) will introduce item CRUD, supplier linkage, and alerting flows. Review `refined-development-plan.md` for the detailed roadmap and acceptance criteria.

