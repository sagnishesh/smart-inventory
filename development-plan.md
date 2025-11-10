# **Development Plan — Smart Inventory Tracker**

## **1. PRD Analysis Summary**

The **Smart Inventory Tracker** enables small businesses to monitor stock levels, manage suppliers, and handle orders efficiently. Core capabilities include:
- Real-time stock alerts and AI-driven restock forecasting  
- Supplier performance analytics  
- CRUD operations for inventory and supplier management  
- Secure multi-role access (Admin, Staff)  
- Integration with **MongoDB Atlas** for cloud-based persistence  

### **Key Objectives**
1. Enable CRUD for inventory, supplier, and order data.  
2. Automate low-stock alerts and provide predictive restocking suggestions.  
3. Host scalable Angular + Spring Boot web services.  
4. Ensure role-based authentication and analytics visualization.

---

## **2. Technology Stack**

### **Frontend**
- **Framework:** Angular 18+  
- **UI Library:** Angular Material + Tailwind CSS  
- **State Management:** NgRx  
- **Testing:** Jasmine + Karma  
- **Build Command:** `ng build`  
- **Run Command:** `ng serve`  
- **Deployment:** Netlify  

### **Backend**
- **Language:** Java 21 LTS  
- **Framework:** Spring Boot 3.x  
- **Dependencies:**  
  - Spring Web  
  - Spring Data MongoDB  
  - Spring Security (JWT-based authentication)  
  - Jakarta Validation API  
  - Lombok  
  - dotenv-java (environment configuration)
- **Build Tool:** Maven  
- **Run Command:** `mvn spring-boot:run`  

### **Database**
- **Type:** MongoDB Atlas (Free Tier)  
- **Access Layer:** Spring Data MongoRepository  
- **Schema Strategy:** Dynamic JSON with DTO validation  

---

## **3. Architecture Pattern**

### **Chosen Pattern:** Modular Monolith

**Justification:**
- Ideal for small teams and focused, incremental delivery.  
- Simplifies DevOps and scalability using modular separation of domains.  
- REST API boundary between Angular (frontend) and Spring Boot (backend) ensures low coupling and independent evolution.

---

## **4. Domain-Driven Module Structure**

### **Backend Folder Structure**
```
/src/main/java/com/smartinventory
├── config/
├── auth/
├── users/
├── inventory/
├── suppliers/
├── orders/
├── alerts/
├── analytics/
└── common/
```

### **Frontend Folder Structure**
```
/src/app/
├── core/
├── shared/
├── features/
│   ├── inventory/
│   ├── suppliers/
│   ├── orders/
│   ├── alerts/
│   └── analytics/
├── pages/
└── environments/
```

---

## **5. THE SPRINT PLAN**

### **Sprint 0: Backend & Frontend Setup, Connectivity Verification**
**Goal:** Establish project infrastructure and database connectivity for Angular + Spring Boot.

**Tasks:**
1. **Repository Synchronization**
   - **USER INPUT REQUIRED**  
   - **WHY:** To set up version control for the project.  
   - **FORMAT:** Provide GitHub repo URL (e.g., `https://github.com/user/smart-inventory.git`)  
   - **ACTION:** Clone repo and create main branch.

2. **Environment Configuration**
   - **USER INPUT REQUIRED**  
   - **WHY:** Secure DB and JWT secret keys are mandatory for runtime configuration.  
   - **FORMAT:**  
     - `Mongo URI → mongodb+srv://user:pass@cluster.mongodb.net/inventory`  
     - `JWT_SECRET → 32-character string`  
   - **ACTION:** Create `.env` and `.env.example`.

3. **Project Structure**
   - Create `/frontend` and `/backend` directories.  
   - Add `.gitignore` and initialize Git.

4. **Backend Setup**
   - Initialize Spring Boot project with dependencies.  
   - Add `/api/v1/health` endpoint.  
   - Verify DB connection via MongoRepository.

5. **Frontend Setup**
   - Scaffold Angular 18 project.  
   - Configure Tailwind + Angular Material theme.  
   - Create Health Check page hitting backend `/api/v1/health`.

6. **Documentation**
   - Create `README.md` describing setup, dependencies, and run commands.

7. **Health Check Verification**
   - **USER INPUT REQUIRED**  
   - **WHY:** Ensures frontend-backend communication.  
   - **FORMAT:** Expect `{ "status": "ok" }` from endpoint.

8. **Sprint-0 Commit & Deployment**
   - Commit:  
     ```
     chore(sprint-0): base scaffolding and connectivity for Angular + Spring Boot + MongoDB Atlas
     ```
   - Branch: `sprint-0`
   - Deploy Frontend → Netlify  
   - Deploy Backend → Render  

---

### **Sprint 1: Authentication & User Management**
**Goal:** Implement secure user registration, login, and JWT authentication.

**Tasks:**
1. **Database Model**
   - `User` document: `email`, `hashed_password`, `role`.

2. **Backend**
   - Implement:
     - `POST /api/v1/auth/register`
     - `POST /api/v1/auth/login`
     - `GET /api/v1/users/me`
   - Apply JWT filters and role-based guards.
   - **USER INPUT REQUIRED:** Verify new user record in MongoDB.

3. **Frontend**
   - Create Register/Login pages using Angular Material.  
   - Manage JWT/session via NgRx store.  
   - **USER INPUT REQUIRED:** Verify UI responsiveness & token persistence.

4. **Sprint-1 Commit & Deployment**
   - Commit:  
     ```
     feat(sprint-1): user authentication using JWT
     ```
   - Push `sprint-1` branch → Deploy backend (Render), frontend (Netlify).

---

### **Sprint 2: Inventory Management Module**
**Goal:** Build CRUD for inventory items with supplier-linking and alert triggers.

**Tasks:**
1. **Database Model**
   - `Item` document: `name`, `sku`, `supplierId`, `quantity`, `reorderLevel`, `price`.  
   - **USER INPUT REQUIRED:** Confirm schema contents.

2. **Backend**
   - CRUD endpoints: `/api/v1/inventory`.  
   - Implement reorder alerts.  
   - **USER INPUT REQUIRED:** Validate alert trigger function.

3. **Frontend**
   - Angular DataTable for inventory display.  
   - CRUD form integration + filtering by supplier.  
   - **USER INPUT REQUIRED:** Verify usability and responsiveness.

4. **Integration**
   - Connect frontend with backend APIs.  
   - Manual verification of CRUD + alerts.

5. **Sprint-2 Commit & Deployment**
   - Commit:  
     ```
     feat(sprint-2): inventory module with supplier linkage and alert logic
     ```
   - Push `sprint-2` → Deploy both services.

---

## **6. Deployment Strategy**

| **Component** | **Platform** | **Purpose** |
|----------------|---------------|-------------|
| **Frontend** | Netlify | Auto-build on push |
| **Backend** | Render | Cloud runtime for Spring Boot |
| **Database** | MongoDB Atlas | Persistent storage |

**Validation:** User confirms URLs for all services return successful response codes.

---

## **7. User Input Protocol**

Each USER INPUT REQUIRED in the plan follows a standardized structure:

| **WHY** | Explains necessity |
|----------|-----------------|
| **FORMAT** | Details exact input format |
| **ACTION** | Defines steps for providing input and validation |

**Testing Confirmation for Each Sprint:**
- The user must confirm functionality before next sprint begins.
- Testing includes:
  - Local functionality verification
  - Deployed environment validation
  - API communication health verification

---

## **8. Commit Format and Workflow**

Each sprint concludes with a detailed commit pattern and pull request.

**Commit Template:**
```
feat(sprint-X): [summary of sprint accomplishment]

Sprint X Accomplishments:
- [List all implemented features]
```

**Pull Request:**
- Title: “Sprint X: [Feature Name]”
- Body includes:
  - Accomplishments
  - Deployed URLs
  - Test confirmation checklist

---

## **9. Verification & Acceptance**

✅ Successful frontend-backend communication  
✅ MongoDB Atlas connectivity verified  
✅ JWT authentication functional  
✅ CRUD and alerting mechanisms work as designed  
✅ CI/CD automation validated via Netlify and Render  

---

## **10. Conclusion**

This **Development Plan for Smart Inventory Tracker** outlines a modular, iterative roadmap integrating **Angular**, **Spring Boot**, and **MongoDB Atlas**.  
It ensures secure, cloud-based scalability, CI/CD readiness, and verifiable checkpoints through USER INPUT REQUIRED prompts and structured sprint commits.
