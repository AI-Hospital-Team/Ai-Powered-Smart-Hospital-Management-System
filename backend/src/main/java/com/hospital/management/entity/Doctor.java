package com.hospital.management.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id")
    private Integer doctorId;

    @Column(nullable = false)
    private String name;

    private String specialization;

    private String phone;

    private String email;

    private LocalDate dob;

    private String gender;

    private String address;

    private String qualification;

    @Column(name = "medical_registration_no")
    private String medicalRegistrationNo;

    @Column(name = "hospital_association")
    private String hospitalAssociation;

    private String status;

    // Day / Night shift
    @Column(name = "shift")
    private String shift;

    // Default constructor
    public Doctor() {
    }

    // Doctor ID
    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    // Name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Specialization
    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    // Phone
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Date of Birth
    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    // Gender
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    // Address
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // Qualification
    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    // Medical Registration Number
    public String getMedicalRegistrationNo() {
        return medicalRegistrationNo;
    }

    public void setMedicalRegistrationNo(String medicalRegistrationNo) {
        this.medicalRegistrationNo = medicalRegistrationNo;
    }

    // Hospital Association
    public String getHospitalAssociation() {
        return hospitalAssociation;
    }

    public void setHospitalAssociation(String hospitalAssociation) {
        this.hospitalAssociation = hospitalAssociation;
    }

    // Status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Shift
    public String getShift() {
        return shift;
    }

    public void setShift(String shift) {
        this.shift = shift;
    }
}