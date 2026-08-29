# AI-Powered Smart Hospital Management System

## 👨‍💻 Author

**1. Prathmesh Gavram Panmand:-** https://github.com/prathmesh235
<br>
**2. Radheshyam Subhash Wayal:-** https://github.com/Radheshamwayal7

An intelligent, full-stack Hospital Management System designed to digitally manage hospital operations and provide patients with AI-powered general health guidance.

The system provides separate dashboards and role-based access for **Admin, Doctor, and Patient**, along with appointment management, medical records, prescriptions, billing, profile management, and an AI Health Assistant powered by **Ollama + Llama 3.2**.

---

## 📌 Project Overview

The **AI-Powered Smart Hospital Management System** is a web-based healthcare management platform developed to simplify and organize hospital activities through a centralized digital system.

The application connects the frontend, backend, database, and local AI service to provide an integrated hospital management experience.

### Main Goals

- Digitize hospital management operations
- Provide role-based access for Admin, Doctor, and Patient
- Manage patient and doctor information
- Manage appointments
- Maintain medical records
- Manage prescriptions
- Manage hospital bills
- Provide patient profile management
- Provide AI-powered general health guidance
- Improve hospital workflow and user experience
- Maintain database consistency and secure role-based navigation

---

# ✨ Key Features

## 👨‍💼 Admin Features

The Admin dashboard provides centralized management of hospital data.

### Admin can manage:

- 📊 Admin Dashboard
- 👥 Patients
- 👨‍⚕️ Doctors
- 📅 Appointments
- 📋 Medical Records
- 💊 Prescriptions
- 💰 Bills
- 🔐 Role-based access
- 👤 Account navigation
- 🚪 Logout
- 🌙 Dark/Light mode

---

## 👨‍⚕️ Doctor Features

Doctors have a dedicated dashboard for managing their appointments and accessing relevant patient information.

### Doctor features include:

- Doctor Dashboard
- View appointments
- Manage appointment status
- Confirm appointments
- Cancel appointments
- Complete appointments
- View patient-related information
- Role-protected doctor access
- Account navigation
- Logout protection

### Appointment Status

The system supports:

- `Pending`
- `Confirmed`
- `Cancelled`
- `Completed`

---

## 🧑‍🦱 Patient Features

Patients have a dedicated dashboard where they can access their healthcare information.

### Patient features include:

- Patient Dashboard
- View appointments
- Book appointments
- Cancel appointments
- View medical records
- View prescriptions
- View bills
- View/manage profile
- View appointment status
- View billing information
- AI Health Assistant
- Account navigation
- Logout
- Home navigation
- Dark/Light mode

---

# 🤖 AI Health Assistant

The project includes a local AI-powered health assistant.

The AI Health Assistant allows patients to enter symptoms and receive **general health guidance**.

### Example Input

```text
Fever, cough and weakness

🧠 AI Architecture

The AI feature uses:

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
🤖 AI Technology
Local AI
Ollama
Llama 3.2
Ollama API
http://localhost:11434/api/generate
Model
llama3.2

The model runs locally through Ollama instead of requiring a cloud AI API.

🏗️ System Architecture
                    ┌──────────────────────────┐
                    │      React Frontend      │
                    │                          │
                    │ Admin Dashboard          │
                    │ Doctor Dashboard         │
                    │ Patient Dashboard        │
                    │ AI Health Assistant       │
                    └────────────┬─────────────┘
                                 │
                                 │ REST API
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
              ┌──────────────────┴──────────────────┐
              │                                     │
              ▼                                     ▼
   ┌─────────────────────┐              ┌─────────────────────┐
   │      MySQL DB       │              │       Ollama        │
   │                     │              │                     │
   │ users               │              │ Llama 3.2           │
   │ patients            │              │ Local AI Model      │
   │ doctors             │              │                     │
   │ appointments        │              └─────────────────────┘
   │ medical_records     │
   │ prescriptions       │
   │ bills               │
   └─────────────────────┘
💻 Technology Stack
Frontend
React
Vite
JavaScript
HTML5
CSS3
React Router
Axios
Lucide React
React Markdown
Backend
Java
Spring Boot
Spring Web
REST APIs
Maven
Database
MySQL
MySQL Workbench
AI
Ollama
Llama 3.2
Local AI inference
REST API integration
Development Tools
Visual Studio Code
Git
GitHub
PowerShell
Node.js
npm
Java JDK
Maven
📂 Project Structure
Ai-Powered-Smart-Hospital-Management-System/
│
├── backend/
│   │
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── hospital/
│   │       │           └── management/
│   │       │
│   │       │           ├── controller/
│   │       │           │   ├── AIController.java
│   │       │           │   ├── AuthController.java
│   │       │           │   ├── PatientController.java
│   │       │           │   ├── DoctorController.java
│   │       │           │   ├── AppointmentController.java
│   │       │           │   ├── MedicalRecordController.java
│   │       │           │   ├── PrescriptionController.java
│   │       │           │   └── BillController.java
│   │       │           │
│   │       │           ├── service/
│   │       │           │   ├── AIService.java
│   │       │           │   ├── AppointmentService.java
│   │       │           │   ├── DoctorService.java
│   │       │           │   ├── MedicalRecordService.java
│   │       │           │   ├── PrescriptionService.java
│   │       │           │   └── BillService.java
│   │       │           │
│   │       │           └── repository/
│   │       │
│   │       └── resources/
│   │
│   ├── pom.xml
│   └── mvnw
│
├── frontend/
│   │
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
🗄️ Database

The project uses MySQL as the primary database.

Main Database
hospital_db
Main Tables
users
patients
doctors
appointments
medical_records
prescriptions
bills
👤 Users

The users table manages application login information and user roles.

Supported roles:

ADMIN
DOCTOR
PATIENT

Role-based navigation ensures that users are redirected to the appropriate dashboard.

📅 Appointment Management

The appointment system allows patients to book appointments with doctors.

Appointment information can include:
Appointment ID
Patient ID
Doctor ID
Appointment Date
Appointment Time
Reason
Status
Status Flow
Pending
   ↓
Confirmed
   ↓
Completed

Appointments can also be:

Cancelled
📋 Medical Records

Medical records allow the hospital system to maintain patient healthcare information.

Records can include:

Patient
Diagnosis
Symptoms
Treatment
Notes
Date
💊 Prescription Management

The prescription module allows authorized users to manage patient prescriptions.

Information may include:

Patient
Doctor
Medicine
Dosage
Frequency
Instructions
Prescription date
💰 Billing Management

The billing module allows administrators to create and manage patient bills.

Bill information includes:

Bill ID
Patient ID
Patient Name
Doctor ID
Bill Type
Amount
Description
Status
Bill Date

Example statuses:

Pending
PAID

Patients can view their billing information from the Patient Dashboard.

👤 Patient Profile

Patients can access their profile information through:

Patient Dashboard
        ↓
Profile

The profile module is designed to allow patients to manage their account information and keep their details updated.

🔐 Authentication & Role Protection

The application implements login and role-based navigation.

Login Flow
Login
  ↓
Validate Credentials
  ↓
Identify Role
  ↓
Admin / Doctor / Patient
  ↓
Open Appropriate Dashboard
🛡️ Protected Routes

The frontend contains:

ProtectedRoute.jsx

It protects dashboard routes from unauthorized access.

Example

A patient should not directly access:

/dashboard

A doctor should not directly access:

/patient

An unauthenticated user is redirected to:

/login
🚪 Logout Protection

When the user logs out, authentication-related local storage values are cleared.

The user is then redirected to:

/

After logout, protected dashboard pages should not remain accessible through normal navigation.

🏠 Home Page

The Home page provides the public landing page of the hospital system.

It includes sections such as:

Hospital introduction
Hero section
Services
Departments
Doctors
Facilities
Healthcare information
AI Healthcare section
Ayushman Bharat section
Contact/footer information

The Home page also provides navigation to the login and healthcare features.

🤖 AI Healthcare Section on Home Page

The Home page can showcase the AI Health Assistant.

Users can select the AI healthcare section and navigate to the AI assistant functionality.

The AI assistant is integrated with the patient healthcare workflow.

🌙 Dark / Light Mode

The dashboard supports dark and light mode.

The selected theme is stored locally:

darkMode

The application applies the theme dynamically without requiring the user to reload the page.

🔄 Frontend ↔ Backend Communication

The frontend communicates with the Spring Boot backend through REST APIs.

Example:

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
🤖 AI API Request Example

The frontend sends:

{
  "symptoms": "fever, cough and weakness"
}

to:

POST /api/ai/health-assistant

The backend sends the symptoms to Ollama.

Ollama generates the response using:

llama3.2

The backend returns:

{
  "response": "AI generated health guidance..."
}
⚙️ Installation & Setup
1. Clone Repository
git clone https://github.com/AI-Hospital-Team/Ai-Powered-Smart-Hospital-Management-System.git

Move into the project:

cd Ai-Powered-Smart-Hospital-Management-System
2. Setup MySQL

Install MySQL and MySQL Workbench.

Create the database:

CREATE DATABASE hospital_db;

Configure the database connection in the Spring Boot application configuration.

Example:

spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

Use your own MySQL password.

3. Setup Backend

Move to backend:

cd backend

Run the Spring Boot application.

Windows:

.\mvnw.cmd spring-boot:run

Or:

.\mvnw.cmd clean package

The backend runs on:

http://localhost:8080
4. Install Ollama

Install Ollama for Windows.

Verify installation:

ollama --version

Check installed models:

ollama list

The project uses:

llama3.2

If the model is not installed:

ollama pull llama3.2

Verify:

ollama list

Expected model:

llama3.2:latest
5. Start Ollama

Run:

ollama serve

Ollama should listen on:

http://127.0.0.1:11434

Keep this terminal running while using the AI Health Assistant.

6. Test Ollama

Run:

ollama run llama3.2

You can test the model directly by entering a prompt.

7. Test AI Backend API

PowerShell example:

$body = @{
    symptoms = "fever, cough and weakness"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:8080/api/ai/health-assistant" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

Expected response format:

response
--------
AI generated health guidance
8. Setup Frontend

Open a new terminal.

Move to frontend:

cd frontend

Install dependencies:

npm install

Start development server:

npm run dev

Frontend normally runs on:

http://localhost:5173
9. Production Build

To create a production build:

npm run build

A successful build generates:

dist/

Example successful build:

✓ built successfully
🔌 Important Ports
Service	Port
React / Vite	5173
Spring Boot	8080
Ollama	11434
MySQL	3306
🧪 Testing

The system should be tested for:

Authentication
Login with valid credentials
Login with invalid credentials
Logout
Protected routes
Role-based access
Admin
Admin dashboard
Patient management
Doctor management
Appointment management
Medical records
Prescriptions
Bills
Doctor
Doctor dashboard
View appointments
Update appointment status
Account navigation
Logout
Patient
Patient dashboard
Book appointment
View appointments
Cancel appointment
View medical records
View prescriptions
View bills
Profile
AI Health Assistant
Logout
AI
Ollama running
Llama 3.2 available
Backend running
AI API working
Symptoms validation
AI response displayed correctly
AI error handling
🧪 AI Test Examples
Example 1
fever, cough and weakness
Example 2
headache, dizziness and tiredness
Example 3
stomach pain, nausea and loss of appetite
Example 4
sore throat, fever and difficulty swallowing
Example 5
back pain and muscle stiffness after physical activity
Example 6
runny nose, sneezing and mild headache
Example 7
chest discomfort and shortness of breath

For serious symptoms, the application should clearly advise the user to seek appropriate professional medical attention.

⚠️ AI Medical Disclaimer

The AI Health Assistant is intended only for general educational health information.

It:

Does not provide a definitive diagnosis
Does not replace a qualified doctor
Does not prescribe medicines
Should not be used for emergency decision-making

Users should consult a qualified healthcare professional for medical concerns.

If a user experiences severe or emergency symptoms, they should seek immediate professional medical assistance.

🔒 Security Considerations

The project includes frontend role protection and logout protection.

Important security improvements for production include:

Password hashing
Secure authentication
JWT/session-based authentication
HTTP-only cookies where appropriate
Backend-side role authorization
Input validation
API authentication
CORS configuration
Environment variables for secrets
Database access control
HTTPS

Frontend local storage should not be treated as a secure authentication mechanism for a production healthcare application.

🌐 API Endpoints
Authentication
POST /api/auth/login
Patients
GET /api/patients

Additional patient endpoints are provided by the Patient Controller.

Doctors
GET /api/doctors

Additional doctor endpoints are provided by the Doctor Controller.

Appointments
GET /api/appointments

Example patient endpoint:

GET /api/appointments/patient/{patientId}

Example doctor endpoint:

GET /api/appointments/doctor/{doctorId}

Appointment status:

PUT /api/appointments/{appointmentId}/status
Medical Records
/api/medical-records
Prescriptions
/api/prescriptions
Bills
/api/bills
AI Health Assistant
POST /api/ai/health-assistant

Request:

{
  "symptoms": "fever, cough and weakness"
}

Response:

{
  "response": "AI generated health guidance..."
}
🔄 Git & GitHub Workflow

The project uses Git for version control.

Main branches include:

main
prathmesh
sham

Typical workflow:

git pull
git add .
git commit
git push

Before merging:

git status

To update the current branch from main:

git merge main

To push:

git push origin prathmesh
👨‍💻 Development Workflow
1. Start MySQL
        ↓
2. Start Ollama
        ↓
3. Start Spring Boot Backend
        ↓
4. Start React Frontend
        ↓
5. Login
        ↓
6. Select User Role
        ↓
7. Use Dashboard
        ↓
8. Test APIs
        ↓
9. Test AI Assistant
        ↓
10. Run Production Build
📱 Responsive Design

The frontend is designed to support different screen sizes, including:

Desktop
Laptop
Tablet
Mobile

Responsive testing should be performed before final deployment.

🎨 UI Features

The system includes:

Modern hospital-themed interface
Dashboard cards
Sidebar navigation
Role-based dashboard layouts
Responsive sections
Dark/Light mode
Interactive buttons
Confirmation modal
AI response formatting
Healthcare-focused visual design
User-friendly navigation
🧩 Major Modules
Authentication
      │
      ├── Admin
      │
      ├── Doctor
      │
      └── Patient
             │
             ├── Appointments
             ├── Medical Records
             ├── Prescriptions
             ├── Bills
             ├── Profile
             └── AI Health Assistant
🚀 Future Enhancements

Possible future improvements include:

JWT authentication
Password encryption/hashing
Email notifications
SMS notifications
Online appointment reminders
Doctor availability calendar
Advanced patient search
Hospital analytics
Admin reports
PDF prescription generation
PDF bill generation
Online payment gateway
AI medical record summarization
AI appointment assistance
Voice-based AI assistant
Multilingual AI assistant
Cloud deployment
Docker support
Automated testing
Audit logs
Advanced security
🎓 Academic Project

This project can be used as a final-year BCA / Computer Application project demonstrating practical implementation of:

Full-stack web development
React
Java
Spring Boot
REST APIs
MySQL
Database Management
Authentication
Role-based authorization
Git & GitHub
Local AI integration
Ollama
Llama 3.2
Responsive UI design
🧠 Skills Demonstrated
Programming
Java
JavaScript
SQL
HTML
CSS
Frontend
React
React Router
Axios
Vite
Component-based development
State management
Responsive UI
Backend
Spring Boot
REST API development
Controllers
Services
Repositories
Exception handling
Backend integration
Database
MySQL
SQL queries
Database relationships
CRUD operations
Data consistency
AI
Ollama
Llama 3.2
Local LLM integration
AI REST API integration
Prompt engineering
AI response formatting
Tools
Git
GitHub
VS Code
MySQL Workbench
PowerShell
Maven
npm
📊 Project Highlights
Full Stack
React + Spring Boot + MySQL
AI Integration
Spring Boot + Ollama + Llama 3.2
User Roles
Admin
Doctor
Patient
Major Modules
Authentication
Appointments
Patients
Doctors
Medical Records
Prescriptions
Bills
Profiles
AI Health Assistant
👥 Team
AI Hospital Team

This project is developed as a collaborative full-stack hospital management project.

Contributors
Prathmesh
AI Hospital Team members
📌 Project Status
Frontend             ✅
Backend              ✅
MySQL Integration    ✅
Role-based Routing   ✅
Protected Routes     ✅
Logout Protection    ✅
Admin Dashboard      ✅
Doctor Dashboard     ✅
Patient Dashboard    ✅
Appointments         ✅
Medical Records      ✅
Prescriptions        ✅
Billing              ✅
Patient Profile      ✅
AI Health Assistant  ✅
Ollama Integration   ✅
Llama 3.2            ✅
Dark/Light Mode      ✅
Production Build     ✅
🏁 Final Run Checklist

Before demonstrating the project:

[ ] MySQL is running
[ ] Database is available
[ ] Backend is running on port 8080
[ ] Ollama is running
[ ] llama3.2 is installed
[ ] Frontend is running on port 5173
[ ] Admin login works
[ ] Doctor login works
[ ] Patient login works
[ ] Role protection works
[ ] Logout works
[ ] Appointment booking works
[ ] Appointment status works
[ ] Medical records work
[ ] Prescriptions work
[ ] Bills work
[ ] Profile works
[ ] AI Health Assistant works
[ ] Home page navigation works
[ ] Responsive UI tested
[ ] npm run build succeeds
📜 License

This project is developed for educational and academic purposes.

⭐ Conclusion

The AI-Powered Smart Hospital Management System combines traditional hospital management functionality with modern web technologies and local AI capabilities.

The platform provides:

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

The project demonstrates how a modern full-stack application can integrate React, Spring Boot, MySQL, Ollama, and Llama 3.2 into a single healthcare management platform.

🏥 AI Smart Hospital
Intelligent Healthcare Management

Manage Healthcare. Simplify Operations. Empower Patients.

