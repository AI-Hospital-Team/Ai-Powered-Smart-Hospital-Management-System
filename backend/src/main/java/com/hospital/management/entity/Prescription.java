package com.hospital.management.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer prescriptionId;

    private Integer patientId;

    private Integer doctorId;

    @Column(length = 255)
    private String diagnosis;

    private String medicineName;

    private String dosage;

    private String frequency;

    // Calculated automatically from startDate and endDate
    private String duration;

    @Column(length = 1000)
    private String instructions;

    // =====================================================
    // OLD / LEGACY PRESCRIPTION DATE
    // =====================================================

    // Kept for existing prescriptions already stored in DB
    private LocalDate prescriptionDate;

    // =====================================================
    // NEW PRESCRIPTION DATES
    // =====================================================

    private LocalDate startDate;

    private LocalDate endDate;

    // =====================================================
    // DOCTOR NAME
    // =====================================================

    // Returned by API, not stored in prescriptions table
    @Transient
    private String doctorName;

    public Prescription() {
    }

    public Integer getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(Integer prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    public Integer getPatientId() {
        return patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    // =====================================================
    // OLD PRESCRIPTION DATE
    // =====================================================

    public LocalDate getPrescriptionDate() {
        return prescriptionDate;
    }

    public void setPrescriptionDate(LocalDate prescriptionDate) {
        this.prescriptionDate = prescriptionDate;
    }

    // =====================================================
    // START DATE
    // =====================================================

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    // =====================================================
    // END DATE
    // =====================================================

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    // =====================================================
    // DOCTOR NAME
    // =====================================================

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }
}