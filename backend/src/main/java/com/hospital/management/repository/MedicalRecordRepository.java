package com.hospital.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.management.entity.MedicalRecord;

public interface MedicalRecordRepository
        extends JpaRepository<MedicalRecord, Integer> {

    List<MedicalRecord> findByDoctorId(Integer doctorId);

    List<MedicalRecord> findByPatientId(Integer patientId);
}