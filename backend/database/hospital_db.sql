CREATE DATABASE IF NOT EXISTS hospital_db;

USE hospital_db;

CREATE TABLE patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(10),
    phone VARCHAR(15),
    email VARCHAR(100),
    address VARCHAR(255)
);

CREATE TABLE doctors (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100)
);

CREATE TABLE appointments (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME,
    status VARCHAR(20) DEFAULT 'Scheduled',

    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE medical_records (
    record_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    diagnosis VARCHAR(255),
    treatment VARCHAR(255),
    notes TEXT,
    record_date DATE NOT NULL,

    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE prescriptions (
    prescription_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    medicine_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(100),
    instructions VARCHAR(255),
    prescription_date DATE NOT NULL,

    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE billing (
    bill_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'Pending',
    bill_date DATE NOT NULL,

    FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    patient_id INT NULL,
    doctor_id INT NULL,

    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);