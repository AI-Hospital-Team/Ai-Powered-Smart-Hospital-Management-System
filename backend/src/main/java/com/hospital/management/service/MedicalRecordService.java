package com.hospital.management.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.hospital.management.entity.MedicalRecord;
import com.hospital.management.repository.MedicalRecordRepository;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final NotificationService notificationService;

    public MedicalRecordService(
            MedicalRecordRepository medicalRecordRepository,
            NotificationService notificationService) {

        this.medicalRecordRepository =
                medicalRecordRepository;

        this.notificationService =
                notificationService;
    }

    // =====================================================
    // CREATE MEDICAL RECORD
    // =====================================================

    public MedicalRecord createMedicalRecord(
            MedicalRecord medicalRecord) {

        return medicalRecordRepository.save(
                medicalRecord
        );
    }

    // =====================================================
    // GET ALL MEDICAL RECORDS
    // =====================================================

    public List<MedicalRecord> getAllMedicalRecords() {

        return medicalRecordRepository.findAll();
    }

    // =====================================================
    // GET MEDICAL RECORDS BY DOCTOR
    // =====================================================

    public List<MedicalRecord> getMedicalRecordsByDoctor(
            Integer doctorId) {

        return medicalRecordRepository.findByDoctorId(
                doctorId
        );
    }

    // =====================================================
    // GET MEDICAL RECORDS BY PATIENT
    // =====================================================

    public List<MedicalRecord> getMedicalRecordsByPatient(
            Integer patientId) {

        return medicalRecordRepository.findByPatientId(
                patientId
        );
    }

    // =====================================================
    // GET MEDICAL RECORD BY ID
    // =====================================================

    public MedicalRecord getMedicalRecordById(
            Integer recordId) {

        return medicalRecordRepository.findById(
                recordId
        ).orElseThrow(() ->
                new RuntimeException(
                        "Medical record not found"
                )
        );
    }

    // =====================================================
    // FOLLOW-UP DATE REMINDER
    // =====================================================

    @Scheduled(fixedRate = 3600000)
    public void sendFollowUpReminders() {

        List<MedicalRecord> records =
                medicalRecordRepository.findAll();

        LocalDate today = LocalDate.now();

        for (MedicalRecord record : records) {

            // No follow-up date
            if (record.getFollowUpDate() == null) {
                continue;
            }

            // Follow-up date is not today
            if (!today.equals(record.getFollowUpDate())) {
                continue;
            }

            // Send notification to patient
            notificationService.createNotification(
                    record.getPatientId(),
                    "PATIENT",
                    "Follow-up Reminder",
                    "Your follow-up date is today. Please consult your doctor for your scheduled follow-up.",
                    "FOLLOW_UP_REMINDER",
                    record.getRecordId()
            );
        }
    }

    // =====================================================
    // UPDATE MEDICAL RECORD
    // =====================================================

    public MedicalRecord updateMedicalRecord(
            Integer recordId,
            MedicalRecord updatedRecord) {

        // Find existing record
        MedicalRecord existingRecord =
                medicalRecordRepository.findById(
                        recordId
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Medical record not found"
                        )
                );

        // =================================================
        // UPDATE PATIENT
        // =================================================

        existingRecord.setPatientId(
                updatedRecord.getPatientId()
        );

        // =================================================
        // UPDATE DOCTOR
        // =================================================

        existingRecord.setDoctorId(
                updatedRecord.getDoctorId()
        );

        // =================================================
        // UPDATE DIAGNOSIS
        // =================================================

        existingRecord.setDiagnosis(
                updatedRecord.getDiagnosis()
        );

        // =================================================
        // UPDATE SYMPTOMS
        // =================================================

        existingRecord.setSymptoms(
                updatedRecord.getSymptoms()
        );

        // =================================================
        // UPDATE TREATMENT
        // =================================================

        existingRecord.setTreatment(
                updatedRecord.getTreatment()
        );

        // =================================================
        // UPDATE NOTES
        // =================================================

        existingRecord.setNotes(
                updatedRecord.getNotes()
        );

        // =================================================
        // UPDATE RECORD DATE
        // =================================================

        existingRecord.setRecordDate(
                updatedRecord.getRecordDate()
        );

        // =================================================
        // UPDATE FOLLOW-UP DATE
        // =================================================

        existingRecord.setFollowUpDate(
                updatedRecord.getFollowUpDate()
        );

        // =================================================
        // SAVE UPDATED RECORD TO DATABASE
        // =================================================

        return medicalRecordRepository.save(
                existingRecord
        );
    }
}