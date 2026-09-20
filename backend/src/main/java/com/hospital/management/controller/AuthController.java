package com.hospital.management.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.dto.LoginResponse;
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

    // =====================================================
    // LOGIN
    // =====================================================

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

    // =====================================================
    // REGISTER PATIENT
    // =====================================================

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

    // =====================================================
    // REGISTER DOCTOR
    // =====================================================

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

    // =====================================================
    // FORGOT PASSWORD - SEND OTP
    // =====================================================

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        try {

            authService.sendPasswordResetOtp(
                    request.email()
            );

            return ResponseEntity.ok(
                    "OTP sent successfully to your email"
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =====================================================
    // VERIFY PASSWORD RESET OTP
    // =====================================================

    @PostMapping("/verify-reset-otp")
    public ResponseEntity<?> verifyResetOtp(
            @RequestBody VerifyOtpRequest request) {

        try {

            authService.verifyPasswordResetOtp(
                    request.email(),
                    request.otp()
            );

            return ResponseEntity.ok(
                    "OTP verified successfully"
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =====================================================
    // RESET PASSWORD
    // =====================================================

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        try {

            authService.resetPassword(
                    request.email(),
                    request.otp(),
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

    // =====================================================
    // LOGIN REQUEST
    // =====================================================

    public record LoginRequest(
            String email,
            String password,
            String role
    ) {
    }

    // =====================================================
    // PATIENT REGISTER REQUEST
    // =====================================================

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

    // =====================================================
    // DOCTOR REGISTER REQUEST
    // =====================================================

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

    // =====================================================
    // FORGOT PASSWORD REQUEST
    // =====================================================

    public record ForgotPasswordRequest(
            String email
    ) {
    }

    // =====================================================
    // VERIFY OTP REQUEST
    // =====================================================

    public record VerifyOtpRequest(
            String email,
            String otp
    ) {
    }

    // =====================================================
    // RESET PASSWORD REQUEST
    // =====================================================

    public record ResetPasswordRequest(
            String email,
            String otp,
            String newPassword
    ) {
    }
}