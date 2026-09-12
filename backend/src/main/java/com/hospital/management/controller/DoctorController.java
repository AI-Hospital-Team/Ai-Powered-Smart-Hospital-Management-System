package com.hospital.management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hospital.management.entity.Doctor;
import com.hospital.management.service.DoctorService;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{doctorId}")
    public ResponseEntity<Doctor> getDoctorById(
            @PathVariable Integer doctorId) {

        return ResponseEntity.ok(
                doctorService.getDoctorById(doctorId)
        );
    }

    /*
     * Create doctor profile + login account.
     * This endpoint is intended for Admin-created doctors.
     */
    @PostMapping("/account")
    public ResponseEntity<?> createDoctorAccount(
            @RequestBody DoctorAccountRequest request) {

        try {

            Doctor doctor =
                    doctorService.createDoctorAccount(
                            request.name(),
                            request.email(),
                            request.password(),
                            request.specialization()
                    );

            return ResponseEntity.ok(doctor);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    /*
     * Admin approves a pending doctor application.
     */
    @PutMapping("/{doctorId}/approve")
    public ResponseEntity<?> approveDoctor(
            @PathVariable Integer doctorId) {

        try {

            Doctor doctor =
                    doctorService.approveDoctor(doctorId);

            return ResponseEntity.ok(doctor);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    /*
     * Admin rejects a pending doctor application.
     */
    @PutMapping("/{doctorId}/reject")
    public ResponseEntity<?> rejectDoctor(
            @PathVariable Integer doctorId) {

        try {

            Doctor doctor =
                    doctorService.rejectDoctor(doctorId);

            return ResponseEntity.ok(doctor);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    /*
     * Existing doctor creation endpoint.
     */
    @PostMapping
    public ResponseEntity<Doctor> createDoctor(
            @RequestBody Doctor doctor) {

        return ResponseEntity.ok(
                doctorService.createDoctor(doctor)
        );
    }

    @PutMapping("/{doctorId}")
    public ResponseEntity<Doctor> updateDoctor(
            @PathVariable Integer doctorId,
            @RequestBody Doctor doctor) {

        return ResponseEntity.ok(
                doctorService.updateDoctor(
                        doctorId,
                        doctor
                )
        );
    }

    @DeleteMapping("/{doctorId}")
    public ResponseEntity<String> deleteDoctor(
            @PathVariable Integer doctorId) {

        doctorService.deleteDoctor(doctorId);

        return ResponseEntity.ok(
                "Doctor deleted successfully"
        );
    }

    /*
     * Request used when Admin creates a Doctor.
     */
    public record DoctorAccountRequest(
            String name,
            String email,
            String password,
            String specialization
    ) {
    }
}