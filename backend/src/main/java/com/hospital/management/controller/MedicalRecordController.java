package com.hospital.management.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.entity.MedicalRecord;
import com.hospital.management.service.MedicalRecordService;

@RestController
@RequestMapping("/api/medical-records")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    public MedicalRecordController(
            MedicalRecordService medicalRecordService) {

        this.medicalRecordService = medicalRecordService;
    }

    @PostMapping
    public ResponseEntity<MedicalRecord> createMedicalRecord(
            @RequestBody MedicalRecord medicalRecord) {

        MedicalRecord savedRecord =
                medicalRecordService.createMedicalRecord(
                        medicalRecord);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedRecord);
    }

    @GetMapping
    public ResponseEntity<List<MedicalRecord>> getAllMedicalRecords() {

        return ResponseEntity.ok(
                medicalRecordService.getAllMedicalRecords()
        );
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<MedicalRecord>>
            getMedicalRecordsByDoctor(
                    @PathVariable Integer doctorId) {

        return ResponseEntity.ok(
                medicalRecordService
                        .getMedicalRecordsByDoctor(doctorId)
        );
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalRecord>>
            getMedicalRecordsByPatient(
                    @PathVariable Integer patientId) {

        return ResponseEntity.ok(
                medicalRecordService
                        .getMedicalRecordsByPatient(patientId)
        );
    }

    @GetMapping("/{recordId}")
    public ResponseEntity<MedicalRecord> getMedicalRecordById(
            @PathVariable Integer recordId) {

        return ResponseEntity.ok(
                medicalRecordService
                        .getMedicalRecordById(recordId)
        );
    }
}