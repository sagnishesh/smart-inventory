# Smart Inventory Tracker

This repository hosts the Sprint&nbsp;0 scaffolding for the Smart Inventory Tracker platform. It follows the refined development plan, establishing a modular Angular frontend and Spring Boot backend with MongoDB integration.

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
- `JWT_SECRET` – 32‑character secret used for forthcoming JWT authentication

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
- Health check page calls the backend endpoint and surfaces success/error states.
- Tailwind CSS and Angular Material are configured for rapid UI development.

## Testing

```bash
# Backend
cd backend
./mvnw test

# Frontend
cd frontend
npm run test
```

## Next Steps

Sprint&nbsp;1 will add authentication, user management, and secure API guards. Review the refined development plan for the full roadmap.

