package com.hospital.management.controller;

import com.hospital.management.entity.User;
import com.hospital.management.service.AuthService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

            User user = authService.login(
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
                    request.gender()
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
            String gender
    ) {
    }
}