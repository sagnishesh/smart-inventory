# **Refined Development Plan — Smart Inventory Tracker**

## **1. PRD Analysis Overview**
The **Smart Inventory Tracker** assists small-to-medium businesses in efficiently monitoring stock levels, managing supplier relationships, and automating restocking insights. The application emphasizes:
- **Real-time alerts** for low stock threshold  
- **Predictive analytics** for replenishment  
- **Supplier and order performance tracking**  
- **Role-based dashboard access** (Admin vs. Staff)  
- Built on a **MongoDB Atlas + Spring Boot + Angular** stack  

### **Primary Objectives**
1. CRUD operations for inventory, supplier, and order data.  
2. Forecast restocking using historic data patterns (AI-assisted).  
3. Implement secure user roles with granular permissions.  
4. Deliver a CI/CD-ready solution deployed via Netlify + Render.  

---

## **2. Technology Stack Summary**
### **Frontend**
- **Framework:** Angular 18+  
- **UI Library:** Angular Material + Tailwind CSS  
- **State Management:** NgRx  
- **Testing:** Jasmine & Karma  
- **Run Command:** `ng serve`  
- **Deployment Platform:** Netlify (auto-build via GitHub)

### **Backend**
- **Language:** Java 21 LTS  
- **Framework:** Spring Boot 3.x  
- **Build Tool:** Maven  
- **Key Dependencies:**  
  - Spring Web, Data MongoDB, Security (JWT), Jakarta Validation  
  - Lombok, dotenv-java  
- **Run Command:** `mvn spring-boot:run`

### **Database**
- **Type:** MongoDB Atlas (Cloud)  
- **Schema:** Flexible, validated via DTOs  
- **Layer:** Spring Data MongoRepository  

---

## **3. Architecture Pattern**
### **Pattern:** Modular Monolith  
#### **Rationale:**  
- Perfect for a single-developer or small-team context.  
- Simplified deployment without microservice overhead.  
- Clear separation between domain modules within a unified codebase.  
- Angular frontend communicates via REST boundary at `/api/v1/...`.  

---

## **4. Domain-Driven Module Structure**

### **Backend**
```
src/main/java/com/smartinventory/
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

### **Frontend**
```
src/app/
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

### **Sprint 0 – Foundational Setup & Connectivity**
**Goal:** Initialize Angular + Spring Boot applications, verify MongoDB integration, and prepare CI/CD.

#### **Tasks**
1. **Repository Synchronization**
   - **USER INPUT REQUIRED**  
   - **WHY:** Setup initial GitHub repository for version control.  
   - **FORMAT:** `https://github.com/sagnishesh/smart-inventory.git`  
   - **ACTION:** Clone, initialize `main` branch, push initial structure.

2. **Environment Configuration**
   - **USER INPUT REQUIRED**  
   - **WHY:** Secure configuration (DB, JWT secrets) required.  
   - **FORMAT:**  
     - `MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/inventory`  
     - `JWT_SECRET=32-char-secret`  
   - **ACTION:** Create `.env` + `.env.example`.

3. **Project Structure**
   - Create `/frontend` and `/backend`.  
   - Initialize `.gitignore`, root-level Git repository.  

4. **Backend Setup**
   - Generate Spring Boot project with dependencies.  
   - Create health check endpoint `/api/v1/health`.  
   - Validate MongoDB connection.  

5. **Frontend Setup**
   - Scaffold Angular 18 app with Tailwind + Material.  
   - Create Health Check page linked to backend endpoint.  

6. **Documentation**
   - Draft root `README.md` with setup/start instructions.  

7. **Health Verification**
   - **USER INPUT REQUIRED**  
   - **WHY:** Confirm working frontend-backend link.  
   - **FORMAT:** Expect `{"status":"ok"}` in browser.  

8. **Sprint-0 Commit & Deployment**
   - **Commit Message:**  
     ```
     chore(sprint-0): scaffolding and infrastructure setup
     ```
   - **Deployments:**  
     - Frontend → Netlify  
     - Backend → Render  

---

### **Sprint 1 – Authentication & User Roles**
**Goal:** Build registration, login, and user authentication flow (JWT-secured).

#### **Tasks**
1. **Database Model**  
   - Create `User` with `email`, `hashed_password`, `role`.  

2. **Backend Core**
   - Endpoints:
     - `POST /api/v1/auth/register`
     - `POST /api/v1/auth/login`
     - `GET /api/v1/users/me`
   - Add JWT middleware and guards.
   - **USER INPUT REQUIRED:** Verify user creation in MongoDB.

3. **Frontend UI**
   - Create Login/Register forms.  
   - Manage tokens using NgRx.  
   - **USER INPUT REQUIRED:** Confirm form UX and token persistence.

4. **Sprint Commit & Deployment**
   - **Commit Message:**  
     ```
     feat(sprint-1): implemented authentication and authorization
     ```
   - Push to `sprint-1`, deploy via Netlify & Render.

---

### **Sprint 2 – Inventory Module**
**Goal:** Implement CRUD inventory tracking with supplier linkage and alerting.

#### **Tasks**
1. **Database Schema**
   - `Item`: name, sku, supplierId, qty, reorderLevel, price.  
   - **USER INPUT REQUIRED:** Validate these fields.

2. **Backend**
   - CRUD: `/api/v1/inventory`.  
   - Reorder alert trigger.  
   - **USER INPUT REQUIRED:** Confirm alert behavior.  

3. **Frontend**
   - Build Angular CRUD UI with DataTable.  
   - **USER INPUT REQUIRED:** Confirm UI renders and filters correctly.  

4. **Commit & Deployment**
   - **Commit Message:**  
     ```
     feat(sprint-2): inventory management system with alerts
     ```
   - Deploy both services via CI.  

---

## **6. Deployment Strategy**

| Component | Platform | Function |
|------------|-----------|-----------|
| Frontend | Netlify | Auto-deploys builds on branch push |
| Backend  | Render   | Spring Boot hosting and env vars |
| Database | MongoDB Atlas | Persistent cloud data store |

---

## **7. User Input Protocol**

| Field | Description |
|--------|--------------|
| **WHY** | Explain need for user-provided info |
| **FORMAT** | Specify exact format required |
| **ACTION** | Outline the response and validation step |

All **USER INPUT REQUIRED** items must be validated by user testing confirmation.

---

## **8. Commit & Branch Format**

Every sprint concludes with:
```
feat(sprint-X): [summary]
```

### Pull Request Title:
`Sprint X: [Feature Name]`

### Pull Request Description:
- Sprint goals and accomplishments  
- URLs of deployed environments (Netlify + Render)  
- Manual test confirmation list  

---

## **9. Verification Checklist**
✅ Frontend–Backend communication  
✅ Verified MongoDB Atlas integration  
✅ Secure JWT authentication  
✅ Functional CRUD and alerting flows  
✅ Deployment validated through CI/CD  

---

## **10. Conclusion**
The **Refined Development Plan** introduces clarity, modularity, and continuous delivery discipline to the Smart Inventory Tracker. Each sprint produces a complete, verifiable slice of functionality combining Angular, Spring Boot, and MongoDB Atlas for reliable and scalable delivery.
