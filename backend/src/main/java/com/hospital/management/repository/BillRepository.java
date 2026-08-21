package com.hospital.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.management.entity.Bill;

public interface BillRepository extends JpaRepository<Bill, Integer> {

    List<Bill> findByPatientId(Integer patientId);
}