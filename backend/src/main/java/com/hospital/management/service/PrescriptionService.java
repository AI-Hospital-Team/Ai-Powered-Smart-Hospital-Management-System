package com.hospital.management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.management.entity.Doctor;
import com.hospital.management.entity.Prescription;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.PrescriptionRepository;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final DoctorRepository doctorRepository;
    private final NotificationService notificationService;

    public PrescriptionService(
            PrescriptionRepository prescriptionRepository,
            DoctorRepository doctorRepository,
            NotificationService notificationService) {

        this.prescriptionRepository = prescriptionRepository;
        this.doctorRepository = doctorRepository;
        this.notificationService = notificationService;
    }

    // =====================================================
    // ADD DOCTOR NAME
    // =====================================================

    private Prescription addDoctorName(
            Prescription prescription) {

        if (prescription.getDoctorId() != null) {

            Doctor doctor =
                    doctorRepository
                            .findById(prescription.getDoctorId())
                            .orElse(null);

            if (doctor != null) {

                prescription.setDoctorName(
                        doctor.getName()
                );
            }
        }

        return prescription;
    }

    private List<Prescription> addDoctorNames(
            List<Prescription> prescriptions) {

        prescriptions.forEach(this::addDoctorName);

        return prescriptions;
    }

    // =====================================================
    // CREATE
    // =====================================================

    public Prescription createPrescription(
            Prescription prescription) {

        Prescription saved =
                prescriptionRepository.save(
                        prescription
                );

        // =================================================
        // PRESCRIPTION ADDED NOTIFICATION
        // =================================================

        notificationService.createNotification(
                saved.getPatientId(),
                "PATIENT",
                "New Prescription Added",
                "A new prescription has been added to your medical records.",
                "PRESCRIPTION_ADDED",
                saved.getPrescriptionId()
        );

        return addDoctorName(saved);
    }

    // =====================================================
    // GET ALL
    // =====================================================

    public List<Prescription> getAllPrescriptions() {

        return addDoctorNames(
                prescriptionRepository.findAll()
        );
    }

    // =====================================================
    // GET BY DOCTOR
    // =====================================================

    public List<Prescription> getPrescriptionsByDoctor(
            Integer doctorId) {

        return addDoctorNames(
                prescriptionRepository
                        .findByDoctorId(doctorId)
        );
    }

    // =====================================================
    // GET BY PATIENT
    // =====================================================

    public List<Prescription> getPrescriptionsByPatient(
            Integer patientId) {

        return addDoctorNames(
                prescriptionRepository
                        .findByPatientId(patientId)
        );
    }

    // =====================================================
    // GET BY ID
    // =====================================================

    public Prescription getPrescriptionById(
            Integer prescriptionId) {

        Prescription prescription =
                prescriptionRepository
                        .findById(prescriptionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Prescription not found"
                                )
                        );

        return addDoctorName(prescription);
    }

    // =====================================================
    // UPDATE
    // =====================================================

    public Prescription updatePrescription(
            Integer prescriptionId,
            Prescription updatedPrescription) {

        Prescription existing =
                prescriptionRepository
                        .findById(prescriptionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Prescription not found with ID: "
                                                + prescriptionId
                                )
                        );

        existing.setDiagnosis(
                updatedPrescription.getDiagnosis()
        );

        existing.setMedicineName(
                updatedPrescription.getMedicineName()
        );

        existing.setDosage(
                updatedPrescription.getDosage()
        );

        existing.setFrequency(
                updatedPrescription.getFrequency()
        );

        existing.setDuration(
                updatedPrescription.getDuration()
        );

        existing.setInstructions(
                updatedPrescription.getInstructions()
        );

        Prescription saved =
                prescriptionRepository.save(existing);

        // =================================================
        // PRESCRIPTION UPDATED NOTIFICATION
        // =================================================

        notificationService.createNotification(
                saved.getPatientId(),
                "PATIENT",
                "Prescription Updated",
                "Your prescription has been updated. Please check your medical records.",
                "PRESCRIPTION_UPDATED",
                saved.getPrescriptionId()
        );

        return addDoctorName(saved);
    }
}