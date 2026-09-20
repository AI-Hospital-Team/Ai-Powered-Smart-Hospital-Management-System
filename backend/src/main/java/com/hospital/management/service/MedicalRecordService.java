package com.hospital.management.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.hospital.management.entity.MedicalRecord;
import com.hospital.management.repository.MedicalRecordRepository;
import com.hospital.management.repository.UserRepository;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    public MedicalRecordService(
            MedicalRecordRepository medicalRecordRepository,
            NotificationService notificationService,
            UserRepository userRepository) {

        this.medicalRecordRepository =
                medicalRecordRepository;

        this.notificationService =
                notificationService;

        this.userRepository =
                userRepository;
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

            // =================================================
            // PATIENT NOTIFICATION
            // =================================================

            notificationService.notifyPatient(
                    record.getPatientId(),
                    "Follow-up Reminder",
                    "Your follow-up date is today. Please consult your doctor for your scheduled follow-up.",
                    "FOLLOW_UP_REMINDER",
                    record.getRecordId()
            );

            // =================================================
            // DOCTOR NOTIFICATION
            // =================================================

            if (record.getDoctorId() != null) {

                userRepository
                        .findByDoctorId(
                                record.getDoctorId()
                        )
                        .ifPresent(doctorUser ->
                                notificationService.notifyDoctor(
                                        doctorUser.getUserId(),
                                        "Patient Follow-up Reminder",
                                        "A patient's scheduled follow-up date is today. Please review the patient's medical record.",
                                        "FOLLOW_UP_REMINDER",
                                        record.getRecordId()
                                )
                        );
            }
        }
    }

    // =====================================================
    // DELETE MEDICAL RECORD
    // =====================================================

    public void deleteMedicalRecord(Integer recordId) {

        if (!medicalRecordRepository.existsById(recordId)) {
            throw new RuntimeException(
                    "Medical record not found with ID: " + recordId
            );
        }

        medicalRecordRepository.deleteById(recordId);
    }
}