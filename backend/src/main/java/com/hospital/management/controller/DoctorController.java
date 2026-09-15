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

    // =========================================================
    // GET ALL DOCTORS
    // =========================================================

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    // =========================================================
    // GET DOCTOR BY ID
    // =========================================================

    @GetMapping("/{doctorId}")
    public ResponseEntity<Doctor> getDoctorById(
            @PathVariable Integer doctorId) {

        return ResponseEntity.ok(
                doctorService.getDoctorById(doctorId)
        );
    }

    // =========================================================
    // GET DOCTORS BY SHIFT
    // DAY / NIGHT
    // =========================================================

    @GetMapping("/shift/{shift}")
    public ResponseEntity<List<Doctor>> getDoctorsByShift(
            @PathVariable String shift) {

        return ResponseEntity.ok(
                doctorService.getDoctorsByShift(shift)
        );
    }

    // =========================================================
    // CREATE DOCTOR ACCOUNT
    // Used when Admin creates doctor directly
    // =========================================================

    @PostMapping("/account")
    public ResponseEntity<?> createDoctorAccount(
            @RequestBody DoctorAccountRequest request) {

        try {

            Doctor doctor = new Doctor();

            doctor.setName(request.name());
            doctor.setEmail(request.email());
            doctor.setSpecialization(request.specialization());

            Doctor savedDoctor =
                    doctorService.createDoctorAccount(
                            doctor,
                            request.email(),
                            request.password()
                    );

            return ResponseEntity.ok(savedDoctor);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================================================
    // ADMIN APPROVES PENDING DOCTOR
    // Doctor status  -> APPROVED
    // User status    -> ACTIVE
    // =========================================================

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

    // =========================================================
    // ADMIN REJECTS PENDING DOCTOR
    // Doctor status  -> REJECTED
    // User status    -> REJECTED
    // =========================================================

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

    // =========================================================
    // CREATE DOCTOR
    // Existing doctor creation endpoint
    // =========================================================

    @PostMapping
    public ResponseEntity<Doctor> createDoctor(
            @RequestBody Doctor doctor) {

        return ResponseEntity.ok(
                doctorService.createDoctor(doctor)
        );
    }

    // =========================================================
    // UPDATE DOCTOR
    // =========================================================

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

    // =========================================================
    // DELETE DOCTOR
    // =========================================================

    @DeleteMapping("/{doctorId}")
    public ResponseEntity<String> deleteDoctor(
            @PathVariable Integer doctorId) {

        doctorService.deleteDoctor(doctorId);

        return ResponseEntity.ok(
                "Doctor deleted successfully"
        );
    }

    // =========================================================
    // REQUEST USED WHEN ADMIN CREATES A DOCTOR
    // =========================================================

    public record DoctorAccountRequest(
            String name,
            String email,
            String password,
            String specialization
    ) {
    }
}