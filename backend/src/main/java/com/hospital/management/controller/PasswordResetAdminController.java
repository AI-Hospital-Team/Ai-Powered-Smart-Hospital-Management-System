package com.hospital.management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.entity.PasswordResetRequest;
import com.hospital.management.repository.PasswordResetRequestRepository;
import com.hospital.management.service.AuthService;

@RestController
@RequestMapping("/api/admin/password-reset")
@CrossOrigin(origins = "http://localhost:5173")
public class PasswordResetAdminController {

    private final PasswordResetRequestRepository repository;
    private final AuthService authService;

    public PasswordResetAdminController(
            PasswordResetRequestRepository repository,
            AuthService authService) {

        this.repository = repository;
        this.authService = authService;
    }

    // =====================================================
    // GET ALL PASSWORD RESET REQUESTS
    // =====================================================

    @GetMapping("/requests")
    public ResponseEntity<List<PasswordResetRequest>> getRequests() {

        return ResponseEntity.ok(
                repository.findAllByOrderByRequestIdDesc()
        );
    }

    // =====================================================
    // APPROVE PASSWORD RESET REQUEST
    // =====================================================

    @PutMapping("/requests/{requestId}/approve")
    public ResponseEntity<?> approve(
            @PathVariable Integer requestId) {

        try {

            PasswordResetRequest result =
                    authService.approvePasswordResetRequest(
                            requestId
                    );

            return ResponseEntity.ok(result);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =====================================================
    // REJECT PASSWORD RESET REQUEST
    // =====================================================

    @PutMapping("/requests/{requestId}/reject")
    public ResponseEntity<?> reject(
            @PathVariable Integer requestId) {

        try {

            PasswordResetRequest result =
                    authService.rejectPasswordResetRequest(
                            requestId
                    );

            return ResponseEntity.ok(result);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}