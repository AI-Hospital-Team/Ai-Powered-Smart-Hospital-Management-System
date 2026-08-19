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
        this.medicalRecordRepository = medicalRecordRepository;
    }

    public MedicalRecord createMedicalRecord(
            MedicalRecord medicalRecord) {

        return medicalRecordRepository.save(medicalRecord);
    }

    public List<MedicalRecord> getAllMedicalRecords() {

        return medicalRecordRepository.findAll();
    }

    public List<MedicalRecord> getMedicalRecordsByDoctor(
            Integer doctorId) {

        return medicalRecordRepository.findByDoctorId(doctorId);
    }

    public List<MedicalRecord> getMedicalRecordsByPatient(
            Integer patientId) {

        return medicalRecordRepository.findByPatientId(patientId);
    }

    public MedicalRecord getMedicalRecordById(
            Integer recordId) {

        return medicalRecordRepository.findById(recordId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Medical record not found"));
    }
}