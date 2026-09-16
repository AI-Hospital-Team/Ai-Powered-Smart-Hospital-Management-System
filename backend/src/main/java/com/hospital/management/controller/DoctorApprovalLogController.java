package com.hospital.management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.entity.DoctorApprovalLog;
import com.hospital.management.service.DoctorApprovalLogService;

@RestController
@RequestMapping("/api/doctor-approval-logs")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorApprovalLogController {

    private final DoctorApprovalLogService logService;

    public DoctorApprovalLogController(
            DoctorApprovalLogService logService) {
        this.logService = logService;
    }

    @GetMapping
    public ResponseEntity<List<DoctorApprovalLog>> getAllLogs() {
        return ResponseEntity.ok(
                logService.getAllLogs()
        );
    }
}