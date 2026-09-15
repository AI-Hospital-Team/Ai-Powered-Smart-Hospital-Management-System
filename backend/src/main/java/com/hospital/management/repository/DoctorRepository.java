package com.hospital.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.management.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    // Get all doctors by shift
    List<Doctor> findByShiftIgnoreCase(String shift);

}