🏥 AI-Powered Smart Hospital Management System

An intelligent full-stack Hospital Management System designed to digitally manage hospital operations and provide patients with AI-powered general health guidance.

The system provides separate dashboards and role-based access for Admin, Doctor, and Patient, along with appointment management, medical records, prescriptions, billing, profile management, and an AI Health Assistant powered by Ollama + Llama 3.2.

👨‍💻 Authors

Prathmesh Gavram Panmand — https://github.com/prathmesh235

Radheshyam Subhash Wayal — https://github.com/Radheshamwayal7

👥 Team

AI Hospital Team

This project is developed as a collaborative full-stack hospital management project.

📌 Project Overview

The AI-Powered Smart Hospital Management System is a web-based healthcare management platform developed to simplify and organize hospital activities through a centralized digital system.

The application connects the React frontend, Spring Boot backend, MySQL database, and local Ollama AI service to provide an integrated hospital management experience.

Main Goals

Digitize hospital management operations

Provide role-based access for Admin, Doctor, and Patient

Manage patient and doctor information

Manage appointments

Maintain medical records

Manage prescriptions

Manage hospital bills

Provide patient profile management

Provide AI-powered general health guidance

Improve hospital workflow and user experience

Maintain database consistency and role-based navigation

✨ Key Features

👨‍💼 Admin Features

The Admin dashboard provides centralized management of hospital data.

📊 Admin Dashboard

👥 Patient management

👨‍⚕️ Doctor management

📅 Appointment management

📋 Medical record management

💊 Prescription management

💰 Billing management

🔐 Role-based access

👤 Account navigation

🚪 Logout

🌙 Dark/Light mode

👨‍⚕️ Doctor Features

Doctors have a dedicated dashboard for managing appointments and accessing relevant patient information.

Doctor Dashboard

View appointments

Manage appointment status

Confirm appointments

Cancel appointments

Complete appointments

View patient-related information

Role-protected doctor access

Account navigation

Logout protection

Appointment Status

The system supports:

Pending

Confirmed

Cancelled

Completed

🧑‍🦱 Patient Features

Patients have a dedicated dashboard where they can access their healthcare information.

Patient Dashboard

View appointments

Book appointments

Cancel appointments

View medical records

View prescriptions

View bills

View/manage profile

View appointment status

View billing information

AI Health Assistant

Account navigation

Logout

Home navigation

Dark/Light mode

🤖 AI Health Assistant

The project includes a local AI-powered health assistant.

Patients can enter symptoms and receive general educational health guidance.

Example Input

Fever, cough and weakness

AI Architecture

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

AI Technology

Local AI

Ollama

Llama 3.2

Ollama REST API

Local AI inference

React Markdown response formatting

Ollama normally runs at:

http://localhost:11434

Model:

llama3.2

The model runs locally through Ollama instead of requiring a cloud AI API.

🏗️ System Architecture

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
          │ medical_records  │
          │ prescriptions    │
          │ bills             │
          └───────────────────┘

💻 Technology Stack

Layer

Technologies

Frontend

React, Vite, JavaScript, HTML5, CSS3

Routing

React Router

HTTP Client

Axios

UI Icons

Lucide React

AI Response UI

React Markdown

Backend

Java, Spring Boot, Spring Web

API

REST APIs

Build Tool

Maven

Database

MySQL

Database Tool

MySQL Workbench

AI

Ollama, Llama 3.2

Development

VS Code, Git, GitHub, PowerShell

Runtime/Package Tools

Node.js, npm, Java JDK, Maven

📂 Project Structure

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

Role-based navigation redirects users to the appropriate dashboard.

📅 Appointment Management

Patients can book appointments with doctors.

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

Patients can access their profile through:

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

Examples:

A patient should not directly access /dashboard

A doctor should not directly access /patient

An unauthenticated user is redirected to /login

🚪 Logout Protection

When the user logs out, authentication-related local storage values are cleared.

The user is redirected to:

/

Protected dashboard pages should not remain accessible through normal navigation after logout.

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

The Home page also provides navigation to login and healthcare features.

🤖 AI Healthcare Section

The Home page can showcase the AI Health Assistant.

Users can select the AI healthcare section and navigate to the AI assistant functionality.

🌙 Dark / Light Mode

The dashboard supports dark and light mode.

The selected theme is stored locally using:

darkMode

The application applies the selected theme dynamically without requiring a page reload.

🔄 Frontend ↔ Backend Communication

The frontend communicates with the Spring Boot backend through REST APIs.

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

Example response:

{
  "response": "AI generated health guidance..."
}

⚙️ Installation & Setup

1. Clone Repository

git clone https://github.com/AI-Hospital-Team/Ai-Powered-Smart-Hospital-Management-System.git
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

Use your own MySQL password. Do not commit real database credentials to GitHub.

3. Setup Backend

Move into the backend:

cd backend

Run the Spring Boot application on Windows:

.\mvnw.cmd spring-boot:run

Or build the project:

.\mvnw.cmd clean package

Backend:

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

Keep Ollama running while using the AI Health Assistant.

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

Expected response:

AI generated health guidance

8. Setup Frontend

Open a new terminal:

cd frontend
npm install
npm run dev

Frontend normally runs on:

http://localhost:5173

9. Production Build

Create a production build:

npm run build

A successful build generates:

dist/

🔌 Important Ports

Service

Port

React / Vite

5173

Spring Boot

8080

Ollama

11434

MySQL

3306

🧪 Testing

The system should be tested for the following areas.

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

1. fever, cough and weakness

2. headache, dizziness and tiredness

3. stomach pain, nausea and loss of appetite

4. sore throat, fever and difficulty swallowing

5. back pain and muscle stiffness after physical activity

6. runny nose, sneezing and mild headache

7. chest discomfort and shortness of breath

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

Important: Frontend local storage should not be treated as a secure authentication mechanism for a production healthcare application.

🌐 API Endpoints

Authentication

POST /api/auth/login

Patients

GET /api/patients

Additional patient endpoints are provided by the PatientController.

Doctors

GET /api/doctors

Additional doctor endpoints are provided by the DoctorController.

Appointments

GET /api/appointments

Patient appointments:

GET /api/appointments/patient/{patientId}

Doctor appointments:

GET /api/appointments/doctor/{doctorId}

Update appointment status:

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

Main Branches

main
prathmesh
sham

Typical Workflow

git pull
git add .
git commit -m "Your commit message"
git push

Before merging:

git status

To update the current branch from main:

git merge main

To push the prathmesh branch:

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

The frontend is designed to support:

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

Area

Implementation

Full Stack

React + Spring Boot + MySQL

AI Integration

Spring Boot + Ollama + Llama 3.2

User Roles

Admin, Doctor, Patient

Authentication

Login + role-based navigation

Appointments

Booking + status management

Medical Records

Patient healthcare records

Prescriptions

Prescription management

Billing

Bill creation and viewing

Profiles

Patient profile management

AI Assistant

Local symptom-based health guidance

UI

Responsive + Dark/Light mode

📌 Project Status

Feature

Status

Frontend

✅

Backend

✅

MySQL Integration

✅

Role-based Routing

✅

Protected Routes

✅

Logout Protection

✅

Admin Dashboard

✅

Doctor Dashboard

✅

Patient Dashboard

✅

Appointments

✅

Medical Records

✅

Prescriptions

✅

Billing

✅

Patient Profile

✅

AI Health Assistant

✅

Ollama Integration

✅

Llama 3.2

✅

Dark/Light Mode

✅

Production Build

✅

🏁 Final Run Checklist

Before demonstrating the project:

MySQL is running

Database is available

Backend is running on port 8080

Ollama is running

llama3.2 is installed

Frontend is running on port 5173

Admin login works

Doctor login works

Patient login works

Role protection works

Logout works

Appointment booking works

Appointment status works

Medical records work

Prescriptions work

Bills work

Profile works

AI Health Assistant works

Home page navigation works

Responsive UI tested

npm run build succeeds

📜 License

This project is developed for educational and academic purposes.

⭐ Conclusion

The AI-Powered Smart Hospital Management System combines traditional hospital management functionality with modern web technologies and local AI capabilities.

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
