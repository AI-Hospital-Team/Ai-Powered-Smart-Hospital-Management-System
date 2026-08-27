# AI-Powered Smart Hospital Management System

## 👨‍💻 Author

**1. Prathmesh Gavram Panmand:-** https://github.com/prathmesh235
<br>
**2. Radheshyam Subhash Wayal:-** https://github.com/Radheshamwayal7


## 📌 Project Overview

The **AI-Powered Smart Hospital Management System** is a web-based hospital management application designed to digitize and simplify hospital operations.

The system allows administrators, doctors, and patients to manage hospital-related activities such as patient registration, doctor management, appointments, medical records, prescriptions, billing, and reports.

An AI-based module can provide preliminary symptom analysis, appointment prioritization, and basic healthcare decision support. The AI is intended to assist healthcare professionals and **not replace professional medical diagnosis**.

---

## 🎯 Objectives

* Manage patient information digitally.
* Manage doctors and hospital departments.
* Schedule and manage appointments.
* Maintain patient medical records.
* Manage prescriptions and medicines.
* Generate and manage hospital bills.
* Provide role-based authentication.
* Provide AI-assisted preliminary healthcare suggestions.
* Reduce manual paperwork and improve hospital workflow.

---

## 🚀 Features

### 👨‍💼 Admin

* Admin login
* Manage doctors
* Manage patients
* Manage departments
* Manage hospital staff
* View appointments
* Manage billing
* Generate reports

### 👨‍⚕️ Doctor

* Doctor registration/login
* View appointments
* View patient history
* Add medical records
* Add diagnosis notes
* Create prescriptions
* View laboratory reports

### 👤 Patient

* Patient registration/login
* Book appointments
* View doctor information
* View medical history
* View prescriptions
* View laboratory reports
* View bills

### 🤖 AI Module

* Preliminary symptom analysis
* Appointment priority suggestions
* Basic patient-risk alerts
* Medical-record summarization
* Basic medicine interaction alerts

> **Note:** AI features are intended for decision support only and should not be used as a substitute for a qualified medical professional.

---


## 🏗️ Project Architecture

```text
                ┌─────────────────────┐
                │      Frontend       │
                │ HTML/CSS/JS/React   │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │    REST API Layer   │
                │    Spring Boot      │
                └──────────┬──────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
    ┌─────────────────┐        ┌─────────────────┐
    │     MySQL       │        │    AI Module    │
    │    Database     │        │ Python/AI API   │
    └─────────────────┘        └─────────────────┘
```

### Basic Relationship

```text
Department
     │
     └── Doctor
            │
            └── Appointment
                    │
                    └── Patient
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
       Medical Record  Prescription  Lab Report
                           │
                           ▼
                       Medicine


## 🧪 Testing

The application can be tested using:

* Postman
* MySQL queries

Example:

```text
Patient Registration
        ↓
Login
        ↓
Book Appointment
        ↓
Doctor Consultation
        ↓
Medical Record
        ↓
Prescription
        ↓
Billing
```

## 🔮 Future Enhancements

* Online video consultation
* Online payment integration
* SMS/email appointment notifications
* AI chatbot for general hospital assistance
* Advanced predictive analytics
* IoT-based patient monitoring
* Cloud deployment
* Mobile application
* Electronic health record integration

---

## ⭐ Project Highlights

```text
✔ Java
✔ Spring Boot
✔ REST API
✔ MySQL
✔ JPA/Hibernate
✔ Spring Security
✔ AI Integration
✔ Git & GitHub
✔ Postman
```
