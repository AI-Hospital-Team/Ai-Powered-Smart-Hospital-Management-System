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

import com.hospital.management.entity.Prescription;
import com.hospital.management.service.PrescriptionService;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "http://localhost:5173")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(
            PrescriptionService prescriptionService) {

        this.prescriptionService = prescriptionService;
    }

    @PostMapping
    public ResponseEntity<Prescription> createPrescription(
            @RequestBody Prescription prescription) {

        Prescription savedPrescription =
                prescriptionService.createPrescription(
                        prescription);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedPrescription);
    }

    @GetMapping
    public ResponseEntity<List<Prescription>>
            getAllPrescriptions() {

        return ResponseEntity.ok(
                prescriptionService.getAllPrescriptions()
        );
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Prescription>>
            getPrescriptionsByDoctor(
                    @PathVariable Integer doctorId) {

        return ResponseEntity.ok(
                prescriptionService
                        .getPrescriptionsByDoctor(doctorId)
        );
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>>
            getPrescriptionsByPatient(
                    @PathVariable Integer patientId) {

        return ResponseEntity.ok(
                prescriptionService
                        .getPrescriptionsByPatient(patientId)
        );
    }

    @GetMapping("/{prescriptionId}")
    public ResponseEntity<Prescription>
            getPrescriptionById(
                    @PathVariable Integer prescriptionId) {

        return ResponseEntity.ok(
                prescriptionService
                        .getPrescriptionById(prescriptionId)
        );
    }
}