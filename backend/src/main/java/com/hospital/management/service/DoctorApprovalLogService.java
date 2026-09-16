package com.hospital.management.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.management.entity.Doctor;
import com.hospital.management.entity.DoctorApprovalLog;
import com.hospital.management.repository.DoctorApprovalLogRepository;

@Service
public class DoctorApprovalLogService {

    private final DoctorApprovalLogRepository logRepository;

    public DoctorApprovalLogService(
            DoctorApprovalLogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public DoctorApprovalLog createLog(
            Doctor doctor,
            String action) {

        DoctorApprovalLog log = new DoctorApprovalLog();

        log.setDoctorId(doctor.getDoctorId());
        log.setDoctorName(doctor.getName());
        log.setSpecialization(doctor.getSpecialization());
        log.setEmail(doctor.getEmail());
        log.setAction(action.toUpperCase());
        log.setActionDateTime(LocalDateTime.now());

        return logRepository.save(log);
    }

    public List<DoctorApprovalLog> getAllLogs() {
        return logRepository.findAllByOrderByActionDateTimeDesc();
    }
}