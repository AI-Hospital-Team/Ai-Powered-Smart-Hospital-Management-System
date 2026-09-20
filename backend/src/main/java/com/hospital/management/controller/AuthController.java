package com.hospital.management.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.dto.LoginResponse;
import com.hospital.management.entity.PasswordResetRequest;
import com.hospital.management.entity.User;
import com.hospital.management.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // =========================================================
    // LOGIN
    // =========================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {

            LoginResponse user = authService.login(
                    request.email(),
                    request.password(),
                    request.role()
            );

            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }

    // =========================================================
    // PATIENT REGISTRATION
    // =========================================================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {

        try {

            User user = authService.registerPatient(
                    request.fullName(),
                    request.email(),
                    request.password(),
                    request.mobile(),
                    request.dob(),
                    request.gender(),
                    request.bloodGroup(),
                    request.address()
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(user);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================================================
    // DOCTOR REGISTRATION
    // =========================================================

    @PostMapping("/register-doctor")
    public ResponseEntity<?> registerDoctor(
            @RequestBody DoctorRegisterRequest request) {

        try {

            User user = authService.registerDoctor(
                    request.fullName(),
                    request.email(),
                    request.password(),
                    request.mobile(),
                    request.dob(),
                    request.gender(),
                    request.specialization(),
                    request.qualification(),
                    request.medicalRegistrationNo(),
                    request.hospitalAssociation(),
                    request.address()
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(user);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================================================
    // PASSWORD RESET REQUEST
    // =========================================================
    //
    // User enters registered email.
    // Request is created with PENDING status.
    // Admin can approve/reject from Admin panel.
    //
    // =========================================================

    @PostMapping("/password-reset/request")
    public ResponseEntity<?> createPasswordResetRequest(
            @RequestBody PasswordResetRequestDto request) {

        try {

            PasswordResetRequest result =
                    authService.createPasswordResetRequest(
                            request.email()
                    );

            return ResponseEntity.ok(result);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================================================
    // PASSWORD RESET AFTER ADMIN APPROVAL
    // =========================================================
    //
    // User provides:
    // Email
    // Request Code
    // New Password
    //
    // Request must have APPROVED status.
    //
    // =========================================================

    @PostMapping("/password-reset/reset")
    public ResponseEntity<?> resetPasswordByRequest(
            @RequestBody ResetPasswordByRequestDto request) {

        try {

            authService.resetPasswordByRequest(
                    request.email(),
                    request.requestCode(),
                    request.newPassword()
            );

            return ResponseEntity.ok(
                    "Password reset successfully"
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================================================
    // REQUEST DTOs
    // =========================================================

    public record LoginRequest(
            String email,
            String password,
            String role
    ) {
    }

    // =========================================================
    // PATIENT REGISTER DTO
    // =========================================================

    public record RegisterRequest(
            String fullName,
            String email,
            String password,
            String mobile,
            String dob,
            String gender,
            String bloodGroup,
            String address
    ) {
    }

    // =========================================================
    // DOCTOR REGISTER DTO
    // =========================================================

    public record DoctorRegisterRequest(
            String fullName,
            String email,
            String password,
            String mobile,
            String dob,
            String gender,
            String specialization,
            String qualification,
            String medicalRegistrationNo,
            String hospitalAssociation,
            String address
    ) {
    }

    // =========================================================
    // PASSWORD RESET REQUEST DTO
    // =========================================================

    public record PasswordResetRequestDto(
            String email
    ) {
    }

    // =========================================================
    // PASSWORD RESET DTO
    // =========================================================

    public record ResetPasswordByRequestDto(
            String email,
            String requestCode,
            String newPassword
    ) {
    }
}