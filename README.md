# 🏥 AI-Powered Smart Hospital Management System

An intelligent full-stack Hospital Management System designed to digitally manage hospital operations and provide patients with AI-powered general health guidance.

The system provides separate dashboards and role-based access for **Admin, Doctor, and Patient**, along with **appointment management, medical records, prescriptions, billing, profile management, and an AI Health Assistant powered by Ollama + Llama 3.2**.

---

## 👨‍💻 Authors

1. **Prathmesh Gavram Panmand** — https://github.com/prathmesh235
2. **Radheshyam Subhash Wayal** — https://github.com/Radheshamwayal7

## 👥 Team

**AI Hospital Team**

This project is developed as a collaborative full-stack hospital management project.

---

## 📌 Project Overview

The **AI-Powered Smart Hospital Management System** is a web-based healthcare management platform developed to simplify and organize hospital activities through a centralized digital system.

The application connects the **React frontend, Spring Boot backend, MySQL database, and local Ollama AI service** to provide an integrated hospital management experience.

### 🎯 Main Goals

* **Digitize hospital management operations**
* **Provide role-based access for Admin, Doctor, and Patient**
* **Manage patient and doctor information**
* **Manage appointments**
* **Maintain medical records**
* **Manage prescriptions**
* **Manage hospital bills**
* **Provide patient profile management**
* **Provide AI-powered general health guidance**
* **Improve hospital workflow and user experience**
* **Maintain database consistency and role-based navigation**

---

# ✨ Key Features

## 👨‍💼 Admin Features

The Admin dashboard provides centralized management of hospital data.

* **📊 Admin Dashboard**
* **👥 Patient Management**
* **👨‍⚕️ Doctor Management**
* **📅 Appointment Management**
* **📋 Medical Record Management**
* **💊 Prescription Management**
* **💰 Billing Management**
* **🔐 Role-Based Access**
* **👤 Account Navigation**
* **🚪 Logout**
* **🌙 Dark/Light Mode**

---

## 👨‍⚕️ Doctor Features

Doctors have a dedicated dashboard for managing appointments and accessing relevant patient information.

* **Doctor Dashboard**
* **View Appointments**
* **Manage Appointment Status**
* **Confirm Appointments**
* **Cancel Appointments**
* **Complete Appointments**
* **View Patient-Related Information**
* **Role-Protected Doctor Access**
* **Account Navigation**
* **Logout Protection**

### 📅 Appointment Status

The system supports:

* **`Pending`**
* **`Confirmed`**
* **`Cancelled`**
* **`Completed`**

---

## 🧑‍🦱 Patient Features

Patients have a dedicated dashboard where they can access their healthcare information.

* **Patient Dashboard**
* **View Appointments**
* **Book Appointments**
* **Cancel Appointments**
* **View Medical Records**
* **View Prescriptions**
* **View Bills**
* **View/Manage Profile**
* **View Appointment Status**
* **View Billing Information**
* **AI Health Assistant**
* **Account Navigation**
* **Logout**
* **Home Navigation**
* **Dark/Light Mode**

---

# 🤖 AI Health Assistant

The project includes a **local AI-powered health assistant**.

Patients can enter symptoms and receive **general educational health guidance**.

### Example Input

```text
Fever, cough and weakness
```

### 🧠 AI Architecture

```text
React Frontend
      ↓
Spring Boot Backend
      ↓
AIController
      ↓
AIService
      ↓
Ollama API
      ↓
Llama 3.2
      ↓
AI Response
      ↓
Spring Boot
      ↓
React Frontend
```

### 🤖 AI Technology

* **Local AI**
* **Ollama**
* **Llama 3.2**
* **Ollama REST API**
* **Local AI Inference**
* **React Markdown Response Formatting**

Ollama normally runs at:

```text
http://localhost:11434
```

Model:

```text
llama3.2
```

The model runs locally through **Ollama** instead of requiring a cloud AI API.

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────────┐
                    │      React Frontend      │
                    │                          │
                    │ Admin Dashboard          │
                    │ Doctor Dashboard         │
                    │ Patient Dashboard        │
                    │ AI Health Assistant      │
                    └────────────┬─────────────┘
                                 │
                              REST API
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │    Spring Boot Backend   │
                    │                          │
                    │ Controllers              │
                    │ Services                 │
                    │ Repositories             │
                    │ AI Service               │
                    └────────────┬─────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
          ┌───────────────────┐     ┌───────────────────┐
          │      MySQL DB     │     │      Ollama       │
          │                   │     │                   │
          │ users             │     │ Llama 3.2         │
          │ patients          │     │ Local AI Model    │
          │ doctors           │     │                   │
          │ appointments      │     └───────────────────┘
          │ medical_records   │
          │ prescriptions     │
          │ bills             │
          └───────────────────┘
```

---

# 💻 Technology Stack

| Layer                     | Technologies                             |
| ------------------------- | ---------------------------------------- |
| **Frontend**              | **React, Vite, JavaScript, HTML5, CSS3** |
| **Routing**               | **React Router**                         |
| **HTTP Client**           | **Axios**                                |
| **UI Icons**              | **Lucide React**                         |
| **AI Response UI**        | **React Markdown**                       |
| **Backend**               | **Java, Spring Boot, Spring Web**        |
| **API**                   | **REST APIs**                            |
| **Build Tool**            | **Maven**                                |
| **Database**              | **MySQL**                                |
| **Database Tool**         | **MySQL Workbench**                      |
| **AI**                    | **Ollama, Llama 3.2**                    |
| **Development**           | **VS Code, Git, GitHub, PowerShell**     |
| **Runtime/Package Tools** | **Node.js, npm, Java JDK, Maven**        |

---

# 📂 Project Structure

```text
Ai-Powered-Smart-Hospital-Management-System/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── hospital/
│   │       │           └── management/
│   │       │               ├── controller/
│   │       │               │   ├── AIController.java
│   │       │               │   ├── AuthController.java
│   │       │               │   ├── PatientController.java
│   │       │               │   ├── DoctorController.java
│   │       │               │   ├── AppointmentController.java
│   │       │               │   ├── MedicalRecordController.java
│   │       │               │   ├── PrescriptionController.java
│   │       │               │   └── BillController.java
│   │       │               │
│   │       │               ├── service/
│   │       │               │   ├── AIService.java
│   │       │               │   ├── AppointmentService.java
│   │       │               │   ├── DoctorService.java
│   │       │               │   ├── MedicalRecordService.java
│   │       │               │   ├── PrescriptionService.java
│   │       │               │   └── BillService.java
│   │       │               │
│   │       │               └── repository/
│   │       │
│   │       └── resources/
│   │
│   ├── pom.xml
│   └── mvnw
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ConfirmModal.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── DashboardLayout.jsx
│   │   │   └── DashboardLayout.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Admin/
│   │   │   ├── Doctor/
│   │   │   └── Patient/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

# 🗄️ Database

The project uses **MySQL** as the primary database.

### 🗃️ Main Database

```text
hospital_db
```

### 📋 Main Tables

* **`users`**
* **`patients`**
* **`doctors`**
* **`appointments`**
* **`medical_records`**
* **`prescriptions`**
* **`bills`**

---

# 👤 Users

The `users` table manages application login information and user roles.

### Supported Roles

```text
ADMIN
DOCTOR
PATIENT
```

**Role-based navigation** redirects users to the appropriate dashboard.

---

# 📅 Appointment Management

Patients can **book appointments with doctors**.

### Appointment Information

* **Appointment ID**
* **Patient ID**
* **Doctor ID**
* **Appointment Date**
* **Appointment Time**
* **Reason**
* **Status**

### Status Flow

```text
Pending
   ↓
Confirmed
   ↓
Completed
```

Appointments can also be:

```text
Cancelled
```

---

# 📋 Medical Records

Medical records allow the hospital system to maintain patient healthcare information.

### Records Can Include

* **Patient**
* **Diagnosis**
* **Symptoms**
* **Treatment**
* **Notes**
* **Date**

---

# 💊 Prescription Management

The prescription module allows authorized users to manage patient prescriptions.

### Prescription Information

* **Patient**
* **Doctor**
* **Medicine**
* **Dosage**
* **Frequency**
* **Instructions**
* **Prescription Date**

---

# 💰 Billing Management

The billing module allows administrators to create and manage patient bills.

### Bill Information

* **Bill ID**
* **Patient ID**
* **Patient Name**
* **Doctor ID**
* **Bill Type**
* **Amount**
* **Description**
* **Status**
* **Bill Date**

### Example Statuses

* **Pending**
* **PAID**

Patients can **view their billing information from the Patient Dashboard**.

---

# 👤 Patient Profile

Patients can access their profile through:

```text
Patient Dashboard
        ↓
Profile
```

The profile module allows patients to **manage their account information and keep their details updated**.

---

# 🔐 Authentication & Role Protection

The application implements **login and role-based navigation**.

### Login Flow

```text
Login
  ↓
Validate Credentials
  ↓
Identify Role
  ↓
Admin / Doctor / Patient
  ↓
Open Appropriate Dashboard
```

## 🛡️ Protected Routes

The frontend contains:

```text
ProtectedRoute.jsx
```

It protects dashboard routes from unauthorized access.

Examples:

* A **patient** should not directly access `/dashboard`
* A **doctor** should not directly access `/patient`
* An **unauthenticated user** is redirected to `/login`

## 🚪 Logout Protection

When the user logs out, authentication-related local storage values are cleared.

The user is redirected to:

```text
/
```

Protected dashboard pages should not remain accessible through normal navigation after logout.

---

# 🏠 Home Page

The Home page provides the public landing page of the hospital system.

### Home Page Sections

* **Hospital Introduction**
* **Hero Section**
* **Services**
* **Departments**
* **Doctors**
* **Facilities**
* **Healthcare Information**
* **AI Healthcare Section**
* **Ayushman Bharat Section**
* **Contact/Footer Information**

---

# 🌙 Dark / Light Mode

The dashboard supports **Dark and Light mode**.

The selected theme is stored locally using:

```text
darkMode
```

The application applies the selected theme dynamically without requiring a page reload.

---

# 🔄 Frontend ↔ Backend Communication

The frontend communicates with the Spring Boot backend through **REST APIs**.

```text
React
  ↓
Axios / HTTP Request
  ↓
Spring Boot REST Controller
  ↓
Service
  ↓
Repository
  ↓
MySQL
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/AI-Hospital-Team/Ai-Powered-Smart-Hospital-Management-System.git
cd Ai-Powered-Smart-Hospital-Management-System
```

## 2️⃣ Setup MySQL

Install **MySQL** and **MySQL Workbench**.

Create the database:

```sql
CREATE DATABASE hospital_db;
```

Configure the database connection:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

> **Use your own MySQL password. Do not commit real database credentials to GitHub.**

---

## 3️⃣ Setup Backend

Move to backend:

```bash
cd backend
```

Run Spring Boot:

```powershell
.\mvnw.cmd spring-boot:run
```

Or build:

```powershell
.\mvnw.cmd clean package
```

### Backend URL

```text
http://localhost:8080
```

---

## 4️⃣ Setup Ollama

Verify installation:

```powershell
ollama --version
```

Check models:

```powershell
ollama list
```

Install Llama 3.2 if required:

```powershell
ollama pull llama3.2
```

Verify:

```powershell
ollama list
```

Expected:

```text
llama3.2:latest
```

---

## 5️⃣ Start Ollama

```powershell
ollama serve
```

Ollama:

```text
http://127.0.0.1:11434
```

Keep Ollama running while using the **AI Health Assistant**.

---

## 6️⃣ Test Ollama

```powershell
ollama run llama3.2
```

---

## 7️⃣ Test AI Backend API

PowerShell:

```powershell
$body = @{
    symptoms = "fever, cough and weakness"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:8080/api/ai/health-assistant" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

Expected:

```text
AI generated health guidance
```

---

## 8️⃣ Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 9️⃣ Production Build

```bash
npm run build
```

Generated folder:

```text
dist/
```

---

# 🔌 Important Ports

| Service          |      Port |
| ---------------- | --------: |
| **React / Vite** |  **5173** |
| **Spring Boot**  |  **8080** |
| **Ollama**       | **11434** |
| **MySQL**        |  **3306** |

---

# 🌐 API Endpoints

### Authentication

```http
POST /api/auth/login
```

### Patients

```http
GET /api/patients
```

### Doctors

```http
GET /api/doctors
```

### Appointments

```http
GET /api/appointments
```

Patient appointments:

```http
GET /api/appointments/patient/{patientId}
```

Doctor appointments:

```http
GET /api/appointments/doctor/{doctorId}
```

Update appointment status:

```http
PUT /api/appointments/{appointmentId}/status
```

### Medical Records

```http
/api/medical-records
```

### Prescriptions

```http
/api/prescriptions
```

### Bills

```http
/api/bills
```

### AI Health Assistant

```http
POST /api/ai/health-assistant
```

Request:

```json
{
  "symptoms": "fever, cough and weakness"
}
```

Response:

```json
{
  "response": "AI generated health guidance..."
}
```

---

# 🧪 Testing

### 🔐 Authentication

* **Login with valid credentials**
* **Login with invalid credentials**
* **Logout**
* **Protected routes**
* **Role-based access**

### 👨‍💼 Admin

* **Admin Dashboard**
* **Patient Management**
* **Doctor Management**
* **Appointment Management**
* **Medical Records**
* **Prescriptions**
* **Bills**

### 👨‍⚕️ Doctor

* **Doctor Dashboard**
* **View Appointments**
* **Update Appointment Status**
* **Account Navigation**
* **Logout**

### 🧑‍🦱 Patient

* **Patient Dashboard**
* **Book Appointment**
* **View Appointments**
* **Cancel Appointment**
* **View Medical Records**
* **View Prescriptions**
* **View Bills**
* **Profile**
* **AI Health Assistant**
* **Logout**

### 🤖 AI

* **Ollama Running**
* **Llama 3.2 Available**
* **Backend Running**
* **AI API Working**
* **Symptoms Validation**
* **AI Response Display**
* **AI Error Handling**

---

# ⚠️ AI Medical Disclaimer

The AI Health Assistant is intended only for **general educational health information**.

It:

* **Does not provide a definitive diagnosis**
* **Does not replace a qualified doctor**
* **Does not prescribe medicines**
* **Should not be used for emergency decision-making**

Users should consult a **qualified healthcare professional** for medical concerns.

If a user experiences severe or emergency symptoms, they should seek **immediate professional medical assistance**.

---

# 🔒 Security Considerations

Important security improvements for production include:

* **Password hashing**
* **Secure authentication**
* **JWT/session-based authentication**
* **HTTP-only cookies where appropriate**
* **Backend-side role authorization**
* **Input validation**
* **API authentication**
* **CORS configuration**
* **Environment variables for secrets**
* **Database access control**
* **HTTPS**

> **Important:** Frontend local storage should not be treated as a secure authentication mechanism for a production healthcare application.

---

# 🔄 Git & GitHub Workflow

### Main Branches

```text
main
prathmesh
sham
```

### Typical Workflow

```bash
git pull
git add .
git commit -m "Your commit message"
git push
```

Check status:

```bash
git status
```

Update current branch from main:

```bash
git merge main
```

Push Prathmesh branch:

```bash
git push origin prathmesh
```

---

# 🎨 UI Features

The system includes:

* **Modern hospital-themed interface**
* **Dashboard cards**
* **Sidebar navigation**
* **Role-based dashboard layouts**
* **Responsive sections**
* **Dark/Light mode**
* **Interactive buttons**
* **Confirmation modal**
* **AI response formatting**
* **Healthcare-focused visual design**
* **User-friendly navigation**

---

# 📱 Responsive Design

The frontend supports:

* **Desktop**
* **Laptop**
* **Tablet**
* **Mobile**

Responsive testing should be performed before final deployment.

---

# 🚀 Future Enhancements

* **JWT Authentication**
* **Password Encryption/Hashing**
* **Email Notifications**
* **SMS Notifications**
* **Online Appointment Reminders**
* **Doctor Availability Calendar**
* **Advanced Patient Search**
* **Hospital Analytics**
* **Admin Reports**
* **PDF Prescription Generation**
* **PDF Bill Generation**
* **Online Payment Gateway**
* **AI Medical Record Summarization**
* **AI Appointment Assistance**
* **Voice-Based AI Assistant**
* **Multilingual AI Assistant**
* **Cloud Deployment**
* **Docker Support**
* **Automated Testing**
* **Audit Logs**
* **Advanced Security**

---

# 🎓 Academic Project

This project can be used as a **Final-Year BCA / Computer Application Project** demonstrating practical implementation of:

* **Full-Stack Web Development**
* **React**
* **Java**
* **Spring Boot**
* **REST APIs**
* **MySQL**
* **Database Management**
* **Authentication**
* **Role-Based Authorization**
* **Git & GitHub**
* **Local AI Integration**
* **Ollama**
* **Llama 3.2**
* **Responsive UI Design**

---

# 🧠 Skills Demonstrated

### Programming

* **Java**
* **JavaScript**
* **SQL**
* **HTML**
* **CSS**

### Frontend

* **React**
* **React Router**
* **Axios**
* **Vite**
* **Component-Based Development**
* **State Management**
* **Responsive UI**

### Backend

* **Spring Boot**
* **REST API Development**
* **Controllers**
* **Services**
* **Repositories**
* **Exception Handling**
* **Backend Integration**

### Database

* **MySQL**
* **SQL Queries**
* **Database Relationships**
* **CRUD Operations**
* **Data Consistency**

### AI

* **Ollama**
* **Llama 3.2**
* **Local LLM Integration**
* **AI REST API Integration**
* **Prompt Engineering**
* **AI Response Formatting**

### Tools

* **Git**
* **GitHub**
* **VS Code**
* **MySQL Workbench**
* **PowerShell**
* **Maven**
* **npm**

---

# 📊 Project Highlights

| Area                | Implementation                          |
| ------------------- | --------------------------------------- |
| **Full Stack**      | **React + Spring Boot + MySQL**         |
| **AI Integration**  | **Spring Boot + Ollama + Llama 3.2**    |
| **User Roles**      | **Admin, Doctor, Patient**              |
| **Authentication**  | **Login + Role-Based Navigation**       |
| **Appointments**    | **Booking + Status Management**         |
| **Medical Records** | **Patient Healthcare Records**          |
| **Prescriptions**   | **Prescription Management**             |
| **Billing**         | **Bill Creation and Viewing**           |
| **Profiles**        | **Patient Profile Management**          |
| **AI Assistant**    | **Local Symptom-Based Health Guidance** |
| **UI**              | **Responsive + Dark/Light Mode**        |

---

# 📌 Project Status

| Feature                 | Status |
| ----------------------- | :----: |
| **Frontend**            |    ✅   |
| **Backend**             |    ✅   |
| **MySQL Integration**   |    ✅   |
| **Role-Based Routing**  |    ✅   |
| **Protected Routes**    |    ✅   |
| **Logout Protection**   |    ✅   |
| **Admin Dashboard**     |    ✅   |
| **Doctor Dashboard**    |    ✅   |
| **Patient Dashboard**   |    ✅   |
| **Appointments**        |    ✅   |
| **Medical Records**     |    ✅   |
| **Prescriptions**       |    ✅   |
| **Billing**             |    ✅   |
| **Patient Profile**     |    ✅   |
| **AI Health Assistant** |    ✅   |
| **Ollama Integration**  |    ✅   |
| **Llama 3.2**           |    ✅   |
| **Dark/Light Mode**     |    ✅   |
| **Production Build**    |    ✅   |

---

# 🏁 Final Run Checklist

Before demonstrating the project:

* [ ] **MySQL is running**
* [ ] **Database is available**
* [ ] **Backend is running on port `8080`**
* [ ] **Ollama is running**
* [ ] **`llama3.2` is installed**
* [ ] **Frontend is running on port `5173`**
* [ ] **Admin login works**
* [ ] **Doctor login works**
* [ ] **Patient login works**
* [ ] **Role protection works**
* [ ] **Logout works**
* [ ] **Appointment booking works**
* [ ] **Appointment status works**
* [ ] **Medical records work**
* [ ] **Prescriptions work**
* [ ] **Bills work**
* [ ] **Profile works**
* [ ] **AI Health Assistant works**
* [ ] **Home page navigation works**
* [ ] **Responsive UI tested**
* [ ] **`npm run build` succeeds**

---

# 📜 License

This project is developed for **educational and academic purposes**.

---

# ⭐ Conclusion

The **AI-Powered Smart Hospital Management System** combines traditional hospital management functionality with modern web technologies and local AI capabilities.

```text
Hospital Management
        +
Role-Based Access
        +
Appointment Management
        +
Medical Records
        +
Prescriptions
        +
Billing
        +
Patient Profile
        +
Local AI Health Assistant
        =
AI-Powered Smart Hospital Management System
```

The project demonstrates how a modern full-stack application can integrate **React, Spring Boot, MySQL, Ollama, and Llama 3.2** into a single healthcare management platform.

---

## 🏥 AI Smart Hospital

### Intelligent Healthcare Management

**Manage Healthcare. Simplify Operations. Empower Patients.**
