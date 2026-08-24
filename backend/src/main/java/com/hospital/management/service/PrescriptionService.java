package com.hospital.management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.management.entity.Prescription;
import com.hospital.management.repository.PrescriptionRepository;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionService(
            PrescriptionRepository prescriptionRepository) {

        this.prescriptionRepository = prescriptionRepository;
    }

    // =====================================================
    // CREATE PRESCRIPTION
    // =====================================================

    public Prescription createPrescription(
            Prescription prescription) {

        return prescriptionRepository.save(prescription);
    }

    // =====================================================
    // GET ALL PRESCRIPTIONS
    // =====================================================

    public List<Prescription> getAllPrescriptions() {

        return prescriptionRepository.findAll();
    }

    // =====================================================
    // GET PRESCRIPTIONS BY DOCTOR
    // =====================================================

    public List<Prescription> getPrescriptionsByDoctor(
            Integer doctorId) {

        return prescriptionRepository.findByDoctorId(doctorId);
    }

    // =====================================================
    // GET PRESCRIPTIONS BY PATIENT
    // =====================================================

    public List<Prescription> getPrescriptionsByPatient(
            Integer patientId) {

        return prescriptionRepository.findByPatientId(patientId);
    }

    // =====================================================
    // GET PRESCRIPTION BY ID
    // =====================================================

    public Prescription getPrescriptionById(
            Integer prescriptionId) {

        return prescriptionRepository.findById(prescriptionId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Prescription not found"
                        )
                );
    }

    // =====================================================
    // UPDATE PRESCRIPTION
    // =====================================================

    public Prescription updatePrescription(
            Integer prescriptionId,
            Prescription updatedPrescription) {

        Prescription existingPrescription =
                prescriptionRepository
                        .findById(prescriptionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Prescription not found with ID: "
                                                + prescriptionId
                                )
                        );

        // Update medicine name
        existingPrescription.setMedicineName(
                updatedPrescription.getMedicineName()
        );

        // Update dosage
        existingPrescription.setDosage(
                updatedPrescription.getDosage()
        );

        // Update frequency
        existingPrescription.setFrequency(
                updatedPrescription.getFrequency()
        );

        // Update duration
        existingPrescription.setDuration(
                updatedPrescription.getDuration()
        );

        // Update instructions
        existingPrescription.setInstructions(
                updatedPrescription.getInstructions()
        );

        return prescriptionRepository.save(
                existingPrescription
        );
    }
}