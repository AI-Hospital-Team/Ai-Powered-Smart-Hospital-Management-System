package com.hospital.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.management.entity.Prescription;

public interface PrescriptionRepository
        extends JpaRepository<Prescription, Integer> {

    List<Prescription> findByDoctorId(Integer doctorId);

    List<Prescription> findByPatientId(Integer patientId);
}