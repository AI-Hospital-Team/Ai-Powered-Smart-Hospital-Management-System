package com.hospital.management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.management.entity.MedicalRecord;
import com.hospital.management.repository.MedicalRecordRepository;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;

    public MedicalRecordService(
            MedicalRecordRepository medicalRecordRepository) {

        this.medicalRecordRepository =
                medicalRecordRepository;
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
        // SAVE UPDATED RECORD TO DATABASE
        // =================================================

        return medicalRecordRepository.save(
                existingRecord
        );
    }
}