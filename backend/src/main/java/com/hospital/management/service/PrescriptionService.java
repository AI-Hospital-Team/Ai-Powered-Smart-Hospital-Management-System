package com.hospital.management.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
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
    // CALCULATE DURATION
    // =====================================================

    private void calculateDuration(
            Prescription prescription) {

        if (prescription.getStartDate() == null ||
                prescription.getEndDate() == null) {

            prescription.setDuration(null);
            return;
        }

        long days = ChronoUnit.DAYS.between(
                prescription.getStartDate(),
                prescription.getEndDate()
        ) + 1;

        if (days < 1) {
            throw new RuntimeException(
                    "End date cannot be before start date."
            );
        }

        prescription.setDuration(
                days + (days == 1 ? " day" : " days")
        );
    }

    // =====================================================
    // CREATE
    // =====================================================

    public Prescription createPrescription(
            Prescription prescription) {

        // Calculate duration automatically
        calculateDuration(prescription);

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
    // PRESCRIPTION END DATE REMINDER
    // =====================================================

    @Scheduled(fixedRate = 3600000)
    public void sendPrescriptionEndDateNotifications() {

        List<Prescription> prescriptions =
                prescriptionRepository.findAll();

        LocalDate today = LocalDate.now();

        for (Prescription prescription : prescriptions) {

            if (prescription.getEndDate() == null) {
                continue;
            }

            if (!today.equals(prescription.getEndDate())) {
                continue;
            }

            notificationService.createNotification(
                    prescription.getPatientId(),
                    "PATIENT",
                    "Prescription End Date",
                    "Your prescription reaches its end date today. Please consult your doctor before continuing or changing your medication.",
                    "PRESCRIPTION_END_DATE",
                    prescription.getPrescriptionId()
            );
        }
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

        existing.setInstructions(
                updatedPrescription.getInstructions()
        );

        // =================================================
        // UPDATE START DATE
        // =================================================

        existing.setStartDate(
                updatedPrescription.getStartDate()
        );

        // =================================================
        // UPDATE END DATE
        // =================================================

        existing.setEndDate(
                updatedPrescription.getEndDate()
        );

        // Recalculate duration automatically
        calculateDuration(existing);

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