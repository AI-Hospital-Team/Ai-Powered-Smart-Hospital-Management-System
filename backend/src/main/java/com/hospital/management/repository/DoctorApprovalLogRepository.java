package com.hospital.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.management.entity.DoctorApprovalLog;

public interface DoctorApprovalLogRepository
        extends JpaRepository<DoctorApprovalLog, Integer> {

    List<DoctorApprovalLog> findAllByOrderByActionDateTimeDesc();
}
