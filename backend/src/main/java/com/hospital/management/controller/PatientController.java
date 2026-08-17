package com.hospital.management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.entity.Patient;
import com.hospital.management.service.PatientService;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    // Get all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // Get patient by ID
    @GetMapping("/{patientId}")
    public ResponseEntity<Patient> getPatientById(
            @PathVariable Integer patientId) {

        return ResponseEntity.ok(
                patientService.getPatientById(patientId)
        );
    }

    // Get patient by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Patient> getPatientByEmail(
            @PathVariable String email) {

        return ResponseEntity.ok(
                patientService.getPatientByEmail(email)
        );
    }

    // Create patient
    @PostMapping
    public ResponseEntity<Patient> createPatient(
            @RequestBody Patient patient) {

        return ResponseEntity.ok(
                patientService.createPatient(patient)
        );
    }

    // Update patient
    @PutMapping("/{patientId}")
    public ResponseEntity<Patient> updatePatient(
            @PathVariable Integer patientId,
            @RequestBody Patient patient) {

        return ResponseEntity.ok(
                patientService.updatePatient(patientId, patient)
        );
    }

    // Delete patient
    @DeleteMapping("/{patientId}")
    public ResponseEntity<String> deletePatient(
            @PathVariable Integer patientId) {

        patientService.deletePatient(patientId);

        return ResponseEntity.ok("Patient deleted successfully");
    }
}
